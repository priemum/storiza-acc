var members = []

module.exports = {
	name: 'buy', 
	description: "Buy Accounts", 
	cooldown: 5, 
	execute: async function(client ,msg , args, manager, apikey, connectKey) {
async function add_reactions_and_await(reactions, msg, author, innn){
  return await new Promise(async (res , rej) =>{

for(const d of reactions){
await msg.addReaction(d)
}
client.on('messageReactionAdd', async (message, emoji, member) =>{
if(member.bot || !message.channel.guild || `${member.id}` !== `${author.id}` || !reactions.includes(emoji.name) || innn !== message.channel.id) return;
res(emoji.name)
})
  })
}
async function await_messages(msg, accepts, inn, member, d){
  return await new Promise(async (res , rej) =>{

if(accepts === "Number"){
client.on('messageCreate', (message) =>{
if(message.channel.id !== inn || member.id !== message.author.id) return;
if(!Number(Number(message.content))) return;
if(Number(message.content) > d.limit) return;
res(message)
})
return;
}

if(accepts === "all"){
client.on('messageCreate', (message) =>{
if(message.channel.id !== inn || member.id !== message.author.id) return;

res(message)
})
}else{
client.on('messageCreate', (message) =>{
if(message.channel.id !== inn || member.id !== message.author.id) return;
if(!accepts.includes(message.content)) return;

res(message)
})
}
  })
}
let data = await manager.getRESTUser("@me", connectKey)
console.log(data)
if(!data || !data.apiKey) return client.createMessage(msg.channel.id, `**Not Ready**
Reason: ${!data ? "Failed Get Data" : data.message}`)

let find = members.find(da => da.id === msg.author.id && da.dn === false)
if(find) return client.createMessage(msg.channel.id, {embed:{
color: 15729925,
title: `Minecraft - Netflix Accounts`,
description: `**You are already buying an account\nYou Need To End Last Order?**`, 
footer: { 
text: `Powerd By ${data.powerd_data.by} | Developer By ${data.developer.by}`
}
}}).then(async end =>{
let emoji = await add_reactions_and_await(['✅', '❎'], end, msg.author, msg.channel.id)
if(emoji === "✅"){
find.dn = true
end.edit({embed: {
title: `Minecraft - Netflix Accounts`,
description: `**Done Cancel Order!**`, 
footer: { 
text: `Powerd By ${data.powerd_data.by} | Developer By ${data.developer.by}`
}
}})
}
if(emoji === "❎"){
end.edit({embed:{
color: 15729925,
title: `Minecraft - Netflix Accounts`,
description: `**You are already buying an account**`, 
footer: { 
text: `Powerd By ${data.powerd_data.by} | Developer By ${data.developer.by}`
}
}})
}

})

members.unshift({dn: false, id: msg.author.id})
let d = members.find(da => da.id === msg.author.id && da.dn === false)
if(!d) return;
let m1 = await client.createMessage(msg.channel.id, {embed:{
      "title": "One Page",
      "description": `**قم بإختيار نوع طلبك**
**Minecraft :one: **
**NetFlix :two:**`,
      "color": 10449,
footer: { 
text: `Powerd By ${data.powerd_data.by} | Developer By ${data.developer.by}`
}
}
})
if(d.dn === true) return;
let emoji = await add_reactions_and_await(['1️⃣', '2️⃣'], m1, msg.author, msg.channel.id)
if(emoji === "2️⃣"){
if(d.dn === true) return;

m1.delete()
let m2 = await client.createMessage(msg.channel.id, {embed:{
title: "Two Page",
description: "**قم بكتابة كم حساب تريد**",
"color": 10449,
      "fields": [
        {
          "name": "عدد الحسابات الموجودة حالياّّ",
          "value": "[accounts]".replace('[accounts]', data.data.accounts.netflix.length)
        }
],
footer: { 
text: `Powerd By ${data.powerd_data.by} | Developer By ${data.developer.by}`
}
}})
if(d.dn === true) return;

await await_messages(msg, 'Number', msg.channel.id, msg.author, {limit: data.data.accounts.netflix.length}).then(async message =>{
if(d.dn === true) return;

let prics = Math.floor(Number(message.content)*(data.data.price.netflix))
message.delete()
m2.delete()
let resulting = Math.floor(prics)-(prics)*(5/100);
let m3 = await client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `> **مرحباً ، لشراء حساب نت فلكس يرجي اتباع الخطوات التالية**
:one: **لا تقم بأغلاق خاصك مطلقاً**
:two: **ضمان تجربة فقط**
:three: **اذا واجهتك أي مشكلة قم بطلب الدعم الفني**
🔸 **قم بتحويل ${prics} كريدت لـ <@${data.data.ownerID}>**
\`\`\`#credits <@${data.data.ownerID}> ${prics}\`\`\`
**المبلغ المطلوب وصوله للبائع هو :** ${Math.floor(resulting)}
**أستمتع**`,
      "color": 3026990,
footer: { 
text: `Powerd By ${data.powerd_data.by} | Developer By ${data.developer.by}`
}
    }
  
})
if(d.dn === true) return;

await await_messages(msg, [`**:moneybag: | ${message.author.username}, has transferred \`$${Math.floor(resulting)}\` to <@!${data.data.ownerID}> **`, `**:moneybag: | ${message.author.username}, has transferred \`$${Math.floor(resulting)}\` to <@${data.data.ownerID}> **`], msg.channel.id, msg.channel.guild.members.get(data.data.probotID) || msg.channel.guild.members.get("567703512763334685") || msg.channel.guild.members.get("282859044593598464") || msg.author).then(async new_msg =>{
if(d.dn === true) return;

m3.delete()

  let dm = await msg.author.getDMChannel().catch(err =>{})
if(d.dn === true) return;

var C = 0
var msgs = ``
var accs = []
for(const d of data.data.accounts.netflix){
if(C !== Number(message.content)){
C++
accs.unshift(d)
await manager.removeRESTData({email: d.email, pass: d.password}, {d: "Accounts", type: "netflix"}, connectKey)
msgs = msgs + `${d.email}:${d.password}\n`
if(msgs.length > 900){
if(dm) dm.createMessage({
  "embed": 
    {
      "title": "NetFlix Account",
      "color": 9625,
      "fields": [
        {
          "name": "أستمتع بحسابات:",
          "value": msgs
        }
      ]
    }
  
})
msgs = ``

}
}
  
}
if(d.dn === true) return;

await manager.addRESTData({id: msg.author.id, price: prics, accounts: accs, type: "Netflix"}, {d: "Orders"}, connectKey)

if(dm) dm.createMessage({
  "embed": 
    {
      "title": "NetFlix Account",
      "color": 9625,
      "fields": [
        {
          "name": "أستمتع بحسابات:",
          "value": msgs
        }
      ]
    }
  
})
if(d.dn === true) return;

 client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `**تم ارسال حسابات في خاص**`,
      "color": 3026990,
footer: { 
text: `Powerd By ${data.powerd_data.by} | Developer By ${data.developer.by}`
}
    }
  
})
d.dn = true
})

})
}
if(emoji === "1️⃣"){
if(d.dn === true) return;

m1.delete()
let m2 = await client.createMessage(msg.channel.id, {embed:{
title: "Two Page",
description: "**قم بكتابة كم حساب تريد**",
"color": 10449,
      "fields": [
        {
          "name": "عدد الحسابات الموجودة حالياّّ",
          "value": "[accounts]".replace('[accounts]', data.data.accounts.minecraft.length)
        }
],
footer: { 
text: `Powerd By ${data.powerd_data.by} | Developer By ${data.developer.by}`
}
}})
if(d.dn === true) return;

await await_messages(msg, 'Number', msg.channel.id, msg.author, {limit: data.data.accounts.minecraft.length}).then(async message =>{
let prics = Math.floor(Number(message.content)*(data.data.price.minecraft))
if(d.dn === true) return;

message.delete()
m2.delete()
let resulting = Math.floor(prics)-(prics)*(5/100);
let m3 = await client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `> **مرحباً ، لشراء حساب ماين كرافت يرجي اتباع الخطوات التالية**
:one: **لا تقم بأغلاق خاصك مطلقاً**
:two: **ضمان تجربة فقط**
:three: **اذا واجهتك أي مشكلة قم بطلب الدعم الفني**
🔸 **قم بتحويل ${prics} كريدت لـ <@${data.data.ownerID}>**
\`\`\`#credits <@${data.data.ownerID}> ${prics}\`\`\`
**المبلغ المطلوب وصوله للبائع هو :** ${Math.floor(resulting)}
**أستمتع**`,
      "color": 3026990,
footer: { 
text: `Powerd By ${data.powerd_data.by} | Developer By ${data.developer.by}`
}
    }
  
})
await await_messages(msg, [`**:moneybag: | ${message.author.username}, has transferred \`$${Math.floor(resulting)}\` to <@!${data.data.ownerID}> **`, `**:moneybag: | ${message.author.username}, has transferred \`$${Math.floor(resulting)}\` to <@${data.data.ownerID}> **`], msg.channel.id, msg.channel.guild.members.get(data.data.probotID) || msg.channel.guild.members.get("567703512763334685") || msg.channel.guild.members.get("282859044593598464") || msg.author).then(async new_msg =>{
if(d.dn === true) return;

m3.delete()
  let dm = await msg.author.getDMChannel().catch(err =>{})
if(d.dn === true) return;

var C = 0
var msgs = ``
var accs = []
for(const d of data.data.accounts.minecraft){
if(C !== Number(message.content)){
C++
accs.unshift(d)
await manager.removeRESTData({email: d.email, pass: d.password}, {d: "Accounts", type: "minecraft"}, connectKey)

msgs = msgs + `${d.email}:${d.password}\n`
if(msgs.length > 900){
if(dm) dm.createMessage({
  "embed": 
    {
      "title": "Minecraft Account",
      "color": 9625,
      "fields": [
        {
          "name": "أستمتع بحسابات:",
          "value": msgs
        }
      ]
    }
  
})
msgs = ``
}
}
  
}
if(d.dn === true) return;

await manager.addRESTData({id: msg.author.id, price: prics, accounts: accs, type: "Minecraft"}, {d: "Orders"}, connectKey)
if(d.dn === true) return;

if(dm) dm.createMessage({
  "embed": 
    {
      "title": "Minecraft Account",
      "color": 9625,
      "fields": [
        {
          "name": "أستمتع بحسابات:",
          "value": msgs
        }
      ]
    }
  
})
if(d.dn === true) return;

 client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `**تم ارسال حسابات في خاص**`,
      "color": 3026990,
footer: { 
text: `Powerd By ${data.powerd_data.by} | Developer By ${data.developer.by}`
}
    }
  
})
d.dn = true
})

})
}

}}