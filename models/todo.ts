import { Schema, model, models } from 'mongoose';

const TodoSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required.'],
    },
    // fileUrl: {
    //     type: String,
    //     required: [true, 'File is required.'],
    // }

});

const Todo = models.Todo || model('Todo', TodoSchema);

export default Todo;