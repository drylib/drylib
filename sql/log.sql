-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission

if object_id('dry.log_seq') is null
   create sequence dry.log_seq START WITH 1 INCREMENT BY 1 ;
go
if object_id('dry.log') is null
   exec('create procedure dry.log as
      RAISERROR (''dry.log.err.1: not implemented'' ,16 ,1) WITH NOWAIT')
go
alter procedure dry.log
    @arg1 nvarchar(max) = null
   ,@arg2 nvarchar(max) = null
   ,@arg3 nvarchar(max) = null
   ,@arg4 nvarchar(max) = null
   ,@arg5 nvarchar(max) = null
   ,@err int = null
as
if @err is null set @err = 0

declare @arg nvarchar(max) = ''
set @arg += isnull(      @arg1,'')
set @arg += isnull(' ' + @arg2,'')
set @arg += isnull(' ' + @arg3,'')
set @arg += isnull(' ' + @arg4,'')
set @arg += isnull(' ' + @arg5,'')

set @arg = ''
   + convert(varchar,NEXT VALUE FOR dry.log_seq) + ')'
   + ' ' + convert(varchar,getdate(),114)
   + '  ' + isnull(replace(convert(varchar(128),context_info()),0x00,'') + '.' ,'')
   + @arg

--print @arg
-- using RAISERROR with 0 severity and NOWAIT option as trick to push messages to console immediately
RAISERROR (@arg, @err, 1) WITH NOWAIT
go
declare @cx varbinary(128) = convert(varbinary(128), 'dry.log.test'); set context_info @cx
exec dry.log 'line 1'
exec dry.log line ,2
