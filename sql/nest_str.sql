-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission

exec dry.fn 'dry.nest_str'
go
alter function dry.nest_str (@arg nvarchar(max))
   returns nvarchar(max)
as begin
   if @arg is null return null

   declare
       @ret nvarchar(max)=''
      ,@i int = 0
      ,@mult varchar(4000)=''''
      ,@c varchar(1)
      ,@len int = len(@arg)

   while @len > 0 begin
      set @i = patindex('%[{}''"]%',@arg)
      if @i = 0 begin
         set @ret += @arg
         break
      end

      set @len -= @i-1
      set @ret += substring(@arg ,1 ,@i-1)
      set @c = substring(@arg ,@i ,1)
      set @arg = substring(@arg ,@i+1 ,@len)
      if @c = '{' begin
         set @ret += @mult
         set @mult += @mult
      end else if @c in ('''','"') begin
         set @ret += @mult
      end else if @c = '}' begin
         if len(@mult) = 1
            return cast('dry.nest_str.err.1: Missing opening or extra closing curly brace.
               ' + @ret as int) -- forcing error in function
         set @mult = left(@mult ,len(@mult)/2)
         set @ret += @mult
      end
   end
   if len(@mult) != 1
      return cast('dry.nest_str.err.2: Missing closing curly brace.
      ' + @ret as int) -- forcing error
   return @ret
end

go -- unit tests
if dry.nest_str('{a}') != '''a'''
   RAISERROR ('dry.nest_str.err.3' ,16 ,1)

if dry.nest_str('''a''') != '''a'''
   RAISERROR ('dry.nest_str.err.4' ,16 ,1)

begin try
   print dry.nest_str('{')
   RAISERROR ('dry.nest_str.err.5' ,16 ,1)
end try begin catch
   if error_message() not like '%dry.nest_str.err.[2]:%'
      RAISERROR ('dry.nest_str.err.6: Balancing curly braces' ,16 ,1)
end catch

begin try
   print dry.nest_str('}')
   RAISERROR ('dry.nest_str.err.7' ,16 ,1)
end try begin catch
   if error_message() not like '%dry.nest_str.err.[1]:%'
      RAISERROR ('dry.nest_str.err.8: Balancing curly braces' ,16 ,1)
end catch

if dry.nest_str('
   for{a,b,c},{d,e,f},{
      for{1,2,3},{},{
         print {abc}
      }
   }') != '
   for''a,b,c'',''d,e,f'',''
      for''''1,2,3'''','''''''',''''
         print ''''''''abc''''''''
      ''''
   '''
   RAISERROR ('dry.nest_str.err.9' ,16 ,1)

if dry.nest_str('for{"a","b","c"}') != 'for''''''a'''',''''b'''',''''c'''''''
   RAISERROR ('dry.nest_str.err.10' ,16 ,1)

if len(dry.nest_str('')) != 0
   RAISERROR ('dry.nest_str.err.11' ,16 ,1)

if dry.nest_str(null) is not null
   RAISERROR ('dry.nest_str.err.12' ,16 ,1)

if dry.nest_str('a{"b","c",{d{e}f}"g"}h') != 'a''''''b'''',''''c'''',''''d''''''''e''''''''f''''''''g''''''h'
   RAISERROR ('dry.nest_str.err.13' ,16 ,1)
