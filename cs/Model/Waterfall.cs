// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
namespace DRY.Model.Waterfall{
using Rel;using Abbr;

   public interface Any:
       Attitude<Defined.Any,ProjectPlan.Any>
      ,Prescribes<ProjectPlan.Scope.Any>
      ,Prescribes<ProjectPlan.Budget.Any>
      ,Prescribes<ProjectPlan.Schedule.Any>
   {}

   namespace Defined {public interface Any {}
      namespace InspectionAndAdjustments {
         public interface Any {}
         namespace NewFeatureIsApprovedAsNewProjectWithNewBudget {public interface Any {}}
      }
   }

   namespace Requirements {public interface Any {} }
   namespace Design {public interface Any {} }
   namespace Development {public interface Any:Syn<dev> {} }
   namespace Testing {
      public interface Any {}
      namespace Unit {public interface Any {} }
      namespace Integration {public interface Any {} }
   }
   namespace Deployment {public interface Any {} }

   namespace Weaknesses {
      public interface Any {}
      namespace FeedBackIsLate {public interface Any {} }
      namespace ErrAreIdentifiedLate {public interface Any {} }
      namespace ChangesAreCostly {public interface Any {} }
   }

   namespace TraditionalIronTriangle {public interface Any:
                        Primary<ProjectPlan.Scope.Any>
      ,Secondary<ProjectPlan.Cost.Any> ,Secondary<ProjectPlan.Schedule.Any>
   {}}

   namespace TraditionalProjectManagementModel {
      namespace Phase {
         namespace Initiating {
            namespace DefineDetailedProjectScope {}
            namespace GetSponsorApproval{}
         }
         namespace Planning {
         }
         namespace Executing {
         }
         namespace MonitoringAndControlling {
         }
         namespace Closing {
         }
      }
   }
}
