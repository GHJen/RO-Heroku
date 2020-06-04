const router = require('express').Router()
const {Entries, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.id === 1) {
      const entries = await Entries.findAll()
      res.json(entries)
    } else res.json('What are you after here?')
  } catch (err) {
    next(err)
  }
})
router.get('/:userId', async (req, res, next) => {
  try {
    if (req.params.userId && req.user) {
      let uid = req.user.id
      const entries = await Entries.findAll({
        where: {
          userId: uid
        }
      })
      res.json(entries)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    if (req.params.userId && req.user) {
      const {prompt, text} = req.body
      const userId = req.user.id
      const user = await User.findByPk(userId)
      const newEntry = await Entries.create({prompt, text})
      if (newEntry) {
        await user.addEntry(newEntry)
        const allEntries = await Entries.findAll({
          where: {
            userId: userId
          }
        })
        res.json(allEntries)
      }
    }
  } catch (err) {
    next(err)
  }
})
router.delete('/:entryId', async (req, res, next) => {
  try {
    if (req.user) {
      const toDelete = await Entries.findByPk(req.params.entryId)
      await toDelete.destroy()
      const entries = await Entries.findAll({
        where: {
          userId: req.user.id
        }
      })
      if (entries) {
        res.json(entries)
      }
    }
  } catch (err) {
    next(err)
  }
})
router.put('/:entryId', async (req, res, next) => {
  try {
    if (req.user) {
      const {action, tag} = req.body
      const entry = await Entries.findByPk(req.params.entryId)
      if (action === 'add') {
        await entry.addTag(tag)
      }
      if (action === 'remove') {
        await entry.removeTag(tag)
      }
      const entries = await Entries.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.json(entries)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
