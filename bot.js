const { Telegraf } = require('telegraf');
const token = require('./config.json').token;
const bot = new Telegraf(token);

const fs = require('fs');
const files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// If i'll have some bugs with my bot, it will continue to work
try {
    // Making the command handlers
    for(const file of files) {
        let commandName = file.split('.')[0];
        // See what commands were loaded    
        console.log(`${commandName} loaded`);
        let command = require(`./commands/${file}`);
        bot.command(commandName, (ctx) => {
            command.command2(ctx);
        });
    }
} catch(err) {
    console.log(err);
}

// Launching the bot
bot.launch();