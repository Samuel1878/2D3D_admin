import { useState } from "react";
import SocketContext from "./socketContext"
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useContext } from "react";
import AuthContext from "../auth/authContext";
import { SOCKET_URL } from "../../hooks/config";
import { DISCONNECT, FETCH_ADMIN, RECEIVE_ADMIN, UPDATED_ADMIN } from "../../hooks/action";
import DataContext from "../data/dataContext";

const Socket = ({ children }) => {
    const [socket , setSocket] = useState(null);
    const {userToken} = useContext(AuthContext);
    const [socketId, setSocketId] = useState(null);
    const {setDay} = useContext(DataContext);
     useEffect(() => {
        cleanUp();
     },[]);
      useEffect(() => {
        if (userToken) {
          const Socket = socket || connect();
          Socket && Socket.emit(FETCH_ADMIN, userToken);
          return;
        }
        cleanUp();
      }, [userToken,socket]);
    const cleanUp = () => {
        socket && socket.emit(DISCONNECT);
        socket && socket.close();
        setSocket(null);
    
    };
    const connect = () => {
        const opts = {
          transports: ["websocket"],
          reconnectionDelayMax: 10000,
          cors: {
            origin: "http://localhost:8080",
          },
        };
        console.log(userToken);
        const socket = io(SOCKET_URL,opts);
        setSocket(socket);
        connectionCallBack(socket);
        return socket;
    };
    const connectionCallBack = (socket) => {
        socket.off(RECEIVE_ADMIN).on(RECEIVE_ADMIN, ({socketId})=>{
           setSocketId(socketId);
            
            

        });
        socket.off(UPDATED_ADMIN).on(UPDATED_ADMIN, (Day)=>{
            setDay(Day)
        })
    };
   
  return <SocketContext.Provider
            value={{socket,cleanUp,socketId}}
            >
                {children}
        </SocketContext.Provider>;
};
export default Socket;