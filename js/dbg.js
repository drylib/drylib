// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
with(drylib){

dl.dbg={off:false} // users can set dl.dbg.off=true in release mode to avoid running all unit tests at startup

dbg.assert=function(fn){
   if(dbg.assert.off || dbg.off)return
   if(typeof fn=='string')
      fn=eval('function(){'+fn+'}')
   var res=fn()
   var success=res
   if(res instanceof Array)success=res[0]
   if(!success){
      if(($.browser.mozilla || $.browser.safari) && typeof console=='object'){
         if(res instanceof Array)console.log('assert arg:',res[1])
         console.assert(false,fn)
      }else{
         var msg=fn.toString().replace('function(){return ','')
         msg=msg.substring(0,msg.length-1)
         alert(msg)
         debugger
      }
   }
}

dbg.log=function(x){
   if(!dbg.log.off && !dbg.off){
      if (($.browser.mozilla || $.browser.safari) && typeof console == 'object')
         console.log(x)
      else
         alert(x)
   }
   return x
}

dbg.show=function(x){
   alert(x)
   return x
}

}
