const fs = require('fs')
module.exports = {
	path: '/api/v1/accounts/add',
	method: 'post',
	run: async (req , res , db) => {
let { headers, query, body } = req
let data_cookie = headers.data_cookie || ""
  let data = data_cookie.split(',')
if(headers.authorization) data = ['1', '1']
if(!data) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})
var account = await db.findOne({token: data[0], priavte_key: data[1]}) || await db.findOne({"client.connect_key": headers.authorization})
if(!account) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})

if(!query || !query.acc) return res.status(403).json({errors: ["dataAccounts", "query"], message: "acc Query Request!"})
if(query.acc !== "minecraft" && query.acc !== "netflix") return res.status(403).json({errors: ["dataAccounts", "query"], message: "Minecraft + netflix only Supported"})

if(!Array.isArray(body.accounts)) return res.status(403).json({errors: ["dataAccounts"], message: "Body Accounts Array Only Supported"})

if(query.acc === "minecraft" || body.acc === "minecraft"){
for(const d of body.accounts){
await db.updateOne({_id: account._id} , { $push: { "data.accounts.minecraft" : d } })

}}
if(query.acc === "netflix" || body.acc === "minecraft"){
for(const d of body.accounts){
await db.updateOne({_id: account._id} , { $push: { "data.accounts.netflix" : d } })

}}

res.status(200).json({errors: [], message: "success", data: body.accounts.length})
    }
}