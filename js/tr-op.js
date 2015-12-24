// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
with(drylib)with(dbg)with(tr){

// a b c->a b c;a c b;b a c;b c a;c a b;c b a
// a b,c->a b,c;b,c a
// a,b c->a,b c;c a,b
// a,b c,d->a,b c,d;c,d a,b
tr.perm=function(s){
	if(s==null || !(s instanceof Object))return
	var sarr=tr.to.arr(s)
	var ret={}
	//log(tr.to.arr(s))
	arr.perm(tr.to.arr(s),function(p){
		//log(p,ret)
		tr.mix(ret,tr.from.arr.and(p))
	})
	return ret
}

// a b fits into a b c
tr.fit=function fit(x,y){
	if(x==null)return true // reached leaf or passed null or undefined (undefined==null too), anyway empty leaf fits anything
	if(x instanceof Object && !(x instanceof Array)){
		if(y instanceof Object && !(y instanceof Array))
			for(var e in x){
				if(y[e]!==undefined)
					return fit(x[e],y[e])
			}
	}
	return false
}

tr.leaf=function(s,fn){
	var ret=[]
	tr.it(s,function(src,i,e,path){
		if(!path)path=[]
		else path=path.slice()
		path.push(i)
		if(e==null){ //leaf
			ret.push(path)
			if(fn)fn(path)
			return
		}else
			return path
	})
	return ret
}


;(function(){ // use ===null instead of ==null because undefined==null
   assert(function(){return 1.1 && fit(tl('a b'),tl('a b c'))})
   assert(function(){return 1.2 && !fit(tl('a b c'),tl('a b'))})
   assert(function(){return 1.3 && fit(tl('a c,b'),tl('a b'))})
   assert(function(){return 1.4 && fit(tl('a c'),tl('a b,c'))})
   assert(function(){return 1.5 && fit(tl('a'),tl('a'))})
   assert(function(){return 1.6 && !fit(tl('a b'),tl('a'))})

   assert(function(){with({x:perm(tl('a b'))})return 2.1 && g(x,'a b')===null && g(x,'b a')===null})
   assert(function(){with({x:perm(tl('a b c'))}){return [2.2 && g(x,'a b c')===null && g(x,'a c b')===null && g(x,'b a c')===null && g(x,'b c')!==null && g(x,'c b')!==null,x]}})
   assert(function(){with({x:perm(tl('a b c'))}){return [2.3 && g(x,'a b c')===null && g(x,'b a c')===null && g(x,'b c a')===null && g(x,'a c b')===null && g(x,'c a b')===null && g(x,'c b a')===null,x]}})

   assert(function(){var x=leaf(tl('a b,d c,e')); return [3.1 && x.length==4 && x[0].length==3 && x[0][2]=='c' && x[3][2]=='e',x]})
})()

}
