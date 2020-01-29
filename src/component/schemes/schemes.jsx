import React from 'react';
import './schemes.css';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import sendfund from '../sendFunds/sendFunds'
import { withRouter } from 'react-router-dom';
const schemes = props => {
	return (
		<div 	onClick={() =>
			props.history.push('/sendfunds')
		}>
			<Container>
				<Row>
					<Col>
						<Card style={{ backgroundColor: '#f19066' }}>
							<CardBody>
								<CardTitle>
									<h2>
										{props.name}
									</h2>
								</CardTitle>
							</CardBody>
						</Card>
					</Col>
					{/*<Col>
						<Card style={{ backgroundColor: '#778beb' }}>
							<CardBody>
								<CardTitle>
									<h2>
										<center>PQR</center>
									</h2>
								</CardTitle>
							</CardBody>
						</Card>
					</Col>
					<Col>
						<Card style={{ backgroundColor: '#f5cd79' }}>
							<CardBody>
								<CardTitle>
									<h2>
										<center>LMN</center>
									</h2>
								</CardTitle>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col>
						<Card style={{ backgroundColor: '#ea8685' }}>
							<CardBody>
								<CardTitle>
									<h2>
										<center>XYZ</center>
									</h2>
								</CardTitle>
							</CardBody>
						</Card>
					</Col>
					<Col>
						<Card style={{ backgroundColor: '#e77f67' }}>
							<CardBody>
								<CardTitle>
									<h2>
										<center>IJK</center>
									</h2>
								</CardTitle>
							</CardBody>
						</Card>
					</Col>
					<Col>
						<Card style={{ backgroundColor: '#786fa6' }}>
							<CardBody>
								<CardTitle>
									<h2>
										<center>STU</center>
									</h2>
								</CardTitle>
							</CardBody>
						</Card>
					</Col>*/}
				</Row>
			</Container>
		</div>
	);
};
export default withRouter(schemes);
