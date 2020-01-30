import React from 'react';
import './AddModify.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Modal} from 'react-bootstrap';

const Example = (props) => {
    return (
        <>
            <Modal.Header closedButton>
                <Modal.Title>Add Scheme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <FormGroup>
                        <Label for="schemename">Scheme Name</Label>
                        <div className="ab"><Input type="text" name="schemename" id="schemename" placeholder="Enter Scheme name" /></div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="schemeid">Scheme Id</Label>
                        <Input type="text" name="schemeId" id="schemeId"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="dept">Select Department</Label>
                        <Input type="select" name="Department" id="Department" >
                            <option>Finance Department</option>
                            <option>Health Department</option>
                            <option>Energy Department</option>
                            <option>Food Department</option>
                            <option>Defence Department</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Description</Label>
                        <Input type="textarea" name="Description" id="Description" />
                    </FormGroup>

                    <Button className="Submit">SUBMIT</Button>
                </Form>
            </Modal.Body>

        </>
    );
};

export default Example;


//  <FormGroup check>
//       <Label check>
//         <Input type="checkbox" />{' '}
//         Check me out
//       </Label>
//     </FormGroup>