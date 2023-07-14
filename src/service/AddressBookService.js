import axios from "axios";

class AddressbookService{
  baseUrl = "http://localhost:8080/addressbookservice";

  //Geting all the users list for the Table
  getAllUser=()=>{
    return axios.get(`${this.baseUrl}/getAll`);
  }

  // Adding User
  addUser=(data)=>{
    return axios.post(`${this.baseUrl}/createuser` , data);
  }

  // Deleting an User Data
  deleteUser = (id)=>{
    //console.log(id);
    return axios.delete(`${this.baseUrl}/deleteuser/${id}`);
  }

  //Geting an User Details By ID
  getUserById = (id)=>{
    return axios.get(`${this.baseUrl}/getbyid/${id}`);
  }

  //Updating an User Data
  updateUser = (userId, data)=>{
    return axios.put(`${this.baseUrl}/updateuser/${userId}`, data);
  }

}

const addressbookService = new AddressbookService();
export default addressbookService;