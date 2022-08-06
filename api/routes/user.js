const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/:id', auth, userCtrl.getUserInfos);
router.put('/:id', auth, multer, userCtrl.modifyImgProfil)


module.exports = router;