import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Notification from '../Notification/Notification';
import './Navbar.css';
const Navigation = props => {
	const [collapsed, setCollapsed] = useState(true);

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
						<NavItem>
							<NavLink style={{ color: 'white' }} href="/">
								Logout
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Navigation;
