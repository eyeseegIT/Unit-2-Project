import mongoose from 'mongoose'

const Schema = mongoose.Schema

const foodSchema = new Schema({
  name: String,
  category: {
    type: String,
    enum: ["fibers", "protein", "grains"]
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
  owner: {type: Schema.Types.ObjectId, 'ref': "Profile"}
})

const Food = mongoose.model('Food', foodSchema)

export {
  Food
}