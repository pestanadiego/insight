const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const CLIENT_ID='917435785580-t6faufb9j2oup7nb95t4ftb3r8k68pcc.apps.googleusercontent.com'
const CLIENT_SECRET='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'
const REDIRECT_URL='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//04DFku9SOVSODCgYIARAAGAQSNwF-L9IrhvESqPCE-7lu6He39_KZQIB7iR5n7GhjLKy4ffB9d_vZbkZKjMhTYPXAqgMLQCoIVpM'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

async function sendMail(validatee, user_mail) {

    try{
        const validate = validatee;
        const mail = user_mail;
        const accesToken = await oAuth2Client.getAccessToken();
        //Crea la autenticacion para el envio del email
        const transport = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                type: 'OAuth2',
                user: 'churtado@correo.unimet.edu.ve',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accesToken: accesToken,
            }
        })

        //Cuerpo del email de aprobacion de solicitud
        const mailApprove ={
            from: 'Consejo Consultivo de Insight <churtado@correo.unimet.edu.ve>',
            to: {mail},
            subject: 'Status sobre su solicitud de registro',
            text: 'Buen día, tras revisar los documentos que nos facilitó, el Consejo Consultivo de Insight ha decidido aceptar su solicitud. A partir de ahora podrá acceder a la aplicación como especialista y empezar su travesía laboral de la mano de Insight. ¡Bienvenido/a, cualquier consulta puede contactarnos utilizando este mismo correo! Saludos cordiales. Consejo Consultivo de Insight',
            html: '<h3>Buen día, tras revisar los documentos que nos facilitó, el Consejo Consultivo de Insight ha decidido aceptar su solicitud. A partir de ahora podrá acceder a la aplicación como especialista y empezar su travesía laboral de la mano de Insight. ¡Bienvenido/a, cualquier consulta puede contactarnos utilizando este mismo correo!</br>Saludos cordiales. Consejo Consultivo de Insight</h3>'
        }  

        //Cuerpo del email de rechazo de solicitud
        const mailRejection ={
            from: 'Consejo Consultivo de Insight <churtado@correo.unimet.edu.ve>',
            to: {mail},
            subject: 'Status sobre su solicitud de registro',
            text: 'Buen día, tras revisar los documentos que nos facilitó, el Consejo Consultivo de Insight ha decidido rechazar su solicitud. Saludos cordiales. Consejo Consultivo de Insight',
            html: '<h3>Buen día, tras revisar los documentos que nos facilitó, el Consejo Consultivo de Insight ha decidido rechazar su solicitud. Saludos cordiales. Consejo Consultivo de Insight</h3>'
        }

        const positive = transport.sendMail(mailApprove)
        const negative = transport.sendMail(mailRejection)

        return(
            <>
            if ({validate}) {
                positive
            } else {
                negative
            }
            </>
        );

    } catch(error){
        return error
    }
}

export default sendMail;