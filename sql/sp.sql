-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission

if object_id('dry.sp') is null
   exec('create procedure dry.sp as
      RAISERROR (''dry.sp.err.1: not implemented'' ,16 ,1) WITH NOWAIT')
go
alter procedure dry.sp
    @name sysname
   ,@body nvarchar(max)=null
   ,@drop bit=null
as
declare @cmd nvarchar(max)
if @drop is null set @drop=0
set @name = replace(@name,'''','''''')

if @drop = 1
   set @cmd = 'drop procedure ' + @name
else
   set @cmd = 'create procedure ' + @name + '
      as 
         RAISERROR (''dry.sp.err.2:' + @name + '.err.1: not implemented'' ,16 ,1) WITH NOWAIT
      '
if not exists(select 1 from dry.obj where name = @name) begin
   if @drop = 0
      exec(@cmd)
end else
   if @drop = 1
      exec(@cmd)

if @body is not null and @drop=0
   exec(@body) -- @body must have alter function statement


go ------------------------------- unit tests ---------------------------------
exec dry.sp 'dry.unit_test'
if not exists(select 1 from dry.obj where name='dry.unit_test')
   RAISERROR ('dry.sp.err.3' ,16 ,1)

exec dry.sp 'dry.unit_test','
   alter procedure dry.unit_test as select z=1
'
exec('
   select z=0 into #ret
   insert into #ret exec dry.unit_test
   if (select top 1 z from #ret where z=1) != 1
      RAISERROR (''dry.sp.err.4'' ,16 ,1) WITH NOWAIT
')
begin try
   exec('exec dry.sp ''dry.unit_test'',@drop=1')
end try begin catch
   RAISERROR ('dry.sp.err.5: drop failed' ,16 ,1)
end catch
