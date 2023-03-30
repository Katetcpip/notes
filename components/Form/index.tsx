import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import Image from "next/image";
import { format } from 'date-fns'
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "@/components/Themes.js";
import { lightTheme, darkTheme } from "@/components/Themes.js";
import ContentEditable from 'react-contenteditable'


export type Data = {
  title: string;
  note: string;
  date: string;
  id: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data : object): void => {
    console.log(data);
    let item : Data= {
      title,
      note,
      date,
      id: v4()
    }
    addNote(item)
  };

  useEffect(() => {
    const item = localStorage.getItem('theme')
    console.log(item)
    item !== null ? setTheme(item) : setTheme("dark")
  }, [])

  const [theme, setTheme] = useState('dark');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
    theme === "light"
      ? localStorage.setItem("theme", "dark")
      : localStorage.setItem("theme", "light");
    
}

  const [finalData, setFinalData] = useState<Data[]>([]);
  
  const addNote = (item : Data) : void => {
    setFinalData([...finalData, item]) 
    let newData : Data[] = Array.from(finalData)
    newData.push(item)
    localStorage.setItem("note", JSON.stringify(newData));
  }

  const deleteNote = (id : string) : void => {
    let newData : Data[] = Array.from(finalData)
    const filteredcards: Data[] = newData.filter(it => it.id !== id);
    setFinalData(filteredcards) 
    localStorage.setItem("note", JSON.stringify(filteredcards));
  }

  const sortByDateDown = () : void =>{
    let newData = Array.from(finalData)
    newData = newData.sort(function(a, b){
    let dateA  = new Date(a.date).valueOf(), 
        dateB = new Date(b.date).valueOf()
    return dateA - dateB //сортировка по возрастающей дате
    })
    setFinalData(newData)
    localStorage.setItem("note", JSON.stringify(newData));
  }

  const sortByDateUp = () => {
    let newData : Data[]= Array.from(finalData)
    newData = newData.sort(function(a, b){
    let dateA=new Date(a.date).valueOf(), 
        dateB=new Date(b.date).valueOf()
    return dateB-dateA //сортировка по возрастающей дате
    })
    setFinalData(newData)
    localStorage.setItem("note", JSON.stringify(newData));
  }

  useEffect(() => {
    const note = JSON.parse(localStorage.getItem('note')  || 'null');
    if (note !== null) {
      setFinalData(note);
    }
  }, []);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyles/>
    <div className="flex w-full justify-end">
        <button className="text-3xl p-2 w-fit" onClick={themeToggler}>🌗</button>
    </div>

    <div className="flex flex-col justify-center w-full flex-wrap items-center">
      <p className="md:text-5xl text-3xl pb-4">📝</p>
      <p className="font-semibold md:text-5xl text-3xl text-white mb-8">NOTE SOMETHING?</p>
    </div>

    <div className="flex flex-col w-full items-center">
      <div className="flex w-1/2 justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={theme === 'light' 
            ? "flex flex-col gap-3 w-fit md:justify-end items-center bg-yellow-50 p-6 pb-2 rounded-md lg:mb-10 mb-4 relative"
            : "flex flex-col gap-3 w-fit md:justify-end items-center bg-gray-200 p-6 pb-2 rounded-md lg:mb-10 mb-4 relative"}
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
            <span className="flex text-sm text-black font-semibold text-xs">
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

          <input defaultValue="📅" 
          type = "date"
          {...register("date", { required: true})}
          onChange={(e) => { 
            let a =  format(new Date(e.target.value), 'dd MMMM yyyy');
            setDate(a)}
          }      
          className="bg-white text-slate-400 pl-2 rounded-md p-1 w-full border border-solid border-black"> 
          </input>
          {errors.date && (
            <span className="flex text-sm text-black font-semibold text-xs">
              This field is required 👆
            </span>
          )}

          <button
            type="submit"
            className="bg-pink-600 rounded-md shadow-md p-2 hover:bg-orange-600 px-4"
            >ADD
          </button>      
        </form>
    </div>

    <div className="flex flex-row flex-wrap w-full lg:p-0 md:justify-start m-auto justify-center p-8 mb-10">
      <div className="w-full flex flex-row justify-end">
        <button className="bg-orange-600 rounded-md shadow-md p-1 m-1">
          To edit touch the field
        </button>
        
        <button
          className="bg-pink-600 rounded-md shadow-md p-2 hover:bg-orange-600 m-1" 
          onClick={() => sortByDateDown()}>
            NEW
        </button>

        <button
          className="bg-pink-600 rounded-md shadow-md p-2 hover:bg-orange-600 m-1 mr-2"
          onClick={() => sortByDateUp()}>
            OLD
        </button>
      </div>

      {finalData.length === 0 && 
          <div className="min-h-fit flex justify-center items-center mt-8 mb-8 m-auto">
            <h1 className="md:text-xl text-md font-semibold text-white text-center">You don't have active notes</h1>
          </div>}

        {finalData.length !==0 && finalData.map(m =>  
            <div id={v4()} className="flex flex-row lg:w-1/3 w-full md:p-4">
                <div id={v4()} className={theme === "light" 
                  ? "flex flex-col m-4 box-border w-full h-max bg-yellow-50 color-black p-2 rounded-md"
                  : "flex flex-col m-4 box-border w-full h-max bg-gray-100 color-black p-2 rounded-md"}>

                <div id={v4()} className="w-full flex flex-row ">
                  <ContentEditable  
                    className="md:text-3xl text-2xl box-border font-bold text-pink-600 pb-4 w-2/3"
                    disabled={false}      
                    onChange={(e) => {
                      m.title = e.target.value
                      localStorage.setItem('note',  JSON.stringify(finalData))}}
                    html={m.title}
                  />
                  <p className="md:text-md text-xs text-orange-600 box-border w-fit m-auto p-1 text-end rounded-xl bg-pink-200 mb-4 cursor-pointer">{m.date}</p>
                </div>

                <ContentEditable 
                  className="text-md box-border font-thin text-black h-40 border-2 border-solid border-orange-600 rounded-md bg-white p-2"
                  disabled={false}      
                  onChange={(e) => {
                    m.note = e.target.value
                    localStorage.setItem('note',  JSON.stringify(finalData))}}
                  html={m.note ? m.note : "..."}
                  />
                <div id={v4()} className="w-full flex justify-between gap-3 mt-2">
                  <button className="p-2 w-full  flex justify-end"
                    onClick={() => deleteNote(m.id)}>
                      <img alt="" src="https://pngicon.ru/file/uploads/128_16_2.png" className="h-10 hover:scale-110"/>
                  </button>
                </div>
                </div>
            </div>
          )}
      </div>
    </div>
    </ThemeProvider>
)};

export default Form;
