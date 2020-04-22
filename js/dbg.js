// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let dbg = drylib.dbg = {};

dbg.off = false; // users can set dl.dbg.off=true in release mode to avoid running all unit tests at startup

dbg.eq = (fn, val)=>{
    if (dbg.assert.off || dbg.off)
        return val;
    let res;
    if (typeof fn == 'function')
        res = fn();
    else
        res = fn();
    let success = (res === val);
    let msg = '';
    if (typeof fn == 'function')
    {
        let removefn = fn.toString().match(/function.*\{\s*return(.*)\s*\}/i);
        if(removefn)
            msg = removefn[1].slice(0,-1);
        else
            msg = fn.toString();
    }
    if (!success)
    {
        if (typeof console == 'object')
        {
            console.log(dbg.logDate(), 'dbg.eq','fail', msg, res, val);
            console.assert(false, fn, res, val);
        }
        else
            alert('dbg.eq fail: ' + msg  + ' === ' + String(res) + ' !== ' + String(val) );
        if (dbg.assert.break)
            debugger;
    }
    else
        if (dbg.assert.log)
        	if (typeof console == 'object')
            	console.log(dbg.logDate(), 'dbg.eq', 'pass', msg, val);
            else
          		alert('dbg.eq pass: ' + msg + ' === ' + String(res) + ' !== ' + String(val) );
    return res;
}

dbg.assert = (fn, ...args)=>{
    if (dbg.assert.off || dbg.off)
        return [fn, ...args];
    if (typeof fn == 'string')
        fn = eval('function(){'+fn+'}');
    let res;
    if (typeof fn == 'function')
        res = fn();
    else
        res = !!fn;
    let success = res;
  	let res_args = [];
    if (res instanceof Array)
    {
        success = res[0];
      	res_args = res.slice(1);
    }
    let msg = '';
    if (typeof fn == 'function')
    {
        let removefn = fn.toString().match(/function.*\{\s*return(.*)\s*\}/i);
        if(removefn)
            msg = removefn[1].slice(0,-1);
        else
            msg = fn.toString();
    }
    let res_args_log = res_args.filter(arg=>!msg.includes(arg));
    if (!success)
    {
        if (typeof console == 'object')
        {
            console.log(dbg.logDate(), 'Fail', msg, res_args_log, args);
            console.assert(false, fn, res_args, args);
        }
        else
            alert('Fail:' + msg);
        if (dbg.assert.break)
            debugger;
    }
    else
        if (dbg.assert.log)
        	if (typeof console == 'object')
            	console.log(dbg.logDate(), 'Pass', msg, res_args_log, args);
            else
          		alert('Pass:' + msg);
    return res;
};

dbg.show = x=>{
    alert(x);
    return x;
};
                         
dbg.log = x=>{
    if (!dbg.log.off)
    {
        if (typeof console == 'object')
            console.log(dbg.logDate(),x);
        else
            dbg.show(x);
    }
    return x;
};

dbg.logDate = (x) => {
    if(!x) x = new Date()
    let opt = {hour12: false} // timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, 
    return x.toLocaleString("ko-KR", opt).slice(9,11)
      + ' ' + x.toLocaleString("en-US", opt).slice(-8)
      + '.' + x.toISOString().slice(-4,-1)
  }
  

;(()=>{
    let off = false;
    Object.defineProperty(dbg.log, 'off', {
         get: ()=> off || dbg.off,
         set: value=> off = value,
    });
})();

{// unit tests
    let assert = dbg.assert; let log = dbg.log; dbg.assert.log = true; dbg.off = true;
  
    assert(()=>1 && [true, 'assert true']);
    assert(()=>2 && [false, 'assert false']);
    assert(assert(()=>3) == 3);
    let other = 'other data';
    assert(()=>4 && [true, 'pass other data'], other);
    
    log.off = true;
    assert(()=>5 && log.off);
    log('Invisible');
    log.off = false;
    log('Visible');
    assert(()=>6 && !log.off);

    dbg.assert.log = false;
    dbg.off = false;
}})();
