import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema = new Schema({
  content: String,
})

const foodSchema = new Schema({
  name: String,
  category: {
    type: String,
    enum: ["Fruits & Veggies", "Proteins", "Grains"]
  },
  preparation: {
    type: String,
    enum: ["Boil", "Steam", "Bake", "None"]
  },  
  cookTime: {
    type: Number,
    min: 0,
    default: 0,
  },  
  owner: {type: Schema.Types.ObjectId, 'ref': "Profile"},
  notes: [noteSchema],
})

const Food = mongoose.model('Food', foodSchema)

export {
  Food
}