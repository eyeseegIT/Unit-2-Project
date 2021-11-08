import { Router } from 'express'
import * as foodsCtrl from "../controllers/foods.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// localhost:3000/foods - GET
router.get("/", foodsCtrl.index)

// localhost:3000/foods/category/:name - GET
router.get("/category/:name", foodsCtrl.categoryIndex)

// localhost:3000/foods/new - GET
router.get("/new", isLoggedIn, foodsCtrl.new)

// localhost:3000/foods/category/:id - GET 
router.get("/:id", foodsCtrl.show)

// localhost:3000/foods/:id/edit - GET
router.get('/:id/edit', isLoggedIn, foodsCtrl.edit)

// localhost:3000/foods/category - POST  
router.post("/category", foodsCtrl.create)

router.post("/add-note", isLoggedIn, foodsCtrl.addNote)

// localhost:3000/foods/category/:id - DELETE 
router.delete("/category/:id", isLoggedIn, foodsCtrl.delete)

// localhost:3000/foods/category/:id - PUT 
router.put("/:id", isLoggedIn, foodsCtrl.update)

export {
  router
}