import React, { Component } from 'react';
import Scheme from './schemes';
import Navbar from '../Navbar/Navbar';
class schemeview extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             list:[],

        }
    }
    

	componentDidMount() {
		fetch(`http://localhost:5000/scheme/${this.props.location.state.DeptID}`,{
            method:'GET'
        })
			.then(res => res.json())
			.then(data => { console.log(data);
            this.setState({list:[...this.state.list,...data.message]}); 
                console.log(this.state.list.map(val=>val))});
	}

	render() {
        return(
            <div>
            <Navbar/>
				<h2>SCHEMES</h2>
            {this.state.list.map((val,index) =>(
                <Scheme key={val.schemeID} name={val.name} />
            ))}
            </div>
        );
        
	}
}
export default schemeview;
