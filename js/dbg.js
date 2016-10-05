// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let dbg = drylib.dbg = {};

dbg.off = false; // users can set dl.dbg.off=true in release mode to avoid running all unit tests at startup

dbg.assert = function(fn){
    if (dbg.assert.off || dbg.off)
        return;
    if (typeof fn == 'string')
        fn = eval('function(){'+fn+'}');
    var res = fn();
    var success = res;
  	var res_args;
    if (res instanceof Array)
    {
        success = res[0];
      	res_args = res.slice(1);
    }
    let msg = fn.toString().match(/function.*\{\s*return(.*)\s*\}/i)[1];
    msg = msg.substring(0, msg.length-1);
    if (!success)
    {
        if(typeof console == 'object')
            console.assert(false, fn, res_args);
        else
          	alert(msg);
        if (dbg.assert.break)
            debugger;
    }
    else
        if (dbg.assert.log)
        	if(typeof console == 'object')
            	console.log('Pass', msg, res_args)
            else
          		alert('Pass:' + msg);
}

dbg.show = (x)=>{
    alert(x);
    return x;
}
                         
dbg.log = function(x){
    if(!dbg.log.off && !dbg.off){
        if (typeof console == 'object')
            console.log(x);
        else
            dbg.show(x);
    }
    return x
}


{// use ===null instead of ==null because undefined==null
    let assert = dbg.assert; dbg.assert.log = true;
  
    assert(()=>1 && [true, 'assert true test'])
    assert(()=>2 && [false, 'assert false test'])
    
    dbg.assert.log = false;
}
})()
