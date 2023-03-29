import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import Image from "next/image";
import { format } from 'date-fns'


export type Data = {
  title: string;
  note: string;
  date: string
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data : object): void => {
    console.log(data);
    let date = format(new Date(), 'dd MMMM yyyy')
    let item : Data= {
      title,
      note,
      date
    }
    addNote(item)
  };

const [finalData, setFinalData] = useState<Data[]>([
      {
        title:'Что-то напишу',
        note:'Моя первая заметка! 😃😃😃',
        date: '21 March 2023'
      }
    ]);
  
  const addNote = (item : Data) =>{
    setFinalData([...finalData, item]) 
 
    let newData = Array.from(finalData)
    newData.push(item)
    localStorage.setItem("note", JSON.stringify(newData));
  }

  // useEffect(() => {
  //   localStorage.setItem("note", JSON.stringify(finalData));
  // }, [finalData]);

  useEffect(() => {
    const note = JSON.parse(localStorage.getItem('note') || " ");
    if (note) {
      setFinalData(note);
    }
  }, []);

 
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex w-1/2 justify-center">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-fit md:justify-end items-center bg-gray-200 p-6 pb-2 rounded-md lg:mb-10 mb-4 relative"
    >
       <Image
              src="https://avatanplus.com/files/resources/original/5a6cdf1ebc2fb16139479033.png"
              alt="Red image"
              className="absolute -top-4"
              width={60}
              height={60}
            />
      <input
        {...register("title", { required: true })}
        defaultValue={title}
        placeholder="Title"
        className="pl-2 rounded-md py-1 bg-white border border-solid border-slate-600 text-black"
        onChange={(event) => setTitle(event.target.value)}
      ></input>
      {errors.title && (
        <span className="flex text-sm text-black font-semibold">
          This field is required 👆
        </span>
      )}

      <input
        {...register("note")}
        defaultValue={note}
        placeholder="Your message...✏️"
        className="pl-2 rounded-md py-1 bg-white border border-solid border-slate-600 text-black pb-20"
        onChange={(e) => setNote(e.target.value)}
      ></input>

      <input
        type="submit"
        className="bg-pink-600 rounded-md shadow-md p-2 hover:bg-orange-600"
        ></input>
    </form>
    </div>

    <div className="flex flex-row flex-wrap w-full lg:p-0 md:justify-start m-auto justify-center p-8 mb-10">
      { 
      finalData.length !==0 && finalData.map(m =>  
           <div className="flex flex-row lg:w-1/3 w-full md:p-4">
              <div id={v4()} className=" flex flex-col m-4 box-border w-full h-max bg-white color-black p-2 rounded-md">
                <p contentEditable="true" className="text-3xl box-border font-bold text-pink-600 pb-4">{m.title}</p>
                <p contentEditable="true" className="text-md box-border font-thin text-black h-40 border-2 border-solid border-orange-600 rounded-md bg-yellow-50 p-2">{m.note ? m.note : "..."}</p>
                <p contentEditable="true" className="text-orange-600 box-border w-full text-center">{m.date}</p>
              </div>
            </div>
            )}
            </div>
    </div>
   

)};

export default Form;
