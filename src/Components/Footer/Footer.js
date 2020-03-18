import React, { useState } from 'react';
import Credits from '../Credits/Credits';
import Privacy from '../Privacy/Privacy';
import Modal from '../UI/Modal/Modal';
import { useToggle } from '../../hooks/hooks';

const Footer = () => {
  const [showModal, setShowModal] = useToggle(false);
  const [modalContent, setModalContent] = useState('credits');
  const handleFooterLinks = e => {
    setModalContent(e.currentTarget.id)
    setShowModal();
  }
  return (
    <footer>
      <span>Made with fun by <a href="www.martinofenu.it"> Martino Fenu</a> | </span>
      <span
        id='credits'
        className='clickable' onClick={handleFooterLinks} >
        Credits
      </span>
      <span
        id='privacy'
        className='clickable'
        onClick={handleFooterLinks} >
        Privacy Policy
      </span>
      {showModal ?
        <Modal
          addClass={modalContent}
          show={showModal}
          backDropClick={setShowModal} >
          {modalContent === 'credits' ? <Credits /> : <Privacy />}
        </Modal>
        : null}
    </footer>
  )
}

export default Footer;
