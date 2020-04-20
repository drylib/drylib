"use strict";(function(){let bot = {};
let dbg = drylib.dbg; let assert = dbg.assert; let log = dbg.log; dbg.assert.log = true; dbg.off = false;
let it = drylib.it, arr = drylib.arr, str = drylib.str, tr = drylib.tr, tl = drylib.tl;

bot.run = ()=>{
    let test=false
    let limit = {msg: 500}
    let cfg = {dbg:false,reconn:true}

    let url="testnet"
    if(!test) url = "www"

    $('body').btn('refresh','Refresh').click(function(){
      mex.close()
      u_.map.clear()
      location.reload()
    })

    $('body').btn('dbg','Debug').syncClick(function(){this.clsOnoff(cfg.dbg);}, function(){cfg.dbg = !cfg.dbg;})
    $('body').btn('reconn','Reconnect').syncClick(function(){this.clsOnoff(cfg.reconn);}, function(){cfg.reconn = !cfg.reconn;})

    let subscribe = {ui:$('body').btn(), on: false }
    subscribe.ui.prop('disabled', true)
    subscribe.ui.syncClick(
      function(){
        if(subscribe.on)
          this.text('Unsubscribe')
        else
          this.text('Subscribe')
      },
      function(){
        mex.send(str.json({op: subscribe.ui.text().toLowerCase(),args: ["chat"]}));
        subscribe.on = !subscribe.on
    })

    let total;{
      let ui = $('body').span('total','Total')
      total = $('body').span('total','0')
    }

    let u_ = {
      map: drylib.ld('user_', v=>{return v.d}, v=>{return {d:v}})
    };
    {
      $('body').btn('export').text('Export').click(function(){
        $('body').inputText('export',u_.map.export())
      })
    }

    let tbl = $('body').tbl('chat');
    let head = tbl.thead().tr();
    head.th('time').text('Time');
    head.th('name').text('Name');
    head.th('btn').text('Buttons');
    head.th('text').text('Text')
    head.th('count').text('#');
    u_.ui = tbl.tbody('user_');

    let mex
    let stop = false;

    bot.init = ()=>{
        let connect = ()=>{
          mex = new WebSocket("wss://" + url + ".bitmex.com/realtime");
          mex.onopen = function (ev) {
            console.log('Connected',ev);
            subscribe.ui.prop('disabled', false);
            subscribe.ui.click();
          }
          mex.onclose = function(ev) {
            console.log('Socket disconnected');
            if(cfg.reconn) setTimeout(function(){
              console.log('Reconnecting');
              connect()
            }, 3000);
          };
  
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
        }
        if(!test)
          connect()


        function chat(chunk){
            for(let msg of chunk.data){
              if(msg.channelID == 1){
                //if(msg.message.startsWith('/position'))
                  pos(msg)
              }
            }
        }

        for(let u of u_.map){
            upd(u.v)
        }

        function pos(msg){
          if(false && !stop){
            stop = true;
            mex.send(str.json({op: "unsubscribe",args: ["chat"]}));
          }
          if(cfg.dbg) console.log(msg)
          let u = u_.map.get(msg.user) || {d:{k:msg.user, count:0}}
          let d = u.d
          d.msg = msg.html
          d.date = new Date(msg.date)
          d.bot = msg.fromBot
          d.admin = d.k.startsWith('BitMEX')
          d.count++
          if(d.msg.match(/position/gi)){
            d.pos = {msg:d.msg, date:d.date}
          }


          total.text(Number(total.text())+1)
          save(u)
          upd(u)
        }
        
        function save(u){
          u_.map.set(u.d.k, u)
        }

        function upd(u){
          let d = u.d
          let ui = u.ui

          let msg = d.msg
          msg = msg.replace(/^[/]position/gi,'')
          msg  = msg.replace(/:bitmex:/gi,'')
          //msg = msg.substring(0,limit.msg)
          let date = new Date(d.date)
          //if(ui){ui.row.detach();ui=null}

          if(!ui){
            ui = u.ui = {}
            ui.row = u_.ui.tr()

            let high = function(on){
              ui.row.detach()
              if(on) u_.ui.prepend(ui.row)
              else u_.ui.append(ui.row)
              return on
            }

            let prepend = high(true
              && !(d.ban || d.small)
              && (false
                || msg.match(/position/gi)
                || d.fav || d.whale || d.bot || d.admin
                //|| tr.fit(tl(d.k), tl('REKT'))
              )
            );

            ui.time = ui.row.td('time')
            ui.row.td('name').text(d.k)
            {
              let td = ui.row.td('btn')
              {
                let btn = td.btn().text('^')
                let upd = function(){btn.clsOnoff(d.fav)}
                upd()
                btn.click(function(){
                  high(d.fav = !d.fav)
                  save(u)
                  upd()
                })
              }
              {
                let btn = td.btn().text('$')
                let upd = function(){btn.clsOnoff(d.whale)}
                upd()
                btn.click(function(){
                  high(d.whale = !d.whale)
                  save(u)
                  upd()
                })
              }
              {
                let btn = td.btn().text('\\')
                let upd = function(){btn.clsOnoff(d.ban)}
                upd()
                btn.click(function(){
                  if(d.ban = !d.ban) high(false)
                  save(u)
                  upd()
                })
              }
              {
                let btn = td.btn().text('_')
                let upd = function(){btn.clsOnoff(d.small)}
                upd()
                btn.click(function(){
                  if(d.small = !d.small) high(false)
                  save(u)
                  upd()
                })
              }
  
            }

            ui.text = ui.row.td('text')
            ui.count = ui.row.td('count')
          }
          ui.time.text(date.toLocaleTimeString())
          ui.text.html(msg)
          ui.count.text(d.count)
        }

    }

    bot.init();
};


;$(()=>{
    bot.run();
});

{// unit tests
  
}})();
