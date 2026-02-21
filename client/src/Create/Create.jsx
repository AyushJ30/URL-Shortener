import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import Modal from '../Modal/Modal.jsx';

import './Create.css';

function Create(){
    const [url, setUrl] = useState('');
    const [shorturl, setShorturl] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({message: '', type: '', next: ''});

    const Navigate = useNavigate();

    async function handleCreateID(event){
        event.preventDefault();

        const urlData = {
            URL: url,
        }

        try{
            const result = await axios.post('http://localhost:8080/api', urlData, {withCredentials: true});
            if(result.data == 'Login'){
                Navigate('/login');
            }
            setShorturl(result.data);
        } catch(err){
            console.error('Error:', err);
            setModalData({message: 'Could not Create URL', type: 'Error', next: ''});
            setIsOpen(!isOpen);
        }
    }

    function handleShowID(){
        Navigate('/');
    }

    return(
        <div className='create-container'>
            {isOpen && (
                <Modal message={modalData.message} type={modalData.type} next={modalData.next} />
            )}
            <form className='create' onSubmit={handleCreateID}>
                <label>URL: </label>
                <input
                type="text"
                placeholder="https://www.example.com"
                onChange={(e) => setUrl(e.target.value)}
                />

                <button type="submit">Create</button>
            </form>

            <h2 className='display'>Your ShortUrl: <a href= {`http://localhost:8080/redirect/${shorturl}`}>http://localhost:8080/redirect/{shorturl}</a></h2>

            <button className='idShow' onClick={handleShowID}>Show IDs</button>
        </div>
    )
}

export default Create;