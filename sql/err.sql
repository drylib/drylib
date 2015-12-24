-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission
if object_id('dry.err') is null
   exec('create procedure dry.err as
      RAISERROR (''dry.err.err.1: not implemented'' ,16 ,1) WITH NOWAIT')
go
alter procedure dry.err
    @arg1 nvarchar(max) = null
   ,@arg2 nvarchar(max) = null
   ,@arg3 nvarchar(max) = null
   ,@arg4 nvarchar(max) = null
   ,@arg5 nvarchar(max) = null
as
declare @arg nvarchar(max) = ''
set @arg += isnull(      @arg1,'')
set @arg += isnull(' ' + @arg2,'')
set @arg += isnull(' ' + @arg3,'')
set @arg += isnull(' ' + @arg4,'')
set @arg += isnull(' ' + @arg5,'')

exec dry.log @arg1,@arg2,@arg3,@arg4,@arg5,@err=16

go
begin try
   exec dry.err 'dry.err.test line 1'
   exec dry.err 'dry.err.test','line',2
end try begin catch
end catch
