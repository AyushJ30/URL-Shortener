import { useNavigate } from 'react-router';

import './Modal.css';

function Modal(props){
    // const [isOpen, setIsOpen] = useState(props.isOpen);

    const Navigate = useNavigate();

    function handleModalClose(){
        if(!props.type == 'Error' || !props.next == ''){
            Navigate(props.next);
        }
    }

    return(
    <div className="modal">
        <div className='overlay'></div>
        <div className='modal-content'>
            <h2>{props.type}</h2>
            <p>{props.message}</p>
        <button className='close-modal' onClick={handleModalClose}>OK</button>
        </div>
    </div>
    )
}

export default Modal;