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

// localhost:3000/foods/category/:name - GET ??
router.get("/category", foodsCtrl.show)

// localhost:3000/foods/category - POST  ??
router.post("/category", foodsCtrl.create)

// localhost:3000/foods/category/:id - DELETE ??
router.delete("/category/:id", foodsCtrl.delete)

// localhost:3000/foods/category/:id - PUT ??
router.put("/:id", foodsCtrl.update)

// localhost:3000/foods/:id/edit - GET
router.get('/:id/edit', foodsCtrl.edit)

export {
  router
}