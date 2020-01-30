import React, { useContext, useState } from 'react';
import './login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Swal from 'sweetalert2';
import {Modal} from 'react-bootstrap';
const Login = props => {
	const [email, setemail] = useState('');
	const [password, setpass] = useState('');
	 const [user, setUser]  = useContext(UserContext);
	 const [type,settype] = useState('');
	 const [DeptID, setdept] = useState('');
	const [isloggedin,setlog] = useState(false);
	function onsubmit(){
		
		
		const user = {
			email: email,
			password: password,
			type:type,
			DeptID:DeptID,
		};
		
		if (user)
			fetch('http://localhost:5000/user/login', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(res => res.json())
				.then(data => {
					settype(data.type);
					setdept(data.DeptID);
					console.log(data);
					if (data.Token) {
						console.log(data);
						Swal.fire({
							icon: 'success',
							text:'You are logged in!'}
						  ).then((result)=>{
							  if(result.value){
								setlog(true);
							  }
						  })
						
					}
					else{
						Swal.fire({
							icon: 'error',
							text:'Incorrect Email or Password!'}
						  )
					}
				});

		}


	/*
		if (this.state.isvalid && this.state.type === 'Central') {
			return (<Department />);
		} else if (this.state.isvalid && this.state.type === 'State') {
			return (<Redirect to="/state_dept" />);
		} else {
		//	return <Alert color="info">Incorrect login details</Alert>;
		*/

	

if(isloggedin){
	return(<Redirect to="/Navbar" />);
}
else{ 
	return (
		<>
		{/*// <div className="layout">*/}
			{/*<h1 style={{ textAlign: 'center', color: 'lavender', fontFamily: 'cursive' }}>LOGIN</h1>*/}
			{/*<hr />*/}
			{/*// <br />*/}
		<Modal.Body>
			<Form>
				<FormGroup>
					<Label>
						<h5>Email</h5>
					</Label>
					<Input
						type="email"
						name="email"
						placeholder="xyz@gmail.com"
						onChange={(e) => setemail(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>
						<h5>Password</h5>
					</Label>
					<Input
						type="password"
						name="password"
						placeholder="**********"
	
						onChange={(e) => setpass(e.target.value)}
					/>
				</FormGroup><br/>
				<center>
					<Button color="info" onClick={() => onsubmit()} style={{width:'100%'}}>
						<h5 style={{ color: 'white' }}>LOGIN</h5>
					</Button>
				</center>
			</Form>
			</Modal.Body>
		</>
	);
}
};

export default Login;
