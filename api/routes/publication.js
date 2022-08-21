const express = require('express')
const router = express.Router()
const publicationCtrl = require('../controllers/publication')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, publicationCtrl.createPublication)
router.get('/', auth, publicationCtrl.getAllPublication)
router.put('/:id', auth, multer, publicationCtrl.modifyPublication)
router.delete('/:id', auth, publicationCtrl.deletePublication)
router.post('/:id/like', auth, publicationCtrl.getLikes)

module.exports = router
