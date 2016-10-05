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
}
})()
