// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
namespace DRY.Model.Agile{
using Rel;using Abbr;

   public interface Any:
      Attitude<Empirical.Any,ProjectPlan.Any>
   {}

   namespace Empirical {public interface Any {}
      namespace InspectionAndAdjustments {
         public interface Any {}
         namespace Reprioritization {public interface Any {}}
      }
   }

   namespace Sprint {public interface Any: Syn<Iteration.Any>{}}
   namespace Iteration {public interface Any: Syn<Sprint.Any>
      ,Time.Range<Time.Weeks.Two,Time.Month.One>
      {}
      namespace DevelopFeature {public interface Any {} }
      namespace ReviewFeature {public interface Any {} }
      namespace IdentifyEnhancements {public interface Any {} }
      namespace DeliverProduct {public interface Any {} }
   }


   namespace Feature {using Base = Feature; public interface Any {}
      namespace MustHave {public interface Any: Base.Any {} }
      namespace ShouldHave {public interface Any: Base.Any {} }
      namespace NiceToHave {public interface Any: Base.Any {} }
   }

   namespace AgileIronTriangle {public interface Any:
       Primary<ProjectPlan.Cost.Any>,Primary<ProjectPlan.Scope.Any>
               ,Secondary<ProjectPlan.Schedule.Any>
    { }
   }

   namespace AgileTriangle {
      public interface Any:
                        Primary<Value.Any>
         ,Secondary<Quality.Any>,Secondary<Constraints.Any>
      {}
      namespace Value {
         /// <summary>Takes into account customer priorities, like delivering sooner but with less features may be valuable</summary>
         public interface Any {}
      }
      namespace Quality {public interface Any {} }
      namespace Constraints {public interface Any:
                                  Primary<ProjectPlan.Scope.Any>
         ,Secondary<ProjectPlan.Cost.Any> ,Secondary<ProjectPlan.Schedule.Any>
      {}}
   }

   namespace Methodology {using Base = Methodology; public interface Any{}
      namespace Scrum {
         /// <summary>Focuses on project management.</summary>
         public interface Any {}
         namespace Questions {public interface Any {}
            namespace WhatWorkHaveICompletedSinceTheLastScrumAndWhy {public interface Any {}}
            namespace WhatDoIPlanOnCompletingBetweenNowAndTheNextScrum {public interface Any {}}
            namespace DoIHaveAnyRoadblocksOrProblemsThatTeamCanHelpWith {public interface Any {}}
         }
         namespace Backlog {using Base = Backlog; public interface Any{}
            namespace Product {public interface Any: Base.Any {} }
            namespace Sprint {
               /// <summary>Once Sprint starts, no changes allowed.</summary>
               public interface Any: Base.Any {}
             }
         }

         namespace BurndownChart {using Base = BurndownChart;
            /// <summary>To track progress</summary>
            public interface Any{}
            namespace Axis{
               namespace Vertical{namespace Work{}}
               namespace Horizontal{namespace Iteration{}}
            }
         }

         namespace Disadvantages{
            namespace NotAlwaysCustomerInteraction{}
            namespace NoComprehensiveTesting{}
            namespace NoFormalCodeReviews{}
            namespace TestingIsNotAutomated{}
         }

      }

      namespace ExtremeProgramming {public interface Any: Base.Any, Syn<XP.Any>{}}
      namespace XP {
         /// <summary>Programmer centric for rapid delivery. Team sets own coding standards.</summary>
         public interface Any: Base.Any, Syn<ExtremeProgramming.Any>{}
         namespace Principle {using Base = Principle; public interface Any{}
            namespace PairProgramming {public interface Any: Base.Any{}}
            namespace SustainablePace {
               /// <summary>Work no more than 40 hours per week.</summary>
               public interface Any: Base.Any{}
            }
            namespace OngoingAutomatedTesting {
               /// <summary>Write tests even before writing code.</summary>
               public interface Any: Base.Any{}
            }
         }
         namespace Iteration {public interface Any:
            Time.Range<Time.Weeks.One,Time.Month.One>
            {}
         }

         namespace Disadvantages{
            namespace LittleSupportForVirtuallyDistributedTeams{}
            namespace SetOfRulesRatherThanMethodology{}
            namespace NoFormalCodeReviews{}
         }
      }

      namespace Lean {
         /// <summary>
         /// Guidelines to streamline development process.
         /// Can be incorporated into other agile methodologies.
         /// Used by Toyota and other manufacturers.
         /// </summary>
         public interface Any {}

