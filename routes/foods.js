import { Router } from 'express'
import * as foodsCtrl from "../controllers/foods.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// localhost:3000/foods - GET
router.get("/", foodsCtrl.index)

// localhost:3000/foods/category/:name - GET
router.get("/category/:name", foodsCtrl.categoryIndex)

export {
  router
}