const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, res, cd){
        return cd(null, './uploads');
    },
    filename: function(req, file, cd){
        return cd(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});

module.exports = upload;