         namespace Principle {using Base = Principle; public interface Any{}
            namespace EliminateWaste {
               public interface Any: Base.Any{}
               namespace Example {
                  public interface UnnecessaryDocumentation: Base.Any{}
                  public interface WaitingForOthers: Base.Any{}
               }
            }
            namespace IncorporateContinuousLearning {
               public interface Any: Base.Any{}
               namespace Example {
                  public interface FromPrevIteration: Base.Any{}
                  public interface FromOtherTeamMembers: Base.Any{}
               }
            }
            namespace DelayDecisions {
               public interface Any: Base.Any{}
               public interface ToAvoidInvalidation: Base.Any{}
            }
            namespace DeliverQuickly {
               public interface Any: Base.Any{}
               public interface PlanningSmallerReleases: Base.Any{}
               public interface MeetingExistingRatherThanAnticipatedNeeds: Base.Any{}
               public interface IdentifyingAndRemovingBottlenecksFromDevProcess: Base.Any{}
            }
            namespace EmpowerTheTeam {
               public interface Any: Base.Any{}
               public interface CannotBeImposedFromAbove: Base.Any{}
               public interface AllTeamMembersHaveAuthorizations: Base.Any{}
            }
            namespace FocusOnSystemIntegrity {
               public interface Any: Base.Any{}
               public interface SystemTestingDuringDevelopment: Base.Any{}
               public interface EncourageRefactoringAndRedesign: Base.Any{}
            }
            namespace FocusOnTheWholeSystem {
               public interface Any: Base.Any{}
               public interface OngoingTestingOnSystemLevelInAdditionToUnitLevel: Base.Any{}
            }
         }
      }
      namespace Crystal {
         /// <summary>For projects of diff size and complexity</summary>
         public interface Any {}
      }
      namespace FDD {
         /// <summary>
         /// Feature Driven Development.
         /// Each feature is planned, tracked and managed individually.
         /// Prescriptive unlike other methodologies.
         /// </summary>
         public interface Any {}
      }
      namespace TDD {
         /// <summary>Test Driven Development</summary>
         public interface Any {}
      }
      namespace DSDM {
         /// <summary>Dynamic Systems Development</summary>
         public interface Any {}

         namespace BeforeProject {}
         namespace DuringProject {
            namespace FeasibilityStudy {}
            namespace BusinessStudy {}
            namespace FunctionalModelIteration {}
            namespace DesignAndBuildIteration {}
            namespace Implementation{}
         }
         namespace AfterProjectCompletion {}
      }
      namespace ASD {
         /// <summary>Adaptive Software Development</summary>
         public interface Any {}

         namespace Phase{
            namespace Speculate{
               /// <summary>Adaptive Cycle Planning</summary>
               public interface Any {}
            }
            namespace Collaborate{
               /// <summary>Concurrent Component Engineering</summary>
               public interface Any {}
            }
            namespace Learn{
               /// <summary>Quality review from users and peers</summary>
               public interface Any {}
            }
         }
      }
      namespace UP {
         /// <summary>Unified Process</summary>
         public interface Any {}
      }
      namespace AUP {
         /// <summary>
         /// Agile Unified Process
         /// </summary>
         public interface Any: UP.Any {}

         namespace Phase {
            namespace Inception{}
            namespace Elaboration{}
            namespace Construction{}
            namespace Transition{}
         }
      }
      namespace EssUP {
         /// <summary>Essential Unified Process</summary>
         public interface Any: UP.Any {}

         namespace CapabilityMaturityModelIntegration{}
         namespace CeparationOfConcerns{
            /// <summary>Address concerns in order of priority</summary>
            public interface Any {}
         }
      }
      namespace OpenUP {
         /// <summary>Open Unified Process. Provides only fundamental content and guidance.</summary>
         public interface Any: UP.Any {}
      }
   }

   namespace AgileProjectManagementModel {
      namespace Phase {
         namespace Envisioning {
            namespace ProjectVision{}
            namespace Scope{}
            namespace Schedule{}
            namespace PickTeamMembers{}
         }
         namespace Speculating {
            namespace EstimatedIteration {}
            namespace ReleasePlans{}
            namespace FeatureBreakdown{}
            namespace DevelopRoughProjectPlan{}
            namespace ConsiderProjectRisk{}
            namespace ConsiderRiskMitigationStrategies{}
            namespace EstimateCosts{}
         }
         namespace Exploring {
            namespace TeamDesignsBuildsAndTestsFeaturesInUsefulIncrementsToTheCustomer{}
         }
         namespace Adapting {
            namespace ReactOnFeedback{}
         }
         namespace Closing {
            namespace LessonsLearnedAreRecordedForFutureUse{}
            namespace UserDocumentation{}
         }
      }
   }
   namespace Role {
      namespace ProjectLeader {}
      namespace BusinessAnalyst {}
      namespace ScrumMaster {}
      namespace ProductManager {}
   }
}
