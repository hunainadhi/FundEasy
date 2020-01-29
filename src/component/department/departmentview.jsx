import React, { useState, useEffect } from 'react';
import './department.css';
import Department from './department';
import Navbar from '../Navbar/Navbar';
import {
    InputGroup,
    InputGroupButtonDropdown,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

const Departmentview = (props) => {
    const [list, setlist] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [splitButtonOpen, setSplitButtonOpen] = useState(false);
    const [state,usestate] = useState('State');

    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

    const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);

    useEffect(() => {
        fetch('http://localhost:5000/department/', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setlist(data.message);
                console.log(list.map(val => val))
            });
    }, [])

    return (
        <div>
            <Navbar />
           
            <center>
                    <h2>DEPARTMENTS</h2>
                
            <div>
                <InputGroup className="department-input">
                    <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                        <DropdownToggle className="dropdown-state" caret>
                            {state}
                            </DropdownToggle>
                        <DropdownMenu >
                            <DropdownItem header>choose state..</DropdownItem>
                            <DropdownItem onClick={()=>usestate((state)=>{usestate("MAHARASHTRA")})}>MAHARASHTRA</DropdownItem>
                            <DropdownItem onClick={()=>usestate((state)=>{usestate("GUJRAT")})}>GUJRAT</DropdownItem>
                            <DropdownItem onClick={()=>usestate((state)=>{usestate("TELANGANA")})}>TELANGANA</DropdownItem>
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                    <Input placeholder="Search Department" />
                </InputGroup>
                <br />

            </div>
            </center>
            <div>
            { /*
               
                {this.state.list.map((val, index) => (
                    <Department key={val.DeptID} name={val.name} deptid={val.DeptID} />
                ))}
                */}
            </div>
        </div>
    );

}

export default Departmentview;
