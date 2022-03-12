const Eris = require('eris')
const fs = require('fs')
module.exports = {
	path: '/api/v1/client/editself',
	method: 'patch',
	run: async (req , res , db) => {
let { headers, query, body } = req


let data_cookie = headers.data_cookie || ""
  let data = data_cookie.split(',')
if(headers.authorization) data = ['1', '1']

if(!data) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})

var account = await db.findOne({token: data[0], priavte_key: data[1]}) || await db.findOne({"client.connect_key": headers.authorization})
if(!account) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})

let client = Eris(account.client.token)

client.on('error', async () =>{
res.status(200).json({errors: ['client'], message: "Failed To connect"})
})

client.on('ready', async () =>{
var able = true
var error;
client.editSelf(body).catch(err =>{
able = false
error = err.message
}).then(new_client =>{
if(!able) return res.status(403).json({errors: ['editSelf'], message: error})
res.status(200).json({
message: "success",
avatar: new_client.avatarURL,
bot: new_client.bot,
createdAt: new_client.createdAt,
discriminator: new_client.discriminator,
email: new_client.email || null,
id: new_client.id,
mfaEnabled: new_client.mfaEnabled,
publicFlags: new_client.publicFlags,
system: new_client.system,
username: new_client.username,
verified: new_client.verified
})
})

})

client.connect()


    }
}