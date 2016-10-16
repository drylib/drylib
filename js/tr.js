// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let val = drylib.val;

let tr = drylib.tr = ()=>{ 
    // create new tree based on Map rather than object properties
    // advantage is: order of enumeration is the same as order of addition
    // TODO: option to use together with nav.proxy to avoid auto addition on get
    let list;
    let map;
    let node = new Proxy({}, {
        get: (target, name)=>{ // auto add missing elements on get
            if (!map)
                map = new Map(1);
            let ret = map.get(name);
            if (ret === undefined) // could use map.has(name), but it will mean double seek
            {
                ret = tr();
                map.set(name, ret);
                if (!list)
                    list = [ret];
                else
                    list.push(ret);
            }
            return ret;
        },
        set: (target, name, value, receiver)=>{ // just forward to map
            if (!map)
                map = new Map(1);
            let size = map.size; // to detect addition
            map.set(name, value)
            if(map.size > size) // added, so adding to list too
                if (!list)
                    list = [ret];
                else
                    list.push(ret);
            return true;
        },
        [Symbol.iterator]: function*(){
            if (!map)
                return;
            yield* list[Symbol.iterator]();
        },
    });
    
    node.add = x=>{ // add anonymous element
        if (!list)
            list = [x];
        else
            list.push(x);
    };
    return node;
}   
                         
tr.compose = (d,s)=>{ // attaches s to all leaves of d
   if (!(d instanceof Array) && val.is.sys(d))
       return;
   for (var i in d)
   {
      if(d[i]==null) // leaf    // typeof d[i]!='object'
         d[i]=dup(s);
      else
         tr.compose(d[i],s);
   }
}

tr.mix = (dst,src,fn)=>{ // merge src into dst overwriting collisions
    if (src==null || typeof src!='object' || src.ownerDocument==document || src.documentElement)
        return src;
    if (src instanceof Array)
    {
        if (dst==null || typeof dst=='undefined' || !(dst instanceof Array))
            dst=[];
        for (let i=0; i<src.length; i++)
            dst.push(dup(src[i]));
    }
    else
        if (dst==null || typeof dst=='undefined')
            dst = {};
        for (let i in src)
            if (i!='$sys') // $ indicates system property that should not participate in mixing
            { 
                let e = src[i];
                if (fn)
                    fn(dst,i,e);
                if (!val.is.sys(e))
                    dst[i] = mix(dst[i],e); // takes care of empty dst[i]
                else
                    dst[i] = e;
            }

   return dst;
}

tr.dup = x =>{ // duplicate tree
    // does not protect against cycles
    if (x==null || typeof x!='object' || val.is.sys(x) || x.ownerDocument==document || x.documentElement)
        return x;
    var ret = {};
    if (x instanceof Array)
    {
        ret = [];
        for (var i=0; i<x.length; i++)
            ret.push(tr.dup(x[i]));
    }
    else
        for (var i in x)
            if (i!='$sys') // $ indicates system property that should not participate in dup
                ret[i] = tr.dup(x[i]);
    return ret;
}

tr.dup.shallow = x =>{
    if (val.is.sys(x))
        return x;
    let ret = {};
    if (x instanceof Array)
    {
        ret = [];
        for (let i=0; i<x.length; i++)
            ret.push(x[i]);
    }
    else
        for (let i in x)
            if(i!='$sys')
                ret[i] = x[i];
    return ret
}

tr.it = (src,fn,lvl,safe,dst)=>{ // iterates through tree invoking function for every node, if safe=true it will allow to modify tree inside function
    if (lvl==null)
        lvl=0; // levels start from 0 like arrays
    if (src==null || !(src instanceof Object))
        return;
    let srcIt = src;
    if (safe)
        srcIt=dup.shallow(src);
    for (var i in srcIt)
    {
        let e = srcIt[i];
        it(e, fn, lvl+1, safe, fn(src,i,e,dst,lvl));
    }
}

tr.to = {};
tr.to.arr = s =>{
    let ret = [];
    tr.it(s, (src,i,e,dst,lvl)=>{
        ret.push(i);
    });
    return ret;
}

tr.from = {};
tr.from.arr = {};
tr.from.arr.or = s =>{
    let ret = {};
    for(let i in s)
        ret[s[i]] = null;
    return ret;
}

tr.from.arr.and = s =>{
    var ret = {};
    var cur = ret;
    var prev = cur;
    var e;
    for(let i in s){
        e = s[i];
        prev = cur;
        cur = cur[e] = {};
    }
    prev[e] = null;
    return ret;
}

tr.replace = (x,map)=>{ // just like string.replace, but from map tl('what with;what with')
    for(let what in map)
        for(let With in map[what])
            x = x.replace(what,With);
    return x;
}


{ // unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;
    var t = {a:{b:{c:'t1'}}};
    var t2 = dup(t);
    assert(()=> 1 && t2.a.b.c=='t1');
    assert(()=> 2 && dup([1,2,3])[2]==3);

    mix(t,{a:{b:{d:'t2'}}});
    assert(()=> 3 && t.a.b.d=='t2');
    assert(()=> 4 && from.arr.and(['a','b','c']).a.b.c==null);
    assert(()=>{var r=from.arr.or(['a','b','c']); return 5 && r.a==null && r.b==null && r.c==null});
    assert(()=>{var r=[];var ri=0; it({a:{b:{c:null}}},function(src,i){r[ri++]=i}); return 6 && r[0]=='a' && r[1]=='b' && r[2]=='c'});
    assert(()=>{var r=to.arr({a:{b:{c:null}}}); return 7 && r[0]=='a' && r[1]=='b' && r[2]=='c'});
   
}})();
