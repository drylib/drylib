// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
namespace DRY.Model.ProjectPlan{
using Rel;using Abbr;

   public interface Any {}
   namespace Scope {public interface Any {} }
   namespace Cost {public interface Any: Syn<Budget.Any> {} } namespace Budget {public interface Any: Syn<Cost.Any> {} }
   namespace Schedule {public interface Any {} }
   namespace Activities {public interface Any {} }
   namespace Deliverables {public interface Any {} }
   namespace Milestones {public interface Any {} }
   namespace Resources {public interface Any {} }
}
