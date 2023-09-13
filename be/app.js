const express = require("express");
const mqtt = require('mqtt')
const socketIO = require('socket.io')
const http = require("http");
const cors = require("cors");
const mysql = require('mysql');


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'iot'
});
con.connect(function (err) {
    if (err) throw err;
    console.log(new Date());
});
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});



const connectUrl = 'mqtt://192.168.8.90:1883';
const client = mqtt.connect(connectUrl,{
    
});
const port = 3001;

client.on('connect', () => {
    client.subscribe('dht11');
    client.subscribe('Led')
});

client.on('message', (topic, message) => {
    if (topic === 'dht11') {
        console.log(message.toString());
        io.emit('data', message.toString());
        data = JSON.parse(message.toString());
        console.log(data)
        const currtime = new Date();
        const query = 'INSERT into history (time, temperature, humidity,  light, bui) VALUES(?,?,?,?, ?)';
        con.query(query, [currtime, data.temperature, data.humidity, data.light, data.bui], (err, res)=>{
            if(err) console.log(err);
        });
    }
});
io.on('connection', (socket) => {
    console.log('connected');
    socket.on('led', (mess) => {
        // console.log(mess)
        client.publish('Led', mess);
        const currtime = new Date();
        const query = 'INSERT into action (time, name, message) VALUES(?,?,?)';
        con.query(query, [currtime, 'Led', mess], (err, res) => {
            if (err) console.log(err);
        });
    });
    socket.on('RGB',(mess)=>{
        console.log(mess);
        client.publish('LedRGB', mess);
        const currtime = new Date();
        const query = 'INSERT into action (time, name, message) VALUES(?,?,?)';
        con.query(query, [currtime, 'LedRGB', mess], (err, res) => {
            if (err) console.log(err);
        });
    })
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
})
app.get('/history', (req, res) => {
    const query = 'SELECT * FROM history';
    con.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});
app.get('/action', (req, res) => {
    const query = 'SELECT * FROM action';
    con.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});
// app.get('/order', (req, res) => {
//     const query = 'SELECT * FROM action';
//     con.query(query, (err, results) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal server error' });
//         } else {
//             res.json(results);
//         }
//     });
// });
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

