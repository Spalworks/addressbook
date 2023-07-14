import React from 'react';
import Layout from '../components/Layout';
import MyTable from '../components/MyTable';
import { Link } from 'react-router-dom';
import IconButton from '@mui/joy/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import '../styles/Home.css'

const Home = () => {
  return (
    <Layout>
      <div className='add-button'>
        
        <Link to='/adduser'>
            <IconButton size='lg' sx={{color:'white', backgroundColor:'#008CFF'}}>
              <PersonAddIcon />
              &nbsp; Add User
            </IconButton>
        </Link>
      </div>
      <MyTable />
    </Layout>
  )
}

export default Home;