import React from 'react';
import './state_dept.css';
import Navbar from '../Navbar/Navbar';
import {
    Card, CardBody,
    CardTitle, Container, Row, Col
} from 'reactstrap';

const state_dept = () => {
    return (
        <div>
            <Navbar/>
            <center><h2>STATE DEPARTMENTS</h2></center>
            <Container>
                <Row>
                    <Col>
                        <Card style={{backgroundColor: '#f19066'}}>
                            <CardBody>
                                <CardTitle>
                                    <h2><center>State Health Department</center></h2>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{backgroundColor: '#778beb'}}>
                            <CardBody>
                                <CardTitle>
                                    <h2><center>State Education Department</center></h2>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{backgroundColor: '#f5cd79'}}>
                            <CardBody>
                                <CardTitle>
                                    <h2><center>State Finance Department</center></h2>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card style={{backgroundColor: '#ea8685'}}>
                            <CardBody>
                                <CardTitle>
                                    <h2><center>State Defence Department</center></h2>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{backgroundColor: '#e77f67'}}>
                            <CardBody>
                                <CardTitle>
                                    <h2><center>State Energy Department</center></h2>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{backgroundColor: '#786fa6'}}>
                            <CardBody>
                                <CardTitle>
                                    <h2><center>State Food Department</center></h2>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default state_dept;