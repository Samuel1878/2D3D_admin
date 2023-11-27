import axios from "axios";
import { _2d_URL } from "./config";
import { useContext, useEffect } from "react";
import DataContext from "../services/data/dataContext";
const FetchLive = () => {
    const {setLive,setResults} = useContext(DataContext);
    
    useEffect(()=>{ 
        console.log("hook");
        axios.get(_2d_URL,{
            headers:{"Content-Type":"application/json"},
            params:{param:"live"}
        }).then((e)=>{
            (e.status===200||201) && setLive(e.data);
            
         }).catch((err)=>console.log(err));
        axios
          .get(_2d_URL, {
            headers: { "Content-Type": "application/json" },
            params: { param: "results" },
          })
          .then((e) => {
            (e.status === 200 || 201) && setResults(e.data);
          })
          .catch((err) => console.log(err));
         
    },[]);
}
export default FetchLive;