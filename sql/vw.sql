-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission

if object_id('dry.vw') is null
   exec('create procedure dry.vw as
      RAISERROR (''dry.vw.err.1: not implemented'' ,16 ,1) WITH NOWAIT')
go
alter procedure dry.vw
    @name sysname
   ,@body nvarchar(max)=null
   ,@drop bit=null
as
declare @cmd nvarchar(max)
if @drop is null set @drop=0
set @name = replace(@name,'''','''''')

if @drop = 1
   set @cmd = 'drop view ' + @name
else
   set @cmd = 'create view ' + @name + ' as select err = cast(''dry.vw.err.2.' + @name + '.err.1: not implemented.'' as int)'

if not exists(select 1 from dry.obj where name = @name) begin
   if @drop = 0
      exec(@cmd)
end else
   if @drop = 1
      exec(@cmd)

if @body is not null and @drop=0 begin
   set @body = 'alter view ' + @name + ' as 
      ' + @body
   exec(@body) -- @body must have select statement
end


go ------------------------------- unit tests ---------------------------------
exec dry.vw 'dry.test_vw'
if not exists(select 1 from dry.obj where name='dry.test_vw')
   RAISERROR ('dry.vw.err.3' ,16 ,1) WITH NOWAIT

exec dry.vw 'dry.test_vw','
   select * from dry.obj
'
exec('
if not exists(select 1 from dry.test_vw where name = ''dry.test_vw'')
   RAISERROR (''dry.vw.err.4'' ,16 ,1) WITH NOWAIT
')
exec('exec dry.vw ''dry.test_vw'',@drop=1')
