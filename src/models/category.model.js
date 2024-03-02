import mongoose,{Schema,model} from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Categories = model("category", categorySchema)