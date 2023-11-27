import { Button, Container, Typography } from "@mui/material";
import { memo, useContext, useEffect, useState } from "react";
import axios from "axios"
import { CLOSENUMBER, OPENNUMBER } from "../hooks/config";
import DataContext from "../services/data/dataContext";
const Buttons = (props) => {
    let [value,key,lHeight,bgColor] = props.value;
    const {day,closed} = useContext(DataContext);
    const [clicked, setClicked] = useState(false);
    // const [color, setColor] = useState("black");
    function clickFnc() {
      setClicked(!clicked);
      clicked
        ? axios
            .post(OPENNUMBER, { number: value, dayId: day._id })
            .then((e) => {
              (e.status === 200 || 201) && console.log(e.data);
            })
        : axios
            .post(CLOSENUMBER, { number: value, dayId: day._id })
            .then((e) => {
              (e.status === 200 || 201) && console.log(e.data);
            });
    }
   useEffect(()=>{
    setClicked(closed.includes(value.toString()))
   },[closed])
    return (
      <Button
        className={["btnQ", "Btn"]}
        onClick={clickFnc}
        style={{
          flexDirection: "column",
          backgroundColor: clicked ? "#000" : "transparent",
          zIndex: 9,
        }}
      >
        <Typography>{value}</Typography>
        <Typography>{key}</Typography>

        <Container
          className="btnAfter"
          style={{
            height: `${parseInt(lHeight) >= 100 ? "100" : lHeight}%`,
            backgroundColor: lHeight >= 100 ? "rgb(245,161,11)" : "rgb(233,205,30)",
          }}
        ></Container>
      </Button>
    );
}
export default memo(Buttons);