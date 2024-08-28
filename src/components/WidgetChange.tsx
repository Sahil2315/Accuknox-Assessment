import { MutableRefObject, useContext, useEffect, useRef, useState } from "react"
import { ThemeContext } from "../App"
import { changeWidContext } from "../App"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../utils/store"
import { changeWidget } from "../utils/categorySlice"

const WidgetChange = () => {
    let {theme} = useContext(ThemeContext)
    let {changeWidVisible, resetChangeWid, widRef, resetWidRef} = useContext(changeWidContext)
    let wrapperRef = useRef(null)
    let catList = useSelector((state: RootState) => state.categories.value)
    function outsideClicker(ref: MutableRefObject<null>) {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              resetChangeWid(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }
    let dispatchWD = useDispatch()
    outsideClicker(wrapperRef)

    useEffect(() => {
      localStorage.setItem("categories-local", JSON.stringify(catList))
    }, [catList])
    
    let nameRef = useRef<HTMLInputElement>(null)
    let textRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
      nameRef.current.value = catList[widRef.catIndex]?.widgets[widRef.widIndex].name
      textRef.current.value = catList[widRef.catIndex]?.widgets[widRef.widIndex].text
    }, [widRef])
    
    function submitChanges(){
      let changeObject = {
        name: nameRef.current?.value,
        text: textRef.current?.value,
        checked: true,
        widIndex: widRef.widIndex,
        catIndex: widRef.catIndex
      }
      dispatchWD(changeWidget(changeObject))
      resetChangeWid(false)
      resetWidRef({
        catIndex: -1,
        widIndex: -1
      })
    }
  return (
    <div className={`${changeWidVisible ? "": "hidden"} cursor-pointer fixed top-16 flex justify-center items-center h-full w-full z-20 backdrop-blur ${theme ? "bg-black/50" : "bg-slate-400/50"} `}>
        <div ref={wrapperRef} className={`${theme ? "bg-slate-800": "bg-slate-100"} z-30 w-2/3 cursor-default relative p-4 rounded-xl shadow-2xl`}>
            <span className="text-2xl">Edit or Update this Widget {`(${catList[widRef.catIndex]?.name})`}:</span>
            <div className="flex flex-col mt-4">
                <span>Widget Name:</span>
                <input ref={nameRef} defaultValue={catList[widRef.catIndex]?.widgets[widRef.widIndex].name} className={`border rounded px-2 py-1 ${theme ? "bg-slate-800" : ""}`} type="text" />
            </div>
            <div className="flex flex-col mt-2">
                <span>Widget Content:</span>
                <textarea ref={textRef} rows={12} defaultValue={catList[widRef.catIndex]?.widgets[widRef.widIndex].text} className={`border rounded px-2 py-1 ${theme ? "bg-slate-800" : ""}`}></textarea>
            </div>
            <div className="flex justify-center items-center mt-4">
              <button onClick={submitChanges} className="bg-blue-400 text-white hover:bg-violet-400">Submit</button>
            </div>          
            <button onClick={() => {resetChangeWid(false)}} className="absolute transition-colors duration-500 right-2 bg-rose-400 text-2xl py-2 px-4 text-white top-2 hover:bg-rose-600">X</button>
        </div>
    </div>
  )
}

export default WidgetChange