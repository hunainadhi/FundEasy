import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Example = (props) => {
  return (
     <Form>
      <FormGroup>
        <Label for="schemename">Scheme Name</Label>
        <Input type="text" name="schemename" id="schemename" placeholder="Enter Scheme name" />
      </FormGroup>
      <FormGroup>
        <Label for="schemeid">SchemeId</Label>
        <Input type="text" name="schemeId" id="schemeId"/>
      </FormGroup>
      <FormGroup>
        <Label for="dept">Select Department</Label>
        <Input type="select" name="Department" id="Department" >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Description</Label>
        <Input type="textarea" name="Description" id="Description" />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          Check me out
        </Label>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default Example;
