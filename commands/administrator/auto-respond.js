const { MessageEmbed } = require("discord.js");
const ar = require("../../models/auto-respond");
const default_prefix = require('../../config.json').default_prefix;

module.exports = {
  name: 'auto-respond',
  run: async(client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return;
    const embed1 = new MessageEmbed()
    .setTitle('Command: auto-respond')
    .setDescription(`\`${default_prefix}auto-respond add\` \n\`${default_prefix}auto-respond edit\` \n\`${default_prefix}auto-respond delete\``)
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    
    if(!args[0]) return message.channel.send({ embeds: [embed1] })
    if(args[0].toLowerCase() == 'add') {
      const trigger = args[1];
      const tembed = new MessageEmbed()
      .setTitle('Command: auto-respond add')
      .setDescription(`Missing argument \`trigger\` \n\n\`${default_prefix}auto-respond add <trigger> <content>\``)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      
      if(!trigger) return message.channel.send({ embeds: [tembed] })
      const content = args.slice(2).join(" ");
      const cembed = new MessageEmbed()
      .setTitle('Command: auto-respond add')
      .setDescription(`Missing argument \`content\` \n\n\`${default_prefix}auto-respond add <trigger> <content>\``)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      
      if(!content) return message.channel.send({ embeds: [cembed] })
      ar.findOne({Guild: message.guild.id, Message: trigger}, async(err, data) => {
        if(err) throw err;
        if(data) {
          const daddembed = new MessageEmbed()
          .setTitle('Command Error')
          .setDescription(`Auto respond \`${trigger}\` is already exist \nPlease use edit/delete to edit or delete the auto respond`)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          
          message.channel.send({ embeds: [daddembed] })
        } else {
          newData = new ar({
            Guild: message.guild.id,
            Message: trigger,
            Content: content
          })
          newData.save()
          const addembed = new MessageEmbed()
          .setTitle('Created Auto Respond')
          .setDescription(`**Auto respond:** ${trigger} \n**Content:** ${content}`)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          
          message.channel.send({ embeds: [addembed]})
        }
      })
    } else if(args[0].toLowerCase() == 'edit') {
      const trigger = args[1];
      const tembed = new MessageEmbed()
      .setTitle('Command: auto-respond edit')
      .setDescription(`Missing argument \`trigger\` \n\n\`${default_prefix}auto-respond edit <trigger> <new content>\``)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      
      if(!trigger) return message.channel.send({ embeds: [tembed] })
      const content = args.slice(2).join(" ");
      const cembed = new MessageEmbed()
      .setTitle('Command: auto-respond edit')
      .setDescription(`Missing argument \`content\` \n\n\`${default_prefix}auto-respond edit <trigger> <new content>\``)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      
      if(!content) return message.channel.send({ embeds: [cembed] })
      ar.findOne({Guild: message.guild.id, Message: trigger}, async(err, data) => {
        if(err) throw err;
        if(data) {
          const same = new MessageEmbed()
          .setTitle('Command Error')
          .setDescription('New content can not be the same with the old one')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          
          if(content == data.Content) return message.channel.send({ embeds: [same] })
          
          data.Content = content
          data.save()
          const editembed = new MessageEmbed()
          .setTitle('Edited Auto Respond')
          .setDescription(`**Auto respond:** ${trigger} \n**New content:** ${content}`)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          
          message.channel.send({ embeds: [editembed] })
        } else {
          const errembed = new MessageEmbed()
          .setTitle('Command Error')
          .setDescription(`Can not found auto respond \`${trigger}\` \nPlease create it first use \`${default_prefix}auto-respond add\``)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          
          message.channel.send({ embeds: [errembed]})
        }
      })
    }
  }
}