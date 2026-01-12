import { connectDB } from "@/lib/mongodb";
import notes from "@/models/notes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{ params : Promise <{id: string}>}) {
    try{
        await connectDB()
        const {id} = await params
        const noteDetails = await notes.findById({_id:id})
        // send response client
        return NextResponse.json(noteDetails,{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
    
}

// updating a note
export async function PUT(req:NextRequest,{params}:{params:Promise <{id: string}>}) {
    try{
        await connectDB()
        const {id} = await params
        const reqBody = await req.json()
        const updateNoteDetails = await notes.findByIdAndUpdate({_id:id},reqBody,{new:true})
        // send response client
        return NextResponse.json(updateNoteDetails,{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
    
}

// delete a note
export async function DELETE(req:NextRequest,{params}:{params : Promise <{id: string}>}) {
    try{
        await connectDB()
        const {id} = await params
        const removeNoteDetails = await notes.findByIdAndDelete({_id:id})
        // send response client
        return NextResponse.json(removeNoteDetails,{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
    
}