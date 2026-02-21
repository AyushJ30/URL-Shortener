import React, {useState, useRef} from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import Modal from '../Modal/Modal.jsx';

import './Signup.css';

function Singup(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass]  = useState('');
    const [confrmPass, setConfrmPass] = useState('');
    const [file, setFile] = useState(null);

    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const cnfrmRef = useRef();
    const fileRef = useRef();

    const[isOpen, setIsOpen] = useState(false);

    const [modalData, setModalData] = useState({message: '', type: '', next: ''});

    const Navigate = useNavigate();

    async function handleSignup(event){
        event.preventDefault();

        const signupData = new FormData();

        signupData.append('Name', name);
        signupData.append('Email', email);
        signupData.append('Password', pass);
        signupData.append('confirmPassword', confrmPass);
        signupData.append('File', file);

        try{
            const response = await axios.post('http://localhost:8080/signup', signupData, {headers: {'Content-Type': 'multipart/form-data'} });

            if(response.data == 'name'){
                nameRef.current.style.display = 'block';
                emailRef.current.style.display = 'none';
                passRef.current.style.display = 'none';
                cnfrmRef.current.style.display = 'none';
                fileRef.current.style.display = 'none';
            } else if(response.data == 'email'){
                nameRef.current.style.display = 'none';
                emailRef.current.style.display = 'block';
                passRef.current.style.display = 'none';
                cnfrmRef.current.style.display = 'none';
                fileRef.current.style.display = 'none';
            } else if(response.data == 'password'){
                nameRef.current.style.display = 'none';
                emailRef.current.style.display = 'none';
                passRef.current.style.display = 'block';
                cnfrmRef.current.style.display = 'none';
                fileRef.current.style.display = 'none';
            } else if(response.data == 'pass-mismatch'){
                nameRef.current.style.display = 'none';
                emailRef.current.style.display = 'none';
                passRef.current.style.display = 'none';
                cnfrmRef.current.style.display = 'block';
                fileRef.current.style.display = 'none';
            } else if(response.data == 'file'){
                nameRef.current.style.display = 'none';
                emailRef.current.style.display = 'none';
                passRef.current.style.display = 'none';
                cnfrmRef.current.style.display = 'none';
                fileRef.current.style.display = 'block';
            } else if(response.data == 'Error sending mail') {
                nameRef.current.style.display = 'none';
                emailRef.current.style.display = 'block';
                passRef.current.style.display = 'none';
                cnfrmRef.current.style.display = 'none';
                fileRef.current.style.display = 'none';
            } else{
                setModalData({message: 'Sign-Up Successful', type: 'Success', next: '/login'});
                setIsOpen(!isOpen);
            }
        }catch(err){
            console.error('Error', err);
            setModalData({message: 'Could Not Sign-Up', type: 'Error', next: '/login'});  
        }
    }

    function handleLogInRedirect(){
        Navigate('/login');
    }

    return(
    <div className="signup-container">
        {isOpen && (
            <Modal message={modalData.message} type={modalData.type} next={modalData.next}/>
        )}
        
        <form className="signup" onSubmit={handleSignup} encType="multipart/form-data">
            <label>Name: </label>
            <input
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            />
            <p ref={nameRef} style={{display: 'none'}}>Error: Provide Your Name</p>

            <label>Email: </label>
            <input
            type="text"
            placeholder="test@example.com"
            onChange={(e) => setEmail(e.target.value)}
            />
            <p ref={emailRef} style={{display: 'none'}}>Error: Provide Proper Email</p>

            <label>Password: </label>
            <input
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPass(e.target.value)}
            />
            <p ref={passRef} style={{display: 'none'}}>Error: Provide A Password</p>

            <label>Confirm Password: </label>
            <input
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setConfrmPass(e.target.value)}
            />
            <p ref={cnfrmRef} style={{display: 'none'}}>Error: Password Doesn't Match</p>

            <label>Upload File: </label>
            <input
            type='file'
            accept='image/png, image/jpeg, image.jpg'
            onChange={(e) => setFile(e.target.files[0])}
            />
            <p ref={fileRef} style={{display: 'none'}}>Error: Upload a File</p><br/>

            <button type="submit">Sign-Up</button>
        </form><br/>
        <button className='login-btn' onClick={handleLogInRedirect}>Log-In</button>
    </div>
    )
}

export default Singup;