import { useContext, useEffect } from "react";
import LocalContext from "../services/localization/localContext";
import { Card, CardActionArea, CardContent, CardMedia, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TRANSACTIONS } from "../hooks/config";
import { InstanceReq } from "../hooks/GETinstance";
import DataContext from "../services/data/dataContext";
import { transactionsCol } from "../libs/data";

const UserDetail = () => {
    const {detail} = useContext(LocalContext);
    const {transactions,setTransactions} = useContext(DataContext);
    useEffect(()=>{
       const option = {
         method: "GET",
         url: TRANSACTIONS,
         params: { userId:detail._id },
         headers: {
           "Content-Type": "application/json",
         },
       };
      const Response = InstanceReq(option);
      Response.then((e)=>{
        if (e.status===200){
          setTransactions(e.data);
           console.log(transactions);
        }
      }).catch((e)=>console.log(e));
     
    },[]);
    return (
      <Container style={{ background: "#4a4949" }}>
        <Typography variant="h6">Name: {detail?.name}</Typography>
        <Typography>Phone: {detail?.phone}</Typography>
        <Typography>ID: {detail?._id}</Typography>
        <Typography variant="h5">Amount: {detail?.money}</Typography>
        <Typography>Total Earn: {detail?.earn}</Typography>
        <Stack direction="row" gap={2} width="100%">
            {detail?.payments.map((p)=>{
               return (
                 <Card sx={{ maxWidth: 400 }}>
                   <CardActionArea>
                     <CardMedia></CardMedia>
                     <CardContent>
                       <Typography>{p.method}</Typography>
                       <Typography>{p.name}</Typography>
                       <Typography>{p.phone}</Typography>
                     </CardContent>
                   </CardActionArea>
                 </Card>
               ); 
            })}
        </Stack>
        <Typography variant="h6" align="left" color={"red"}>Serious Data</Typography>
        <Typography>Password: {detail.password}</Typography>
        <Typography>Fund Pin: {detail.pin}</Typography>
            
        <Typography>Created At: {detail.createdAt}</Typography>
        <Typography>Last updated At: {detail.updatedAt}</Typography>
        <Typography variant="h5" align="center">Transaction History</Typography>
        <Container>
             <TableContainer sx={{ minHeight: 550 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                     <TableRow>
                       {
                        transactionsCol.map((e)=>{
                          return(
                            <TableCell
                            key={e.id}
                            align={e.align}
                            style={{ minWidth: e.minWidth }}
                              >
                              {e.label}
                            </TableCell>
                          )
                        })
                      }
                     </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        transactions?.map((e)=>{
                          return(
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={e._id}>
                                {
                                  transactionsCol.map((i)=>{
                                    const value = e[i.id]
                                    return(
                                      <TableCell>
                                        {value}
                                      </TableCell>
                                    )
                                  })
                                }

                             </TableRow>
                            )
                        })
                      }
                    </TableBody>
                  </Table>

             </TableContainer>
        </Container>

      </Container>
    );
}
export default UserDetail;