import React from 'react';
import Modal from '../UI/Modal/Modal';
import Privacy from '../Privacy/Privacy';
import { useToggle } from '../../hooks/hooks';
import Button from '../UI/Button/Button';

const CookieBanner = props => {
  const [showModal, setShowModal] = useToggle(false);

  return (
    <div className="cookieBanner">
      <span>This website use cookies to give you a better experience. Clicking "Accept" you agree to our use of cookies. <span className="clickable" onClick={setShowModal}>Read More</span> </span>
      <Button
        click={props.giveConsent}
        name="showCookieBanner" >
        Accept
      </Button>
      {showModal ?
        <Modal
          show={showModal}
          backDropClick={setShowModal} >
          <Privacy />
        </Modal>
        : null}
    </div>
  )
}

export default CookieBanner
