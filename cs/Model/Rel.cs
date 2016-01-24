// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
namespace DRYLib.Model.Rel {
using Abbr;
   public interface Any<T>: rel {}

   public interface Has<T> {}
   public interface Syn<T>: syn {}
   public interface Uses<T> {}
   public interface Affects<T> {}
   public interface Trig<T>: trig {}
   public interface Gen<T>: gen {}
   public interface Is<T> {}
   public interface Begins<T> {}
   public interface Ends<T> {}
}
