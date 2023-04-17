import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faMessage } from '@fortawesome/free-solid-svg-icons';

export const Create_Tip = gql`
mutation
(
  $message: String!,
  ) 
        {
            createMotivationalTip
        (
            message: $message
          )
          {
            _id
        }
      }
`;

function CreateTip(props) {

  let message;

  const history = useHistory();
  const [createMotivationalTip, { data, loading, error }] = useMutation(Create_Tip);

  const onCancel = e => {
    e.preventDefault();
    history.push('/nurse');
  }

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <h2><center> Motivational Tip</center></h2>

     
        <Form className='form' onSubmit={e => {
          createMotivationalTip({
            variables: {
              message: message.value
            }
          });

          message.value = '';


          alert("Message sent!");
          history.push('/nurse');

        }} >

          <Form.Group>
            <center><Form.Label> Tip of the Day <FontAwesomeIcon icon={faLightbulb} size={'1x'} color='orange' /></Form.Label></center><br />
            <Form.Control type="text" name="message" id="message" placeholder="Enter message" ref={node => { message = node; }} /><br />
          </Form.Group>

          <div className='button'>
            <Button className='buttonSave' variant="primary" type="submit">
              Send
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button className='buttonCancel' variant="danger" type="submit" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Form>
   
    </div>
  );

}

export default withRouter(CreateTip);