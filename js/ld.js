// Copyright (c) 2020 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){ let ld = drylib.ld = {};
let dbg = drylib.dbg; let log = drylib.log; let err = drylib.err; // including diagnostics
let it = drylib.it;let str = drylib.str;

let safekey = (key) => key.replace('/-/', '/--/');


ld.map = (mapkey,save,load)=>{ // save converts to serializable format, load - to deserialized format
    if(!save)save = v=>v;
    if(!load)load = v=>v;
    let map = {k: mapkey}
    let d = {}

    let savek_ = () => {
        let k_ = []
        for(let k in d) k_.push(k)
        localStorage.setItem(safekey(map.k), JSON.stringify(k_))
    }
    
    map.set = (k,val)=>{
        d[k] = val
        localStorage.setItem(safekey(map.k) + '/-/' + safekey(k), JSON.stringify(save(val)))
        savek_(map)
        return val
    };        

    map.get = (k)=>{
        let ret = d[k]
        if(!ret) {
            let val = localStorage.getItem(safekey(map.k) + '/-/' + safekey(k))
            if (val){
                try{val = JSON.parse(val)}catch(e){dbg.log(['ld','Failed to parse', map.k, k, val])}
                ret = load(val)
                d[k] = ret
            }
        }
        return ret
    };

    map.del = (k)=>{
        let ret = map.get(k)
        delete d[k]
        localStorage.removeItem(safekey(map.k) + '/-/' + safekey(k))
        savek_(map)
        return ret
    };

    map[Symbol.iterator] = function*(){
        let k_ = localStorage.getItem(safekey(map.k))
        if(!k_) return
        k_ = JSON.parse(k_)
        for(let k of k_)
            yield {k:k,v:map.get(k)}
    };

    map.clear = ()=>{
        for(let e of map)
            map.del(e.k)
        localStorage.removeItem(safekey(map.k))
        return map
    };

    map.size = ()=>{return it.size(map)}

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
    assert(()=>  5.5 && drylib.str.jsonView(Array.from(m)) === '[{k:"b",v:"1"},{k:"c",v:{a:1}}]')

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
