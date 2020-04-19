"use strict";(function(){let bot = {};
let dbg = drylib.dbg; let assert = dbg.assert; let log = dbg.log; dbg.assert.log = true; dbg.off = false;
let it = drylib.it, arr = drylib.arr;

bot.run = ()=>{
    let test=false
    const height = 23;

    let url="testnet"
    if(!test) url = "www"

    let tbl = $('body').tbl('chat');
    let head = tbl.thead().tr();
    head.th('time').text('Time');
    head.th('name').text('Name');
    head.th('text').text('Text');
    head.th('count').text('#');
    let user_ = {ui:tbl.tbody('user_'),map:{}};
    let mex
    let stop = false;
 
    bot.init = ()=>{
        mex = new WebSocket("wss://" + url + ".bitmex.com/realtime");
        
        mex.onmessage = function(ev){
          //console.log(ev.data);
          var msg = JSON.parse(ev.data)
          //console.log(msg);
          if(msg.table == 'chat'){
              if(msg.action == 'insert'){
                chat(msg)
              }
          }
        }

        function chat(chunk){            
              for(let msg of chunk.data){
                  if(msg.channelID == 1 && msg.message.startsWith('/position')){
                    if(false && !stop){
                        stop = true;
                        mex.send(JSON.stringify(
                          {
                            op: "unsubscribe",
                            args: ["chat"]
                          }
                        ));
                    }
                    msg.time = new Date(msg.date);
                    //console.log(msg)
                    let user = user_.map[msg.user]
                    if(!user){
                        user_.map[msg.user] = user = {count:0, ui: {row: user_.ui.tr()}}
                        user.ui.time = user.ui.row.td('time')
                        user.ui.row.td('name').text(msg.user)
                        user.ui.text = user.ui.row.td('text')
                        user.ui.count = user.ui.row.td('count')
                        user.init = msg
                    }
                    user.last = msg
                    user.count++
                    user.ui.time.text(msg.time.toLocaleTimeString())
                    user.ui.text.text(msg.message)
                    user.ui.count.text(user.count)
                }
              }
        }
        
        mex.onopen = function (ev) {
          console.log(ev);
          let msg = {
            op: "subscribe",
            args: ["chat"]
          };
        
          mex.send(JSON.stringify(msg));
        };
    }

    bot.init();
};


;$(()=>{
    bot.run();
});

{// unit tests
  
}})();
