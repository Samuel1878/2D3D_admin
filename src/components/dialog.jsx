import { useContext, useState } from "react";
import DataContext from "../services/data/dataContext";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import SocketContext from "../services/socket/socketContext";
import { ADDWINNER_NUMBER } from "../hooks/action";

const AddDialog = (props) => {
    const {day} = useContext(DataContext);
    const {socket} = useContext(SocketContext);
    const [luckyNumber,setLuckyNumber] = useState("");
    const addWinner = () => {
        console.log(luckyNumber);
        luckyNumber.length=== 2&& socket.emit(ADDWINNER_NUMBER, {dayId:day._id,number:luckyNumber});
        props.handleClose();
        
    }
    return (
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add lucky number</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add the winner or lucky number of the day, ID: {day._id}, 
            please input the two valid digit pair in the below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="luckyNumber"
            label="Number"
            type="number"
            fullWidth
            variant="standard"
            value={luckyNumber}
            onChange={(e)=>setLuckyNumber(e.target.value)}
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={addWinner}>Add</Button>
        </DialogActions>
      </Dialog>
    );
};
export default AddDialog;