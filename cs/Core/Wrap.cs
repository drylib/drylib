// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
using System;

namespace DRYLib.Core{
   public class Wrap<Me,Orig>
      where Me : Wrap<Me,Orig>
      where Orig : class
   {
      public static implicit operator Me(Wrap<Me,Orig> s) { return (Me)s; }
      public Me me { get { return (Me)this; } }

      Orig _orig; public Orig orig { get { return _orig; } } public Me setOrig(Orig orig) { _orig = orig; return me; }

      public class Inside<Host>: Wrap<Me,Orig> where Host: class {
         public static implicit operator Me(Inside<Host> s) { return (Me)s; }

         Host _host; public Host _ { get { return _host; } } public Me host(Host host) { _host = host; return me; }
      }
   }
   namespace Ext {
      public static class WrapExt {
         public static Orig orig<Me,Orig>(this Wrap<Me, Orig> @this)
            where Me : Wrap<Me,Orig>
            where Orig : class
         { return @this == null ? default(Orig) : @this.orig(); }

         public static Orig orig<Me,Orig,Host>(this Wrap<Me, Orig>.Inside<Host> @this)
            where Me : Wrap<Me,Orig>.Inside<Host>
            where Orig : class
            where Host : class
         { return @this == null ? default(Orig) : @this.orig(); }

         public static Host host<Me,Orig,Host>(this Wrap<Me, Orig>.Inside<Host> @this)
            where Me : Wrap<Me,Orig>.Inside<Host>
            where Orig : class
            where Host : class
         { return @this == null ? default(Host) : @this._; }
      }
   }
}
