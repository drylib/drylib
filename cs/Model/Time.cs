// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
namespace DRY.Model.Time{
using Rel;using Abbr;

   public interface Any{}

   public interface Range<From,To>
      where From :Time.Any
      where To :Time.Any
   {}
   namespace Weeks {public interface Any: Time.Any {}
      public interface One: Any {}
      public interface Two: Any {}
      public interface Three: Any {}
   }
   namespace Month {public interface Any: Time.Any {}
      public interface One: Any {}
      public interface Two: Any {}
   }
}
