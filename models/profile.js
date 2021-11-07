import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema = new Schema({
  item: String,
  writing: {
    type: String,
  }
})

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  list: [{type: Schema.Types.ObjectId, ref: "List"}],
  notes: [noteSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}