import mongoose, { Schema, ObjectId } from "mongoose";

const Klass = mongoose.model('Klass',
    new Schema({
        id: { type: ObjectId },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message: 'Class name must be at least 4 characters. Eg: C2110I'
            }
        },
    })
)
export default Klass