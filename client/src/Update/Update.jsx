import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router';
import axios from 'axios';

import Modal from '../Modal/Modal.jsx';

import './Update.css';

function Update(){

    const [redID, setRedID] = useState('');
    
    const [isOpen, setIsOpen] = useState(false);

    const [modalData, setModalData] = useState({message: '', type: '', next: ''});

    const Navigate = useNavigate();
    const Location = useLocation();

    async function handleIDUpdate(event){
        event.preventDefault();

        const updateData = {
            redirectURL: redID
        }

        try{
            const result = await axios.post(`http://localhost:8080/api/update/${Location.state.id}`, updateData, {withCredentials: true});
            if(result.data == 'Login'){
                Navigate('/login');
            } else{
                setModalData({message: 'Updated Successfully' , type: 'Success', next:'/dashboard'});
                setIsOpen(!isOpen);
            }
        }catch(err){
            console.error('Error: ', err);
            setModalData({message: 'Could not Update this', type: 'Error', next: '/dashboard'});
            setIsOpen(!isOpen);
        }
    }

    return(
        <div className='update-container'>

            {isOpen && (
                <Modal message={modalData.message} type={modalData.type} next={modalData.next}/>
            )}

            <form className='update' onSubmit={handleIDUpdate}>
                <label>New Redirect URL: </label>
                <input
                type="text"
                placeholder="https://www.example.com"
                onChange={(e) => setRedID(e.target.value)}
                /><br/>

                <button type="submit">Update</button>
            </form>

        </div>
    )
}

export default Update;