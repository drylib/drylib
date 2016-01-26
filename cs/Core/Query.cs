// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in License.cs
// You are NOT ALLOWED to modify and/or use this code without author permission
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace DRY.Core {
   public class Query<T>: Wrap<Query<T>,IQueryable<T>>, IQueryable<T> {
      public Query(IQueryable<T> s) {setOrig(s);}
      public Query(IEnumerable<T> s):this(s.AsQueryable()){}

      public Expression Expression {get {return orig.Expression;}}
      public Type ElementType {get {return orig.ElementType;}}
      public IQueryProvider Provider {get {return orig.Provider;}}
      public IEnumerator<T> GetEnumerator() {return orig.GetEnumerator();}
      IEnumerator IEnumerable.GetEnumerator() {return GetEnumerator();}
   }
}
