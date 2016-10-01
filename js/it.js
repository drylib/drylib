// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";
;(function(){let it = drylib.it={};

// iterate in parallel producing vector on each iteration until at least one iterator is done
it.and = function*(...streams){
    let ret = new Array(streams.length);
    while(true){
        let i = 0;
        for(let stream of streams){
            let e = stream.next();
            if(e.done)
                return;
            ret[i++] = e.value;
        }
        yield ret;
    };
}

// iterate in parallel producing vector on each iteration until all iterators are done
it.or = function*(...streams){
    let ret = new Array(streams.length);
    while(true){
        let i = 0;
        let done = true;
        for(let stream of streams){
            let e = stream.next();
            if(!e.done)
                done = false;
            ret[i++] = e.value;
        }
        if(done)
            break;
        yield ret;
    };
}

// iterate in sequence
it.seq = function*(...streams){
    for(let stream of streams)
        yield* stream;
}    

{// use ===null instead of ==null because undefined==null
    let assert = drylib.dbg.assert;
    for(let e of it.and([1,2,3,4][Symbol.iterator](),[1,4,9][Symbol.iterator]())){
        assert(()=>1 && e[0]*e[0] == e[1])
    }
    {
        let t;
        for(let e of it.or([1,2,3,4][Symbol.iterator](),[1,4,9][Symbol.iterator]())){
            if(e[1]==undefined)
                t = e[0]
        }
        assert(()=>2 && t == 4)
    }
    {
        let t=[];
        for(let e of it.seq([1,2,3,4][Symbol.iterator](),[1,4,9][Symbol.iterator]())){
            t.push(e)
        }
        assert(()=>3 && t.length == 5)
    }
}
})()
