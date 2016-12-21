let stdin = 0; // change to 1 for submission env
let in_file = "\\in1.txt";

let rep = function*(a,b){
    if(b === undefined)
        yield* rep(0,a-1);
    else
        for(let ret = a; ret <= b; ret++)
            yield  ret;
}

let val = {
    max: (a,b)=>a<b ? b : a,
    min: (a,b)=>a<b ? a : b,
    diff: (a,b)=>a < b ? -1 : a > b ? 1 : 0,
    neg_diff: (a,b)=>-val.diff(a,b),
    sum: (a,b)=>a + b,
    can_div: (x,div)=>x % div == 0,
}

let arr = {
    max: x=>x.reduce(val.max),
    min: x=>x.reduce(val.min),
    push: (x,list)=>Array.prototype.push.apply(x,list),
}

let obj = {
    dup: x => {
        let ret = {};
        for(var e in x)
            ret[e] = x[e];
        return ret;
    }
}

let text = '',lines,line,words,word;
let ix = {line: -1, word: 0};
let num = ()=>parseInt(word);

let next = {
    line: ()=>{
        ix.line++;
        ix.word = 0;
        line = lines[ix.line];
        words = line.split(' ');
        word = words[0];
        return line;
    },
    words: ()=>{next.line();return words;},
    nums: ()=>next.words().map(Number),

    word: ()=>{
        if(!words || ix.word == words.length)
            next.line();
        word = words[ix.word++];
        return word;
    },   
    num: ()=>{
        next.word();
        return num();
    },   
}

let w = x=>{
    process.stdout.write(x);
};
let wl = x=>{
    process.stdout.write(`${x}\n`);
};

if(stdin){
    process.stdin.resume();
    process.stdin.setEncoding('ascii');
    process.stdin.on('data', data=>{
        text += data;
    });

    process.stdin.on('end', ()=>{
        main();
    });
}else{
    let fs = require('fs');
    text = fs.readFileSync(process.cwd() + in_file).toString();
    main();
}

function main() {
    text = text.replace(/[^a-zA-Z0-9 \n]/g,'');
    lines = text.split('\n');
    solve();
}


/////////////// ignore boilerplate above this line ////////////////////
function solve(){
    let n = next.num();
    let m = next.num();
    let s=[];
    for(let i of rep(m))
        s.push(next.num())
    s.sort(val.diff);
    //wl(s);

    let turns = []; 
    for(let i=0; i<s.length; i++){
        let si = s[i];
        let turn = turns[i] = {val: si, divs: []};
        for(let j=i-1; j>=0; j--){
            let div = turns[j];
            let res = si;
            while(res % div.val == 0){
                turn.divs[j] = (turn.divs[j]||0) + 1;
                res = res / div.val;
            }
        }
    }
    let turns_count = 0;
    let win_flips = 0;
    for(let i=0; i<s.length; i++){
        let turn = turns[i];
        if(n % turn.val != 0)
            continue;
        if(turn.divs.length > 0)
            for(let j=0; j<turn.divs.length; j++){
                turns_count += turn.divs[j];
                win_flips += turn.divs[j] / 2;
            }
        else
            turns_count++;
    }
    wl(
        val.can_div(turns_count,2) && val.can_div(win_flips,2)
        || !val.can_div(turns_count,2) && !val.can_div(win_flips,2)
     ? 'Second' : 'First');
    //wl(JSON.stringify(turns));
    //wl(t);
}
