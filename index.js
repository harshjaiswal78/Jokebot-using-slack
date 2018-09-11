const SlackBot = require("slackbots");
const axios = require("axios");
const bot = new SlackBot(
    {
        token:'xoxb-379050509063-377779658644-Qzh5UstbifUySh87j3ibdcJ3',
        name:'Jokebox'

    }
);
//Start Handler
bot.on('start',()=>{
  const params=
  {
      icon_emoji:':smiley:'   
  };
  bot.postMessageToChannel('general','Get  ready to laugh',params);
});
//Error Handler
bot.on('error',(err)=>console.log(err));
//Message Handler
bot.on('message',(data )=>
{
if (data.type!=='message') {
    return;
}
handleMessage(data.text);
});
//Response to data
function handleMessage(message) {
    if (message.includes('chucknorris'))
     {
      chuckJoke();    
    }
    else if( message.includes('yo mama'))
    {
       yoMamaJoke();
    }
    else if( message.includes('random'))
    {
        randomJoke();
    }
    else if(message.includes('help')){
        runHelp();

    }
    
}

//Tell a Chuck Norris  Joke
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random')
    .then(res=>{
       const joke = res.data.value.joke;
       const params=
       {
           icon_emoji:':laughing:'   
       };
       bot.postMessageToChannel('general',`Chuck Norris :${joke}`,params);
     });
}
// Tell a yo mama joke
function yoMamaJoke() {
    axios.get('http://api.yomomma.info')
    .then(res=>{
       const joke = res.data.joke;
       const params=
       {
           icon_emoji:':laughing:'   
       };
       bot.postMessageToChannel('general',`Yo Mamma
        :${joke}`,params);
     });
}
//Tell a random Joke
function randomJoke()
{
    const rand= Math.floor(Math.random()*2)+1;
    if(rand===1)
    {
        chuckJoke();
    }
    else if(rand===2)
    {
        yoMamaJoke();
    }
}
// Help
function runHelp() {
    const params=
    {
        icon_emoji:':question:'   
    };
    bot.postMessageToChannel('general',`Type @jokebox and either type 'chuck norris ,yo mama or random'`,params);
    
}