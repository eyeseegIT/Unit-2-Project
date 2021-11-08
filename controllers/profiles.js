import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: "All Profiles"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate("lists")
  .then((profile) => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      res.render("profiles/show", {
        title: `${profile.name}'s Profile`,
        profile,
        self,
        isSelf,
      })
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/")
  })
}

function createNote(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.notes.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function deleteNote(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.notes.remove({_id: req.params.id})
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function createList(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.lists.push(req.params.id) 
    profile.lists.push(req.params.name) 
    profile.lists.push(req.params.category) 
    profile.save()
    .then(() => {
    res.redirect(`/profiles/${req.user.profile._id}`) 
  })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/foods")
  })
}

export {
  index,
  show,
  createNote,
  deleteNote,
  createList
}