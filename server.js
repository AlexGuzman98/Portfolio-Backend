require('dotenv').config();
const express = require('express');
const app = express();
const nodeMailer= require('nodemailer');
const Mail = require('nodemailer/lib/mailer');
const PORT = process.env.PORT || 5000;
const path = require('path')
const cors = require('cors');

const HOSTNAME = process.env.HOSTNAME || 'localhost';

//app.use
app.use(express.json());
app.use(cors());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get ('/',(req,res)=>{
    res.sendFile(__dirname + '/Portfolio/index.html')
})
app.post('/', (req,res) => {
    console.log(req.body)
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        secure: true,
        port:465,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    const mailOptions = {
        from: req.body.email,
        to:  'daguzmanram@gmail.com',
        subject: `Message from ${req.body.email} -Company: ${req.body.company}`,
        text: req.body.message
    }
    transporter.sendMail(mailOptions,(error, info)=>{
        if(error){
            res.send('error')
        }else{
            res.json({message : 'E-mail send'});
        }
    })
})
app.listen(PORT, HOSTNAME, ()=>{
    console.log(`Server is running on server ${PORT || HOSTNAME}...`)
})