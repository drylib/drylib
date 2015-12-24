-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission
select ret.*
   into #cx
   from (select ns = 'dry', name = 'obj') calc1
   cross apply (select calc1.*
      ,name_ = ns + '.' + name
   ) calc2
   cross apply (select calc2.*
      ,id = object_id(name_)
      ,all_name_ = name_ + '_'
   ) calc3
   cross apply (select calc3.*
      ,all_id = object_id(all_name_)
      ,create_cmd = case when id is not null then '' else
            'create view ' + calc3.name_ + ' as select z = '''''
       end
   ) calc4
   cross apply (select calc4.*
      ,all_create_cmd = case when all_id is not null then '' else
         'create view ' + calc4.all_name_ + ' as select z = '''''
       end
   ) ret

declare @cmd nvarchar(max) = (select create_cmd from #cx)
exec(@cmd)
      
go
alter view dry.obj as
with src as (select
   object_id,name,type,create_date,modify_date,parent_object_id,schema_id
      from sys.objects
   /*{ where 1 = 0 union all
      select object_id, name = substring(name, 1, charindex('_____', name) - 1)
            ,type,create_date,modify_date,parent_object_id,schema_id
         from tempdb.sys.objects
         where name like '#%[_][_][_][_][_]%'
         and object_id = object_id('tempdb..'
            + substring(name, 1, charindex('______', name) - 1)
         )
   }*/
)
,obj as (select
    ret.*
   from src o
    join sys.schemas ns on ns.schema_id = o.schema_id
    cross join dry.const

   cross apply (select
      same_ns = case when ns.schema_id = SCHEMA_ID()
         then true
         else false
      end

      ,tbl = case when type = 'U' then true else false end
      ,vw = case when type = 'V' then true else false end
      ,fn = case when type in ('FN','AF','FS','FT','IF','TF') then true else false end
      ,sp = case when type in ('P','PC','X') then true else false end
      ,clr = case when type in ('AF','FS','FT','PC','TA') then true else false end
      ,pk = case when type in ('PK') then true else false end
      ,fk = case when type in ('F') then true else false end
      ,df = case when type in ('D') then true else false end
      ,chk = case when type in ('C') then true else false end
      ,uq = case when type in ('UQ') then true else false end
      ,constr = case when type in ('C','D','F','PK','UQ') then true else false end
      ,tr /*trigger*/ = case when type in ('TR','TA') then true else false end
   ) calc1
   cross apply (select
       name = -- name that is visible relative to current user schema
         case when same_ns = 1
            then ''
            else ns.name + '.'
         end
         + o.name
      ,o.type
      ,calc1.*
      ,rs /*recordset*/ = tbl | vw | case when type in ('TF','FT','IF') then true else false end
      ,prg = fn | sp | tr
      ,created = o.create_date
      ,modified = o.modify_date
      ,id = o.object_id
      ,_ = parent_object_id
      ,name_ = ns.name + '.' + o.name
   ) ret
)
select
       _name = parent.name
      ,obj.*
      ,_name_ = parent.name_
   from obj
   left join obj parent on parent.id = obj._



go -- unit tests
if not exists(select 1 from dry.obj where name = 'dry.obj' and vw = 1)
   RAISERROR ('dry.obj.err.1: Can''t find myself',16,1) WITH NOWAIT

go -- deriving dry.obj_ from dry.obj
declare @cmd nvarchar(max) = (select all_create_cmd from #cx)
exec(@cmd)

select @cmd = definition
   from sys.sql_modules,#cx
   where object_id = id

select @cmd = replace(replace(replace(replace(@cmd
   ,'create view','alter view')
   ,'/*{',''),'}*/','')
   ,name_,all_name_)
   from #cx

exec(@cmd)
go
drop table #cx
go
create procedure #obj_test as print ''
go
if not exists(select 1 from dry.obj_ where name = '#obj_test' and sp = 1)
   RAISERROR ('dry.obj.err.2: Can''t find temp SP',16,1) WITH NOWAIT
go
drop procedure #obj_test
go
create table #obj_test (id int)
go
if not exists(select 1 from dry.obj_ where name = '#obj_test' and tbl = 1)
   RAISERROR ('dry.obj.err.3: Can''t find temp table',16,1) WITH NOWAIT
go
if exists(select 1 from dry.obj where name = '#obj_test' and tbl = 1)
   RAISERROR ('dry.obj.err.4: Can find temp table',16,1) WITH NOWAIT
go
if dry.dbg()=1 begin
   select * from dry.obj
   select * from dry.obj_
end
go
drop table #obj_test
