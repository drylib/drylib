-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission

exec dry.sp 'dry.fn'
go
alter procedure dry.fn
    @name sysname
   ,@body nvarchar(max)=null
   ,@drop bit=null
   ,@ret nvarchar(max)=null -- return type to avoid incompatible function error when altering
as
declare @cmd nvarchar(max)
if @drop is null set @drop=0
set @name = replace(@name,'''','''''')
if @ret is null set @ret = 'int'

if @drop = 1
   set @cmd = 'drop function ' + @name
else
   set @cmd = 'create function ' + @name + ' () returns ' + @ret + '
      as begin
         -- simulating error because RAISERROR is not allowed inside functions
         return '
            + iif(@ret like '%table%'
               ,''
               ,'cast(''dry.fn.err.2.' + @name + '.err.1: not implemented.'' as int)'
            ) + '
      end'
if not exists(select 1 from dry.obj where name = @name) begin
   if @drop = 0
      exec(@cmd)
end else
   if @drop = 1
      exec(@cmd)

if @body is not null and @drop=0
   exec(@body) -- @body must have alter function statement


go ------------------------------- unit tests ---------------------------------
exec dry.fn 'dry.test_fn'
if not exists(select 1 from dry.obj where name='dry.test_fn')
   RAISERROR ('dry.fn.err.3' ,16 ,1) WITH NOWAIT

exec dry.fn 'dry.test_fn','
   alter function dry.test_fn (@i int)
      returns int as begin
         return @i+1
      end
'
exec('
if dry.test_fn(1) != 2
   RAISERROR (''dry.fn.err.4'' ,16 ,1) WITH NOWAIT
')
exec('exec dry.fn ''dry.test_fn'',@drop=1')
