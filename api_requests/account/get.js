const fs = require('fs')
module.exports = {
	path: '/api/v1/users/:id',
	method: 'get',
	run: async (req , res , db) => {
let { headers, params, query } = req
console.log('t')

if(params.id === "@me"){
console.log('t')

if(!headers.data_cookie) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})
let data_cookie = headers.data_cookie || ""
  let data = data_cookie.split(',')
if(headers.authorization) data = ['1', '1']
console.log('t')
if(!data) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})
console.log('t')
var account = await db.findOne({token: data[0], priavte_key: data[1]}) || await db.findOne({"client.connect_key": headers.authorization})
if(!account) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})
console.log('t')
res.status(200).json({

powerd_data: {
by: query.powerd
},

developer: {
by: "You[S]uf"
},

data: {
  
orders: account.orders,
accounts:{
netflix: account.data.accounts.netflix,
minecraft: account.data.accounts.minecraft,
},

price:{
netflix: account.data.price.netflix, minecraft: account.data.price.minecraft
}, 
admins: account.data.admins, 
probotID: account.data.probotID, 
ownerID: account.data.ownerID
},
apiKey: account.apiKey,
id: account.id,
priavte_key: account.priavte_key,
token: account.token,
avatar: account.avatar,
username: account.username
})
}else{
var account = await db.findOne({id: params.id})
if(!account) return res.status(403).json({errors: ["dataUser"], message: "Unknown User"})

res.status(200).json({

data: {
price:{
netflix: account.data.price.netflix, minecraft: account.data.price.minecraft
}, 
admins: account.data.admins, 
probotID: account.data.probotID, 
ownerID: account.data.ownerID
},
id: account.id,
avatar: account.avatar,
username: account.username
})
}


    }
}