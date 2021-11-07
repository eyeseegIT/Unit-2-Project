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
    console.log("this is my foods", foods)
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
  // so that cookTime can default to 0 if left blank
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key]
  }
  req.body.owner = req.user.profile._id
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
  Food.findById(req.params.id)
  .populate("owner")
  .then(food => {
    res.render("foods/category", {
      food,
      // title: "whatever"
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
    if (food.owner.equals(req.user.profile._id)) { 
      food.delete()
      .then(() => {
        res.redirect('/foods')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')  
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/foods')
  })
}

function update(req, res) {
  Food.findById(req.params.id)
  .then(food => {
    if (food.owner.equals(req.user.profile._id)) {
      food.update(req.body, {new: true})
      .then(()=> {
        res.redirect(`/foods`)
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/foods`)
  })
}

function edit(req, res) {
  Food.findById(req.params.id)
  .then(food => {
    res.render('foods/edit', {
      food,
      title: `Edit ${food.name}`
    })
  })
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
  deleteFood as delete,
  update,
  edit
}