// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
namespace DRY.Model.Conduct{
using Rel;using Abbr;using Domain=Conduct;

   public interface Any{}
   namespace Value {
      public interface Any{}
      namespace Unity {
         public interface Any: Value.Any {}
         public interface WorkCohesively:  Any
            ,With<Colleague>
            ,With<Cust>
            ,With<Partner>
            {}
         public interface Tolerance: Any {}
         public interface Understanding: Any {}
         public interface Cooperation: Any, Mutual<Colleague,Cust,Partner> {}
      }
      namespace Responsibility {
         public interface Any: Value.Any
            ,To<Country>
            ,To<Community>
            ,To<Environment>
            ,Goes<From<People>,To<People>>
         {}
      }
      namespace Excellence {
         public interface Any: Value.Any {}
         public interface HighStandard: Any {}
         public interface Quality: Domain.Quality<Goods_Svc> {}
      }
      namespace Understanding {
         public interface Any: Value.Any {}
         public interface Caring: Any, To<Colleague>, To<Cust> {}
         public interface Respect: Any, To<Colleague>, To<Cust> {}
         public interface Compassion: Any, To<Colleague>, To<Cust> {}
         public interface Humanity: Any, To<Colleague>, To<Cust> {}
         public interface Benefit: Any, To<Community> {}
      }
      namespace Integrity {
         public interface Any: Value.Any {}
         public interface Fair: Any {}
         public interface Honest: Any {}
         public interface Transparent: Any {}
         public interface PublicScrutiny: Any, Must<Domain.Any> {}
      }
   }

   public interface Goods_Svc{}

   public interface Colleague{}
   public interface Emp{}
   public interface Cust{}
   public interface Partner{}
      public interface Supplier{}
      public interface Provider{}
      public interface Distributor{}
      public interface SalesRep{}
      public interface Contractor{}
      public interface ChanPartner{}
      public interface Consultant{}
      public interface Intermediary{}
      public interface Agent{}
      public interface JointVenturePartner{}
   public interface FinStakeholder: fin{}
   public interface Gov: gov{}
   public interface GrpCompany: grp{}

   public interface Country{}
   public interface Community{}
   public interface Env{}
   public interface People{}

   public interface Quality<T>: Value.Any {}
}
