import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ChangePassword = () => {
    const emailID = new URLSearchParams(useLocation().search).get('emailID');
    const [password, setPassword] = useState('');

    const onFormSubmit = () => {
        axios.post('http://localhost:5000/updatepassword', { password }, { params: { emailID } }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Password Changed');
                }
                // console.log(res.data);
            }).catch(err => {
                alert('Password not Changed');
                console.log(err);
            })
    }

    return (
        <div>
            <header className="App-header">
                <h1>Update Password</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onFormSubmit();
                }} className="login-form">
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Update Password</button>
                </form>
            </header>
        </div>
    )
}

export default ChangePassword;