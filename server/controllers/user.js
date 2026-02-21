const {User} = require('../models/connect');
const {setUser} = require('../services/auth');
const {dataValidity} = require('../services/emailver');
const {sendMail} = require('../mail/mailoptions');

async function handleUserSignUp(req, res){
    const {Name, Email, Password, confirmPassword} = req.body;
    const File = req.file;

    const isValid =  dataValidity(Name, Email, Password, confirmPassword, File, res);

    if(!isValid){
        return;
    }
    
    try{
        await User.create({
            name: Name,
            email: Email,
            password: Password,
            filename: File.originalname
        })

        const response = sendMail(Name, Email);
        if(response == 'error'){
            return res.send('Error sending mail')
        } 
        return res.send('signed-up');
    } catch(err){
        console.error("Error in User Create: ", err);
    }
        
    
}

async function handleUserLogin(req, res){
    const {Email, Password} = req.body;
    const user = await User.findOne({
        where: {
            email: Email, 
            password: Password
        }
    });

    if(!user){
        return res.send('Wrong Credentials');
    }

    const token = setUser(user.toJSON());
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/'
    });
    return res.send(user);
}

async function handleUserLogOut(req, res){
    res.cookie('token', '' ,{
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        expires: new Date(0)
    })

    return res.send('Logged-out');
}

async function handleIMGUpload(req, res){
    const file = req.file;
    const{Email} = req.body;

    if(!file){
        return res.send('file');
    } else{
        await File.create({
            fileName: file.originalname,
            createdBy: Email
        });

        res.send('success');
    }
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
    handleUserLogOut,
}