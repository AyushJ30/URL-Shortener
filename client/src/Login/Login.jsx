import React, {useState, useRef} from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import api from '../utils/axios.js';

import Modal from '../Modal/Modal.jsx';

import './Login.css';

function Login(){

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const [modalData, setModalData] = useState({message: '', type: '', next:''});

    const logRef = useRef();

    const Navigate = useNavigate();

    async function handleUserLogin(event){
        event.preventDefault();

        const loginData ={
            Email: email,
            Password: pass
        }

        try{
            const resolve = await axios.post('http://localhost:8080/login', loginData, {withCredentials: true});
            
            if(resolve.data=='Wrong Credentials'){
                logRef.current.style.display = 'block';
            } else{
                console.log(resolve.data);
                setModalData({message: 'Logged-In', type: 'success', next: '/'});
                setIsOpen(!isOpen);
            } 

        } catch(err){
            console.log('Error:', err);
            window.location.reload;
        }
    }

    function handleSignupRedirect(){
        Navigate('/signup');
    }

    return(
    <div className="login-container">
        {isOpen && (
            <Modal message={modalData.message} type={modalData.type} next={modalData.next}/>
        )}
        <form className="login" onSubmit={handleUserLogin}>
            <label>Email: </label>
            <input
            type="text"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
            /><br/>

            <label>Password: </label>
            <input
            type="password"
            placeholder="Enter your Password"
            onChange={(e) => setPass(e.target.value)}
            />
            <p ref={logRef} style={{display: 'none'}}>Error: Wrong Credentials</p><br/>

            <button type="submit">Login</button>
        </form><br/>
        <button className='signup-btn' onClick={handleSignupRedirect}>Sign-up</button>
    </div>
    )
}

export default Login;