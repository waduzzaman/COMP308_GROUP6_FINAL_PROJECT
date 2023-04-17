import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperature1, faHeartbeat, faDroplet, faSnowflake, faMale } from '@fortawesome/free-solid-svg-icons';

export const Create_Vital_Sign = gql`
mutation
(
  $bodyTemperature: String!,
  $heartRate: String!,
  $bloodPressure:String!,
  $respiratoryRate:String!,
  $weight:String!,
  ) 
        {
            createVitalSign
        (
            bodyTemperature: $bodyTemperature, heartRate: $heartRate, bloodPressure: $bloodPressure,
            respiratoryRate: $respiratoryRate, weight: $weight,
          )
          {
            _id
        }
      }
`;

const AddVitalSigns = () => {
  //body temperature, heart rate, blood pressure, or respiratory rate.

  let bodyTemperature, heartRate, bloodPressure, respiratoryRate, weight;
  const history = useHistory();
  const [createVitalSign, { data, loading, error }] = useMutation(Create_Vital_Sign);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const onCancel = e => {
    e.preventDefault();
    history.push('/patient');
  }

  return (
    <div>
      <br /><br /><center><h5> Vital Signs Form</h5></center>

      <Jumbotron className='form'>
        <Form onSubmit={e => {
          createVitalSign({
            variables: {
              bodyTemperature: bodyTemperature.value, heartRate: heartRate.value, bloodPressure: bloodPressure.value, respiratoryRate: respiratoryRate.value,
              weight: weight.value
            }
          });

          bodyTemperature.value = '';
          heartRate.value = '';
          bloodPressure.value = '';
          respiratoryRate.value = '';
          weight.value = '';

          history.push('/patient');
        }} >

          <Form.Group>
            <Form.Label> Body Temperature <FontAwesomeIcon icon={faTemperature1} size={'1x'} /></Form.Label>
            <Form.Control type="text" name="bodyTemperature" id="bodyTemperature" placeholder="Enter body temperature" ref={node => { bodyTemperature = node; }} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Heart Rate <FontAwesomeIcon icon={faHeartbeat} size={'1x'} /></Form.Label>
            <Form.Control type="text" name="heartRate" id="heartRate" placeholder="Enter heart rate" ref={node => { heartRate = node; }} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Blood Pressure <FontAwesomeIcon icon={faDroplet} size={'1x'} /></Form.Label>
            <Form.Control type="text" name="bloodPressure" id="bloodPressure" placeholder="Enter blood pressure" ref={node => { bloodPressure = node; }} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Respiratory Rate <FontAwesomeIcon icon={faSnowflake} size={'1x'} /></Form.Label>
            <Form.Control type="text" name="respiratoryRate" id="respiratoryRate" placeholder="Enter respiratory rate" ref={node => { respiratoryRate = node; }} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Weight <FontAwesomeIcon icon={faMale} size={'1x'} /></Form.Label>
            <Form.Control type="text" name="weight" id="weight" placeholder="Enter weight" ref={node => { weight = node; }} />
          </Form.Group>

          <div className='button'>
            <Button className='buttonSave' variant="primary" type="submit">
              Save
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button className='buttonCancel' variant="danger" type="submit" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </Jumbotron>
    </div>
  );

}

export default withRouter(AddVitalSigns);