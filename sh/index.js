const fetch = require('node-fetch')
var defaultquery = `powerd=Stroiza`
const getRESTUser = async(userid, connectKey) =>{
return new Promise(async (res, req) => {
fetch(('https://storiza-accounts.glitch.me/api/v1/users/' + userid + `?${defaultquery}`) , {
method: 'GET', 
headers: { data_cookie: false, authorization: connectKey, 'Content-Type': 'application/json' }, 
referrerPolicy: "no-referrer"
}).then(async ress =>{
  let json = await ress.json();
console.log(json)
res(json)
})
})
}

const removeRESTData = async(d, command, connectKey) =>{
if(command.d === "Accounts"){
return new Promise(async (res, req) => {
fetch(('https://storiza-accounts.glitch.me/api/v1/accounts/remove' + `?${defaultquery}&email=${d.email}&pass=${d.pass}&acc=${command.type}`) , {
method: 'DELETE', 
headers: { data_cookie: false, authorization: connectKey, 'Content-Type': 'application/json' }, 
referrerPolicy: "no-referrer"
}).then(async ress =>{
  let json = await ress.json();
console.log(json)
res(json)
})
})



}

}

const addRESTData = async(d, command, connectKey) =>{
if(command.d === "Orders"){
return new Promise(async (res, req) => {
fetch(('https://storiza-accounts.glitch.me/api/v1/orders/add' + `?${defaultquery}&acc=${command.type}`) , {
method: 'post', 
headers: { data_cookie: false, authorization: connectKey, 'Content-Type': 'application/json' }, 
referrerPolicy: "no-referrer",
body: JSON.stringify({id: d.id, price: d.price, accounts: d.accounts, type: d.type})
}).then(async ress =>{
  let json = await ress.json();
console.log(json)
res(json)
})
})



}
if(command.d === "Accounts"){
return new Promise(async (res, req) => {
fetch(('https://storiza-accounts.glitch.me/api/v1/accounts/add' + `?${defaultquery}&acc=${command.type}`) , {
method: 'post', 
headers: { data_cookie: false, authorization: connectKey, 'Content-Type': 'application/json' }, 
referrerPolicy: "no-referrer",
body: JSON.stringify({accounts: d.accounts})
}).then(async ress =>{
  let json = await ress.json();
console.log(json)
res(json)
})
})
}
}

module.exports = { getRESTUser, removeRESTData, addRESTData }