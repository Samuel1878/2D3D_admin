import { Button, Container, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import LocalContext from "../services/localization/localContext";
import axios from "axios";
import { ADDMONEY } from "../hooks/config";
import AuthContext from "../services/auth/authContext";

const EditPage = () => {
    const {edit} = useContext(LocalContext);
    const {userToken} = useContext(AuthContext)
    const confirmFnc = () => {
        let obj = {
          userId: edit.id,
          amount: edit.amount,
          userToken: userToken,
          receiptID:edit._id
        };
        axios.post(ADDMONEY,obj).then((e)=>{
            console.log(e.data.message);
        })
    };
    return (
      <Container
        style={{ background: "#4a4949", minHeight: 745, borderRadius: 5 }}
      >
        <Typography>ID: {edit._id}</Typography>
        <Typography>Date: {edit.createdAt}</Typography>
        <Typography>Owner ID: {edit.id}</Typography>
        <Typography>Method: {edit.method}</Typography>
        <Typography>Name: {edit.name}</Typography>
        <Typography>Phone: {edit.phone}</Typography>
        <Typography>Amount: {edit.amount}</Typography>
        <Typography>One Time Code: {edit.oneTimeNo}</Typography>
        <Typography>Status: {edit.status}</Typography>
        <Stack
         direction={"row"}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput 
                defaultValue={edit.amount}
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
          <div className="BtnCon">
            <Button
                onClick={confirmFnc}
                variant="contained">
                Confirm
            </Button>
          </div>
        </Stack>
      </Container>
    );
}
export default EditPage;