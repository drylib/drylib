// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
with(drylib)with(dbg)with(tr){

dl.g=function(x,path){ // get node by path
   return g0(x,tl(path))

	function g0(x,path){
		if(!path)return x
		var ret
		for(var i in path){
			if(x==i)return true // return true for leaf only if leaf value matched
			if(x[i] || x[i]===null) // return null instead of true
				ret=g0(x[i],path[i])
			if(typeof ret!='undefined')
				return ret
		}
	}
}

;(function(){
   assert(function(){return 1 && g(null,'')==null})
   assert(function(){return 2 && g({x:1},'x')==1})

   var t={
	   a:{
		   b:{
            c:'t1'
			,d:null
		   }
	   }
   }
   assert(function(){return 3 && g(t,'a b c')=='t1'})
   assert(function(){return 4 && g(t,'a b c t1')})
   assert(function(){return 5 && g(t,'a b d')===null})
   assert(function(){return 6 && g(t,'a b zz')!==null})
   assert(function(){return 7 && g(t,'z,a b c')=='t1'})
})()

$(function(){
	dl.body=$('body')
})

}