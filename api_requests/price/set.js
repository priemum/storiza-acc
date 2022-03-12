const fs = require('fs')
module.exports = {
	path: '/api/v1/price',
	method: 'patch',
	run: async (req , res , db) => {
let { headers, query, body } = req
let data_cookie = headers.data_cookie || ""
  let data = data_cookie.split(',')
if(!data) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})
var account = await db.findOne({token: data[0], priavte_key: data[1]}) || await db.findOne({priavte_key: body.priavte_key})
if(!account) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})

if(!query || !query.acc) return res.status(403).json({errors: ["dataPrice", "query"], message: "acc Query Request!"})
if(query.acc !== "minecraft" && query.acc !== "netflix") return res.status(403).json({errors: ["dataPrice", "query"], message: "Minecraft + netflix only Supported"})

if(!Number(body.price)) return res.status(403).json({errors: ['dataPrice'], message: "Only Number"})

if(query.acc === "minecraft"){
await db.updateOne({_id: account._id} , { "data.price.minecraft" : body.price })
}
if(query.acc === "netflix"){
await db.updateOne({_id: account._id} , { "data.price.netflix" : body.price })
}

res.status(200).json({errors: [], message: "success"})
    }
}