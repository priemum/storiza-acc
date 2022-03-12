
module.exports = {
	name: 'ready', 
	description: "Ready of bot", 
	cooldown: 5, 
	execute: async function(client ,msg , args, manager, apikey, connectKey) {

let data = await manager.getRESTUser("@me", connectKey)

if(!data || !data.apiKey) return client.createMessage(msg.channel.id, `**Not Ready**
Reason: ${!data ? "Failed Get Data" : data.message}`)
var token_Data = apikey.slice(8)
var enc_Data = apikey.slice(3)
var enc = ``
for(const d of enc_Data) enc = enc + `x`

client.createMessage(msg.channel.id, {embed:{
color: 201878,
title: `Ready`,
description: `Puplic Key: \`${data.apiKey}\`
Account Puplic Data: ${data.username} (ID: ${data.id})
Key Action: ${apikey.slice(0, 3)}${enc}

`, 
footer: { 
text: `Powerd By ${data.powerd_data.by} | Developer By ${data.developer.by}`
}
}})
}}