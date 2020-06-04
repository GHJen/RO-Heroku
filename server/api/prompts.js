const router = require('express').Router()
const {Prompts, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.id === 1) {
      const prompts = await Prompts.findAll()
      res.json(prompts)
    } else res.json('What are you after here?')
  } catch (err) {
    next(err)
  }
})
router.get('/:userId', async (req, res, next) => {
  try {
    if (req.params.userId && req.user) {
      let uid = req.user.id
      const prompts = await Prompts.findAll({
        where: {
          userId: uid
        }
      })
      res.json(prompts)
    }
  } catch (err) {
    next(err)
  }
})
router.post('/:userId', async (req, res, next) => {
  try {
    if (req.params.userId && req.user) {
      const {prompt} = req.body
      const userId = req.user.id
      const user = await User.findByPk(userId)
      const newPrompt = await Prompts.create({prompt: prompt})
      if (newPrompt) {
        await user.addPrompt(newPrompt)
        const allPrompts = await Prompts.findAll({
          where: {
            userId: userId
          }
        })
        res.json(allPrompts)
      }
    }
  } catch (err) {
    next(err)
  }
})
router.delete('/:promptId', async (req, res, next) => {
  try {
    if (req.user) {
      const toDelete = await Prompts.findByPk(req.params.promptId)
      if (toDelete.userId === req.user.id) await toDelete.destroy()
      const prompts = await Prompts.findAll({
        where: {
          userId: req.user.id
        }
      })
      if (prompts) {
        res.json(prompts)
      }
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
