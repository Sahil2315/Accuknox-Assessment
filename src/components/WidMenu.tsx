import { useContext, useState, useEffect, useRef } from "react"
import { ThemeContext, widMenuContext } from "../App"
import { useSelector } from "react-redux"
import { RootState } from "../utils/store"
import { widgetTS } from "../types"
import MenuItem from "./MenuItem"

const WidMenu = () => {
  let {theme} = useContext(ThemeContext)
  let {widMenu, toggleWidMenu} = useContext(widMenuContext)
  let catList = useSelector((state:RootState) => state.categories.value)
  let [currCat, resetCat] = useState<number>(0)
  let wrapperRef = useRef(null)
  function outsideClicker(ref: MutableRefObject<null>) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          toggleWidMenu(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  outsideClicker(wrapperRef)
  return (
    <div className={`${widMenu ? "" : "hidden"} cursor-pointer fixed top-0 w-full h-full backdrop-blur ${theme ? "bg-slate-800/50" : "bg-slate-400/50"}`}>
      <div ref={wrapperRef} className={`absolute cursor-default right-0 h-full w-[500px] ${theme ? "bg-slate-800" : 'bg-slate-300'}`}>
        <div className="w-full bg-blue-600 text-white text-sm mt-16 py-1 px-4">Customize Widgets</div>
        <div className="w-full px-3 mx-1 my-1 text-sm font-normal pb-2 ">Personalise your Dashboard</div>
        <div className="flex flex-row border-b border-slate-400">
          {
            catList?.map((item, index) => {
              return(
                <div key={index} onClick={() => {resetCat(index)}} className={`pb-4 cursor-pointer w-fit text-xs ${index == currCat ? theme ? "border-blue-400 border-b-2" : "border-blue-800 border-b-2" : ""} font-semibold px-4 ${index > 0 ? "" : "ml-4"}`}>
                  {item.name}
                </div>
              )
            })
          }
        </div>
        <div className="flex flex-col mt-4">
          {
            catList[currCat].widgets.map((item: widgetTS, index: number) => {
             return (
              <MenuItem key={index} catIndex={currCat} object={item} index={index} theme={theme} />
             )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default WidMenu