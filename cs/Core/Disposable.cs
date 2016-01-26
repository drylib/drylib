// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
using System;

namespace DRY.Core{
   public class Disposable<Me,Orig>: IDisposable
      where Me : Disposable<Me,Orig>
      where Orig : class, IDisposable
   {
      public static implicit operator Me(Disposable<Me,Orig> s) { return (Me)s; }
      public Me me { get { return (Me)this; } }

      Orig _orig; public Orig orig { get { return _orig; } } public Me setOrig(Orig orig) { _orig = orig; return me; }

      public virtual void Dispose() {
         if(_orig != null)
            _orig.Dispose();
      }

      public class Inside<Host>: Disposable<Me,Orig> where Host: class, IDisposable {
         public static implicit operator Me(Inside<Host> s) { return (Me)s; }

         Host _host; public Host _ { get { return _host; } } public Me setHost(Host host) { _host = host; return me; }

         override public void Dispose() {
            if(_host != null)
               _host.Dispose();
            base.Dispose();
         }
      }

   }
   namespace Ext {
      public static class DisposableExt {
         public static Orig orig<Me,Orig>(this Disposable<Me, Orig> @this)
            where Me : Disposable<Me,Orig>
            where Orig : class, IDisposable
         { return @this == null ? default(Orig) : @this.orig(); }

         public static Orig orig<Me,Orig,Host>(this Disposable<Me, Orig>.Inside<Host> @this)
            where Me : Disposable<Me,Orig>.Inside<Host>
            where Orig : class, IDisposable
            where Host : class, IDisposable
         { return @this == null ? default(Orig) : @this.orig(); }

         public static Host host<Me,Orig,Host>(this Disposable<Me, Orig>.Inside<Host> @this)
            where Me : Disposable<Me,Orig>.Inside<Host>
            where Orig : class, IDisposable
            where Host : class, IDisposable
         { return @this == null ? default(Host) : @this._; }
      }
   }
}
