import {Client, Message} from "discord.js";
import * as config from "./config.json";
import {Bots} from "./src/bot";
import * as clanData from "./src/data/clans.json";
import * as disciplineData from "./src/data/disciplines.json";
import {HelpInfo} from "./src/data/help.info";

const client: Client = new Client();

const preset: string = '!';

client.on("connet", ()=>{
    client.user.setAvatar('./src/images/lestat.png')
    client.user.setActivity('Vampire the Masquerade')
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on("message", (msg: Message) => {
    if (msg.content === "ping") {
        msg.reply("Pong, bitches!")
    }

    if(msg.content.toLowerCase() === preset + 'help') {
        msg.channel.send(HelpInfo)
    }

    if(msg.content.startsWith(preset + 'roll')){
        let message = msg.content.split(' ');
        return msg.reply(Bots.checkSuccessRoll(msg.author, Number(message[1]),Number(message[2]),Number(message[3])))
    }

    if(msg.content.startsWith(preset + 'clans')){
        return msg.reply(Bots.getClans())
    }

    for(let clan of clanData){
        if(msg.content.toLowerCase().startsWith(`${preset}${clan.name.toString().toLowerCase()}`)){
            let message = msg.content.split(' ');
            return msg.reply(Bots.getClanData(clan, message));
        }
    }

    if(msg.content.startsWith(preset + 'disc')){
        return msg.reply(Bots.getDisciplines())
    }

    for(let disc of disciplineData){
        if(msg.content.toLowerCase().startsWith(`${preset}${disc.name.toString().toLowerCase()}`)){
            let message = msg.content.split(' ');
            return msg.reply(Bots.getDiscData(disc, message));
        }
    }

    if(msg.content.startsWith(preset + 'blood')){
        return msg.reply(Bots.getBlood(msg.author))
    }

    if(msg.content.startsWith(preset + 'high')){
        return msg.reply(Bots.highLow(msg.author, 'h'))
    }

    if(msg.content.startsWith(preset + 'low')){
        return msg.reply(Bots.highLow(msg.author, 'l'))
    }

});
client.login(config.BOT_TOKEN);
