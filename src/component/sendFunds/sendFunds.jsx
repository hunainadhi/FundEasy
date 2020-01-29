import React from 'react';
import './send_funds.css';
import Web3 from 'web3';
import $ from 'jquery';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';

const sendFunds = () => {
    let senderId, receiverId, schemeId, receiver1,receiver2,receiver3, contract,newLen;

    function startApp() {

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
        let fundsAddress = "0x7Ad7F110493CF073cD4611a9A18Bcd2349371dcf";
        let web3 = new Web3('http://localhost:8545');
        contract = new web3.eth.Contract(abi, fundsAddress);
        senderId = "0xCca7560Aa7362F49F3E3bA3CC6f248f6d34900Ee";
        receiver1 = "0xC94a06CaC980aedD3246fb4296589BA932EeA5F3";
        receiver2 = '0x4A746fe073C1B1e024B96e1D4bB435f51aC7541a';
        receiver3 = '0x96aFC09b5b54c083E3B0Bf2bDe4A62cfD6c10508';
        newLen = 0;
        schemeId = "Universal Health Insurance Scheme";
    }
    startApp();
    function timeConverter(unixTimestamp) {
        var options = {day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'};
        var dateObj = new Date(unixTimestamp * 1000);
        return dateObj.toLocaleString('en-US', options);
    }
    function getBalance() {
        senderId = '0xCca7560Aa7362F49F3E3bA3CC6f248f6d34900Ee';
        contract.methods.balanceOf(senderId).call().then(function (bal) {
            $('#balance').html(bal);
        })
    }
    window.setInterval(function () {
        getBalance();
        getTransactions();
        track();
    }, 100);

    function wait(time) {
        for (let i = 0; i < time; i++){
        }
    }
    function getTransactions() {
        var notifs;
        contract.methods.getLength().call().then(function (length) {
            if (newLen != length) {
                notifs+='<table border="1">'
                for (let transid = newLen; transid < length; transid++) {
                    contract.methods.transactions(transid).call((err, trans) => {
                        if (trans && trans.receiver == receiver1) {
                            notifs = $('#notifs').html();
                            notifs += '<tr><td>'+trans.sender+'</td><td>'+ '</td>&nbsp;<td>' + trans.receiver + '</td><td>' + timeConverter(trans.timestamp) + '</td><td>' + trans.amount + '</td><td>' + trans.scheme + '</td></tr>';
                            $('#notifs').html(notifs);
                        }
                    });
                    wait(10000000);
                }
                notifs+='</table>';
                newLen = length;
            }
        })
    }

    function track() {
        var track;
        contract.methods.getLength().call().then(function (length) {
            if (newLen != length) {
                for (let transid = newLen; transid < length; transid++) {
                    contract.methods.transactions(transid).call((err, trans) => {
                        if (trans && trans.scheme == schemeId) {
                            track = $('#notifs').html();
                            track += trans.sender + '&nbsp;&nbsp;' + trans.receiver + '&nbsp;&nbsp;' + timeConverter(trans.timestamp) + '&nbsp;&nbsp;' + trans.amount + '&nbsp;&nbsp;' + trans.scheme + '<br>';
                            $('#track').html(track);
                        }
                    });
                    wait(10000000);
                }
                newLen = length;
            }
        })
    }
    function sendTransaction() {
        var receiver, userAccount;
        var amt = $('#amt').val();
        var scheme = $('#schemeId').html();
        function getData() {
            receiver = '0xC94a06CaC980aedD3246fb4296589BA932EeA5F3';
            userAccount = '0xCca7560Aa7362F49F3E3bA3CC6f248f6d34900Ee';
            if (amt > 0 && !isNaN(amt)) {
                Swal.fire({
                    title: 'Sending the money...',
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                    }
                });
                return contract.methods.transferFunds(receiver, amt, scheme)
                    .send({ from: userAccount })
                    .on("receipt", function (receipt) {
                        Swal.fire({
                                icon:'success',
                                title:'Yayyy!!!',
                                text:'Successfully sent money to National Health Department!'
                            }
                        );
                    })
                    .on("error", function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error,
                        });
                    });
            } else {
                $('#amt').val('');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Enter a valid number!'
                });
            }
        }
        getData();
    }
    return (

        <div className={"sendForm"} onLoad={() => {startApp()}}>
            <Navbar />
            <center>
                <h2 id='senderId'>Sender: Central Government</h2><br/>
                <h4 id='deptId'>Receiver: National Health Department</h4><br/>
                <h5 id='schemeId'>Universal Health Insurance Scheme</h5><br/>
                <input type="number" placeholder={"Enter Amount:"} id="amt" min='1' step="1" />
                <input type="email" placeholder={"Enter Destination email:"} id="destMail"/>
                <button type="submit" className="button1" onClick={sendTransaction}>SEND</button>
                <br/><br/>
                <div className="balanc">Your Balance Is <p id="balance"></p></div>
                <br/>
                Notifications:
                <p id={'notifs'}></p>
                <br/>
            </center>
        </div>
    );

};

export default sendFunds;