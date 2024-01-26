import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomModal from './components/Editmodal';
import User from './components/user';
import axiosInstance from './commons/api';

function App() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleModal = (user) => {
    setModal(!modal);
    setSelectedUser(user);
  };

  // To apply changes or states
  useEffect(() => {
    fetchUsers();
  }, []);

  // To fetch all users
  const fetchUsers = () => {
    axiosInstance.get('/users') 
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }

  // To delete a user
  const deleteUser = (id) => {
    axiosInstance.delete(`/users/${id}`)
      .then((response) => {
        alert(response.data.message)
        console.log('delete response is: ', response.data);
      })
      .then(() => fetchUsers()); // Fetch users after deletion
  }

  return (
    <div className='user-container'>
      <Link to='/adduser'>
        <button className="btn btn-primary adduserbtn">Add new user</button>
      </Link>
      <table className="table ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
          return <User key={user.id} user={user} deleteUser={deleteUser} toggleModal={toggleModal} />
          })}
        </tbody>
      </table>

      {modal && (
        <CustomModal
          isOpen={modal}
          closeModal={toggleModal}
          user={selectedUser}
        />
      )}
    </div>
  );
}

export default App;

// import axios from 'axios';

// function App(){

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:2000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axiosInstance.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

 
// }
// export default { App, axiosInstance};