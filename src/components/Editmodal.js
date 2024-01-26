
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useState,useEffect } from 'react';
const CustomModal = ({ isOpen, closeModal, user }) => {
    const [formData, setFormData] = useState(user);
    const [addresses, setAddresses] = useState([]);
    // get all address
    useEffect(() => {
        getAddress();
     
    }, [user]);
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
        const value = e.target.name === 'addressId' ? parseInt(e.target.value, 10) : e.target.value;
        
        // Exclude 'Address' key from formData
        const updatedFormData = { ...formData, [e.target.name]: value };
        if (e.target.name !== 'addressId') {
            delete updatedFormData.Address;
        }
    
        setFormData(updatedFormData);
    };
    

    // const handleChange = (e) => {
    //     const value = e.target.name === 'addressId' ? parseInt(e.target.value, 10) : e.target.value;
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: value,
    //     });
    // };
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:2000/api/register', formData)
            .then((response) => {
                alert(response.data.message);
                setFormData({
                    name: '',
                    gender: '',
                    phone: '',
                    email: '',
                    website: '',
                    addressId: ''
                });
            })
        console.log('Form submitted:', formData);
    };
    const customStyles = {
        content: {
          width: '50%', 
          margin: 'auto', 
        },
      };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit user information"
      style={customStyles}
      appElement={document.getElementById('root')}
    >
     <div className="container mt-4">
            <h2>User Edit Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.username}
                        onChange={handleChange}
                    />
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
                style={{float:'right',marginRight:'50px', marginTop: "20px"}}
                >
                    Update
                </button>
            </form>
        </div>
    </Modal>
  );
};

export default CustomModal;
