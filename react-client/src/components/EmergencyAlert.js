import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export const CREATE_EMERGENCY_ALERT = gql`
mutation
(
  $alertMessage: String!,
  
  ) 
        {
            createEmergencyAlert
        (
            alertMessage: $alertMessage,
          )
          {
            _id
        }
      }
`;

function EmergencyAlert() {
    let alertMessage, patient;
    const [createEmergencyAlert, { data, loading, error }] = useMutation(CREATE_EMERGENCY_ALERT);

    const history = useHistory();

    if (loading) return 'Sending Alert...';
    if (error) return `Alert Sending error! ${error.message}`;

    const handleCancel = () => {
        <div>
            {
                history.push(`/patient`)
            }
        </div>
    };
    return (
        <div>
            <Jumbotron className='form'>
                <Form onSubmit={e => {
                    createEmergencyAlert({
                        variables: {
                            alertMessage: alertMessage.value,// patient: patient.value
                        }
                    });
                    alertMessage.value = '';
                    // patient.value = '';
                    <div>
                        {
                            history.push(`/patient`)
                        }
                    </div>
                }} >
                    <Form.Group>
                        <Form.Label> Enter the Alert Message</Form.Label>
                        <Form.Control as="textarea" rows={3} name="alertMessage" id="alertMessage" placeholder="Enter message" ref={node => { alertMessage = node; }} />
                    </Form.Group>

                    {/* <Form.Group>
                        <Form.Label>Patient</Form.Label>
                        <Form.Control type="text" name="patient" id="patient" placeholder="Enter Patient Id" ref={node => { patient = node; }} />
                    </Form.Group> */}

                    <Button variant="primary" type="submit">
                        Send
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="primary" type="submit" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    );

}

export default EmergencyAlert;