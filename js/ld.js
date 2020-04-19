// Copyright (c) 2020 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){ let ld = drylib.ld = {};
let dbg = drylib.dbg; let log = drylib.log; let err = drylib.err; // including diagnostics
let it = drylib.it;let str = drylib.str;

let safekey = (key) => key.replace('/-/', '/--/');

ld.map = (mapkey)=>{
    let map = {k: mapkey, d:{}}
    map.set = (k,val)=>{return ld.set(map,k,val)}
    map.get = (k)=>{return ld.get(map,k)}
    map.del = (k)=>{return ld.del(map,k)}
    map[Symbol.iterator] = function*(){yield* ld.it(map)}
    map.clear = ()=>{return ld.clear(map)}
    map.size = ()=>{return it.size(map)}
    return map
};

let savek_ = map => {
    let k_ = []
    for(let k in map.d) k_.push(k)
    localStorage.setItem(safekey(map.k), str.json(k_))
}

ld.set = (map,key,val)=>{
    if(map.d[key] !== val){
        map.d[key] = val
        localStorage.setItem(safekey(map.k) + '/-/' + safekey(key), str.json(val))
        savek_(map)
    }
    return val
};

ld.get = (map,key)=>{
    let ret = map.d[key]
    if(!ret) {
        let val = localStorage.getItem(safekey(map.k) + '/-/' + safekey(key))
        if (val) ret = map.d[key] = JSON.parse(val)
    }
    return ret
};

ld.del = (map,key)=>{
    let ret = ld.get(map,key)
    delete map.d[key]
    localStorage.removeItem(safekey(map.k) + '/-/' + safekey(key))
    savek_(map)
    return ret
};


ld.it = function*(map){
    let k_ = localStorage.getItem(safekey(map.k))
    if(!k_) return
    k_ = JSON.parse(k_)
    for(let k of k_)
        yield {k:k,v:ld.get(map,k)}
};

ld.clear = (map)=>{
    for(let e of map)
        map.del(e.k)
    localStorage.removeItem(safekey(map.k))
    return map
};


{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;

    let m = ld.map('test')
    assert(()=>  1.1 && m.k == 'test')
    
    assert(()=>  2.1 && m.set('a',1) === 1)
    assert(()=>  2.2 && m.set('b','1') === '1')
    assert(()=>  2.3 && m.set('c',{a:1}) .a === 1)

    assert(()=>  3.1 && m.get('a') === 1)
    assert(()=>  3.2 && m.get('b') === '1')
    assert(()=>  3.3 && m.get('c').a === 1)

    assert(()=>  4.1 && it.size(m) === 3)
        
    assert(()=>  5.1 && m.del('a') === 1)
    assert(()=>  5.2 && m.get('a') === undefined)
    assert(()=>  5.3 && m.del('a') === undefined)
    //console.log(it.size(m))
    assert(()=>  5.4 && it.size(m) === 2)

    //console.log(drylib.str.json(Array.from(m)))
    assert(()=>  5.5 && drylib.str.json(Array.from(m)) === '[{k:"b",v:"1"},{k:"c",v:{a:1}}]')

    assert(()=>  5.4 && m.clear().size() === 0)
    m.clear()

    if(drylib.dbg.test){
        let m2 = ld.map('test2')
        if(!m2.get('init')){
            m2.set('init',true)
            location.reload()
        }else{
            assert(()=>  6.1 && m2.get('init') === true)
            m2.clear()
        }
    }
}})();
