// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
with(drylib)with(dbg)with(tr){

dl.tl=function(x){
   if(x==null || x instanceof Function)return x // undefined==null

   if(x instanceof Object && !(x instanceof Array)){
      var xdup=dup.shallow(x)
      for(var i in xdup){
         var tail=tl(xdup[i])
         delete x[i]     // because we are expanding expression into the same object
         mix(x,tl(i))    // different expressions within same object may overlap each other, for example tl({'a,b':'d,e','b,c':'f,g'}).b=={d,e,f}
         compose(x,tail) // 'exp1':'exp2' == '(exp1) (exp2)'
      }
      return x
   }
   
   if(x.constructor==String){

      if(x.length==0)return null // tl('')===null
      var c=x.substring(0,1)
      if(c=='`')
         return x.substring(1)

      if(c=='$'||c=='@'||c=='.')
         return x

      function and(op,x){
         var op_=x.split(op)
         if(op_.length>1){
            var ret={}
            for(var op=0;op<op_.length;op++)
               if(op==0)
                  mix(ret,tl(op_[op]))
               else
                  compose(ret,tl(op_[op]))
            return ret
         }
      }

      function or(op,x){
         var op_=x.split(op)
         if(op_.length>1){
            var ret={}
            for(var op=0;op<op_.length;op++){
               var optl=op_[op]==''?{'':null}:tl(op_[op])
               for(var i in optl)
                  ret[i]=dup(optl[i])
            }
            return ret
         }
      }

      ret=or(';',x)
      if(ret!=undefined)return ret

      var ret=and(' ',x)
      if(ret!=undefined)return ret

      ret=or(',',x)
      if(ret!=undefined)return ret

      ret=and('.',x)
      if(ret!=undefined)return ret

      var ret={}
      ret[x]=null
      return ret
   }

   return x // number,date, ...
}

;(function(){ // use ===null instead of ==null because undefined==null
   assert(function(){return 1 && tl('')===null})
   assert(function(){return 2 && tl('a').a===null})

   var t=tl({
      a:{
         b:{
            c:'t1'
         }
      }
   })
   assert(function(){return 3 && t.a.b.c.t1===null})

   t=tl({'a b':null})
   assert(function(){return 4 && t.a.b===null})
   t=tl({'a,b':'c,d'});
   assert(function(){return 5 && t.a.c===null && t.b.d===null && t.a.d===null && t.b.c===null})
   t=tl({'a,b c,d':null})
   assert(function(){return 6 && t.a.c===null && t.b.d===null})
   t=tl({'a,b c,d':'e,f g,h'})
   assert(function(){return 7 && t.a.c.e.g===null && t.b.d.f.h===null})
   t=tl({',a':null}) // {'',a}
   assert(function(){return 8 && t['']===null && t.a===null})
   t=tl({'a.b':null})
   assert(function(){return 9 && t.a.b===null})
   t=tl({'a.b,c.d':null})
   assert(function(){return 10 && t.a.b===null && t.c.d===null})
   t=tl({'a.b c.d':null})
   assert(function(){return 11 && t.a.b.c.d===null})
   t=tl({'a b;c d':null})
   assert(function(){return 12 && t.a.b===null && t.c.d===null})
   t=tl({'a b;c d,e':null})
   assert(function(){return 13 && t.c.e===null})
})()
}