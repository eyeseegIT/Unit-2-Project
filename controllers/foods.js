import { Food } from "../models/food.js"

function index(req, res) {
  Food.find({})
  .then(foods => {
  res.render("foods/index", {
    title: "Food Categories",
    foods,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/foods")
  })
} 

function categoryIndex(req, res) {
  Food.find({category: req.params.name})
  .then(foods => {
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

function newFood(req, res) {
  res.render("foods/new", {
    title: "Add New Food",
  })
}

function create(req, res) {
  // req.body.owner = req.user.profile._id
  Food.find({category: req.params.name})
  Food.create(req.body)
  .then(food => {
    res.redirect(`/foods`) // NEED TO CHANGE THIS PAGE
  })
//   const food = new Food(req.body)
//   food.save(function (err) {
//     if (err) return res.redirect('foods/new')
//     res.redirect(`/foods`)
// })
}

function show(req, res) {
  Food.findById(req.params.id)
  // .populate("owner")
  .then(food => {
    res.render("foods/category", {
      food,
      title: "whatever"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/foods")
  })
}

export {
  index,
  categoryIndex,
  newFood as new,
  create,
  show
}