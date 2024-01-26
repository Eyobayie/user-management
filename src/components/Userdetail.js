import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../App.css' 
import axios from "axios";
import axiosInstance from "../commons/api";

function UserDetail() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // get user by id
        axiosInstance.get(`/users/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }, [id]); 
    return (
        <div className="container detail-card">
            {user ? (
                <div>
                <h4>Detail information </h4>
                <p>Name:------{user.name} </p>
                <p>Sex: ------{user.gender} </p>
                <p>Phone: ------{user.phone} </p>
                <p>Email:-----{user.email}</p>
                <p>Website:---{user.website}</p>
                <p>created at...{user.createdAt}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default UserDetail;
