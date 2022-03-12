const Eris = require('eris');
const fs = require("fs")
const express = require("express");
const app = express();
const fetch = require('node-fetch')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
app.listen(process.env.PORT);


app.use(bodyParser.json());

app.get('/', (req, res) =>{
res.sendStatus(200)
})

app.get("/sidebars.css", (req, res) => {
    res.sendFile(__dirname + "/sidebars.css");
})
app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/sidebars.css");
})
app.get("/setting", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
console.log('=')
mongoose.connect("mongodb+srv://yousuf:41371755aa@cluster0.vodtb.mongodb.net/data" , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    });

const collection = mongoose.model("accounts",  new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "apiKey": { type: String } ,
            "priavte_key": { type: String } ,
            "token": { type: String } ,
            "username": { type: String } ,
            "avatar": { type: String } ,
            "password": { type: String } ,
            "id": { type: String } ,
            "data": { type: Object } ,
            "client": { type: Object } ,
            "orders": { type: Array } ,


}));

const protiection = mongoose.model("guilds",  new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "roles": { type: Array, default: [] } ,


}));

  mongoose.connection.on('connected', async () =>{
const new_client = require("./client/index.js")

for(const d of await collection.find({})){
//console.log(d.client.token//)
//new_client(d.client.token, d.client.key_api, d.client.connect_key)
}


  })
        const requests = fs.readdirSync(`./api_requests/`).filter(file => file.endsWith(".js"));


    fs.readdirSync("./api_requests/").forEach(dir => {
        const requests = fs.readdirSync(`./api_requests/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of requests) {
            let request = require(`./api_requests/${dir}/${file}`);
if(request.method && request.path){
app[request.method](request.path , (req , res) =>{
 
return request.run(req, res, collection)
})
}} 

})
//////////////////////////////////

let client = new Eris('ODEzMDI4ODA0NTE5Mzk1NDE4.YDJWFA.y_1YJ03F9H7Fo-jqis7OkJXOhJg')
const { Permissions } = require('discord.js');

client.on('ready', () =>{
let roles = client.guilds.get('867064399427665930').roles.filter(d => d)

let dataSave = []

for(const role of roles){
//console.log(role.permissions.json)

if(role.permissions.json.administrator && role.permissions.json.administrator === true){
dataSave.unshift({
id: role.id,
permissions: role.permissions.allow
})
console.log(role.permissions.allow)
let permissions = new Permissions(Number(`${role.permissions.allow}`.replace("n", '')))
permissions.remove('ADMINISTRATOR')
console.log(permissions)
}
if(role.permissions.json.kickMembers === true && role.permissions.json.kickMembers === true){
dataSave.unshift({
id: role.id,
permissions: role.permissions.allow
})
let permissions = new Permissions(Number(`${role.permissions.allow}`.replace("n", '')))
permissions.remove('KICK_MEMBERS')
console.log(permissions)
}

if(role.permissions.json.banMembers === true && role.permissions.json.banMembers === true){
dataSave.unshift({
id: role.id,
permissions: role.permissions.allow
})
let permissions = new Permissions(Number(`${role.permissions.allow}`.replace("n", '')))
permissions.remove('BAN_MEMBERS')
console.log(permissions)
}

}

//console.log(dataSave)

})

client.connect()