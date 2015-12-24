// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
with(drylib)with(dbg){

dl.tr={};with(tr){

tr.compose=function(d,s){ // attaches s to all leaves of d
	if(!(d instanceof Object) || d instanceof Array)return
   for(var i in d){
      if(d[i]==null) // leaf    // typeof d[i]!='object'
         d[i]=dup(s)
      else
         compose(d[i],s)
   }
}

tr.mix=function(dst,src,fn){ // merge src into dst overwriting collisions
   if(src==null || typeof src!='object' || src.ownerDocument==document || src.documentElement)return src
   if(src.constructor==Array){
      if(dst==null || typeof dst=='undefined' || dst.constructor!=Array)
         dst=[]
	   for(var i=0;i<src.length;i++)
		   dst.push(dup(src[i]))
   }else
      if(dst==null || typeof dst=='undefined')
         dst={}
	   for(var i in src)if(i!='$sys'){ // system property that should not participate in mixing
		   var e=src[i]
         if(fn)
            fn(dst,i,e)
		   if(typeof e=='object'){
		      dst[i]=mix(dst[i],e) // takes care of empty dst[i]
		   }
		   else
			   dst[i]=e
	   }

   return dst
}

tr.dup=function(x){  // does not protect against cycles
	if(x==null || typeof x!='object' || x.ownerDocument==document || x.documentElement)return x
	var ret={}
	if(x.constructor==Array){
		ret=[]
		for(var i=0;i<x.length;i++)
			ret.push(dup(x[i]))
	}else{
		for(var i in x)if(i!='$sys'){ // system property that should not participate in dup
			ret[i]=dup(x[i])
		}
	}
	return ret
}

tr.dup.shallow=function(x){
	if(typeof x!='object')return x
	var ret={}
	if(x.constructor==Array){
		ret=[]
		for(var i=0;i<x.length;i++)
			ret.push(x[i])
	}else{
		for(var i in x)if(i!='$sys')
			ret[i]=x[i]
	}
	return ret
}

tr.it=function(src,fn,lvl,safe,dst){ // iterates through tree invoking function for every node, if safe=true it will allow to modify tree inside function
	if(lvl==null)lvl=0 // levels start from 0 like arrays
	if(src==null || !(src instanceof Object))return
   var srcIt=src
	if(safe)srcIt=dup.shallow(src)
	for(var i in srcIt){
		var e=srcIt[i]
		//if(!fn && $.browser.mozilla)yield [i,e,lvl] else
		it(e,fn,lvl+1,safe,fn(src,i,e,dst,lvl)) 
	}
}

tr.to={}
tr.to.arr=function(s){
	var ret=[]
	tr.it(s,function(src,i,e,dst,lvl){
		ret.push(i)
	})
	return ret
}

tr.from={}
tr.from.arr={}
tr.from.arr.or=function(s){
	var ret={}
	for(var i in s){
		ret[s[i]]=null
	}
	return ret
}

tr.from.arr.and=function(s){
	var ret={}
	var cur=ret;
	var prev=cur
	var e
	for(var i in s){
		e=s[i]
		prev=cur
		cur=cur[e]={}
	}
	prev[e]=null
	return ret
}

tr.replace=function(x,map){ // just like string.replace, but from map tl('what with;what with')
	for(var what in map)
		for(var With in map[what])
			x=x.replace(what,With)
	return x;
}


;(function(){// use ===null instead of ==null because undefined==null
	var t={a:{b:{c:'t1'}}}
	var t2=dup(t)
	assert(function(){return 1 && t2.a.b.c=='t1'})
	assert(function(){return 2 && dup([1,2,3])[2]==3})

	mix(t,{a:{b:{d:'t2'}}})
	assert(function(){return 3 && t.a.b.d=='t2'})
	assert(function(){return 4 && from.arr.and(['a','b','c']).a.b.c==null})
	assert(function(){var r=from.arr.or(['a','b','c']); return 5 && r.a==null && r.b==null && r.c==null})
	assert(function(){var r=[];var ri=0; it({a:{b:{c:null}}},function(src,i){r[ri++]=i}); return 6 && r[0]=='a' && r[1]=='b' && r[2]=='c'})
	assert(function(){var r=to.arr({a:{b:{c:null}}}); return 7 && r[0]=='a' && r[1]=='b' && r[2]=='c'})
   
})()

}}