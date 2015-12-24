-- Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.sql
-- You are NOT ALLOWED to modify and/or use this code without author permission
select ret.*
   into #cx
   from (select ns, name = 'col' from dry.const) calc1
   cross apply (select calc1.*
      ,name_ = ns + '.' + name
   ) calc2
   cross apply (select calc2.*
      ,id = object_id(name_)
      ,all_name_ = name_ + '_'
   ) calc3
   cross apply (select calc3.*
   ) ret

exec dry.vw 'dry.col'
go
alter view dry.col as 
with obj as (select * from dry.obj
   /*{ where 1 = 0 union all select * from dry.obj_ }*/
)
,col as (
   select * from sys.columns
   /*{ where 1 = 0 union all select * from tempdb.sys.columns }*/
)
,type as (
   select * from sys.types
   /*{ where 1 = 0 union all select * from tempdb.sys.types }*/
)
select ret.* from dry.const
   cross join col
   join type on type.user_type_id = col.user_type_id
   left join obj on obj.id = col.object_id

   cross apply (select
       seq = col.column_id
      ,nil = col.is_nullable
      ,prec = col.precision
      ,len = col.max_length
   ) calc1

   cross apply (select
       int = case when type.name in ('bit','tinyint','smallint','int','bigint') then true else false end
      ,frac = case when type.name in ('decimal','numeric','real','float','smallmoney','money') then true else false end
      ,astr = case when type.name in ('char','varchar','text') then true else false end
      ,nstr = case when type.name in ('nchar','nvarchar','ntext') then true else false end
      ,dt = case when type.name in ('datetime','date','time','datetime2','datetimeoffset') then true else false end
      ,bin = case when type.name in ('binary','varbinary','image') then true else false end
      ,uq = false -- TODO: detect if unique constraint or index exists where this is the only column
   ) calcType1

   cross apply (select
       num = case when true in (calcType1.int,calcType1.frac) then true else false end
      ,calcType1.int,calcType1.frac
      ,str = case when true in (calcType1.astr,calcType1.nstr) then true else false end
      ,calcType1.astr,calcType1.nstr
      ,calcType1.dt,calcType1.bin,calcType1.uq
   ) calcType2

   cross apply (select
       calc1.*
      ,calcType2.*
   ) calc2

   cross apply (select
       tbl = obj.name -- table name that is visible relative to current user schema
      ,calc2.*
      ,tbl_ = obj.name_
   ) calc3

   cross apply (select
       def_len =  case
                     when col.max_length = -1 then 'max'
                     else convert(varchar,col.max_length)
                  end
   ) calc4

   cross apply (select
       col.name
      ,def_type = type.name
         + case when calc3.str = true then 
            '(' + calc4.def_len + ')'
           else
            ''
           end
      ,calc3.*
      ,name_ = tbl_ + '.' + col.name
   ) ret

go -- unit tests
if not exists(select 1 from dry.col where name_ = 'dry.col.name')
   RAISERROR ('dry.col.err.1: Can''t find myself',16,1) WITH NOWAIT

if dry.dbg()=1
   select * from dry.col where tbl like 'dry.%' order by tbl,seq

go -- deriving dry.col_ from dry.col
exec dry.vw 'dry.col_'

declare @cmd nvarchar(max)

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
create table #test (
   id int
   ,s varchar(2015)
   ,smax varchar(max)
   ,zip char(5)
   ,uid uniqueidentifier
   ,created datetime
)
go
if not exists(select 1 from dry.col_ where tbl = '#test' and name = 'id' and def_type = 'int')
   RAISERROR ('dry.col.err.2: Can''t find #test.id int',16,1) WITH NOWAIT
go
if not exists(select 1 from dry.col_ where tbl = '#test' and name = 's' and def_type = 'varchar(2015)')
   RAISERROR ('dry.obj.err.3: Missing: #test.s varchar(2015)',16,1) WITH NOWAIT
go
if not exists(select 1 from dry.col where name_ = 'dry.const.true' and def_type = 'bit')
   RAISERROR ('dry.obj.err.4: Missing: dry.const.true bit',16,1) WITH NOWAIT

go
if dry.dbg()=1 begin
   select * from dry.col
   select * from dry.col_ where tbl is not null order by tbl,seq
end
go
drop table #test
