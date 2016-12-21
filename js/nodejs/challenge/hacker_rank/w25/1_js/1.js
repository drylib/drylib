let stdin = 0; // change to 1 for submission env

let rep = function*(a,b){
    for(let ret = a; ret <= b; ret++)
        yield  ret;
}

let val = {
    max: (a,b)=>a<b ? b : a,
    min: (a,b)=>a<b ? a : b,
}

let arr = {
    max: x=>x.reduce(val.max),
    min: x=>x.reduce(val.min),
}

let lines,line,words,word;
let ix = {line: 0, word: 0};
let num = ()=>parseInt(word);

let next = {
    line: ()=>{
        ix.word = 0;
        line = lines[ix.line++];
        words = line.split(' ');
        word = words[0];
        return line;
    },
    words: ()=>{next.line();return words;},
    nums: ()=>next.words().map(Number),

    word: ()=>{
        if(!words)
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
    if(stdin)
        process.stdout.write(x);
    else
        console.log(x);
};
let wl = x=>{
    if(stdin)
        process.stdout.write(`${x}\n`);
    else
        console.log(x);
};

if(stdin){
    process.stdin.resume();
    process.stdin.setEncoding('ascii');
    let input_stdin = '';
    process.stdin.on('data', data=>{
        input_stdin += data;
    });

    process.stdin.on('end', ()=>{
        lines = input_stdin.replace(/\r/g,'').split("\n");
        main();    
    });
}else{
    let fs = require('fs');
    lines = fs.readFileSync(process.cwd() + "\\in1.txt").toString().replace(/\r/g,'').split('\n');
    main();
}


/////////////// ignore above this line ////////////////////

function main() {
    next.line();
    let n = next.num();
    let m = next.num();
    let a = next.nums();
    let b = next.nums();
    let ret = 0;
    for(let x of rep(a.reduce(val.max),b.reduce(val.min))){
        if((()=>{
            for(let A of a)
                if(x % A != 0)
                    return true;
        })()) continue;
        if((()=>{
            for(let B of b)
                if(B % x != 0)
                    return true;
        })()) continue;
        ret++;
    }
    w(ret);
}
