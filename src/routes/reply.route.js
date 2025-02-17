const express = require('express')
const router = express.Router()
const replyController = require('../controllers/reply.controller')

router.get('/', replyController.getReplies)
router.get('/:id', replyController.getReplyById)
router.post('/', replyController.createReply)
router.put('/:id', replyController.updateReply)
router.delete('/:id', replyController.deleteReply)

module.exports = router