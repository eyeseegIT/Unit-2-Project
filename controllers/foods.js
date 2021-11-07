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
  Food.create(req.body)
  .then(food => {
    res.redirect(`/foods`) 
  })
  .catch(err => {
    console.log(err)
    res.redirect("/foods")
  })
}

function show(req, res) {
  Food.find(req.params.name)
  // .populate("owner")
  .then(food => {
    res.render("foods/category/:name", {
      food,
      title: "whatever"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/foods")
  })
}

function deleteFood(req, res) {
  Food.findById(req.params.id)
  .then(food => {
    // if (food.owner.equals(req.user.profile._id)) { 
      food.delete()
      .then(() => {
        res.redirect('/foods')
      })
    })
  //   } else {
  //     throw new Error ('🚫 Not authorized 🚫')
  //   }   
  // })
  .catch(err => {
    console.log(err)
    res.redirect('/foods')
  })
}

export {
  index,
  categoryIndex,
  newFood as new,
  create,
  show,
  deleteFood as delete
}