import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DataContext from "../services/data/dataContext";
import { DEPOSIT } from "../hooks/config";
import { InstanceReq } from "../hooks/GETinstance";
import { depositCol } from "../libs/data";
import LocalContext from "../services/localization/localContext";
import { useNavigate } from "react-router-dom";

const DepositPage = () => {
  const {deposit,setDeposit} = useContext(DataContext);
  const {setEdit} = useContext(LocalContext);
  const [volume, setVolume] = useState(0);
  const [pendingV,setPendingV] = useState(0);
  const [page,setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
   const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };
   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(+event.target.value);
     setPage(0);
   };
  useEffect(()=>{
     const option = {
       method: "GET",
       url:DEPOSIT ,
       params: { page: page },
       headers: {
         "Content-Type": "application/json",
       },
     };
     const res = InstanceReq(option);
     res.then((e)=>{
     if( e.status===200){
     setDeposit(e.data)
      }
     }).catch((e)=>console.log(e))
  },[]);
  useEffect(()=>{
    if(deposit){
      const pending = deposit.filter((e) => e.status === "pending");
      setPendingV(pending.length);
      const successed = deposit.filter((e) => e.status === "success");
      let Suc = 0;
      successed.forEach((e) => {
        Suc += e.amount;
      });
       setVolume(Suc);
    }
    
  },[deposit])
  return (
    <div className="HomeCon container-fluit">
      <div className="rowCon">
        <div className="boxCon">
          <Typography>Total Pending</Typography>
          <Typography>{pendingV}</Typography>
        </div>
        <div className="boxBCon">
          <Typography>Total successed</Typography>
          <Typography>{deposit.length-pendingV}</Typography>
          <Typography>Total Volume</Typography>
          <Typography>{volume}</Typography>
        </div>
      </div>
      <div className="mainCon">
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            background: "#4a4949",
            height: "100%",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {
                    depositCol.map((e)=>{
                      return (
                        <TableCell
                          key={e.id}
                          align={e.align}
                          style={{ minWidth: e.minWidth }}
                        >
                          {e.label}
                        </TableCell>
                      );
                    })
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  deposit.map((depo)=>{
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={depo._id}
                      >
                        {
                          depositCol.map((i)=>{
                            const value = depo[i.id];
                            if(i.id==="detail"){
                              return (
                                <div className="BtnCon">
                                  <Button
                                    variant="contained"
                                    onClick={()=>{setEdit(depo);navigate("/home/edit")}}
                                    >
                                    {i.label}
                                  </Button>
                                </div>
                              )
                            }
                            return (
                              <TableCell key={i.id} align={i.align}>
                                {value}
                              </TableCell>
                            );
                          })
                        }
                      </TableRow>
                    );
                  })
                }

              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[1, 10, 25]}
            component="div"
            count={deposit?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};
export default DepositPage;
