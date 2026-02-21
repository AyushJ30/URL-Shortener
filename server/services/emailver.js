function dataValidity(Name, Email, Password, confirmPassword, File, res){
    console.log('name-length');
    if(Name.length === 0){
        res.send('name');
        return false;
    }

    console.log('email-length');
    if(Email.length === 0 ){
        res.send('email');
        return false;
    }

    console.log('password');
    if(Password.length === 0){
        res.send('password');
        return false;
    } 

    console.log('mismatch');
    if(Password !== confirmPassword){
        res.send('pass-mismatch');
        return false;
    }
    
    console.log('file');
    if(!File){
        res.send('file');
        return false;
    }

    if(Email.length !== 0 && Email.includes('@') && Email.includes('.')){
        console.log('email-@');
        const parts = Email.split('@');
        const domain = parts[1];
        const TLD = domain.split('.');

        console.log(TLD);
        console.log(parts);
        if(parts.length == 0){
            res.send('email');
            return false;
        } else if(TLD[1].length <= 2){
            res.send('email');
            return false;
        }
    } else{
        console.log('email-@-else');
        res.send('email');
        return false;
    }


    return true;
}

module.exports = {
    dataValidity
}