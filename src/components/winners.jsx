import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useContext } from "react";
import DataContext from "../services/data/dataContext";
import LocalContext from "../services/localization/localContext";
import { useNavigate } from "react-router-dom";

const Winners = () => {
    const {winners} = useContext(DataContext);
    const {setDetail} = useContext(LocalContext);
    const navigate = useNavigate();
     console.log(winners);
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, minHeight: 100 }} aria-label="simple table">
          {winners && (
            <>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="center">amount</TableCell>
                  <TableCell align="center">number</TableCell>
                  <TableCell align="center"></TableCell>
                
                </TableRow>
              </TableHead>
              <TableBody>
                {winners &&
                  winners?.map((e) => {
                    const viewHandler = () => {
                       
                    }
                    return (
                      <TableRow
                        key={e.owner}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell>{e.owner}</TableCell>
                        <TableCell>{e.amount}</TableCell>
                        <TableCell>{e.number}</TableCell>
                        <TableCell><Button onClick={viewHandler} variant="outlined">View</Button></TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    );
}
export default Winners;