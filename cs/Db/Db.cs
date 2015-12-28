// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
using System;
using System.Data;
using System.Data.SqlClient;
using DRYLib.Core;
using DRYLib.Core.Ext;
using System.Collections.Generic;
using System.Collections;

namespace DRYLib.Db {
   public class Conn: Disposable<Conn, SqlConnection> {
      public static implicit operator bool(Conn s) { return s.orig() != null && s.orig().State != ConnectionState.Open; }
      public Conn open() {
         if(orig.State == ConnectionState.Closed)
            orig.Open();
         if(orig.State != ConnectionState.Open)
            throw new Ex.NotOpen().add("State",orig.State);
         return this;
      }
      public class Ex: Core.Ex {
         public class NotOpen: Ex { }
      }

      public Cmd cmd(string txt) { return new Cmd().setHost(this).txt(txt); }
      public class Cmd: Disposable<Cmd,SqlCommand>.Inside<Conn> {
         string _txt; public string txt() { return _txt; } public Cmd txt(string txt) { _txt = txt; return this; }

         public Reader read { get { return new Reader().setHost(this).setOrig(this.orig.ExecuteReader()); } }
         public class Reader: Disposable<Reader, SqlDataReader>.Inside<Cmd>, IEnumerable<IDataRecord> {
            IEnumerator IEnumerable.GetEnumerator() {return ((IEnumerable<IDataRecord>)this).GetEnumerator();}

            IEnumerator<IDataRecord> IEnumerable<IDataRecord>.GetEnumerator() {
               while(orig.Read()) {
                  yield return orig;
               }
            }
         }
      }
   }
}
