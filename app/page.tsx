"use client"

import { useEffect, useState } from "react";

interface Note{
  _id:string,
  title:string,
  discription:string
}

export default function Home() {
  const [allNotes,setAllNotes] = useState<Note[]>([])
  const [title,setTitle] = useState("")
  const [discription,setDiscription] = useState("")
  const [updateClickStatus,setUpdateClickStatus] = useState(false)
  const [updateNoteId,setUpdateNoteId] = useState(" ")

  console.log(allNotes);

  useEffect(()=>{
    fetchNotes()
  },[])
  
  const fetchNotes = async()=>{
    const res = await fetch('/api/notes')
    setAllNotes(await res.json())
  }

  const addNote = async ()=>{
    if(!title || !discription){
      alert("Fill the form Completely")
    }else{
      // api call
      const noteDetails = {title,discription}
      const res = await fetch(`/api/notes`,{
        method:"POST",
        body:JSON.stringify(noteDetails)
      })
      if(res.status==201){
        alert("Notes added successfully")
        setTitle("")
        setDiscription("")
        fetchNotes()
      }
    }
  }

    const viewNote = async (id:string)=>{
    const result = await fetch(`api/notes/${id}`)
    const noteDetails= await result.json()
    setTitle(noteDetails.title)
    setDiscription(noteDetails.discription)
    setUpdateClickStatus(true)
    setUpdateNoteId(id)
  }

  const UpdateNote = async ()=>{
    if(!title || !discription){
      alert("Fill the form Completely")
    }else{
      // api call
      const noteDetails = {title,discription}
      const res = await fetch(`/api/notes/${updateNoteId}`,{
        method:"PUT",
        body:JSON.stringify(noteDetails)
      })
      alert("Note Updated successfully")
        setTitle("")
        setDiscription("")
        setUpdateClickStatus(false)
        fetchNotes()
    }
  }

  const removeNote = async (id:string)=>{
    const res = await fetch(`api/notes/${id}`,{
      method:"DELETE"
    })
    const noteDetails= await res.json()
    alert("Note Removed!!!")
    fetchNotes()
  }


  return (
    <>
     <main className="min-h-screen bg-gray-100 p-10">
      <div className="border-4 rounded-2xl max-w-xl mx-auto border-gray-500 p-6 shadow-gray-500 shadow-2xl text-gray-400">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-5">Note Manager</h1>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="border w-full rounded-2xl m-2 p-2" type="text" placeholder="Title" />
        <textarea value={discription} onChange={e=>setDiscription(e.target.value)} className="border w-full rounded-2xl m-2 p-2" placeholder="Note"></textarea>
        <div>
          {
            updateClickStatus ?
            <button onClick={UpdateNote} className="bg-red-500 p-3 rounded-xl m-2 font-bold text-black">UPDATE NOTE</button>
            :
            <button onClick={addNote} className="bg-green-500 p-3 rounded-xl m-2 font-bold text-black">ADD NOTE</button>
          }
          
        </div>
        <div className="mt-6 space-y-6">
          {/* notes to be duplicated */}
          {
            allNotes?.length>0 ?
             allNotes?.map((note:Note)=>(
              <div key={note?._id} className="border border-gray-300 p-2 m-2 rounded-xl flex flex-col text-black">
                <h4 className="text-lg font-bold">{note?.title}</h4>
                <p>{note?.discription}</p>
                <div className="flex justify-start">
                  <button onClick={()=>viewNote(note._id)} className="rounded-xl mt-1 text-green-500 font-bold">Update</button>
                  <button onClick={()=>removeNote(note._id)} className="rounded-xl mt-1 ms-3  text-red-500 font-bold">Delete</button>
                </div>
               </div>
             ))
             :
             <p className="text-black font-bold text-center">Nothing to Display....</p>
          }
        </div>
      </div>
     </main>
    </>
  );
}
