// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";
;(function(){let it = drylib.it = {};

it.iterator = x =>{ // returns iterator from iterable or iterator
    // safe to get iterator from iterator because it will return itself
    return x[Symbol.iterator]();
}

it.size = s =>{
    let size = 0
    for(let e of s) size++
    return size
}

it.it_ = it_ =>{ // returns array of iterators from array of iterables or iterators
    return it_.map(x => it.iterator(x));
}
             
it.and = function*(it_){ // it_ are iterables or iterators
    // iterate in parallel producing vector of current elements on each iteration until at least one iterator is done
    it_ = it.it_(it_); // getting rid of iterables, keeping only iterators
    let ret = new Array(it_.length);
    while (true){
        let i = 0;
        for (let stream of it_){
            let e = stream.next();
            if (e.done)
                return;
            ret[i++] = e.value;
        }
        yield ret;
    };
}

it.or = function*(it_){ // it_ are iterables or iterators
    // iterate in parallel producing vector of current elements on each iteration until all iterators are done
    // for those iterators that are done sooner it will return undefined vector elements 
    it_ = it.it_(it_); // getting rid of iterables, keeping only iterators
    let ret = new Array(it_.length);
    while (true){
        let i = 0;
        let done = true;
        for (let stream of it_){
            let e = stream.next();
            if (!e.done)
                done = false;
            ret[i++] = e.value;
        }
        if(done)
            break;
        yield ret;
    };
}

it.seq = function*(it_){ // it_ are iterables or iterators
    // concatenate sequences
    for (let stream of it.it_(it_))
        yield* stream;
}

let flat = it.flat = function*(stream){
    stream = it.iterator(stream);
    while (true){
        let e = stream.next();
        if (e.done)
            return;
        let val = e.value;
        if (!val)
            yield val;
        else {
            let substream = val[Symbol.iterator];
            if (!substream)
                yield val;
            else
                yield* flat(substream.call(val));
        }
    }
}

if(!drylib.val)
    drylib.val = {};
if(!drylib.val.compare)
    drylib.val.compare = (a,b)=>new String(a).localeCompare(b);

it.compare = (a,b,comparer)=>{
    a = it.iterator(a); // a,b are iterables or iterators
    b = it.iterator(b);
    comparer = comparer || drylib.val.compare ;
    let ix = 0;
    // compare 2 sequences
    for (let pair of it.or([a,b])){
        let val = comparer(pair[0],pair[1]);
        if(val != 0)
            return {val: val, ix: ix, pair:pair};
        ix++;
    }
    return {val: 0};
}


it.rev = function*(stream){// reverse stream or array
    yield* Array.from(stream).reverse();
}

it.spy = function*(stream, fn){// spy on stream
    for(let e of it.iterator(stream))
    {
        fn(e);
        yield e;
    }
}

it.tee = function(src, dst_){// dup incoming stream into multiple outgoing streams
    for(let e of it.iterator(src))
        for(let dst of dst_)
            dst.next(e);
    for(let dst of dst_)
        dst.return(); // causes dst generator to yield {value=undefined, done=true}
}

it.collect = function*(src_){// collect incoming streams into outgoing stream
    src_ = Array.from(src_, x => it.iterator(x));
    let done = false;
    while(!done){
        done = true;
        for(let src of src_)
        {
            let ret = src.next();
            if(!ret.done)
            {
                done = false;
                yield ret.value;
            }
        }
    }
}

it.rep = function*(n){
    for(let i = 0; i < n; i++)
        yield i;
}


it.padEnd = function*(src,n){
    let i = 0;
    for(let item of src){
        yield item;
        i++;
    }
    while(i++ < n)
        yield undefined;
}


{ // unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;
    {
        let t = [];
        for (let e of it.iterator([1,2,3,4]))
            t.push(e)
        assert(()=>1 && t.length == 4)
    }
    for (let e of it.and([[1,2,3,4],[1,4,9]])){
        assert(()=>2.1 && e[0]*e[0] == e[1])
    }
    {
        let t;
        for(let e of it.or([[1,2,3,4],[1,4,9]])){
            if(e[1]==undefined)
                t = e[0];
        }
        assert(()=>2.2 && t == 4);
    }
    {
        let t=[];
        for(let e of it.seq([[1,2,3,4],[5,6,7]])){
            t.push(e);
        }
        assert(()=>3 && t.length == 7);
    }

    assert(()=>4.1 && it.compare([1,2,3,4],[1,2,3,4]).val == 0);
    assert(()=>4.2 && it.compare([1,2,3,4],[1,2,2,4]).val == 1);
    assert(()=>4.3 && it.compare([1,2,3],[1,2,3,4]).val == -1);
    assert(()=>4.4 && it.compare([undefined],[null]).val == -1);
    assert(()=>4.5 && it.compare([undefined,NaN],[undefined]).val == 1);
    assert(()=>4.6 && it.compare([undefined,NaN,null],[undefined,NaN,NaN]).val == -1);
    assert(()=>4.7 && it.compare([null],['abc']).val == -1);
    assert(()=>4.8 && it.compare(['abc','d',undefined],['abc','e']).val == -1);
    
    assert(()=>5 && it.compare(it.flat([1,[2,3],4,[],[5],[],[6]]),[1,2,3,4,5,6]).val == 0);

    for(let e of it.or([
        it.flat([1,[2,3],4,[],[5],[],[6]])
       ,[1,2,3,4,5,6]
    ])){
        assert(()=>6 && e[0] === e[1]);
    }
    { // getting iterator from array iterator returns itself  
        let a = [1,2,3];
        let t = a[Symbol.iterator]();
        assert(()=>7.1 && t[Symbol.iterator]() == t);
        assert(()=>7.2 && t[Symbol.iterator]()[Symbol.iterator]() == t);
    }

    assert(()=>8 && it.compare(it.rev([1,2,3]),[3,2,1]).val == 0);

    assert(()=>9 && it.size([1,2,3]) == 3);
}
})()
