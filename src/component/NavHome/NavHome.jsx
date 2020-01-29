import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Notification from '../Notification/Notification';
import Login from'../login/login';
import './NavHome.css';
const NavigationHome = props => {
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
							<NavLink >
								<Login/>
							</NavLink>	
						</NavItem>
						
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default NavigationHome;
