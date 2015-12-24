-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission

if not exists(select 1
    from sys.views v
    join sys.schemas ns on ns.schema_id = v.schema_id
    cross join dry.const
    where ns.name = ns and v.name = 'my_id')
   exec('create view dry.my_id as select name = ''''')
go
alter view dry.my_id as
   select
       db = DB_ID()
      ,ns = SCHEMA_ID() -- namespace
      ,usr = DATABASE_PRINCIPAL_ID() -- USER_ID() is deprecated https://technet.microsoft.com/en-us/library/ms181466(v=sql.105).aspx
      ,login = suser_id()
      ,caller = @@PROCID
      ,sess = @@SPID
      --,login_sid = convert(char(170),SUSER_SID(),2) -- varbinary(85) converted to hex without 0x prefix

go
if dry.dbg() = 1
   select * from dry.my_id

-------------------------------------------------------------------------------
if not exists(select 1
    from sys.views v
    join sys.schemas ns on ns.schema_id = v.schema_id
    cross join dry.const
    where ns.name = ns and v.name = 'now')
   exec('create view dry.now as select name = ''''')
go
alter view dry.now as
   select
       now = CURRENT_TIMESTAMP -- =getdate() local time zone + Daylight Savings
      ,dbts = convert(bigint,@@DBTS) -- id of last db change
      ,cpu = @@CPU_BUSY
      ,now_sys = SYSDATETIMEOFFSET() -- contains time zone, does not allow + 1 arithmetic
      ,now_utc = GETUTCDATE() --convert(DateTime2(3),SYSUTCDATETIME())
      ,offset =  datepart(tz,SYSDATETIMEOFFSET())/60 --=datediff(hh,GETUTCDATE(),GETDATE())
      ,now_sort = convert(varchar(27),SYSDATETIME(),121)
      ,utc_sort = convert(varchar(27),SYSUTCDATETIME(),121)
      ,weekday = datename(dw,getdate())
go
if dry.dbg() = 1
   select * from dry.now


-------------------------------------------------------------------------------
if not exists(select 1
    from sys.views v
    join sys.schemas ns on ns.schema_id = v.schema_id
    cross join dry.const
    where ns.name = ns and v.name = 'my_name')
   exec('create view dry.my_name as select name = ''''')
go
alter view dry.my_name as
   select
       svr = @@SERVERNAME
      ,svc = @@SERVICENAME
      ,db = DB_NAME()
      ,ns = SCHEMA_NAME()
      ,usr = SESSION_USER -- = CURRENT_USER = USER = USER_NAME() https://technet.microsoft.com/en-us/library/ms191126%28v=sql.105%29.aspx
      ,login = SYSTEM_USER -- = SUSER_SNAME()
      ,caller = isnull(schema_name(schema_id(@@PROCID)) + '.' ,'') + object_name(@@PROCID)

go
if dry.dbg() = 1
   select * from dry.my_name


-------------------------------------------------------------------------------
if object_id('dry.db') is null
   exec('create view dry.db as select name = ''''')
go
alter view dry.db as
   select
           name = DB_NAME(database_id)
          ,len = convert(decimal(8,1),sum(len) * 0.0078125) -- = 8/1024
          ,len_db = convert(decimal(8,1),sum(len_db) * 0.0078125)
          ,len_log = convert(decimal(8,1),sum(len_log) * 0.0078125)
      from sys.master_files WITH(NOLOCK)
      cross apply (select const.*
         ,log = case when type_desc = 'LOG' then true else false end
         from dry.const
      ) const
      cross apply (select
           len = size
          ,len_db = case when log = false then size else 0 end
          ,len_log = case when log = true then size end
      ) len
      group by database_id

go
if dry.dbg() = 1
   select * from dry.db


-------------------------------------------------------------------------------
if not exists(select 1
    from sys.views v
    join sys.schemas ns on ns.schema_id = v.schema_id
    cross join dry.const
    where ns.name = ns and v.name = 'my')
   exec('create view dry.my as select name = ''''')
go
alter view dry.my as
   select
          svr_name = name.svr
         ,svc_name = name.svc
         ,db_id = id.db
         ,db_name = name.db
         ,ns_id = id.ns
         ,ns_name = name.ns
         ,usr_id = id.usr
         ,usr_name = name.usr
         ,login_id = id.login
         ,login_name = name.login
         ,caller_id = id.caller
         ,caller_name = name.caller
         ,id.sess
         ,now.*
         ,dry.const.*
      from dry.my_id id, dry.my_name name, dry.now, dry.const
go
if dry.dbg() = 1
   select * from dry.my
