// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let val = drylib.val = {};

val.compare = (a,b)=>{
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

let is = val.is = {};

is.primitive = x => false
        ||x === undefined
        ||x === null
        ||x instanceof Boolean
        ||x instanceof Number
        ||x instanceof String
        ||x instanceof Symbol
        ||x instanceof Date // have to include because (new Date()) instanceof Number == false
;

is.str = x => false
        ||x instanceof String
        ||typeof x == 'string'
;
                         
{// use ===null instead of ==null because undefined==null
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;

    assert(()=>1 && val.compare(undefined,null) == -1);
    assert(()=>2 && val.compare(undefined,NaN) == -1);
    assert(()=>3 && val.compare(null,NaN) == -1);
    assert(()=>4 && val.compare(undefined,undefined) == 0);
    assert(()=>5 && val.compare(null,null) == 0);
    assert(()=>6 && val.compare(NaN,NaN) == 0);
    assert(()=>7 && val.compare(1,2) == -1);
    assert(()=>8 && val.compare('a','b') == -1);
    assert(()=>9 && val.compare('abc','ab') == 1);
    assert(()=>10 && val.compare('','') == 0);
    assert(()=>11 && val.compare('',NaN) == 1);
    assert(()=>12 && val.is.primitive(NaN));
    assert(()=>13 && val.is.primitive(5));
    assert(()=>14 && val.is.primitive(new Number(5)));
    assert(()=>15 && val.is.primitive(new String('abc')));
    assert(()=>16 && !val.is.primitive({}));
    assert(()=>17 && !val.is.str({}));
    assert(()=>18 && val.is.str('abc') && val.is.str(new String('abc')));
}})();
