import React, { useEffect, useState } from 'react';
import axios from 'axios';
const MyForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password:'',
        gender: '',
        phone: '',
        email: '',
        website: '',
        addressId: ''
    });
    const [addresses, setAddresses] = useState([]);
    const [errors, setErrors] = useState({});

    // get all address
    useEffect(() => {
        getAddress();
    }, []);
    async function getAddress() {
        try {
            await axios.get('http://localhost:2000/api/addresses')
                .then((res) => {
                    setAddresses(res.data);
                    console.log("response of yours request is", res);
                })
        } catch (error) {
            console.error('Error fetching addresses:', error);

        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.name === 'addressId' ? parseInt(e.target.value, 10) : e.target.value,
        });
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:2000/api/register', formData)
            .then((response) => {
                alert(response.data.message);
                setFormData({
                    username: '',
                    password:'',
                    gender: '',
                    phone: '',
                    email: '',
                    website: '',
                    addressId: ''
                });
            })
        console.log('Form submitted:', formData);
        } else {
          // Form has validation errors, update the state
          setErrors(validationErrors);
        }
      };
    

      const validateForm = (data) => {
        let errors = {};
      
        // Example validation rules
        if (!data.username.trim()) {
          errors.username = 'username is required!!!';
        }
        if (!data.password) {
            errors.password = 'Password is required!!!';
          }
      
        if (!data.gender.trim()) {
          errors.gender = 'Gender is required';
        }
      
        if (!data.email.trim()) {
          errors.email = 'Email is required';
        } else if (!isValidEmail(data.email)) {
          errors.email = 'Invalid email address';
        }
      
        if (!data.phone) {
          errors.phone = 'Phone number is required';
        }
      
        if (!data.website.trim()) {
          errors.website = 'Website is required';
        }
      
        if (!data.addressId) {
          errors.addressId = 'Address is required';
        }
      
        return errors;
      };
      
      const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      };
      
    // TO UPDATE USER DATA
    return (
        <div className="container mt-4 ">
            <h2>User Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
             {errors.username && <span className="error">{errors.username}</span>}

                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
             {errors.password && <span className="error">{errors.password}</span>}

                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input
                        type="text"
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    />
                 {errors.gender && <span className="error">{errors.gender}</span>}

                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
             {errors.email && <span className="error">{errors.email}</span>}

                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="number"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
            {errors.phone && <span className="error">{errors.phone}</span>}

                </div>
                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input
                        type="text"
                        className="form-control"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                    />
             {errors.website && <span className="error">{errors.website}</span>}

                </div>
                <div className='form-group'>
                    <select
                        className='form-control'
                        id='addressId'
                        name='addressId'
                        value={formData.addressId}
                        onChange={handleChange}
                    >
                        <option value="">Select an address</option>
                        {addresses.map((address) => (
                            <option key={address.id} value={address.id}>
                                {address.street}, {address.country}, {address.zipcode}
                            </option>
                        ))}

                    </select>
                </div>
                <button type="submit"
                    className="btn btn-primary "
                    style={{ float: 'right', marginRight: '50px', marginTop: "20px" }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
export default MyForm;