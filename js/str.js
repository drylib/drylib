// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let str = drylib.str = {}; let char = drylib.char = {};
let dbg = drylib.dbg;

String.prototype.toProperCase=function(){
    return this.substring(0,1).toUpperCase()+this.substring(1).toLowerCase();
}

char.codes = {
    a: 'a'.charCodeAt(0),
};
                         
for(let c of 'azAZ'.split(''))
    char.codes[c] = c.charCodeAt(0);
char.codes.capDiff = char.codes.a - char.codes.A;
                         
char.toUpperCase = c =>
    c >= 'a' && c <= 'z'
        ? String.fromCharCode(c.charCodeAt(0) - char.codes.capDiff)
        : c
;

str.toUpperCase = s => {
    let ret = s.split('');
    for(let [i,c] of ret.entries())
        ret[i] = char.toUpperCase(c);
    return ret.join('');
}

char.it = {};
char.it.toUpperCase = function*(it){
    for(let c of it){
        yield char.toUpperCase(c);
    }
}

str.it = {};
str.it.toUpperCase = function*(it){
    for(let s of it){
        yield str.toUpperCase(s);
    }
}



{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;
    assert(()=>1 && Array.from(char.it.toUpperCase('abc'.split(''))).join('') == 'ABC');
    assert(()=>2 && Array.from(str.it.toUpperCase('abc def'.split(' '))).join(' ') == 'ABC DEF');
    
    {// diff between RegExp.exec and String.match: RegExp.exec is more flexible for high performance apps
     // because it allows to stop search after first occurrence and discard the rest if logically needed
        let s = 'aa aa bb';
        let rx = /aa/g;
        let res = s.match(rx);
        assert(()=>1 && res.length == 2 && res[0] == 'aa' && res[1] == 'aa');
        let res1 = rx.exec(s);
        assert(()=>2.1 && res1.index == 0);
        let res2 = rx.exec(s);
        assert(()=>2.2 && res2.index == 3);
        let res3 = rx.exec(s);
        assert(()=>2.3 && res3 === null);
    }
}
})()
