// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
using System;

namespace DRYLib.Core {
   public class Inside<Me, Host>
      where Me : Inside<Me, Host>
      where Host : class
   {
      public static implicit operator Me(Inside<Me,Host> s) { return (Me)s; }
      public Me me { get { return (Me)this; } }

      Host _host; public Host _ { get { return _host; } } public Me host(Host host) { _host = host; return me; }
   }
}
