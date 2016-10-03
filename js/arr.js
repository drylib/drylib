// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let arr = drylib.arr = {};

arr.last = x => x.slice(-1)[0];


{// use ===null instead of ==null because undefined==null
    let assert = drylib.dbg.assert;
    assert(()=>1 && arr.last([1,2,3]) == 3)
}
})()
