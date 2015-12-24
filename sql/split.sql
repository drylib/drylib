-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission

exec dry.fn 'dry.split',null,null,'@ret table(id int identity, item nvarchar(max))'
go
alter function dry.split(@arg nvarchar(max) ,@sep nvarchar(max))
   -- TODO: include options as part of @sep to avoid too many arguments
   -- one option is to trim each item
   returns @ret table(id int identity, item nvarchar(max))
as begin
   declare
         @i int = 0
      ,@len int = datalength(@arg)/2 -- handle unicode and spaces
      ,@sep_len int = datalength(@sep)/2
   if @arg is not null begin
      if @sep is null or @sep_len = 0 begin
         insert @ret select @arg
      end else begin
         --insert @ret select convert(varchar(max),datalength(@sep)/2)
         while @len > 0 begin
            set @i = patindex('%' + @sep + '%',@arg)
            if @i = 0 begin
               insert @ret select @arg
               break
            end else begin
               set @len -= (@i-1 + @sep_len-1)
               insert @ret select substring(@arg ,1 ,@i-1)
               set @arg = substring(@arg ,@i+@sep_len ,@len)
            end
         end
      end
   end
   return
end

go -- unit tests

if (select count(1) from dry.split(null,null)) > 0
   exec dry.err 'dry.split.1'
if (select count(1) from dry.split('abc',null) where id=1 and item='abc') != 1
   exec dry.err 'dry.split.2'
if (select count(1) from dry.split('a,b,c',',')) != 3
   exec dry.err 'dry.split.3'
if (select count(1) from dry.split('a,b,c,',',')) != 4
   exec dry.err 'dry.split.4'
if (select count(1) from dry.split(',a,b,c,',',')) != 5
   exec dry.err 'dry.split.5'
if (select count(1) from dry.split(',',',')) != 2
   exec dry.err 'dry.split.6'
if (select count(1) from dry.split(' ',' ')) != 2
   exec dry.err 'dry.split.7'
if (select count(1) from dry.split(' a b c ',' ')) != 5
   exec dry.err 'dry.split.8'
if (select count(1) from dry.split('',' ')) != 0
   exec dry.err 'dry.split.9'
if (select count(1) from dry.split('','')) != 1
   exec dry.err 'dry.split.10'

if dry.dbg() = 1
   select * from dry.split('a,b,c',',')
