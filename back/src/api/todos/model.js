import mongoose, { Schema } from 'mongoose'

const todosSchema = new Schema({
  author: {
    type: String
  },
  content: {
    type: String
  },
  date: {
    type: String
  },
  status: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

todosSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author,
      content: this.content,
      date: this.date,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Todos', todosSchema)

export const schema = model.schema
export default model
