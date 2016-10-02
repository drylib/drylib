// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let val = drylib.val = {};

val.comparer = (a,b)=>{
    if (a === b || Number.isNaN(a) && Number.isNaN(b))
        return 0;
    if (a === undefined)
        return -1; // undefined is less than everything
    if (b === undefined)
        return 1; // undefined is less than everything
    if (a === null)
        return -1; // null is less than everything except undefined
    if (b === null)
        return 1; // null is less than everything except undefined
    if (Number.isNaN(a)) // Number.isNaN('abc') == false != isNan('abc')
        return -1; // NaN is less than everything except undefined and null
    if (Number.isNaN(b))
        return 1; // NaN is less than everything except undefined and null
    if (a < b)
        return -1
    else
        return 1;
}

{// use ===null instead of ==null because undefined==null
    let assert = drylib.dbg.assert;

    assert(()=>1 && val.comparer(undefined,null) == -1)
    assert(()=>2 && val.comparer(undefined,NaN) == -1)
    assert(()=>3 && val.comparer(null,NaN) == -1)
    assert(()=>4 && val.comparer(undefined,undefined) == 0)
    assert(()=>5 && val.comparer(null,null) == 0)
    assert(()=>6 && val.comparer(NaN,NaN) == 0)
    assert(()=>7 && val.comparer(1,2) == -1)
    assert(()=>8 && val.comparer('a','b') == -1)
    assert(()=>9 && val.comparer('abc','ab') == 1)
    assert(()=>10 && val.comparer('','') == 0)
    assert(()=>11 && val.comparer('',NaN) == 1)
}
})()
