import { useContext } from "react";
import DataContext from "../services/data/dataContext";
import { useEffect } from "react";
import { USER_URL } from "../hooks/config";
import { InstanceReq } from "../hooks/GETinstance";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { columns } from "../libs/data";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import LocalContext from "../services/localization/localContext";
import {useNavigate} from "react-router-dom";


const Home = () => {
    const {users,setUsers} = useContext(DataContext);
    const {detail,setDetail} = useContext(LocalContext);
    const [refresh, setResfresh] = useState(false);
    const [page,setPage] = useState(1);
    const [perPage,setPerPage] = useState(10);
    const [volume,setVolume] = useState(0);
    const [earn, setEarn] = useState(0);
    const navigate = useNavigate()
     const handleChangePage = (event, newPage) => {
       setPage(newPage);
     };
     const handleChangeRowsPerPage = (event) => {
       setPerPage(+event.target.value);
       setPage(0);
     };
    useEffect(()=>{
      console.log(detail);
    },[detail])
    useEffect(()=>{
        const option = {
          method: "GET",
          url:USER_URL ,
          params:{page:page},
          headers: {
            "Content-Type":"application/json"
             
          },
        };
        const res = InstanceReq(option);
        res.then((e)=>{
            if(e.status===200){
                setUsers(e.data.users);
            }
        });
    },[page]);
    useEffect(()=>{
        users.map((user)=>{
            setVolume((prev)=>prev+=user.money);
            setEarn((prev)=>prev+=user.earn);
        })
       
    },[users])
    return (
      <div className="HomeCon">
        <div className="rowCon">
          <div className="boxCon">
            <p>20:19 PM</p>
            <p>19/3/2023 (Thu)</p>
          </div>
          <div className="boxBCon">
            <p>Total Volume</p>
            <p>{volume} (MMK)</p>
          </div>
          <div className="boxCon">
            <p>Total Users</p>
            <p>{users.length}</p>
          </div>
          <div className="boxBCon">
            <p>Total Earn</p>
            <p>{earn} (MMK)</p>
          </div>
        </div>
        <div className="mainCon">
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              background: "#4a4949",
              height: 550,
            }}
          >
            <TableContainer sx={{ maxHeight: 550 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={user._id}
                      >
                        {columns.map((column) => {
                          const value = user[column.id];
                          if (column.id === "detail") {
                            return (
                              <div className="BtnCon">
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    setDetail(user);
                                    navigate("/home/detail");
                                  }}
                                >
                                  Detail
                                </Button>
                              </div>
                            );
                          }
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users.length}
              rowsPerPage={perPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    );

}
export default Home;