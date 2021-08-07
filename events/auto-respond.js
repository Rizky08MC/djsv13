const client = require('../index.js');
const ar = require('../models/auto-respond');

client.on('messageCreate', async(message) => {
  ar.findOne({ Guild: message.guild.id, Message: message.content }, async(err, data) => {
    if(err) throw err;
    if(data) {
      message.channel.send(data.Content)
    } else return;
  })
})