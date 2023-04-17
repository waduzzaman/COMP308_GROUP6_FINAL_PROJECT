import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
//

function Checklist() {

  return (
    <div>              

        <div>
            <center><h3>Check your signs and symptoms</h3></center><br/><br/>
            
            <Form method='get' action='/run' className='form'>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Cholesterol" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Past Cardiac history" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Pain and numbness in extremities" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="High Blood pressure" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Shortness of breath" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Chest Tightness" />
                    </Form.Group>

                    <div className='button'>
                        <Button className='buttonSave' variant="primary" type="submit">
                            Submit
                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button className='buttonCancel' variant="danger" type="submit" >
                            Cancel
                        </Button>
                    </div>
                </Form>
        </div>
            </div>
  );
}
//
export default Checklist;
