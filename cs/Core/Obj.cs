// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
using System;

namespace DRYLib.Core {
   namespace Ext {
      public static class ObjExt {
         public static bool In<T>(this T @this, params T[] args){
            return Pos(@this, args) >= 0;
         }

         public static int Pos<T>(this T @this, params T[] args){
            if(args == null) return -1;
            var i = 0;
            foreach(var arg in args)
               if(@this == null && arg == null || @this != null && @this.Equals(arg))
                  return i;
               else
                  i++;
            return -1;
         }
      }
   }
}
