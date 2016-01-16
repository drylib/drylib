// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
namespace DRYLib.Abbr{
   public class _      :Parent.Any, AsPrefix<Private>, AsSuffix<Plural> {}
                        public class Parent{public interface Any{}}
                        public class Plural{public interface Any{}}
   public class abbr   :Abbreviation.Any{} public class Abbreviation{public interface Any{}}
   public class acc    :Account.Any{} public class Account{public interface Any{}}
   public class agg    :Aggregate.Any{} public class Aggregate{public interface Any{}}
   public class bin    :Binary.Any{} public class Binary{public interface Any{}}
   public class biz    :Business.Any,Corporate.Any{} public class Business{public interface Any{}}
   public class @bool  :Boolean.Any{} public class Boolean{public interface Any{}}
   public class calc   :Calculation.Any{} public class Calculation{public interface Any{}}
   public class cmd    :Command.Any{} public class Command{public interface Any{}}
   public class cmp    :Compare.Any{} public class Compare{public interface Any{}}
   public class col    :Column.Any{} public class Column{public interface Any{}}
   public class comm   :Communication.Any{} public class Communication{public interface Any{}}
   public class conn   :Connection.Any{} public class Connection{public interface Any{}}
   public class corp   :Corporate.Any,Business.Any{} public class Corporate{public interface Any{}}
   public class cr     :Create.Any{} public class Create{public interface Any{}}
   public class cs     :CustomerService.Any,CSharp.Any{} public class CustomerService{public interface Any{}}
                                                         public class CSharp{public interface Any{}}
   public class cx     :Context.Any{} public class Context{public interface Any{}}
   public class db     :Database.Any{} public class Database{public interface Any{}}
   public class dbg    :Debug.Any{} public class Debug{public interface Any{}}
   public class dec    :Decrement.Any{} public class Decrement{public interface Any{}}
   public class def    :Definition.Any,Define.Any{} public class Definition{public interface Any{}}
                                                    public class Define{public interface Any{}}
   public class del    :Delete.Any,Remove.Any,Drop.Any{} public class Delete{public interface Any{}}
   public class dev    :Development.Any,Developer.Any{} public class Development{public interface Any{}}
                                                        public class Developer{public interface Any{}}
   public class df     :Default.Any{} public class Default{public interface Any{}}
   public class dir    :Directory.Any,Folder.Any{} public class Directory{public interface Any{}}
                                                   public class Folder{public interface Any{}}
   public class drop   :Drop.Any,Delete.Any,Remove.Any{} public class Drop{public interface Any{}}
   public class drv    :Driver.Any, Drive.Any{} public class Driver{public interface Any{}}
                                                public class Drive{public interface Any{}}
   public class dry    :DontRepeatYourself.Any{} public class DontRepeatYourself{public interface Any{}}
   public class ds     :DataSet.Any,RowSet.Any{} public class DataSet{public interface Any{}}
   public class dst    :Destination.Any{} public class Destination{public interface Any{}}
   public class dt     :DateTime.Any{} public class DateTime{public interface Any{}}
   public class dup    :Duplicate.Any, Copy.Any{} public class Duplicate{public interface Any{}}
                                                  public class Copy{public interface Any{}}
   public class emp    :Employee.Any{} public class Employee{public interface Any{}}
   public class env    :Environment.Any{} public class Environment{public interface Any{}}
   public class err    :Error.Any,Exception.Any{} public class Error{public interface Any{}}
                                                  public class Exception{public interface Any{}}
   public class expr   :Expression.Any{} public class Expression{public interface Any{}}
   public class ext    :Extension.Any,External.Any,Exterior.Any{}
                        public class Extension{public interface Any{}}
                        public class External{public interface Any{}}
                        public class Exterior{public interface Any{}}
   public class eval   :Evaluate.Any{} public class Evaluate{public interface Any{}}
   public class fk     :ForeignKey.Any{} public class ForeignKey{public interface Any{}}
   public class fld    :Field.Any{} public class Field{public interface Any{}}
   public class flt    :Filter.Any{} public class Filter{public interface Any{}}
   public class fn     :Function.Any{} public class Function{public interface Any{}}
   public class frac   :Fractional.Any{} public class Fractional{public interface Any{}}
                                         public class Decimal{public interface Any{}}
   public class grp    :Group.Any{} public class Group{public interface Any{}}
   public class gui    :GraphicUserInterface.Any, UserInterface.Any{} public class GraphicUserInterface{public interface Any{}}
   public class inc    :Increment.Any{} public class Increment{public interface Any{}}
   public class @int   :Integer.Any,Internal.Any,Interior.Any{}
                        public class Integer{public interface Any{}}
                        public class Internal{public interface Any{}}
                        public class Interior{public interface Any{}}
   public class ix     :Index.Any{} public class Index{public interface Any{}}
   public class len    :Length.Any,Size.Any{} public class Length{public interface Any{}}
                                              public class Size{public interface Any{}}
   public class lic    :License.Any{} public class License{public interface Any{}}
   public class mgr    :Manager.Any{} public class Manager{public interface Any{}}
   public class mrg    :Merge.Any{} public class Merge{public interface Any{}}
   public class msg    :Message.Any{} public class Message{public interface Any{}}
   public class mx     :Matrix.Any{} public class Matrix{public interface Any{}}
   public class mk     :Make.Any, Create.Any{} public class Make{public interface Any{}}
   public class mv     :Move.Any, Transfer.Any{} public class Move{public interface Any{}}
                                                 public class Transfer{public interface Any{}}
   public class num    :Number.Any{} public class Number{public interface Any{}}
   public class obj    :Object.Any{} public class Object{public interface Any{}}
   public class ord    :Order.Any{} public class Order{public interface Any{}}
   public class orig   :Original.Any, Source.Any{} public class Original{public interface Any{}}
   public class pfx    :Prefix.Any{} public class Prefix{public interface Any{}}
   public class pk     :PrimaryKey.Any{} public class PrimaryKey{public interface Any{}}
   public class pkg    :Package.Any{} public class Package{public interface Any{}}
   public class pos    :Position.Any{} public class Position{public interface Any{}}
   public class prec   :Precision.Any{} public class Precision{public interface Any{}}
   public class pref   :Preference.Any, Prefer.Any{} public class Preference{public interface Any{}}
                                                     public class Prefer{public interface Any{}}
   public class prep   :Prepare.Any, Preparation.Any{} public class Prepare{public interface Any{}}
                                                       public class Preparation{public interface Any{}}
   public class prev   :Previous.Any{} public class Previous{public interface Any{}}
   public class prg    :Program.Any{} public class Program{public interface Any{}}
   public class prod   :Production.Any{} public class Production{public interface Any{}}
   public class pvt    :Private.Any{} public class Private{public interface Any{}}
   public class qry    :Query.Any{} public class Query{public interface Any{}}
   public class rcpt   :Recipient.Any{} public class Recipient{public interface Any{}}
   public class rd     :Reader.Any,Read.Any{} public class Reader{public interface Any{}}
                                              public class Read{public interface Any{}}
   public class rec    :Record.Any{} public class Record{public interface Any{}}
   public class recv   :Receive.Any{} public class Receive{public interface Any{}}
   public class rep    :Representative.Any{} public class Representative{public interface Any{}}
   public class req    :Request.Any{} public class Request{public interface Any{}}
   public class res    :Result.Any{} public class Result{public interface Any{}}
   public class ret    :Return.Any{} public class Return{public interface Any{}}
   public class rm     :Remove.Any,Delete.Any,Drop.Any{} public class Remove{public interface Any{}}
   public class rs     :RowSet.Any,DataSet.Any{} public class RowSet{public interface Any{}}
   public class rsp    :Response.Any{} public class Response{public interface Any{}}
   public class sep    :Separator.Any, Delimiter.Any{} public class Separator{public interface Any{}}
                                                       public class Delimiter{public interface Any{}}
   public class seq    :Sequence.Any{} public class Sequence{public interface Any{}}
   public class sfx    :Suffix.Any{} public class Suffix{public interface Any{}}
   public class sft    :Software.Any{} public class Software{public interface Any{}}
   public class src    :Source.Any, Original.Any{} public class Source{public interface Any{}}
   public class stg    :Staging.Any{} public class Staging{public interface Any{}}
   public class str    :String.Any{} public class String{public interface Any{}}
   public class subj   :Subject.Any{} public class Subject{public interface Any{}}
   public class tbl    :Table.Any{} public class Table{public interface Any{}}
   public class trig   :Trigger.Any{} public class Trigger{public interface Any{}}
   public class trk    :Track.Any, Tracking.Any{} public class Track{public interface Any{}}
                                                  public class Tracking{public interface Any{}}
   public class tran   :Transaction.Any{} public class Transaction{public interface Any{}}
   public class tx     :Transmission.Any{} public class Transmission{public interface Any{}}
   public class txt    :Text.Any{} public class Text{public interface Any{}}
   public class ui     :UserInterface.Any,GraphicUserInterface.Any{} public class UserInterface{public interface Any{}}
   public class usr    :User.Any{} public class User{public interface Any{}}
   public class uq     :Unique.Any{} public class Unique{public interface Any{}}
   public class val    :Value.Any{} public class Value{public interface Any{}}
   public class vec    :Vector.Any{} public class Vector{public interface Any{}}
   public class vw     :View.Any{} public class View{public interface Any{}}

   public interface AsPrefix<T>{}
   public interface AsSuffix<T>{}
}
