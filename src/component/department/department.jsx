import React from 'react';
import './department.css';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
const department = props => {
	return (
		<div
			onClick={() =>
				props.history.push({
					pathname: '/schemes',
					state: { DeptID: props.deptid,
					},
				})
			}
		>
			<Container>
				<Row>
					<Col>
						<Card style={{ backgroundColor: '#f19066' }}>
							<CardBody>
								<CardTitle>
									<h2>
										<center>{props.name}</center>
									</h2>
								</CardTitle>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export default withRouter(department);
