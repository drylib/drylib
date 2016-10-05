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
                         

{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;
    assert(()=>1 && arr.last([1,2,3]) == 3)
    assert(()=>2 && arr.eq([1,2,3],[1,2,3]))
    assert(()=>3 && !arr.eq([1],[2]))
    assert(()=>4 && !arr.eq([1],[]))
}
})()
