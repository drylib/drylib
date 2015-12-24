-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission

exec dry.sp 'dry.do'
go
alter procedure dry.do
    @arg nvarchar(128) -- name of temp table passed as parameter
   ,@cmd nvarchar(max)
as
   if @arg is not null and @arg like '#%' begin
      declare
          @replace nvarchar(max) = ''
         ,@with nvarchar(max) = ''
      select
          @replace += 'replace('
         ,@with +='
            ,''|' + col.name + '|''
               ,' + col.name + ')'
         from tempdb.sys.columns col
         where object_id = object_id('tempdb..' + @arg)

      declare @exec nvarchar(max) = '
         select @cmd = ' + @replace + ' @cmd
         ' + @with + '
         from ' + @arg + '
      '
      select @cmd = dry.nest_str(@cmd)
      exec sp_executesql @exec,N'@cmd nvarchar(max) out' ,@cmd out

      if dry.dbg() = 1
         exec dry.log @cmd
      exec sp_executesql @cmd
   end

go -- unit tests
if object_id('tempdb..#arg') is not null
   drop table #arg
select tbl = 'sys.objects' into #arg
exec dry.do "#arg","
   declare @c varchar = (select convert(varchar,count(1)) from |tbl|)
   print {|tbl| } + @c
"
