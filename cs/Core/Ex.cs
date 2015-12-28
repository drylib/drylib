// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
using System;

namespace DRYLib.Core {
   public class Ex: Exception {
      public Ex add(object key, object val) {
         Data.Add(key, val);
         return this;
      }
   }
}
