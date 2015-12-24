-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission

if object_id('dry.dbg') is null
   exec('create function dry.dbg() returns bit as begin return 1 end')
go
alter function dry.dbg()
   returns bit
as begin
   return 1
end
