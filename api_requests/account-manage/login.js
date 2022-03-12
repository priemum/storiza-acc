const fs = require('fs')
module.exports = {
	path: '/api/v1/login',
	method: 'post',
	run: async (req , res , db) => {
let { headers, body } = req

var account = await db.findOne({username: body.username, password: body.password})
if(!account) return res.status(403).json({errors: ["authorization"], message: "Failed Authorization"})

delete account.password
res.status(200).json(account)
    }
}