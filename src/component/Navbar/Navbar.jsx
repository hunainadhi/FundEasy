import React, { useState } from 'react';
import { Collapse, Navbar,Button, NavbarToggler, NavbarBrand, Nav, NavItem,  NavLink } from 'reactstrap';
import {Modal} from 'react-bootstrap';
import Notification from '../Notification/Notification';
import  Add from '../AddModify/Add';
import './Navbar.css';

const Navigation = props => {

	const [collapsed, setCollapsed] = useState(true);
	
	const [show,setShow] = useState(false);
	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div>
			<Navbar color="faded" light expand="md" >
				<NavbarBrand href="/" style={{color:'white'}}>FundEasy</NavbarBrand>
				<NavbarToggler onClick={toggleNavbar}/>
				<Collapse isOpen={!collapsed} navbar >
					<Nav>
						<NavItem>
							<NavLink style={{ color: 'white' }} href="/">
								Home
							</NavLink>
						</NavItem>
						<NavItem>
							<Notification />
						</NavItem>
						<NavItem onClick={handleShow}>
							<NavLink style={{ color: 'white' }} >
								Add Scheme
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink style={{ color: 'white' }} href="/">
								Generate Report
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink style={{ color: 'white' }} href="/">
								Logout
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>

	
			<Modal show={show} onHide={handleClose}>
				<Add/>
				<Modal.Footer>
					<Button className="Close" variant="secondary" onClick={handleClose}>
						CLOSE
					</Button>
					<Button className="Save" variant="primary" onClick={handleClose}>
						SAVE
					</Button>
				</Modal.Footer>
			</Modal>

		</div>
	);
};

export default Navigation;
