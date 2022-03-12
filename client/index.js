var manager = require('../sh/index.js')
const Eris = require('eris')
const fs = require('fs')
module.exports = async function(token, apikey, connectKey) {
const client = new Eris(token , { restMode:true , defaultImageSize:2048 , disableEvents: ["voiceChannelJoin" , "voiceChannelSwitch" , "voiceChannelLeave" , "callCreate" , "callDelete" , "callRing" , "callUpdate"] });
console.log(connectKey)

client.on('error', () => console.log('Failed Connect TOKEN: ' + token))

client.commands = new Eris.Collection()
let cooldowns = new Eris.Collection()

    fs.readdirSync(__dirname + "/commands/").forEach(dir => {
        const commands = fs.readdirSync(__dirname + `/commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let command = require(`./commands/${dir}/${file}`);
	client.commands.set(command.name, command);
}
    })
var prefix = "!"
client.on('ready', () =>{
console.log('Ready, API Key: ' + apikey)
})
client.on('messageCreate', async (message) => {//con["blacklist"].includes(message.author.id)
	if (message.author.bot) return;


let commandNames = message.content.split(" ")[0].toLowerCase()

let a7tholom7d = false

	let args = message.content.slice(prefix.length).trim().split(/ +/);

	let commandName = args.shift().toLowerCase();




if(!message.content.startsWith(prefix)) return;


const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) || client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;


   var three = Math.floor(Math.random() * 30) + 1;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Eris.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		let expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
	timestamps.set(message.author.id, now + 6000);
		return client.createMessage(message.channel.id, ` please wait **${timeLeft.toFixed(1)}** more second(s) before reusing the \`${command.name}\` command.`).then(m =>{setTimeout((c)=>{

m.delete()

      }, 3 * 1000)
}, 3 * 1000)
		}
	}


	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client , message, args, manager, apikey, connectKey);
	} catch (error) {
 		console.error(error);
		client.createMessage(message.channel.id, 'there was an error trying to execute that command!');
	}

});
client.connect()
}