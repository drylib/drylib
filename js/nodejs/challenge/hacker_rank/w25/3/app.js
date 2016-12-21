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
    process.stdin.on('data', data=>{
        text += data;
    });

    process.stdin.on('end', ()=>{
        main();
    });
}else{
    let fs = require('fs');
    text = fs.readFileSync(process.cwd() + "\\in1.txt").toString();
    main();
}


function main() {
    text = text.replace(/[^a-zA-Z0-9 \n]/g,'');
    lines = text.split('\n');
    solve();
}

/////////////// ignore boilerplate above this line ////////////////////
function solve(){
    let q = next.num();
    while(q-- > 0){
        next.line();
        let a = next.num();
        let b = next.num();
        let d = next.num();

        let ret = (()=>{
            if(d == 0)
                return 0;
            if(d < b)
                if(a == d)
                    return 1;
                else
                    return 2;
            else
                if(a == d)
                    return 1;
                else
                    return (d / b + 1) >> 0;
        })();
        wl(ret);
    }
}
