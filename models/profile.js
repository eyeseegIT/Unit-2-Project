import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema = new Schema({
  topic: String,
  content: {
    type: String,
  }
})

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  lists: [{type: Schema.Types.ObjectId, ref: "Food"}], // FOODS OR FOOD??
  notes: [noteSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}