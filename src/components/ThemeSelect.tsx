import Sun from "../assets/sunSVG.svg"
import Moon from "../assets/moonSVG.svg"
import { ThemeContext } from "../App"
import { useContext, useEffect } from "react"
export default function ThemeSelect(){
    let {theme, toggleTheme} = useContext(ThemeContext)

    return(
        <div className="absolute top-2 right-6 flex flex-row">
            <button onClick={() => toggleTheme(!theme)} className={`duration-500 transition-colors h-6 w-16 relative flex flex-row items-center cursor-pointer px-1 rounded-xl mt-3 ${theme? "bg-slate-700" : "bg-amber-200"} mr-4`}>
                <div className={`duration-500 transition-colors h-5 w-5 absolute rounded-xl ${theme? "right-1 bg-indigo-200": "left-1 bg-yellow-500"}`}>

                </div>
            </button>
            <img className={`w-[30px] mt-2 ${theme? "hidden": ""}`} src={Sun} />
            <img className={`w-[30px] mt-2 ${theme? "": "hidden"}`} src={Moon}/>
        </div>
    )
}