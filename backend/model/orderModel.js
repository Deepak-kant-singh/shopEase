import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {
        type:String,
        required: true
    },
    items: {
          type:Array,
        required: true
    },
    amount: {
        type:Number,
        required: true
    },
    address: {
        type:Object,
        required: true
    },
    status: {
        type:String,
        required: true,
        default:'Order Placed'
    },
    paymentMethod: {
        type:String,
        required: true
    },
    payment: {
        type:Boolean,
        required: true,
        default:false
    },
    date: {
        type: Number,
        required:true
    }
},{timestamps:true}) 

const Order = mongoose.model('Order' , orderSchema)

export default Order



// mongoose.model(...)
// This is a Mongoose method used to create a model.

// A model is a constructor function that lets you interact with a specific MongoDB collection (e.g., query, insert, update, delete documents).

// 'Order'
// This is the name of the model.

// Mongoose automatically pluralizes and lowercases it to determine the MongoDB collection name.

// So 'Order' will use the orders collection in MongoDB.

// orderSchema
// This is the schema object you’ve defined earlier in the code.

// A schema defines the structure, validation, and default values for documents in the collection.