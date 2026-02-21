const express = require('express');
const {handleCreateShortID, handleURLFetch, handleDeleteURL, handleURLUpdate} = require('../controllers/url');
const { restrictTo } = require('../middlewares/auth');

const router = express.Router();

router.get('/',restrictTo(["User"]), handleURLFetch);
router.post('/',restrictTo(["User"]), handleCreateShortID);

router.get('/delete/:id', restrictTo(["User"]), handleDeleteURL);
router.post('/update/:id', restrictTo(["User"]), handleURLUpdate);

module.exports = router;