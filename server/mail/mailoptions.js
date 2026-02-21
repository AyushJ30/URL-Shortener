const transporter = require('./transporter');

async function sendMail(name, email){
    try{
        const mailOptions = {
            from: 'urlshortener19.02@gmail.com',
            to: `${name} <${email}>`, 
            replyTo: 'urlshortener19.02@gmail.com',
            subject: 'Sign-Up Successfull',
            text: `Hello ${name}, You have successfully signed-up on the URL-Shortener Site. Welcome`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(info.rejected);
        if(info.rejected.length >0) {
            console.log('Email rejected', info.rejected);
            return 'error';
        } else{
            console.log('Email sent: ', info.response);
            return 'success';
        }
        
    } catch(err){
        console.error("Error while sending mail:", err);
        return 'error';
    }
}


module.exports = {
    sendMail
}


