// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
using System;

namespace DRY.Core {
   public class Err: Exception, Abbr.err{
      public Err add(object key, object val){
         Data.Add(key, val);
         return this;
      }
   }
}
