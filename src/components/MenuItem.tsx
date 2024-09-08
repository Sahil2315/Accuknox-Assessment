import { useState } from "react"
import { useDispatch } from "react-redux"
import { toggleWidget } from "../utils/categorySlice"
import { widgetTS } from "../types"

type propTypes = {
    catIndex: number,
    index: number,
    object: widgetTS,
    theme: boolean
}

const MenuItem = ({catIndex, index, object, theme}: propTypes) => {
    let dispatch = useDispatch()
    let [checked, toggleChecked] = useState<boolean>(object.checked)
    function togglerWid(){
      let toggleObject = {
        catIndex: catIndex,
        widIndex: index,
        checked: !checked
      }
      dispatch(toggleWidget(toggleObject))
      toggleChecked(!checked)
    }
    return(
      <div className="px-4 text-xs py-2 border border-slate-500 m-2 rounded" key={index}>
        <label className="flex items-center">
          <input className={`mr-4 ${theme ? "accent-white" : "accent-black"}`} type="checkbox" checked={checked} onChange={togglerWid}/>
          <span>{object.name}</span>
        </label>
      </div>
    )
}

export default MenuItem