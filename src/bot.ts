import {Utils} from "./utils";
import {EmbedField, RichEmbed, User} from "discord.js";
import {Clans} from "./data/clans.model";
import * as clanData from "./data/clans.json";
import * as disciplinesData from "./data/disciplines.json";
import {DisciplinesModel} from "./data/disciplines.model";

export namespace Bots {
    export function checkSuccessRoll(author: User, dice: number, difficulty: number, willpower?: number): RichEmbed {
        if (!difficulty) difficulty = 5;
        let success: string[] = [];
        let fails: string[] = [];
        let botch: string[] = [];
        for (let i = 0; i < dice; i++) {
            let diceRoll = Utils.randomRoll();
            switch (true) {
                case (diceRoll === 1):
                    botch.push(diceRoll.toString());
                    break;
                case (diceRoll < difficulty) :
                    fails.push(diceRoll.toString());
                    break;
                default:
                    success.push(diceRoll.toString());
                    break;
            }
        }
        let result = `${willpower ? (success.length - botch.length) + willpower + ' wp used' : (success.length - botch.length)}`;
        return new RichEmbed()
            .setAuthor(author.username.toUpperCase())
            .setTitle(`rolls Dice(${dice}) at Difficulty(${difficulty || 5})`)
            .addField('Success (per die)', `${Utils.convertToString(success) || '0'}`)
            .addField('Fails (per die)', `${Utils.convertToString(fails)}` || '0')
            .addField('Botches (per die)', `${Utils.convertToString(botch)}` || '0')
            .addField('\u200b', '\u200b')
            .addField('Result', result || '0')
            .setColor(Number(result) > 0 ? '#52a3fe' : '#FE0004');
    }

    export function getClans() {
        return new RichEmbed()
            .setColor('#52a3fe')
            .addField('All Clans', Utils.convertToStringArray(clanData, 'name'))
    }

    export function getClanData(clan: Clans, amountOfData: Array<string>) {
        let disciplines: EmbedField = {
            name: 'Disciplines',
            value: Utils.convertToString(clan.defaultDisciplines, true),
            inline: false
        };
        let sect: EmbedField = {name: 'Sect', value: Utils.convertToString(clan.sects, true), inline: false};
        if (amountOfData.length == 1 || amountOfData.length == 3) {
            return new RichEmbed()
                .setTitle(clan.name)
                .setColor('#52a3fe')
                .addField(disciplines.name, disciplines.value)
                .addField(sect.name, sect.value)
        }
        if (amountOfData.length == 2 && (amountOfData[1].toLowerCase() == 'd' || amountOfData[1].toLowerCase() == 's')) {
            return new RichEmbed()
                .setTitle(clan.name)
                .setColor('#52a3fe')
                .addField(amountOfData[1].toLowerCase() == 'd' ? disciplines.name : sect.name, amountOfData[1].toLowerCase() == 'd' ? disciplines.value : sect.value)
        }
    }

    export function getDisciplines() {
        return new RichEmbed()
            .setColor('#52a3fe')
            .addField('All Disciplines', Utils.convertToStringArray(disciplinesData, 'name'))
    }

    export function getDiscData(disc: DisciplinesModel, amountOfData: Array<string>) {
        if (amountOfData.length === 1) {
            let view = new RichEmbed()
                .setTitle(disc.name)
                .setColor('#52a3fe')
            for (let level of disc.levels) {
                view.fields.push({name: `lvl ${level.level.toString()} - ${level.name}`, value: level.description, inline: false})
            }
            return view;
        }

        if (Number(amountOfData[1]) <= disc.levels.length) {
            let view = new RichEmbed()
                .setTitle(disc.name)
                .setColor('#52a3fe')
            let level = disc.levels.find(lvl => lvl.level === Number(amountOfData[1]));
            if (level) {
                for (const [key, value] of Object.entries(level)) {
                    if(value){
                        view.fields.push({name: key.toUpperCase(), value: value, inline: false})
                    }
                }
            }
            return view;
        }
    }

    export function getBlood(author: User) {
        let diceRoll = Utils.randomRoll();
        return new RichEmbed()
            .setAuthor(author.username.toUpperCase())
            .setTitle(`Drinks Blood`)
            .addField('Points of Blood', `${diceRoll === 10? '10, you killed them. Better hide the body.': diceRoll}`)
            .setColor('#52a3fe');
    }

    export function highLow(author: User, option: 'h'|'l') {
        let diceRoll = Utils.randomRoll();
        return new RichEmbed()
            .setAuthor(author.username.toUpperCase())
            .setTitle(option === 'h'? 'HIGH':'LOW')
            .addField(`You guessed ${option === 'h'? 'HIGH': 'LOW'}`, `${Utils.isHighOrLow(diceRoll, option)? diceRoll + ', you guess right': diceRoll + ', sucks to be you'}`)
            .setColor('#52a3fe');
    }
}