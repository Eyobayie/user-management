import axios from 'axios';
import '../App.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';  // Import useHistory

import * as Yup from 'yup';
import axiosInstance from '../commons/api';
import { saveToken } from '../Authentication/tokenauth';
function LoginPage() {
  const navigate =useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async values => {
      try {
        const response = await axiosInstance.post('/login', values);
        if (response.status === 200) {
          console.log("RESPONSE DATA IS.....",response.data.token);
          saveToken(response.data.token);
          navigate('/');
        } else {
          console.log('Login failed:', response.data.message);
          alert(response.data.message);
        }
        console.log('Form submitted with values:', values);
      } catch (error) {
        console.error('Error during login:', error);
      }
    } 
  });

  return (
    <div class="container login-container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <center>
            <div class="card-header">
              <h3>Login</h3>
            </div>
            </center>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Enter your username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                  ) : null}
                </div>

                <div className="form-group" >
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>

                <button type="submit" className='btn btn-primary'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );

} export default LoginPage;


