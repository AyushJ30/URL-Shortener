const express = require('express');

const upload = require('../storage');
const {handleUserSignUp, handleUserLogin, handleUserLogOut, handleIMGUpload} = require('../controllers/user');

const router = express.Router();

router.post('/signup', upload.single('File'), handleUserSignUp);
router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogOut);

module.exports = router;