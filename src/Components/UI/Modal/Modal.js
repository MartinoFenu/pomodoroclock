import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal =  props => {
   const modalClasses = [props.show ? 'Modal' : 'Modal closed', props.addClass].join(' ');
   return (
     <>
       <Backdrop
         show={props.show}    clicked={props.backDropClick} />
       <div className={modalClasses} >
         <span className='ModalClose'>
          <FontAwesomeIcon
            onClick={props.backDropClick}
            icon='times'>
          </FontAwesomeIcon>
         </span>
         <div className='ModalContent' >
           {props.children}
         </div>
       </div>
     </>
   )
 }


export default React.memo(Modal);
