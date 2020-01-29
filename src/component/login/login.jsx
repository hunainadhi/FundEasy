import React, { useContext, useState } from 'react';
import './login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Department from '../department/departmentview';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Swal from 'sweetalert2';

const Login = props => {
	const [email, setemail] = useState('');
	const [password, setpass] = useState('');
	 const [user, setUser]  = useContext(UserContext);
	const [isloggedin,setlog] = useState(false);
	function onsubmit(){
		
		
		const user = {
			email: email,
			password: password,
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
					setUser(user);
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
		
		<div className="layout">
			<h1 style={{ textAlign: 'center', color: 'lavender', fontFamily: 'cursive' }}>LOGIN</h1>
			<hr />
			<br />
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
					<br />
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
				</FormGroup>
				<br />
				<Button color="info" onClick={() => onsubmit()}>
					<h5 style={{ color: '#546de5' }}>LOGIN</h5>
				</Button>
			</Form>
		</div>
	);
}
};

export default Login;
