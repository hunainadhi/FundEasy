import React, { lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
const home = lazy(() => import('./component/home/home'));
const departmentview = lazy(() => import('./component/department/departmentview'));
const schemeview = lazy(() => import('./component/schemes/schemeview'));
const state_dept = lazy(() => import('./component/state_dept/state_dept'));
//const sendFunds = lazy(() => import('./component/sendFunds/sendFunds'));
const AddModify = lazy(() => import('./component/AddModify/Add'));
const sendFunds = lazy(() => import('./component/sendFunds/sendFunds'));
const Navbar = lazy(()=> import('./component/Navbar/Navbar'));
const requestFunds = lazy(() => import('./component/sendFunds/requestfund'));


function App() {
	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path="/" exact component={home} />
					<Route path="/department" exact component={departmentview} />
					<Route path="/schemes" exact component={schemeview} />
					<Route path="/state_dept" exact component={state_dept} />
					<Route path="/AddModify" exact component={AddModify} />
					<Route path="/Navbar" exact component={home} />					
					<Route path="/sendFunds" exact component={sendFunds} />
					<Route path="/Navbar" exact component={Navbar}/>
					<Route path="/requestFunds" exact component={requestFunds}/>
				</Switch>
			</Suspense>
		</Router>
	);
}
export default App;
	