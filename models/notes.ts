import { model, models } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface Inote{
    title:string;
    discription:string;
}


const noteSchema = new Schema<Inote>({
    title: {type:String,required:true},
    discription: {type:String,required:true}
},{
    timestamps:true
})

export default models.notes  || model<Inote>("notes",noteSchema)