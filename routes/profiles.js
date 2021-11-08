import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

// localhost:3000/profiles - GET
router.get('/', isLoggedIn, profilesCtrl.index)

// localhost:3000/profiles/:id - GET
router.get('/:id', isLoggedIn, profilesCtrl.show)

// localhost:3000/profiles/:id/notes - POST
router.post('/:id/notes', isLoggedIn, profilesCtrl.createNote)

// localhost:3000/profiles/notes/:id - DELETE
router.delete('/notes/:id', isLoggedIn, profilesCtrl.deleteNote)

// localhost:3000/profiles/:id/lists - POST
router.post("/lists/:id", isLoggedIn, profilesCtrl.createList)

// localhost:3000/profiles/:id/lists - DELETE
router.delete("/lists/:id", isLoggedIn, profilesCtrl.deleteList)

export {
  router
}
