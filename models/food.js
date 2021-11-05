import mongoose from 'mongoose'

const Schema = mongoose.Schema

const foodSchema = new Schema({
  name: String,
  category: {
    type: String,
    enum: ["Fruits/Veggies", "Protein", "Grains"]
  },
  preparation: String,
  cookTime: Number,
  // owner: {type: Schema.Types.ObjectId, 'ref': "Profile"}
})

const Food = mongoose.model('Food', foodSchema)

export {
  Food
}