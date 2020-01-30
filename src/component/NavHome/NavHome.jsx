import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand,Button, Nav, NavItem, NavLink } from 'reactstrap';
import Notification from '../Notification/Notification';
import {Modal} from "react-bootstrap";
import Login from'../login/login';
import './NavHome.css';
const NavigationHome = props => {
	// const [collapsed, setCollapsed] = useState(true);

	const [show,setShow]=useState(false);
	const handleShow=()=>setShow(true);
	const handleClose=()=>setShow(false);

	// const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div>
			<Navbar color="faded" light expand="md" >
				<NavbarBrand href="/" style={{color:'white'}}>FundEasy</NavbarBrand>
				{/*<NavbarToggler onClick={toggleNavbar}/>*/}
				{/*<Collapse isOpen={!collapsed} navbar >*/}
					<Nav>
						<NavItem >
							<NavLink onClick={handleShow} id={"login"} >
								LOGIN
							</NavLink>	
						</NavItem>
					</Nav>
				{/*</Collapse>*/}
			</Navbar>
			{/*{!	collapsed && <Login/>}*/}

			<Modal show={show} onHide={handleClose}
				   {...props}
				   size="md"
				   aria-labelledby="contained-modal-title-vcenter"
				   centered
			>

				<Modal.Header  closeButton>

					<Modal.Title id="contained-modal-title-vcenter">
						LOGIN
					</Modal.Title>
				</Modal.Header>
				<Login handle={handleShow} close={handleClose}/>
			</Modal>
		</div>
	);
};

export default NavigationHome;
