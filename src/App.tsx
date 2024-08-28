import Container from "./components/Container"
import { createContext, useState } from "react"

export let ThemeContext = createContext({})
export let newWidContext = createContext({})
export let changeWidContext = createContext({})
export let widMenuContext = createContext({})

export type widgetReference = {
  catIndex: number,
  widIndex: number
}

function App() {
  let [theme, toggleTheme] = useState<boolean>(false)
  let [newWidVisible, resetNewWid] = useState<boolean>(false)
  let [newWidCategory, setNewWidCat] = useState<number>(-1)
  let [changeWidVisible, resetChangeWid] = useState<boolean>(false)
  let [widRef, resetWidRef] = useState<widgetReference>({catIndex:-1, widIndex: -1})
  let [widMenu, toggleWidMenu] = useState<boolean>(false)
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <newWidContext.Provider value={{newWidVisible, resetNewWid, newWidCategory, setNewWidCat}}>
        <changeWidContext.Provider value={{changeWidVisible, resetChangeWid, widRef, resetWidRef}}>
          <widMenuContext.Provider value={{widMenu, toggleWidMenu}}>
            <Container />
          </widMenuContext.Provider>
        </changeWidContext.Provider>      
      </newWidContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
