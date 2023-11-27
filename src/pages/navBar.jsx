import { Card, CardActionArea, CardContent, CardMedia, Container, Typography } from "@mui/material";
import Clock from "react-live-clock";
const NavBar = () =>{
    return (
      <div className="navContainer">
        <Container style={{ padding: 10 }}>
          <Card component="div" style={{ background: "#4c4c4c" }}>
            <CardActionArea>
              {/* <CardMedia
                component="img"
                height="140"
                image="../../assets/logoCard.png"
              >
              </CardMedia> */}
            </CardActionArea>
            <CardContent>
              <Typography align="center">Server Time</Typography>
              <Typography align="center" color={"#b0b0b0"}>
                <Clock
                  format={"HH:mm:ss"}
                  ticking={true}
                  timezone={"Asia/Rangoon"}
                  blinking={true}
                />
              </Typography>

              <Typography align="center" sx={18}>
                {new Date().getDate() +
                  " /" +
                  parseInt(new Date().getMonth() + 1) +
                  " / " +
                  new Date().getFullYear()}
              </Typography>
              <p className="txt">Administration area @AA warning!</p>
            </CardContent>
          </Card>
        </Container>
        <ul className="navBox">
          <li className="navItem">
            <a className="navLink" href="/home">
              Home
            </a>
          </li>
          <li className="navItem">
            <a className="navLink" href="/home/server">
              Server
            </a>
          </li>
          <li className="navItem">
            <a className="navLink" href="/home/deposit">
              Deposit
            </a>
          </li>
          <li className="navItem">
            <a className="navLink" href="/home/withdrawl">
              Withdrawl
            </a>
          </li>
          <li className="navItem">
            <a className="navLink" href="/home/service">
              Service
            </a>
          </li>
          <li className="navItem">
            <a className="navLink" href="/setting">
              Setting
            </a>
          </li>
          <li className="navItem">
            <a className="navLink" href="/security">
              Security
            </a>
          </li>
        </ul>
      </div>
    );
}
export default NavBar;