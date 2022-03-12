
module.exports = {
	name: 'setting', 
	description: "Edit Setting of bot", 
	cooldown: 5, 
	execute: async function(client ,msg , args, manager, apikey, connectKey) {

let data = await manager.getRESTUser("@me", connectKey)

if(!data || !data.apiKey) return client.createMessage(msg.channel.id, `**Not Ready**
Reason: ${!data ? "Failed Get Data" : data.message}`)

if(args[0] === "add-accounts"){

let file = msg.attachments[0]
if(!file || !file.url) return msg.channel.createMessage(`:x: **You must insert the file with accounts**`)

let res = fetch(file.url)
let buf;try{ buf = await res.buffer();} catch {}
if(!buf) return msg.channel.createMessage(`:x: **I can't get buffer from the file**`)

let string = buf.toString('utf8')
if(!string) return msg.channel.createMessage(`:x: **i can't convert the buffer to string**`)

var accounts = []

for(const account of string.split('\n')){
let email = account.split(":")[0]
let password = account.split(":")[1]

accounts.unshift({email, password})
}

if(args[1] === "minecraft"){
await manager.addRESTData({accounts: accounts}, {d: "Accounts", type: "minecraft"}, connectKey)
msg .channel.createMessage(`> **تم اضافة:** ${accounts.length}`)

}else
if(args[1] === "netflix"){
await manager.addRESTData({accounts: accounts}, {d: "Accounts", type: "netflix"}, connectKey)
msg.channel.createMessage(`> **تم اضافة:** ${accounts.length}`)

}else
client.createMessage(msg.channel.id, `:x: **I Can't Find Type.. Select (minecraft, netflix)**`)

}

}}