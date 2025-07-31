import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    cartData:{
        type:Object,
        default:{}
    }
},{timestamps:true , minimize:false})

const User = mongoose.model("User",userSchema)

export default User



// mongoose.model(...)
// This function is part of the Mongoose library.

// It is used to create a model that interacts with a MongoDB collection.

// A model is like a constructor for documents that follow a specific schema.

// ✅ "User"
// This is the name of the model.

// Mongoose automatically maps this to a MongoDB collection name by:
// Lowercasing it → "user"
// Pluralizing it → "users
// So this model will be tied to the users collection in your MongoDB database.
// ✅ userSchema
// This is the schema definition you created earlier using new mongoose.Schema({...}).
// It defines the structure and rules for user documents, such as fields like:
// name
// email
// password
// cartData, etc.