import React, { useState, useContext } from 'react';
import { Collapse, Navbar,Button, NavbarToggler, NavbarBrand, Nav, NavItem,  NavLink } from 'reactstrap';
import {Modal} from 'react-bootstrap';
import Notification from '../Notification/Notification';
import  Add from '../AddModify/Add';
import  Modify from '../AddModify/Modify';
import './Navbar.css';
import { UserContext } from '../../UserContext';

import Web3 from "web3";

function hashToName(address) {
	let deptName;

	return deptName;
}
function timeConverter(unixTimestamp) {
	var options = { day: '2-digit', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
	var dateObj = new Date(unixTimestamp * 1000);
	return dateObj.toLocaleString('en-IN', options).replace(/,/g, "");
}

function generateReport() {
	let senderId, receiverId, schemeId, receiver1, receiver2, receiver3, contract, newLen, balance;
	let abi = [
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "address",
					"name": "_receiver",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "_scheme",
					"type": "string"
				}
			],
			"name": "transferFunds",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getLength",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "transactions",
			"outputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "receiver",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "scheme",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}
	];
	let fundsAddress = "0x82B32B5230E7D37c45c37f4ccCA0374B0180DB3f";
	let web3 = new Web3('http://localhost:8545');
	contract = new web3.eth.Contract(abi, fundsAddress);
	senderId = "0xCca7560Aa7362F49F3E3bA3CC6f248f6d34900Ee";
	newLen = 0;
	schemeId = "Universal Health Insurance Scheme";

	var tableHeaders = ["Date", "Sender", "Receiver", "Scheme", "Amount"];
	let csvContent = "data:text/csv;charset=utf-8,";
	let row = tableHeaders.join(",");
	csvContent += row + "\r\n";
	contract.methods.getLength().call().then(function (length) {
		let i = 0;
		for (let transid = 0, p = Promise.resolve(); transid < length; transid++) {
			p = p.then(_ => new Promise(resolve =>
				contract.methods.transactions(transid).call().then(function (trans) {
					if (trans) {
						let trow = [timeConverter(trans.timestamp), hashToName(trans.sender), hashToName(trans.receiver), trans.scheme, trans.amount];
						let row = trow.join(",");
						csvContent += row + "\r\n";
						resolve();
						i++;
					}
				})
			));
		}
		let callCsv = setInterval(checkCsv, 1000);
		function checkCsv() {
			if (i == length) {
				clearInterval(callCsv);
				downloadCsv(csvContent);
			}
		}
	})
}
function downloadCsv(csvContent) {
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.style.display = 'none';
	link.setAttribute("download", "Funds Report.csv");
	link.innerHTML = "Click Here to download";
	document.body.appendChild(link);

	link.click();
	link.remove();
}

const Navigation = props => {
	const [collapsed, setCollapsed] = useState(true);
	const [person, setUser]  = useContext(UserContext);
	const [show,setShow] = useState(false);
	const[modify,setModify]=useState(false);

	const modifyClose=()=>setModify(false);
	const modifyShow=()=>setModify(true);
	const [generate,setGenerate]=useState(false);
	const handleClose = () => setShow(false);
  	
	console.log(person)
	const handleShow = () => setShow(true);
	const generateClose=()=>setGenerate(false);
	const generateShow=()=>setGenerate(true);

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
						{ person.type == "central" &&
						<NavItem onClick={handleShow}>
							<NavLink style={{ color: 'white' }} >
								Add Scheme
							</NavLink>
						</NavItem>
							}
							{ person.type == "central" &&
						<NavItem onClick={handleShow}>
							<NavLink style={{ color: 'white' }} >
								Modify Scheme
							</NavLink>
						</NavItem>}
						{ person.type == "central" &&
						<NavItem>
							<NavLink style={{ color: 'white' }} onClick={generateShow}>
								Generate Report
							</NavLink>
						</NavItem>
						}
						<NavItem>
							<NavLink style={{ color: 'white' }} href="/">
								Logout
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
			<Modal show={show} onHide={handleClose}>
				<Add className="Add" close={handleClose}/>
			</Modal >
			<Modal show={modify} onHide={modifyClose}>
				<Modify className="Modify" close={modifyClose}/>
			</Modal>

			<Modal show={generate} onHide={generateClose}>
				<Modal.Header closeButton>
					<Modal.Title>Download Report</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button className="Closegen" variant="secondary" onClick={generateClose}>
						CLOSE
					</Button>
					<Button className="Generate" variant="primary" onClick={generateReport}>
						GENERATE
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Navigation;
