import React, { useCallback } from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import Input from '../UI/Input/Input';
import { useToggle } from '../../hooks/hooks';
import { settings } from '../../template/formsAndInputs';
import useForm from '../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Settings = props => {

  const [showModal, setShowModal] = useToggle(false);

  const [formElements]  = useForm(
    settings,
    props.defVal,
    {
      general: props.handleSettings,
      checkbox: props.handleCheckbox
    }
  );
  const handleTestAudio = useCallback(() => {
      const audio = new Audio();
      audio.src = `/assets/${formElements.audio.value}.mp3`;

      audio.play();
  }, [formElements.audio.value]);

  return(
    <div className="OptionsBox">
      <Button
        click={setShowModal} >
        <FontAwesomeIcon
          icon='cog'>
        </FontAwesomeIcon>
      </Button>
      <Input body={formElements.lang} />
      {showModal ? <Modal
        show={showModal}
        backDropClick={setShowModal} >
        <div className="Settings">
          <Input body={formElements.theme} />
          <Input body={formElements.audio} />
          <Input body={formElements.showOnTitle} />
          <div>
            <Button
              click={handleTestAudio}>
              Test Audio
            </Button>
          </div>
        </div>
      </Modal> : null}
    </div>

  )
}

export default React.memo(Settings);
