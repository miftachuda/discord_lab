const labware = require("./labware.js")
const schedule = require('node-schedule');
const fetch = require("node-fetch")
const { HttpsProxyAgent } = require('hpagent')


const proxyUrl = `http://miftachul.huda:pertamina%402029@172.17.3.161:8080`
const proxyAgent = new HttpsProxyAgent({
  proxy: proxyUrl
})
async function sendTele(message) {
  console.log(message)
  const pro_agent = require('proxying-agent').globalize('http://miftachul.huda:pertamina%402029@172.17.3.162:8080');
  async function callAxiosWithRetry(config, depth, failMassage) {
      const wait = (ms) => new Promise((res) => setTimeout(res, ms));
      try {
          return await axiost(config)
      } catch (e) {
          if (depth > 10) {
              throw e;
          }
          console.log(e)
          await wait(2 ** depth * 100);
          console.log("Retrying .. " + depth)
          return callAxiosWithRetry(config, depth + 1, failMassage);
      }
  }
  let encoded = encodeURIComponent(message);
  var config = {
      httpAgent: pro_agent,
      httpsAgent: pro_agent,
      method: 'post',
      url: `https://api.telegram.org/bot5266529032:AAG6oq2TOmKOXrt5qaeVLk3ehvYF0bJZ6ko/sendMessage?chat_id=-805440157&parse_mode=HTML&text=${encoded}`,
      headers: {}
  };

  await callAxiosWithRetry(config, 0, "Fail Send Telegram")
      .then(function (response) {
          console.log("Telegram message Sent");
      })
      .catch(function (error) {
          console.log("Failed sending Telegram message");
      });
}
class Discord {
  
  async reply(text) {
    const url = 'https://http.miftachuda.my.id';
    const url2 = 'https://tele.miftachuda.my.id/forward';
    const data = {
      content: text,
    };
    let result = text.replace(/`/g, "");
    const data2 = {
      message: result,
    };
    try {
      console.log("sending discord message...");
      const response = await fetch(url, {
        method: 'POST',
        agent: proxyAgent, // Setting method to POST
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Converting JavaScript object to JSON string
      });

      if (!response.ok) { // Check if the response status code is not successful
        console.log('Discord response was not ok');
      }


    } catch (error) {
      console.log('Error:', error.message);
    }
    try {
      console.log("sending tele message...");
      sendTele(text)
      const response = await fetch(url2, {
        method: 'POST',
        agent: proxyAgent, // Setting method to POST
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data2) // Converting JavaScript object to JSON string
      });

      if (!response.ok) { // Check if the response status code is not successful
        console.log('Telegram response was not ok');
      }


    } catch (error) {
      console.log('Error:', error.message);
    }
  }

}


const discord = new Discord();

const times = [1, 10, 18]; // 24-hour format times

times.forEach(time => {
  schedule.scheduleJob({ hour: time, minute: 6 }, function () {
    discord.reply(`Executing task scheduled at ${time}:00`);
    labware(discord)
    discord.reply(`"Task running at:"${new Date().toLocaleString()}`);
  });

});
labware(discord)