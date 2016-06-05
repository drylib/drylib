// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
namespace DRY.Abbr{
   public interface _      :Parent, As.Pfx<Private>, As.Sfx<Plural>, As.Sfx<List>, As.Mid<Or> {}
                           public interface Parent{}
                           public interface Plural{}
                           public interface List{}
                           public interface Or{}
   public interface abbr   :Abbreviation{} public interface Abbreviation{}
   public interface acc    :Account, Accounting {} public interface Account{}
                                                   public interface Accounting{} // http://www.thefreedictionary.com/Accounting
   public interface agg    :Aggregate{} public interface Aggregate{}
   public interface app    :Application{} public interface Application{}
   public interface auth   :Authentication, Authenticate, Authorize {}
                           public interface Authentication{}
                           public interface Authenticate{}
                           public interface Authorize{}
   public interface bin    :Binary{} public interface Binary{}
   public interface biz    :Business, Corporate, Company{} public interface Business{}
                                                           public interface Company{}
   public interface @bool  :Boolean{} public interface Boolean{}
   public interface buf    :Buffer {} public interface Buffer{} // https://msdn.microsoft.com/en-us/library/windows/desktop/ms740149(v=vs.85).aspx
   public interface calc   :Calculation{} public interface Calculation{}
   public interface cmd    :Command{} public interface Command{}
   public interface cmp    :Compare{} public interface Compare{}
   public interface col    :Column{} public interface Column{}
   public interface comm   :Communication{} public interface Communication{}
   public interface conn   :Connection{} public interface Connection{}
   public interface corp   :Corporate, Business{} public interface Corporate{}
   public interface cr     :Create{} public interface Create{}
   public interface cs     :CustomerService, CSharp{} public interface CustomerService{}
                                                      public interface CSharp{}
   public interface cust   :Customer{} public interface Customer{}
   public interface cx     :Context{} public interface Context{}
   public interface db     :Database{} public interface Database{}
   public interface dbg    :Debug{} public interface Debug{}
   public interface dec    :Decrement{} public interface Decrement{}
   public interface decl   :Declaration{} public interface Declaration{}
   public interface def    :Definition, Define{} public interface Definition{}
                                                 public interface Define{}
   public interface del    :Delete, Remove, Drop{} public interface Delete{}
   public interface dev    :Development, Developer{} public interface Development{}
                                                     public interface Developer{}
   public interface df     :Default{} public interface Default{}
   public interface dir    :Directory, Folder{} public interface Directory{}
                                                public interface Folder{}
   public interface doc    :Document{} public interface Document{}
   public interface drop   :Drop, Delete, Remove{} public interface Drop{}
   public interface drv    :Driver, Drive{} public interface Driver{}
                                            public interface Drive{}
   public interface dry    :DontRepeatYourself{} public interface DontRepeatYourself{}
   public interface ds     :DataSet, RowSet{} public interface DataSet{}
   public interface dst    :Destination{} public interface Destination{}
   public interface dt     :DateTime{} public interface DateTime{}
   public interface dup    :Duplicate, Copy{} public interface Duplicate{}
                                              public interface Copy{}
   public interface emp    :Employee{} public interface Employee{}
   public interface env    :Environment{} public interface Environment{}
   public interface err    :Error, Exception{} public interface Error{}
                                               public interface Exception{}
   public interface ev     :Event{} public interface Event{}
   public interface expr   :Expression{} public interface Expression{}
   public interface ext    :Extension, External, Exterior{}
                           public interface Extension{}
                           public interface External{}
                           public interface Exterior{}
   public interface eval   :Evaluate{} public interface Evaluate{}
   public interface fin    :Financial{} public interface Financial{}
   public interface fk     :ForeignKey{} public interface ForeignKey{}
   public interface fld    :Field{} public interface Field{}
   public interface flt    :Filter, Domain.Programming, Domain.Transportation<Flight>{} public interface Filter{} public interface Flight{}
   public interface fn     :Function{} public interface Function{}
   public interface frac   :Fractional{} public interface Fractional{}
                                         public interface Decimal{}
   public interface gen    :Generate{} public interface Generate{}
   public interface gov    :Government, Domain.Political{} public interface Government{}
   public interface grp    :Group, Domain.Programming{} public interface Group{}
   public interface gui    :GraphicUserInterface, UserInterface{} public interface GraphicUserInterface{}
   public interface ifc    :Interface{} public interface Interface{}
   public interface imp    :Implementation, Implement {} public interface Implementation{}
                                                         public interface Implement{}
   public interface inc    :Increment{} public interface Increment{}
   public interface incl   :Include{} public interface Include{}
   public interface @in    :Input{} public interface Input{}
   public interface @int   :Integer, Internal, Interior{}
                           public interface Integer{}
                           public interface Internal{}
                           public interface Interior{}
   public interface ix     :Index{} public interface Index{}
   public interface len    :Length, Size{} public interface Length{}
                                           public interface Size{}
   public interface lic    :License{} public interface License{}
   public interface mid    :Middle, Domain.any{} public interface Middle{}
   public interface mgr    :Manager{} public interface Manager{}
   public interface mrg    :Merge{} public interface Merge{}
   public interface msg    :Message{} public interface Message{}
   public interface mx     :Matrix{} public interface Matrix{}
   public interface mk     :Make, Create{} public interface Make{}
   public interface mv     :Move, Transfer{} public interface Move{}
                                             public interface Transfer{}
   public interface net    :Network{} public interface Network{}
   public interface num    :Number{} public interface Number{}
   public interface obj    :Object{} public interface Object{}
   public interface op     :Operation, Operator {} public interface Operation{}
                                                   public interface Operator{}
   public interface ord    :Order{} public interface Order{}
   public interface orig   :Original, Source{} public interface Original{}
   public interface @out   :Output{} public interface Output{}
   public interface pfx    :Prefix{} public interface Prefix{}
   public interface pk     :PrimaryKey{} public interface PrimaryKey{}
   public interface pkg    :Package{} public interface Package{}
   public interface pmt    :Payment{} public interface Payment{}
   public interface pos    :Position{} public interface Position{}
   public interface prec   :Precision{} public interface Precision{}
   public interface pref   :Preference, Prefer{} public interface Preference{}
                                                 public interface Prefer{}
   public interface prep   :Prepare, Preparation{} public interface Prepare{}
                                                   public interface Preparation{}
   public interface prev   :Previous, Domain.any{} public interface Previous{}
   public interface prg    :Program, Domain.Programming{} public interface Program{}
   public interface proc   :Process, Procedure, Domain.Programming {}
                           public interface Process{}
                           public interface Procedure{}
   public interface prod   :Production, Domain.Programming{} public interface Production{}
   public interface ptr    :Pointer{} public interface Pointer{}
   public interface pvt    :Private{} public interface Private{}
   public interface pwd    :Password{} public interface Password{}
   public interface qry    :Query{} public interface Query{}
   public interface rcpt   :Recipient{} public interface Recipient{}
   public interface rd     :Reader, Read{} public interface Reader{}
                                           public interface Read{}
   public interface rec    :Record{} public interface Record{}
   public interface recv   :Receive{} public interface Receive{} // https://msdn.microsoft.com/en-us/library/windows/desktop/ms740121(v=vs.85).aspx
   public interface @ref   :Reference, Domain.Programming{} public interface Reference{}
   public interface rel    :Relation, Domain.Programming{} public interface Relation{}
   public interface rep    :Representative, Domain.Insurance, Domain.CRM{} public interface Representative{}
   public interface req    :Require, Requirement, Requisition {}
                            public interface Require{} // http://dictionary.reference.com/browse/req-
                            public interface Requirement : Domain.Programming{}
                            public interface Requisition{}
   public interface res    :Result{} public interface Result{}
   public interface ret    :Return, Domain.Programming{} public interface Return{}
   public interface rm     :Remove, Delete, Drop, Domain.Programming{} public interface Remove{}
   public interface rs     :RowSet, DataSet, Domain.Programming{} public interface RowSet{}
   public interface rsp    :Response{} public interface Response{}
   public interface rq     :Request, Domain.Programming{} public interface Request{} // https://en.wikipedia.org/wiki/Interrupt_request_(PC_architecture)
   public interface sep    :Separator, Delimiter, Domain.Programming{}
                           public interface Separator{}
                           public interface Delimiter{}
   public interface seq    :Sequence, Domain.Programming{} public interface Sequence{}
   public interface sec    :Security, Secure, Domain.Programming {}
                           public interface Security{}
                           public interface Secure{}
   public interface sfx    :Suffix{} public interface Suffix{}
   public interface sft    :Software{} public interface Software{}
   public interface sock   :Socket {} public interface Socket{}
   public interface src    :Source, Original, Domain.Programming{} public interface Source{}
   public interface stg    :Staging{} public interface Staging{}
   public interface stmt   :Statement, Domain.Accounting, Domain.Banking{}
      public interface Statement{}
   public interface str    :String, Domain.Programming{} public interface String{}
   public interface subj   :Subject{} public interface Subject{}
   public interface sup    :Supersede, Override {} public interface Supersede{}
                                                   public interface Override{}
   public interface svc    :Service, Domain.Programming{} public interface Service{}
   public interface svr    :Server, Domain.Programming, Domain.Networking{} public interface Server{} // https://en.wikipedia.org/wiki/SVR#Technology
   public interface syn    :Synonym{} public interface Synonym{}
   public interface sync   :Synchronize, Domain.Programming{} public interface Synchronize{}
   public interface synced :Synchronized, Domain.Programming{} public interface Synchronized{}
   public interface sys    :System, Domain.Programming{} public interface System{}
   public interface tbl    :Table, Domain.Programming{} public interface Table{}
   public interface temp   :Temporary, Domain.Programming, Domain.Networking{} public interface Temporary{}
   public interface trig   :Trigger, Domain.Programming{} public interface Trigger{}
   public interface trk    :Track, Tracking{} public interface Track{}
                                              public interface Tracking{}
   public interface tran   :Transaction{} public interface Transaction{}
   public interface tx     :Transmission, Domain.Blockchain, Domain.Communication{} public interface Transmission{}
   public interface txt    :Text, Domain.Programming{} public interface Text{}
   public interface ui     :UserInterface, GraphicUserInterface, Domain.Programming{} public interface UserInterface{}
   public interface usr    :User{} public interface User{}
   public interface upd    :Update{} public interface Update{}
   public interface uq     :Unique, Domain.Programming{} public interface Unique{}
   public interface val    :Value, Domain.Programming{} public interface Value{}
   public interface vb     :VisualBasic, Domain.Programming{} public interface VisualBasic{}
   public interface vec    :Vector, Domain.Programming{} public interface Vector{}
   public interface vw     :View, Domain.Programming{} public interface View{}

   namespace As {
      public interface Pfx<T>{}
      public interface Sfx<T>{}
      public interface Mid<T>{}
   }
}
namespace DRY.Domain{
   public interface any {}
   public interface Accounting: any { }
   public interface Warehouse: any { }
   public interface Programming: any { }
   public interface Networking: any { }
   public interface Banking: any { }
   public interface StockTrading: any { }
   public interface Medical: any { }
   public interface Promo: any { }
   public interface Transportation<T>: any { }
   public interface Legal: any { }
   public interface Political: any { }
   public interface Communication: any { }
   public interface Blockchain: any { }
   public interface CRM: any { }
   public interface Insurance: any { }
}
