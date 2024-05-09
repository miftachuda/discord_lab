const labware = require("./labware.js")
const schedule = require('node-schedule');
const { HttpsProxyAgent } = require('https-proxy-agent');

const proxyUrl = `https://miftachul.huda:pertamina%402026@172.17.3.161:8080`
const proxyAgent = new HttpsProxyAgent(proxyUrl);


class Discord {
  async reply(text) {
    const url = 'https://http.miftachuda.my.id';
    const data = {
      content: text,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        agent: proxyAgent, // Setting method to POST
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Converting JavaScript object to JSON string
      });

      if (!response.ok) { // Check if the response status code is not successful
        throw new Error('Network response was not ok');
      }

      console.log("sending message");
    } catch (error) {
      console.error('Error:', error.message);
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
//labware(discord)