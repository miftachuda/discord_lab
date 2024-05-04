const labware = require("./labware.js")
const schedule = require('node-schedule');
const axios = require('axios');

class Discord {
  async reply(text) {
    const url = 'http://http.miftachuda.my.id';
    const data = {
      content: text,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  }
}

const discord = new Discord();



const times = [1, 10, 17, 23]; // 24-hour format times

times.forEach(time => {
  schedule.scheduleJob({ hour: time, minute: 6 }, function () {
    discord.reply(`Executing task scheduled at ${time}:00`);
    labware(discord)
    discord.reply(`"Task running at:"${new Date().toLocaleString()}`);
  });
});

labware(discord)