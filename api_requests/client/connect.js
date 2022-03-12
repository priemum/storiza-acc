const Eris = require('eris')
const fs = require('fs')
module.exports = {
	path: '/api/v1/client/connect',
	method: 'get',
	run: async (req , res , db) => {
let { headers, query, body } = req

var connect = await db.findOne({"client.connect_key": headers.authorization})
if(connect){

res.status(200).json(connect)

}else{
let data_cookie = headers.data_cookie || ""
  let data = data_cookie.split(',')
if(headers.authorization) data = ['1', '1']

if(!data) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})

var account = await db.findOne({token: data[0], priavte_key: data[1]}) || await db.findOne({priavte_key: body.priavte_key})
if(!account) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})

let client = Eris(account.client.token)

client.on('error', async () =>{

try {
 res.status(200).json({errors: ['client'], message: "Failed To connect"})
} catch {
}


})

client.on('ready', async () =>{
client.user.avatar = client.user.avatarURL
res.status(200).json(client.user)
})

client.connect()

}
    }
}