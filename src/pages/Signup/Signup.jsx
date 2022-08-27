/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './signup.css';

export default function Signup() {
    return (
        <div className="container-fluid">
            <div className="form-container">
                Sign UP
                <form action="" method="post">
                    <label htmlFor="firstname">
                        First Name:
                        <input type="text" name="" id="name" />
                    </label>
                    <label htmlFor="lastname">
                        Last Name:
                        <input type="text" name="" id="name" />
                    </label>
                </form>
            </div>
        </div>
    );
}
