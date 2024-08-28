import logo from "../assets/logo.png"
import ThemeSelect from './ThemeSelect'
import '../App.css'
import { ThemeContext, widMenuContext } from "../App"
import { useContext, useEffect } from "react"
import Categories from "./Categories"
import NewWidget from "./NewWidget"
import WidgetChange from "./WidgetChange"
import WidMenu from "./WidMenu"

const Container = () => {
  let {theme, toggleTheme} = useContext(ThemeContext)
  let {toggleWidMenu} = useContext(widMenuContext)
  return (
    <div className={`w-full relative duration-500 transition-colors ${theme? "text-white": "text-black"} ${theme? "bg-slate-700": "bg-slate-200"}`}>
      <div className='flex flex-col w-full z-20 fixed top-0' >
        <div className='flex items-center justify-center font-medium bg-blue-950 py-2 text-white '>
          <img className='h-12' src={logo} alt="Accuknox Logo"/>
          <span className='ml-4 text-3xl mt-1'>Assessment</span>
          <ThemeSelect/>
        </div>
      </div>
      <div className=" mt-16 text-xl font-semibold mb-4 w-full pt-4 relative px-8">
        <span>CNAPP Dashboard</span>
        <button onClick={() => toggleWidMenu(true)} className={`${theme ? "bg-blue-800 hover:bg-indigo-600" : "bg-white hover:bg-blue-200"} shadow-lg text-sm font-medium p-2 float-right`}>{"< Widgets"}</button>
      </div>
      <Categories />
      <NewWidget />
      <WidgetChange />
      <WidMenu />
    </div>
  )
}

export default Container