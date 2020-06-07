import React from 'react';
import Modal from 'react-modal';
import { FiCheckCircle} from 'react-icons/fi';


import './styles.css';

interface Props {
    isOpen: boolean;
    message: string;
    Closed: () => void;
}

const SucessModal: React.FC<Props> = ({isOpen,message, Closed}) => {


    return (
        
        <Modal
          isOpen={isOpen}
          onRequestClose={Closed}
          contentLabel="Example Modal"
          className="contentModal"
        >
          <div>
            <FiCheckCircle color="#FFF" size={36}/>
            <h1>{message}</h1>
            <button onClick={Closed}>Finalizar</button> 
          </div>   
        </Modal>
      
    );
}


export default SucessModal;