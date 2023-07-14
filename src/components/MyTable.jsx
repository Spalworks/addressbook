import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';
import AddressBookService from '../service/AddressBookService'

export default function MyTable() {

  const [Users, setUsers] = useState([]);
  let navigate = useNavigate();

  const fetchUsers = () => {
    AddressBookService.getAllUser()
      .then((result) => {
        setUsers(result.data.data);
        console.log(result.data.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const removeUser = (userId) => {
    console.log("Clicked on Delete Icon");
    let answer = window.confirm("Retrieval of Data is not Possible after Delete!!\nAre you sure you want to delete?");

    if (answer) {
      AddressBookService.deleteUser(userId)
        .then(() => {
          fetchUsers(); // Call fetchUsers to update the user list
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    } else {
      console.log(userId);
    }
  };

  const updateUser = (userId)=>{
    console.log("Clicked on update Icon. User Id is: " + userId);
    navigate(`/edit-user/${userId}`);
  }

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop:'2rem', marginLeft:'10%', marginRight:'10%' ,width:'80%' }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{backgroundColor:'#008CFF'}}>
            <TableCell align="center" sx={{color:'#ffff'}}><b>Full Name</b></TableCell>
            <TableCell align="center" sx={{color:'#ffff'}}><b>Email</b></TableCell>
            <TableCell align="center" sx={{color:'#ffff'}}><b>Address</b></TableCell>
            <TableCell align="center" sx={{color:'#ffff'}}><b>City</b></TableCell>
            <TableCell align="center" sx={{color:'#ffff'}}><b>State</b></TableCell>
            <TableCell align="center" sx={{color:'#ffff'}}><b>Zip Code</b></TableCell>
            <TableCell align="center" sx={{color:'#ffff'}}><b>Contact Number</b></TableCell>
            <TableCell align="center" sx={{color:'#ffff'}}><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.fullName}
              </TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.address}</TableCell>
              <TableCell align="center">{user.city}</TableCell>
              <TableCell align="center">{user.state}</TableCell>
              <TableCell align="center">{user.zip}</TableCell>
              <TableCell align="center">{user.phoneNumber}</TableCell>
              <TableCell align="center">
                <IconButton onClick={()=>updateUser(user.id)}>
                  <EditIcon />
                </IconButton>
                &nbsp;
                <IconButton onClick={()=>removeUser(user.id)}>
                  <DeleteIcon color='error' />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}