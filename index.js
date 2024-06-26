const labware = require("./labware.js")
const schedule = require('node-schedule');
const fetch = require("node-fetch")
const { HttpsProxyAgent } = require('hpagent')


const proxyUrl = `http://miftachul.huda:pertamina%402026@172.17.3.161:8080`
const proxyAgent = new HttpsProxyAgent({
  proxy: proxyUrl
})

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

// times.forEach(time => {
//   schedule.scheduleJob({ hour: time, minute: 6 }, function () {
//     discord.reply(`Executing task scheduled at ${time}:00`);
//     labware(discord)
//     discord.reply(`"Task running at:"${new Date().toLocaleString()}`);
//   });

// });
labware(discord)