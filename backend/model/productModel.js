import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image1:{
        type:String,
        required:true
    },
    image2:{
        type:String,
        required:true
    },
    image3:{
        type:String,
        required:true
    },
    image4:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    sizes:{
        type:Array,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    bestseller:{
        type:Boolean
    }

},{timestamps:true})

const Product = mongoose.model("Product" , productSchema)

export default Product




// mongoose.model(...)
// This is a Mongoose function used to create a Model based on a schema.

// A Model represents a collection in MongoDB and gives you access to query and manipulate the documents inside it.

// "Product"
// This is the name of the model.

// Mongoose will automatically convert this name to lowercase plural form to determine the collection name.

// So: "Product" → products (MongoDB collection)

//  productSchema
// This is the Schema object that you have previously defined using mongoose.Schema.

// It outlines the structure of the product documents (e.g., fields like name, price, image1, etc.).

