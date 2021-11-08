import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema = new Schema({
  topic: String,
  content: String,
  foodItem: [{type: Schema.Types.ObjectId, ref: "Food"}]
})

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  lists: [{type: Schema.Types.ObjectId, ref: "Food"}], 
  notes: [noteSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}