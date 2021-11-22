
function Mailing(req, res){

    try{
        var nodemailer = require('nodemailer');
        var express = require('express');
        var app_ = express();
        const response = res;
        const email = req;
        app_.post('/send-email', (response, email)=>{
            const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'ruthe.murphy6@ethereal.email',
                pass: 'KbedtPJWaE615JEAun'
            }
        });
            const mailOptions={
                from:'Insight',
                to:"churtado@correo.unimet.edu.ve",
                subject: "probando",
                text: 'hola mundo'
            }
            transporter.sendMail(mailOptions, (error, info)=>{
                if(error){
                    res.status(500).send(error.message);
                }else{
                    console.log('enviado')
                    res.status(200).json(req.body);
                }
            });

        });

        app_.listen(3000, ()=>{
            console.log('servidor')
        })
        
    } catch(error) {}
}


export default Mailing;