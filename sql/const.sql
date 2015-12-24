-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission

if object_id('dry.const') is null
   exec('create view dry.const as select name = ''''')
go
alter view dry.const as
   select
       true = convert(bit,1)
      ,false = convert(bit,0)
      ,crlf = char(13) + char(10)
      ,str = convert(nvarchar(max),null)
      ,ns = 'dry'
      --convert(varbinary(1),'FF',2) = convert(varbinary(2),'0xFF',1) = 0xFF

go
