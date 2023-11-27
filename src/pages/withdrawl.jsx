import { WITHDRAWL } from "../hooks/config";
import {
    Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DataContext from "../services/data/dataContext";
import { InstanceReq } from "../hooks/GETinstance";
import { depositCol } from "../libs/data";

const WithdrawlPage = () => {
    const {withdrawl,setWithdrawl} = useContext(DataContext);
    const [page,setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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
       url:WITHDRAWL ,
       params: { page: page },
       headers: {
         "Content-Type": "application/json",
       },
     };
     const res = InstanceReq(option);
     res.then((e)=>{
     if( e.status===200){
     setWithdrawl(e.data)
      }
     }).catch((e)=>console.log(e))
  },[]);
  return (
    <div className="HomeCon container-fluit">
      <div className="rowCon">
        <div className="boxCon"></div>
        <div className="boxBCon"></div>
      </div>
      <div className="mainCon">
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            background: "#4a4949",
            height: 750,
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
                  withdrawl.map((depo)=>{
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
                             if (i.id === "detail") {
                               return (
                                 <div className="BtnCon">
                                   <Button variant="contained">
                                     {i.label}
                                   </Button>
                                 </div>
                               );
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
            count={withdrawl?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
    )
};
export default WithdrawlPage;