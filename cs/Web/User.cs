using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Web;
using System.Web.Mvc;
//using System.Web.Mvc.Ajax;
using DRY.Core;

namespace DRY.Web{
   public class Hit{
      public Guid Id { get; set; }
      public Guid UserId { get; set; }
      public string Url { get; set; }
      public DateTime Date { get; set; }
   }

   public class User{
      public Guid Id { get; set; }
      public string FirstName { get; set; }
      public string LastName { get; set; }

      public class Hit {
         public User user;
         public Web.Hit hit;
      }

      public Hits hits(IQueryable<Web.Hit> s){return new Hits(this, s);}
      public class Hits: Query<Hit> {
         public User user;
         public Hits(User user, IEnumerable<Web.Hit> hits):base(
            from hit in hits select new Hit {user = user, hit = hit}
         ){this.user = user;}
      }
   }

   public class Users: Query<User>{
      public Users(IEnumerable<User> s):base(s){}

      public Hits hits(IQueryable<Web.Hit> s){return new Hits(this, s);}
      public class Hits: Query<User.Hits> {
         public Hits(Users users, IQueryable<Web.Hit> hits):base(
            from hit in hits
            join user in users on hit.UserId equals user.Id
            group hit by user into byUser
            select byUser.Key.hits(byUser.AsQueryable())
         ){}

         public LastHit lastHit(){return new LastHit(this);}
         public class LastHit: Query<User.Hit> {
            public LastHit(Hits s):base(
               from user in s
               from hit in user
               orderby hit.hit.Date descending
               group hit by user into hits
               from hit in hits
               select new User.Hit{user = hit.user, hit = hits.First().hit}
            ){}
         }
      }
   }

   public class Controller: System.Web.Mvc.Controller {
      private IQueryable<User> users = null; IQueryable<Hit> hits = null;
      public ActionResult LastHitsByUser(){
         var usersHits = new Users(users).hits(hits);
         return new JsonResult {Data =
            from user in usersHits
            from hit in user
            select new {User = user.user.Id, LastHit = usersHits.lastHit()}
         };
      }
      public ActionResult LastVisitedYesterday(){
         var yesterday = DateTime.Today.AddDays(-1);
         var usersHits = new Users(users).hits(hits.Where(e => e.Date.Date == yesterday)).lastHit();
         return new JsonResult {Data =
            from user in usersHits
            select new {user = user.user.Id, LastHit = usersHits.First()}
         };
      }

      public ActionResult MostVisitedPages(){
         return new JsonResult {Data =
            from hit in hits
            group hit by hit.Url into urls
            orderby urls.Count() descending
            select urls.Key
         };
      }
      public ActionResult Top10MostActiveUsers(){
         var usersHits = new Users(users).hits(hits);
         return new JsonResult {Data =
            (
               from user in usersHits
               orderby user.Count() descending
               select user
            ).Take(10)
         };
      }
   }

   public static class Ext{
   }
}
