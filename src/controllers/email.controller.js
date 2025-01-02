const {
    email:emailModel,
    data_email:dataEmailModel
} = require('../models/index.js');
const nodemailer = require('nodemailer');

const sendEmail = async(req, res) => {

    try {
        const findDataEmail = await dataEmailModel.findOne({
            where:{
                status_email_id:2
            },
            order:[
                ['created_at', 'DESC']
            ]
        })

        if(findDataEmail){
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            });

            const emailMessage = {
                from: '"KLABSEN" <no-replay@kopkarla.co.id>',
                to: 'ara.fa@kopkarla.co.id',
                subject: findDataEmail.subject,
                text: findDataEmail.text_email
            };
        
            await transporter.sendMail(emailMessage);

            await findDataEmail.update({
                status_email_id:3
            })

            console.log('data email sended')
        }else{
            console.log(findDataEmail, 'data email not found')
        }

    } catch (error) {
        console.log('error', error )
    }
}   

module.exports = {
    sendEmail
}