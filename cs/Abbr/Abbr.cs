// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
namespace DRYLib.Abbr{
   public class _      :Parent.Any, AsPrefix<Private>, AsSuffix<Plural> {}
      public class Parent{public interface Any{}}
      public class Plural{public interface Any{}}
      public class Private{public interface Any{}}
   public class abbr   :Abbreviation.Any{} public class Abbreviation{public interface Any{}}
   public class acc    :Account.Any{} public class Account{public interface Any{}}
   public class biz    :Business.Any{} public class Business{public interface Any{}}
   public class calc   :Calculation.Any{} public class Calculation{public interface Any{}}
   public class cmd    :Command.Any{} public class Command{public interface Any{}}
   public class cmp    :Compare.Any{} public class Compare{public interface Any{}}
   public class col    :Column.Any{} public class Column{public interface Any{}}
   public class comm   :Communication.Any{} public class Communication{public interface Any{}}
   public class conn   :Connection.Any{} public class Connection{public interface Any{}}
   public class corp   :Corporate.Any{} public class Corporate{public interface Any{}}
   public class cr     :Create.Any{} public class Create{public interface Any{}}
   public class cx     :Context.Any{} public class Context{public interface Any{}}
   public class db     :Database.Any{} public class Database{public interface Any{}}
   public class dbg    :Debug.Any{} public class Debug{public interface Any{}}
   public class dec    :Decrement.Any{} public class Decrement{public interface Any{}}
   public class def    :Definition.Any{} public class Definition{public interface Any{}}
   public class del    :Delete.Any{} public class Delete{public interface Any{}}
   public class df     :Default.Any{} public class Default{public interface Any{}}
   public class dry    :DontRepeatYourself.Any{} public class DontRepeatYourself{public interface Any{}}
   public class ds     :DataSet.Any{} public class DataSet{public interface Any{}}
   public class dst    :Destination.Any{} public class Destination{public interface Any{}}
   public class dt     :DateTime.Any{} public class DateTime{public interface Any{}}
   public class emp    :Employee.Any{} public class Employee{public interface Any{}}
   public class err    :Error.Any{} public class Error{public interface Any{}}
   public class expr   :Expression.Any{} public class Expression{public interface Any{}}
   public class ext    :Extension.Any{} public class Extension{public interface Any{}}
   public class fld    :Field.Any{} public class Field{public interface Any{}}
   public class flt    :Filter.Any{} public class Filter{public interface Any{}}
   public class frac   :Fractional.Any{} public class Fractional{public interface Any{}}
   public class grp    :Group.Any{} public class Group{public interface Any{}}
   public class inc    :Increment.Any{} public class Increment{public interface Any{}}
   public class len    :Length.Any{} public class Length{public interface Any{}}
   public class lic    :License.Any{} public class License{public interface Any{}}
   public class msg    :Message.Any{} public class Message{public interface Any{}}
   public class mx     :Matrix.Any{} public class Matrix{public interface Any{}}
   public class num    :Number.Any{} public class Number{public interface Any{}}
   public class obj    :Object.Any{} public class Object{public interface Any{}}
   public class orig   :Original.Any{} public class Original{public interface Any{}}
   public class pfx    :Prefix.Any{} public class Prefix{public interface Any{}}
   public class pos    :Position.Any{} public class Position{public interface Any{}}
   public class prec   :Precision.Any{} public class Precision{public interface Any{}}
   public class pref   :Preference.Any{} public class Preference{public interface Any{}}
   public class prev   :Previous.Any{} public class Previous{public interface Any{}}
   public class qry    :Query.Any{} public class Query{public interface Any{}}
   public class rcpt   :Recipient.Any{} public class Recipient{public interface Any{}}
   public class rd     :Reader.Any{} public class Reader{public interface Any{}}
   public class rec    :Record.Any{} public class Record{public interface Any{}}
   public class recv   :Receive.Any{} public class Receive{public interface Any{}}
   public class rep    :Representative.Any{} public class Representative{public interface Any{}}
   public class req    :Request.Any{} public class Request{public interface Any{}}
   public class res    :Result.Any{} public class Result{public interface Any{}}
   public class ret    :Return.Any{} public class Return{public interface Any{}}
   public class rm     :Remove.Any{} public class Remove{public interface Any{}}
   public class rs     :RowSet.Any{} public class RowSet{public interface Any{}}
   public class sep    :Separator.Any, Delimiter.Any{} public class Separator{public interface Any{}}
                                                       public class Delimiter{public interface Any{}}
   public class seq    :Sequence.Any{} public class Sequence{public interface Any{}}
   public class sfx    :Suffix.Any{} public class Suffix{public interface Any{}}
   public class src    :Source.Any{} public class Source{public interface Any{}}
   public class str    :String.Any{} public class String{public interface Any{}}
   public class subj   :Subject.Any{} public class Subject{public interface Any{}}
   public class tbl    :Table.Any{} public class Table{public interface Any{}}
   public class trn    :Transaction.Any{} public class Transaction{public interface Any{}}
   public class tx     :Transmission.Any{} public class Transmission{public interface Any{}}
   public class txt    :Text.Any{} public class Text{public interface Any{}}
   public class usr    :User.Any{} public class User{public interface Any{}}
   public class uq     :Unique.Any{} public class Unique{public interface Any{}}
   public class val    :Value.Any{} public class Value{public interface Any{}}

   public interface AsPrefix<T>{}
   public interface AsSuffix<T>{}
}
