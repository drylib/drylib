// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
namespace DRY.Model.Rel {
using Abbr;
using Domain = Rel;
   public interface Any: rel {}
   public interface Any<T>: Any {}

   public interface Is<T>: Any<T> {}
   public interface Has<T>: Any<T> {}
   public interface With<T>: Any<T> {}
   public interface Of: Any {} public interface Of<T>: Of, Any<T> {}
   public interface From: Any {} public interface From<T>: From, Any<T> {}
   public interface To: Any {} public interface To<T>: To, Any<T> {}
   public interface Mutual<T1,T2> {}
   public interface Mutual<T1,T2,T3> {}
   public interface Mutual<T1,T2,T3,T4> {}

   public interface Syn<T>: Any<T>, syn {}

   public interface Uses<T>: Any<T> {}
   public interface Affects<T>: Any<T> {}
   public interface Trig<T>: Any<T>, trig {}
   public interface Gen<T>: Any<T>, gen {}
   public interface Begins<T>: Any<T> {}
   public interface Ends<T>: Any<T> {}

   public interface Goes<From,To>: Any where From: Domain.From where To: Domain.To {}
   public interface Must<T>: Any<T> {}

   public interface Attitude<Which,Towards>: Any {}
   public interface Prescribes<T>: Any {}

   public interface Primary<T>: Any {}
   public interface Secondary<T>: Any {}
}
