const fs = require('fs')
module.exports = {
	path: '/',
	method: 'get',
	run: async (req , res , db) => {
let { headers, params, query } = req
res.sendStatus(200)
    }
}