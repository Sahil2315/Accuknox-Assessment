import { useContext, useEffect } from 'react'
import { ThemeContext } from '../App'
import { useSelector } from 'react-redux'
import { categoryTS, widgetTS } from '../types'
import { RootState } from '../utils/store'
import { newWidContext } from '../App'
import { changeWidContext } from '../App'

const Categories = () => {
    let {theme} = useContext(ThemeContext)
    let {resetNewWid, setNewWidCat} = useContext(newWidContext)
    let {resetChangeWid, resetWidRef} = useContext(changeWidContext)
    let catList: categoryTS[] = useSelector((state: RootState) => state.categories.value)
    function newWidFunction (index: number){
        setNewWidCat(index)
        resetNewWid(true)
    }
    useEffect(() => {
        localStorage.setItem("categories-local", JSON.stringify(catList))
    }, [catList])
    function changeWidFunction(catIndex: number, widIndex: number){
        resetWidRef({
            catIndex: catIndex,
            widIndex: widIndex
        })
        resetChangeWid(true)
    }   
    return (
        <div className='flex flex-col mx-4'>
            {
                catList.map((item: categoryTS, outerIndex: number) => {
                    let widList = item.widgets
                    return(
                        <div key={outerIndex} className={`mx-6 flex flex-col rounded ${outerIndex >0 ? "mt-8": ""}`}>
                            <span className='text-lg font-semibold'>{item.displayName}</span>
                            <div className='flex text-md flex-row flex-wrap my-2'>
                                {
                                    widList.map((item: widgetTS, index: number) => {
                                        return(
                                            <div onClick={() => {changeWidFunction(outerIndex, index)}} key={index} className={`container ${item.checked ? '' : 'hidden'} flex flex-col ${theme ? "bg-slate-800 shadow-gray-800" : "bg-white shadow-slate-300" } py-2 px-3 rounded-lg w-[30%] h-[220px] overflow-y-scroll ${index > 0 ? "ml-6": ""} ${index > 2? "mt-2" : ""} shadow-lg hover:shadow-none cursor-pointer`}>
                                                <div className='font-semibold'>{item.name}</div>
                                                <div className='text-sm mt-2'>{item.text}</div>
                                            </div>
                                        )
                                    })
                                }
                                <div onClick={() => {newWidFunction(outerIndex)}} className={`flex cursor-pointer items-center justify-center ${theme ? "bg-slate-800 shadow-gray-800" : "bg-white shadow-slate-300" } px-16 py-20 ml-6 my-4 rounded-lg shadow-lg hover:shadow-none`}>
                                    <div className={`text-slate-400 font-normal border ${theme ? "border-slate-600" : "border-slate-200"} px-2 py-1 rounded-lg`}>
                                        <span className='mr-1'>+</span> Add Widget
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Categories