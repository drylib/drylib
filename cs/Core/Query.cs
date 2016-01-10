using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace DRYLib.Core {
   public class Query<T>: IQueryable<T> {
      protected IQueryable<T> orig;

      public Query(IQueryable<T> s) {this.orig = s;}
      public Query(IEnumerable<T> s):this(s.AsQueryable()){}

      public Expression Expression {get {return orig.Expression;}}
      public Type ElementType {get {return orig.ElementType;}}
      public IQueryProvider Provider {get {return orig.Provider;}}
      public IEnumerator<T> GetEnumerator() {return orig.GetEnumerator();}
      IEnumerator IEnumerable.GetEnumerator() {return GetEnumerator();}
   }
}
