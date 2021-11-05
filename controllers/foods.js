import { Food } from "../models/food.js"

function index(req, res) {
  // Food.find({})
  // .then(foods => {
    res.render("foods/index", {
      // foods,
      title: "Food Categories"
    // })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/foods")
  })
} 

function categoryIndex(req, res) {
  Food.find({category: req.params.name})
  .then(foods => {
    console.log(foods)
    res.render("foods/category", {
      foods,
      title: `${req.params.name}'s Page`
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/foods")
  })
}

export {
  index,
  categoryIndex
}