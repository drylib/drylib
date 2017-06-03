// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let arr = drylib.arr = {};

arr.last = x => x.slice(-1)[0];

arr.eq = (x,y)=>{
    let len = x.length;
    if(len != y.length)
        return false;
    for(let i=len-1; i>=0; i--)
        if(x[i] != y[i])
          return false;
    return true;
}

arr.compare = (x,y)=>{
    let i;
    for(i=0; i<x.length && i<y.length; i++)
    {
        if(x[i] < y[i])
            return -1;
        if(x[i] > y[i])
            return 1;
    }
    if(i<x.length)
        return 1;
    if(i<y.length)
        return -1;
    return 0;
}

arr.rep = function(size,filler){
    let ret = new Array(size);
    ret.fill(filler);
    return ret;
}

arr.padCutEnd = function(a,size,filler){
    let diff = n - a.length;
    if(diff <= 0)
         a.splice(n);
    else
        [].push.apply(a, arr.rep(diff,filler));
    return a;
}



{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;
    assert(()=>1 && arr.last([1,2,3]) == 3);
    assert(()=>2 && arr.eq([1,2,3],[1,2,3]));
    assert(()=>3 && !arr.eq([1],[2]));
    assert(()=>4 && !arr.eq([1],[]));
    assert(()=>5.1 && arr.compare(['abc'],['abd']) == -1);
    assert(()=>5.2 && arr.compare(['ab'],['abc']) == -1);
    assert(()=>5.3 && arr.compare(['abcd'],['abc']) == 1);
    assert(()=>5.4 && arr.compare([],[]) == 0);
}})();
