const fs = require('fs')
module.exports = {
	path: '/api/v1/orders/add',
	method: 'post',
	run: async (req , res , db) => {
let { headers, query, body } = req
let data_cookie = headers.data_cookie || ""
  let data = data_cookie.split(',')
if(headers.authorization) data = ['1', '1']
if(!data) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})
var account = await db.findOne({token: data[0], priavte_key: data[1]}) || await db.findOne({"client.connect_key": headers.authorization})
if(!account) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})
await db.updateOne({_id: account._id} , { $push: { "orders" : req.body } })

res.status(200).json({errors: [], message: "success", data: req.body})
    }
}