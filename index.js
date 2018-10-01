var constants = require('./values');

const Discord = require("discord.js");
const client = new Discord.Client();
const Parser = require('rss-parser');
const parser = new Parser();

client.on("ready", () => {
    console.log("Bot is ready");
    getNormalWallpapers();
    getAnimeWallpapers();
});

var currentItems = new Map();
var previousItemCompliment = new Map();
function getNormalWallpapers() {
    (async () => {
        const feed = await parser.parseURL(constants.NO_ANIME_MULTI);
        console.log(feed.title);

        feed.items.forEach(item => {
            if (!previousItemCompliment.has(item.title)) {
                //Bot specific channel
                client.channels.get(constants.NOT_ANIME_CHANNEL).send(item.title + " : " + item.link);
            }
            currentItems.set(item.title, item.link);
        });

        previousItemCompliment.clear();
        for (var [key, value] of currentItems) {
            console.log("Map entry: " + key + " : " + value);
            previousItemCompliment.set(key, value)
        }
        currentItems.clear();
    })();
    setTimeout(getNormalWallpapers, 60000);
}

var currentAnimeItems = new Map();
var previousAnimeCompliment = new Map();
function getAnimeWallpapers() {
    (async () => {
        const feed = await parser.parseURL(constants.ANIME_MULTI);
        console.log(feed.title);

        feed.items.forEach(item => {
            if (!previousAnimeCompliment.has(item.title)) {
                //Bot specific channel
                client.channels.get(constants.ANIME_CHANNEL).send(item.title + " : " + item.link);
            }
            currentAnimeItems.set(item.title, item.link);
        });

        previousAnimeCompliment.clear();
        for (var [key, value] of currentAnimeItems) {
            console.log("Map entry: " + key + " : " + value);
            previousAnimeCompliment.set(key, value)
        }
        currentAnimeItems.clear();
    })();
    setTimeout(getAnimeWallpapers, 60000);
}

client.login(constants.BOT_TOKEN);
