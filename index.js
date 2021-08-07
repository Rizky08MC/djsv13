const { Client, Collection } = require("discord.js");
const mongoose = require("mongoose");
const { mongooseConnectionString } = require("./config.json");
const client = new Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER', 'GUILD_MESSAGE_REACTIONS','MANAGE_ROLES'],
    intents: 32767,
});

mongoose.connect(mongooseConnectionString, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    }).then(console.log("Connected to mongoDB"))

module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

client.login(client.config.token);
