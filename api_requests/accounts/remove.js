const fs = require('fs')
module.exports = {
	path: '/api/v1/accounts/remove',
	method: 'delete',
	run: async (req , res , db) => {
let { headers, query, body, params } = req
  let data = headers.data_cookie.split(',')
if(headers.authorization) data = ['1', '1']
if(!data) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})
var account = await db.findOne({token: data[0], priavte_key: data[1]}) || await db.findOne({"client.connect_key": headers.authorization})
if(!account) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})

if(!query || !query.acc) return res.status(403).json({errors: ["dataAccounts", "query"], message: "acc Query Request!"})
if(query.acc !== "minecraft" && query.acc !== "netflix") return res.status(403).json({errors: ["dataAccounts", "query"], message: "Minecraft + netflix only Supported"})

if(!query.email || !query.pass){

if(query.acc === "minecraft"){
await db.updateOne({_id: account._id} , { "data.accounts.minecraft" : [] })
}
if(query.acc === "netflix"){
await db.updateOne({_id: account._id} , { "data.accounts.netflix" : [] })
}

}else{

if(query.acc === "minecraft"){
await db.updateOne({_id: account._id} , { $pull: { "data.accounts.minecraft": {email: query.email, password: query.pass} } })
}

if(query.acc === "netflix"){
await db.updateOne({_id: account._id} , { $pull: { "data.accounts.netflix": {email: query.email, password: query.pass} } })

}
}

res.status(200).json({errors: [], message: "success"})
    }
}