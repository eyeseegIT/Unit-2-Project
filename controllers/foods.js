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
      title: `${req.params.name}`
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
    res.redirect(`/foods/category/${req.body.category}`) 
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
        res.redirect(`/foods/category/${food.category}`)
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
        res.redirect(`/foods/category/${food.category}`)
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
  .populate("owner")
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

function addNote(req, res) {
  Food.findById(req.body.listId)
  .then(food => {
    food.notes.push(req.body)
    food.save()
    .then(() => {
    res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
}

function showNote(req, res) {
  Food.findById(req.params.foodId)
  .then(food => { 
    const note = food.notes.id(req.params.noteId)
    res.render(`profiles/show-note`, {
      food, 
      note,
      title: "Notes"
    })
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
  edit,
  addNote,
  showNote,
}