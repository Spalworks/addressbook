import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Stack,
  InputLabel,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AddressBookService from "../service/AddressBookService";

const Form = () => {
  const params = useParams();
  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zip: "",
    isUpdate: "",
  };
  const [formValue, setFormValue] = useState(initialValue);

  const changeValue = (event) => {
    console.log("Calling change Value method");
    const name = event.target.name;
    const value = event.target.value;
    console.log("name = " + name + "  || value = " + value);
    setFormValue({ ...formValue, [name]: value });
  };

  const formSubmit = (event) => {
    event.preventDefault();

    let object = {
      fullName: `${formValue.firstName} ${formValue.lastName}`,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      address: formValue.address,
      state: formValue.state,
      city: formValue.city,
      zip: formValue.zip,
    };

    if (formValue.isUpdate) {
      let answer = window.confirm("NOTE : Data retrival Not possible after Update  \n Do You want to continue?");
      if (answer) {
        console.log("Calling UPDATE method .......");
        console.log(object);
        console.log("=============================");
        AddressBookService.updateUser(params.id, object)
          .then((res) => {
            console.log(res);
            alert("Data is updated Successfully !!!");
          })
          .catch((err) => {
            console.log(err);
            alert("ERROR occured !!!");
          });
      }
    } else {
      console.log("calling ADD method .........");
      AddressBookService.addUser(object)
        .then((response) => {
          console.log(response.data);
          alert("Data added Successfully!!!");
        })
        .catch((error) => {
          console.log(error);
          alert("Error occured!!!");
        });
    }
  };

  let resetForm = (event) => {
    event.preventDefault();

    console.log("Clicked on Reset Button" + event);
    setFormValue(initialValue);
    console.log(formValue);
  };

  useEffect(() => {
    if (params.id) {
      getDataById(params.id);
    }
  }, [params.id]);

  const getDataById = (userId) => {
    AddressBookService.getUserById(userId)
      .then((response) => {
        let data = response.data.data;
        fillForm(data);
      })
      .catch((error) => {
        alert("Error Occured !!! \n" + error);
      });
  };

  const fillForm = (userData) => {
    let arr = userData.fullName.split(" ");
    console.log(userData);
    console.log(arr);
    setFormValue({
      ...formValue,
      ...userData,
      firstName: arr[0],
      lastName: arr[1],
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      state: userData.state,
      city: userData.city,
      zip: userData.zip,
      isUpdate: true,
    });
  };

  return (
    <div className="form">
      <Grid>
        <Stack
          direction="row"
          spacing={6}
          sx={{
            backgroundColor: "#008CFF",
            maxWidth: 500,
            padding: "0px 20px",
            margin: "0 auto",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Typography
            gutterBottom
            variant="h4"
            align="center"
            sx={{ color: "white", paddingTop: "15px" }}>
            Address Book Form
          </Typography>
          <Link to='/home'>
          <Button
            type="button"
            variant="outlined"
            align="center"
            sx={{
              backgroundColor: "white",
              borderRadius: "50%",
              height: "40px",
              width: "8rem",
              "&:hover": { color: "008CFF", backgroundColor: "#f7f7f7" },
            }}
            startIcon={<CloseRoundedIcon />}
            onClick={(event) => {
              console.log(event.target);
            }}>
            <b>Cancel</b>{" "}
          </Button>
          </Link>
        </Stack>

        <Card
          style={{
            maxWidth: 500,
            padding: "0px 10px 20px 10px",
            margin: "0 auto",
          }}>
          <CardContent>
            <form onSubmit={formSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter first name"
                    id="firstName"
                    name="firstName"
                    value={formValue.firstName}
                    onChange={changeValue}
                    label="firstName"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter last name"
                    name="lastName"
                    value={formValue.lastName}
                    onChange={changeValue}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formValue.email}
                    onChange={changeValue}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Enter phone number"
                    name="phoneNumber"
                    value={formValue.phoneNumber}
                    onChange={changeValue}
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    multiline
                    rows={2}
                    placeholder="Enter your address here"
                    name="address"
                    value={formValue.address}
                    onChange={changeValue}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Select
                    // placeholder="Select City"
                    name="city"
                    value={formValue.city}
                    onChange={changeValue}
                    sx={{ height: "60px" }}
                    required
                  >
                     <MenuItem value="" disabled>
                      Select City
                    </MenuItem>
                    <MenuItem value="city1">City 1</MenuItem>
                    <MenuItem value="city2">City 2</MenuItem>
                    <MenuItem value="city3">City 3</MenuItem>
                    <MenuItem value="city4">City 4</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Select
                    placeholder="Select State"
                    name="state"
                    value={formValue.state}
                    onChange={changeValue}
                    sx={{ height: "60px" }}
                    required>
                    <MenuItem value="state1">State 1</MenuItem>
                    <MenuItem value="state2">State 2</MenuItem>
                    <MenuItem value="state3">State 3</MenuItem>
                    <MenuItem value="state4">State 4</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    type="number"
                    placeholder="Zip Code"
                    name="zip"
                    value={formValue.zip}
                    onChange={changeValue}
                    label="zip"
                    variant="outlined"
                    sx={{ height: "60px" }}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={resetForm}>
                    Reset
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={formSubmit}>
                    {formValue.isUpdate ? "Update" : "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Form;
