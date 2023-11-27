import {  Container, Typography,Stack, Button, Paper,Switch, ButtonGroup, TextField, Box, Card } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {DataGrid} from "@mui/x-data-grid"
import { serverColumns } from "../libs/data";
import { InstanceReq } from "../hooks/GETinstance";
import { CLOSESERVER, GET_DAYS, OPENSERVER, _2d_URL } from "../hooks/config";
import DataContext from "../services/data/dataContext";
import axios from "axios";
import $ from "jquery";
import SocketContext from "../services/socket/socketContext";
import { CHECK, FETCH_SERVER, PASSWINNER_SERVER, PAUSED_SERVER, RESUME_SERVER, WINNERS } from "../hooks/action";
import Buttons from "../components/btns";
import FetchLive from "../hooks/fetchLive";
import AddDialog from "../components/dialog";
import Winners from "../components/winners";


const Server = () =>{
    const {days,setDays,day,setDay,start,setStart,live,results,closed,setWinners,isClosed} = useContext(DataContext);
    const [openDia, setOpenDia] = useState(false);
    const {socket,cleanUp,socketId} = useContext(SocketContext);
    const [loading,setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [bet,setBet] = useState(true)
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const [maxVolume,setMaxVolume] = useState(10000000);
    const [checked, setChecked] = useState(false);
    FetchLive();
    let id = localStorage.getItem("section");
    
    useEffect(()=>{
       day && day.bets && Object.values(day.bets).map((e)=>{
            setTotal((prev)=> prev += e)
        });
        if (day.winNumber) {
          socket.emit(PAUSED_SERVER, { socketId: socketId, id: day._id });
          return;
        }
    },[day])
    useEffect(() => {
         const option = {
           method: "GET",
           url: GET_DAYS,
           params: { page: page },
           headers: {
             "Content-Type": "application/json",
           },
         };
         if (!start) {
           const res = InstanceReq(option);
           res
             .then((e) => {
               (e.status === 200 || 201) && setDays(e.data);
             })
             .finally(() => setLoading(true))
             .catch((i) => console.log(i) && setLoading(false));
             return;
         } 
         start && id!=="null"&& socket && socket.emit(FETCH_SERVER,id);
    },[start]);
    const closeServer = () => {
        axios.post(CLOSESERVER, {id:day?._id}).then((e)=>{
            (e.status === 200 || 201) && localStorage.setItem("section", null);
        })
    }
    const startFnc = () => {
        const response = axios.post(OPENSERVER, { maxVolume: maxVolume });
        response
          .then((e) => {
            if (e.status === 201 || 200) {
                console.log(start)
              setDay(e.data);
              setStart(!start);
              localStorage.setItem("section", e.data._id);
              return;
            }
            setDay([]);
          })
          .catch((e) => console.log(e));
    };
    const stopFnc = () => {
         closeServer();
        setStart(!start);
        
       
    };
    const PauseFnc = () => {
        socket.emit(PAUSED_SERVER, {socketId:socketId,id:day._id});
    };
    const ResumeFnc = () => {
        socket.emit(RESUME_SERVER, { socketId: socketId, id: day._id });
    };
    const betSwitch = (event) => {
      console.log(bet)
    };
    const handleCloseDia = () => {
        setOpenDia(false)
    };
    const handleOpenDia = () => {
        setOpenDia(true);
    };
    const checkHandler = () => {
        socket.emit(CHECK,{dayId:day._id});
        socket.off(WINNERS).on(WINNERS,(e)=>{
            setWinners(e);
            setChecked(true);

        })
      
    };
    const passHandler = () => {
       checked && socket.emit(PASSWINNER_SERVER,{dayId:day._id});
        
    };
    return (
      <div className="HomeCon">
        <AddDialog open={openDia} handleClose={handleCloseDia} />
        <Stack direction={"row"} className="rowCon">
          {/* <Button type="button" variant="outlined">
            Refresh
          </Button> */}
          {start ? (
            <Button type="button" variant="contained" onClick={stopFnc}>
              Stop
            </Button>
          ) : (
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="MaxVolume"
                variant="outlined"
                type="number"
                value={maxVolume}
                onChange={(event) => setMaxVolume(event.target.value)}
                defaultValue={maxVolume}
              />
              <Button
                type="button"
                variant="outlined"
                onClick={startFnc}
                style={{ padding: 15 }}
              >
                Start
              </Button>
            </Box>
          )}
        </Stack>
        <Container style={{ padding: 20 }}>
          <Box
            sx={{
              width: "100%",
              minWidth: "250",
              padding: 1,
              borderRadius: 1,
              bgcolor: "#4a4949",
              "&:hover": {
                bgcolor: "#383838",
              },
            }}
          >
            {live && (
              <Stack direction="row" className="rowCon">
                <div className="boxCon">
                  <Typography style={{ fontSize: 25 }}>
                    {live.liveResult}
                  </Typography>
                </div>
                <div className="boxBCon">
                  <div>
                    <Typography align="center">set</Typography>
                    <Typography>{live.liveSet}</Typography>
                  </div>
                  <div>
                    <Typography align="center"> value</Typography>
                    <Typography> {live.liveValue}</Typography>
                  </div>
                </div>
                {results && (
                  <>
                    <Stack direction={"column"} className="statusBox">
                      <Typography>12:00 PM</Typography>
                      <div className="dataBox">
                        <div>
                          <Typography align="center">R</Typography>

                          <Typography align="center">
                            {results.afResult}
                          </Typography>
                        </div>
                        <div>
                          <Typography align="center">I</Typography>
                          <Typography align="center">
                            {results.mInternet}
                          </Typography>
                        </div>
                        <div>
                          <Typography align="center">M</Typography>
                          <Typography align="center">
                            {results.mModern}
                          </Typography>
                        </div>
                      </div>
                      <div className="dataBox">
                        <div>
                          <Typography align="center">set</Typography>
                          <Typography>{results.afSet}</Typography>
                        </div>

                        <div>
                          <Typography align="center">value</Typography>
                          <Typography>{results.afValue}</Typography>
                        </div>
                      </div>
                    </Stack>
                    <Stack direction={"column"} className="statusBox">
                      <Typography>4:30 PM</Typography>
                      <div className="dataBox">
                        <div>
                          <Typography align="center">result</Typography>
                          <Typography align="center">
                            {results.evResult}
                          </Typography>
                        </div>
                        <div>
                          <Typography align="center">internet</Typography>
                          <Typography align="center">
                            {results.eInternet}
                          </Typography>
                        </div>
                        <div>
                          <Typography align="center">modern</Typography>
                          <Typography align="center">
                            {results.eModern}
                          </Typography>
                        </div>
                      </div>
                      <div className="dataBox">
                        <div>
                          <Typography align="center">set</Typography>
                          <Typography>{results.evSet}</Typography>
                        </div>

                        <div>
                          <Typography align="center">value</Typography>
                          <Typography>{results.evValue}</Typography>
                        </div>
                      </div>
                    </Stack>
                    <div>
                      <Typography>
                        Current:
                        {results.mRound ? "Morning(12 PM)" : "Evening(4 PM)"}
                      </Typography>
                      <Typography>Round:{results.round}</Typography>
                      <Typography style={{ color: "#fff" }}>
                        Market status:{" "}
                        {live.marketStatus ? live.marketStatus : "Closed"}
                      </Typography>
                      <Typography style={{ color: "#fff" }}>
                        Calender: {live.isWeekend ? "holiday" : "Availiable"}
                      </Typography>
                      <Typography style={{ color: "#fff" }}>
                        Current Date: {live.currentDate}
                      </Typography>
                      <Typography style={{ color: "#fff" }}>
                        Current time: {live.currentTime}
                      </Typography>
                    </div>
                  </>
                )}
              </Stack>
            )}
          </Box>
        </Container>

        <Container>
          {start ? (
            <Container>
              <Stack direction="row" className="rowCon">
                <div className="boxCon">
                  <Typography>
                    {day?.date + "/" + day?.month + "/" + day?.year}
                  </Typography>
                  <Typography className="txt1">
                    {day?.section === "af" ? "12:00 PM" : "4:30 PM"}
                  </Typography>
                </div>
                <Stack direction="column" className="statusBox">
                  <div className="border rounded-0">
                    <Typography className="txt1">
                      status: {day?.status ? "Open" : "Closed"}
                    </Typography>
                    <Typography>ID:{day?._id}</Typography>
                    {day && day.investors && (
                      <Typography>
                        Currently investor:
                        {Object.keys(day.investors).length || 0}
                      </Typography>
                    )}
                    <Typography>
                      Sold tickets: {day?.sold.length || 0}
                    </Typography>
                  </div>
                </Stack>
                <div className="boxBCon">
                  <Typography> {total}</Typography>
                  <p>/</p>
                  <Typography>{day?.maxVolume}</Typography>
                </div>

                <Stack className="statusBox">
                  <div className="closedCon">
                    {closed.map((e) => {
                      return (
                        <div className="closedNumbers">
                          <Typography>{e}</Typography>
                        </div>
                      );
                    })}
                  </div>
                </Stack>
              </Stack>
              <Stack direction={"row"} className="btnCon">
                {day.winNumber && (
                  <div>
                    <Typography
                      style={{ fontSize: 22, color: "rgb(220,169,17)" }}
                    >
                      {day.winNumber}
                    </Typography>
                  </div>
                )}
                {checked ? (
                  <i class="fa-solid fa-circle-check"></i>
                ) : (
                  <Typography color={"red"}>Not checked!</Typography>
                )}
                <Button variant="contained" onClick={handleOpenDia}>
                  Add Winner
                </Button>
                <Button variant="contained" onClick={checkHandler}>Check</Button>
                <Button variant="contained" onClick={ResumeFnc} disabled={isClosed}> 
                  Resume
                </Button>
                <Button variant="contained" onClick={PauseFnc} disabled={isClosed}>
                  Pause
                </Button>
                <Button variant="contained" onClick={passHandler}>Pass Winners</Button>
              </Stack>
              { checked &&
                <div className="container">
                    <Winners/>
                </div>
              }
        
              <Paper variant="elevation" style={{ background: "#4a4949" }}>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                  style={{ flexWrap: "wrap" }}
                  className="buttonGpCon"
                  size="large"
                >
                  {start &&
                    day &&
                    day.bets &&
                    Object?.entries(day?.bets)?.map(([value, key]) => {
                      const lHeight = (
                        (key / (day.maxVolume / 100)) *
                        100
                      ).toString();
                      let bgColor = "none";

                      return <Buttons value={[value, key, lHeight, bgColor]} />;
                    })}
                </ButtonGroup>
              </Paper>
            </Container>
          ) : (
            <Container>
              <Paper variant="elevation" style={{ background: "#4a4949" }}>
                <DataGrid
                  rows={days}
                  columns={serverColumns}
                  getRowId={(e) => e._id}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 20, 50]}
                  checkboxSelection
                />
              </Paper>
            </Container>
          )}
        </Container>
      </div>
    );
}
export default Server;