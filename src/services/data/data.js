import { useCallback, useEffect, useMemo, useState } from "react";
import DataContext from "./dataContext"
import { FETCH_DAY } from "../../hooks/config";
import axios from "axios"

const Data = ({children}) => { 
    const [start, setStart] = useState(false);
    const [live,setLive] = useState(null);
    const [results,setResults] = useState(null)
    const [users, setUsers] = useState([]);
    const [isClosed, setIsClosed] = useState(false);
    const [closed,setClosed] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [deposit, setDeposit] = useState([]);
    const [withdrawl, setWithdrawl] = useState([]);
    const [days, setDays] = useState([]);
    const [day,setDay] = useState({});
    const [winners,setWinners] = useState([]);
    let id = localStorage.getItem("section");
    const fetchCurrent = useCallback(() => {
      if (id === "null") {
        setStart(false);
        return;
      } else if (id !== "null") {
        id && !start &&
          axios
            .post(FETCH_DAY, { id: id })
            .then((e) => {
             if (e.status === 200 || 201) {
                setDay(e.data);
                setStart(true);
             }


            })
            .catch((e) => console.log(e) && setStart(false));
        // setStart(true);
      }
    }, [id]);
    useEffect(() => {
        console.log(id, start);
        !start && fetchCurrent();

    }, []);
    useEffect(()=>{
        day && day.closedNumber && setClosed(day.closedNumber.map((e)=>e.toString()));
        day && day.winNumber && setIsClosed(true);
        
    },[day,day?.winNumber]);
    
    const value = useMemo(()=>(
        {
            users,
            setUsers,
            transactions,
            setTransactions,
            deposit,
            setDeposit,
            withdrawl,
            setWithdrawl,
            days,
            setDays,
            day,
            setDay,
            start,
            setStart,
            live,
            setLive,
            results,
            setResults,
            closed,
            setClosed,
            winners,
            setWinners
         }
    ))
    return (
        <DataContext.Provider
         value={value}>
            {children}
        </DataContext.Provider>
    )
};
export default Data;
