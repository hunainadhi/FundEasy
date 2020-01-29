import React, { lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
const home = lazy(() => import('./component/home/home'));
const departmentview = lazy(() => import('./component/department/departmentview'));
const schemeview = lazy(() => import('./component/schemes/schemeview'));
const state_dept = lazy(() => import('./component/state_dept/state_dept'));
const sendFunds = lazy(() => import('./component/sendFunds/sendFunds'));


function App() {
	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path="/" exact component={home} />
					<Route path="/department" exact component={departmentview} />
					<Route path="/schemes" exact component={schemeview} />
					<Route path="/state_dept" exact component={state_dept} />
					<Route path="/sendFunds" exact component={sendFunds} />
				</Switch>
			</Suspense>
		</Router>
	);
}
export default App;
	