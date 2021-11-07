import { Router } from 'express'
import * as foodsCtrl from "../controllers/foods.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// localhost:3000/foods - GET
router.get("/", foodsCtrl.index)

// localhost:3000/foods/category/:name - GET
router.get("/category/:name", foodsCtrl.categoryIndex)

// localhost:3000/foods/new - GET
router.get("/new", foodsCtrl.new)

// localhost:3000/foods/category/:name - GET
router.get("/category", foodsCtrl.show)

// localhost:3000/foods/category - POST
router.post("/category", foodsCtrl.create)

// localhost:3000/foods/category/:id - GET
router.delete("/category/:id", foodsCtrl.delete)

export {
  router
}