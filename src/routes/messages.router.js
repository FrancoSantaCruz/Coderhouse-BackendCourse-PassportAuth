import { Router } from "express";
import { messagesManager } from '../dao/manager/messages.manager.js'

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const newChat = await messagesManager.createOne()
        res.redirect(`/chat/${newChat._id}`)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get('/:cid', async (req,res) => {
    const { cid } = req.params
    try {
        const chat = await messagesManager.findByID(cid)
        res.json({ chat })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})


export default router;