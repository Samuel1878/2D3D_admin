import { useState } from "react";
import LocalContext from "./localContext";

const Local = ({children}) => {
    const [lang, setLang] = useState("en");
    const [theme, setTheme] = useState("dark");
    const [detail,setDetail] = useState(null);
    const [edit,setEdit] = useState(null);
    return(
        <LocalContext.Provider
         value={{
            lang,
            setLang,
            theme,
            setTheme,
            detail,
            setDetail,
            edit,
            setEdit
         }}>
            {children}
        </LocalContext.Provider>
    )
}
export default Local;