// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
namespace DRY.Model.BizProc{
using Rel;using Abbr;

   public interface Any:
       Has<Goal.Any>
      ,Has<Scope.Any>
      ,Has<In.Any>
      ,Has<Out.Any>
      ,Uses<Ref.Any>
      ,Has<Diagram.EPC.Fn.Activity.Any>
      ,Affects<Actor.Any>
   {}
   namespace Goal {public interface Any: Syn<Purpose> {} public interface Purpose {} }
   namespace Scope {public interface Any {} }
   namespace In {
      public interface Any: @in {}
      namespace Email {public interface Any {} }
   }
   namespace Out {
      public interface Any: @out {}
      namespace Email {public interface Any {} }
   }
   namespace Ref {public interface Any: @ref {} }
   namespace Actor {
      public interface Any: Syn<OrganizationUnit>
         ,Has<Role.Any>
      {}
      public interface OrganizationUnit {}
      namespace Role {
         public interface Any {}
      }
   }

   namespace Metric {
      /// <summary>Measures value</summary>
      public interface Any {}
   }
   namespace BPM {
      /// <summary>Business Process Modeling</summary>
      public interface Any {}
      namespace Tool {
         /// <summary>Business Process Modeling Tool</summary>
         public interface Any {}
      }
   }
   namespace Diagram {
      namespace VACD {
         /// <summary>Value Added Chain Diagram</summary>
         public interface Any {}
         public class Doc: doc {
            public string url = "http://wiki.scn.sap.com/wiki/pages/viewpage.action?pageId=156532992";
         }
      }
      namespace EPC {
         /// <summary>Event-Driven Process Chain Diagram</summary>
         public interface Any:
             Is<Flow.Any>
            ,Begins<Ev.Any>
            ,Ends<Ev.Any>
         {}

         public class Doc: doc {
            public string url = "https://en.wikipedia.org/wiki/Event-driven_process_chain";
         }

         namespace Flow {public interface Any {} }
         namespace Fn {
            public interface Any: fn, Gen<Ev.Any>, Has<In.Any>, Has<Out.Any>, Has<Actor.Role.Any> {}
            namespace Activity {public interface Any {} }
            namespace Task {public interface Any {} }
         }
         namespace Ev {public interface Any: ev, Trig<Fn.Any> {} }
         namespace AppSys {public interface Any: app, sys {} }
         namespace DocKnowledge {public interface Any: doc {} }
         namespace ProcIfc {public interface Any: proc, ifc {} }

         namespace Rule{
            public interface Any {}

            namespace Or{public interface Any {}}
            namespace Xor{public interface Any {}}
            namespace And{public interface Any {}}
         }
      }
      namespace Structural {
         public interface Any {}
         namespace Vision {public interface Any {}}
         namespace Mission {public interface Any {}}
         namespace Value {public interface Any {}}
         namespace Policy {public interface Any {}}
         namespace Sys {public interface Any {}}
         namespace Stakeholder {public interface Any {}}
         namespace ProdOrSvc {
            /// <summary>Products and Services</summary>
            public interface Any: prod, svc {}
         }
      }
   }
   namespace Approach {
      public interface Any {}
      public class TopDown {
         public string url = "http://www.ibm.com/developerworks/bpm/bpmjournal/1206_portier/1206_portier.html";
      }
   }
}
