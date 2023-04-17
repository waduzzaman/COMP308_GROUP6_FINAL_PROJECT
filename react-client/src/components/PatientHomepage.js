import React from 'react';
import { withRouter } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faGamepad, faLightbulb, faVideoCamera, faPlusSquare, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const name = localStorage.getItem('name');
function Patient(props) {
  return (
    <div className='patientPage'>
      <h3> Hello, {name}!</h3><br />

      <ListGroup >
        <ListGroup.Item action href="/showTip" className='listColor'>
          Daily Tip  <FontAwesomeIcon icon={faLightbulb} color='orange' size={'1x'} />
        </ListGroup.Item>

        <ListGroup.Item action href="/addVitalSigns" className='listColor'>
          Add Daily Information <FontAwesomeIcon icon={faPlusSquare} size={'1x'} />
        </ListGroup.Item>

        <ListGroup.Item action href="/checklist" className='listColor'>
          Checklist for common signs and symptoms <FontAwesomeIcon icon={faInfoCircle} size={'1x'} color='green' />
        </ListGroup.Item>

        <ListGroup.Item action href="/emergencyAlert" className='listColor'>
          Send an Emergency Alert  <FontAwesomeIcon icon={faExclamationTriangle} color='red' />
        </ListGroup.Item>

        <ListGroup.Item action href="/motivationalVideos" className='listColor'>
          Motivational Videos <FontAwesomeIcon icon={faVideoCamera} />
        </ListGroup.Item>

        <ListGroup.Item action href="/game" className='listColor'>
          Play Game <FontAwesomeIcon icon={faGamepad} />
        </ListGroup.Item>

      </ListGroup>
    </div>
  );

}

export default withRouter(Patient);