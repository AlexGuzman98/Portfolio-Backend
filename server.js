require('dotenv').config();
const express = require('express');
const app = express();
const nodeMailer= require('nodemailer');
const Mail = require('nodemailer/lib/mailer');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const HOSTNAME = process.env.HOSTNAME || 'localhost';

//app.use
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.post('/', (req,res) => {
    console.log(req.body)
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
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
            console.log(error)
            res.send('error')
        }else{
            console.log('Email Sent' + info.response);
            res.send('E-mail send ');
        }
    })
})
app.listen(PORT, HOSTNAME, ()=>{
    console.log(`Server is running on server ${PORT || HOSTNAME}...`)
})