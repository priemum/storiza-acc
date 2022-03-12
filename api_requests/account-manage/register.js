
const randomId = require('random-id')
const Eris = require('eris')
const fs = require('fs')
module.exports = {
	path: '/api/v1/register',
	method: 'post',
	run: async (req , res , db) => {
let { headers, body } = req

if(!headers.authorization || headers.authorization !== "41371755aa") return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})
 
let client = Eris(body.token)

client.on('ready', () =>{
var id = randomId(16, '0123456789')
var token = "SA" + randomId(65, '0123456789qwertyuiop[]asdfghjkl;zxcvbnm,./QWERTYUIOPASDFGHJKZXCVBNM')
var puplic_key = randomId(6, '0123456789') + randomId(28, '0123456789qwertyuiop[]asdfghjkl;zxcvbnm,./QWERTYUIOPASDFGHJKZXCVBNM')
var priavte_key = randomId(8, '0123456789QWERTYUIOPASDFGHJKZXCVBNM') + "_" + randomId(24, '0123456789qwertyuiop[]asdfghjkl;zxcvbnm,./QWERTYUIOPASDFGHJKZXCVBNM')
var connect_key = randomId(16, '0123456789QWERTYUIOPASDFGHJKZXCVBNM') + "_" + randomId(48, '0123456789qwertyuiop[]asdfghjkl;zxcvbnm,./QWERTYUIOPASDFGHJKZXCVBNM')
let data = {
username: body.username,
password: body.password,
avatar: body.avatar || 'https://cdn.discordapp.com/avatars/535423612308422668/762e894e133aed37290b269fe3130615.jpg?size=2048',
apiKey: puplic_key,
priavte_key: priavte_key,
token: token,
id: id,
data: {
price: { minecraft: 0, netflix: 0 },
accounts: { minecraft: [], netflix: [] },
admins: body.admins || [],
probotID: body.probotID || "282859044593598464",
ownerID: body.owner || "",
prefix: body.prefix || "#",
guildID: body.guildID || ""
  },
client: { token: body.token, id: client.user.id, key_api: priavte_key, connect_key: connect_key }

}

new db(data).save()


res.status(200).json({errors: [], message: "success", data: data})
})
client.connect()
    }
}