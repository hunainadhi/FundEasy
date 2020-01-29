import React from 'react';
import './send_funds.css';
import Web3 from 'web3';
import $ from 'jquery';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';

const sendFunds = () => {
    let senderId, receiverId, schemeId, receiver1, receiver2, receiver3, contract, newLen, balance;

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
        let fundsAddress = "0x82B32B5230E7D37c45c37f4ccCA0374B0180DB3f";
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
        var options = { day: '2-digit', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        var dateObj = new Date(unixTimestamp * 1000);
        return dateObj.toLocaleString('en-IN', options).replace(/,/g, "");
    }
    function getBalance() {
        senderId = '0xCca7560Aa7362F49F3E3bA3CC6f248f6d34900Ee';
        contract.methods.balanceOf(senderId).call().then(function (bal) {
            balance = bal;
        })
    }
    function updateBalance() {
        let bal = balance;
        $('#balance').html(bal);
    }

    window.setInterval(function () {
        getBalance();
        updateBalance();
        getTransactions();
        track();
    }, 100);

    function wait(time) {
        for (let i = 0; i < time; i++);
    }
    function getTransactions() {
        var notifs;
        contract.methods.getLength().call().then(function (length) {
            if (newLen != length) {
                for (let transid = newLen; transid < length; transid++) {
                    contract.methods.transactions(transid).call((err, trans) => {
                        if (trans && trans.receiver == receiver1) {
                            notifs = $('#notifs').html();
                            notifs += trans.sender + ' ' + trans.receiver + ' ' +timeConverter(trans.timestamp) +' ' + trans.amount +' ' + trans.scheme+'<br>';
                            $('#notifs').html(notifs);
                        }
                    });
                    wait(10000000);
                }
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
                            track = $('#track').html();
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

    function genReport() {
        var report = new Array();
        var tableHeaders = ["Date", "Sender", "Receiver", "Scheme", "Amount"];
        let csvContent = "data:text/csv;charset=utf-8,";
        let row = tableHeaders.join(",");
        csvContent += row + "\r\n";
        contract.methods.getLength().call().then(function (length) {
            var i = 0;
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
            var callCsv = setInterval(checkCsv, 1000);
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
    function hashToName(address) {
        let deptName;

        return deptName;
    }
    function nameToHash(id) {
        let address;

        return address;
    }
    function sendEmail(amount,dept,scheme,email) {
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kbohra89@gmail.com',
                pass: 'rabtizaebvftujgd'
            }
        });

        var mailOptions = {
            from: 'kbohra89@gmail.com',
            to: email,
            subject: 'Notification about Fund Receipt',
            body: "Dear Officer,<br><br>" + dept + " has received " + amount + " for " + scheme,
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    function sendTransaction() {
        var receiver, userAccount;
        var amt = $('#amt').val();
        var scheme = $('#schemeId').html();
        var deptName = 'National Health Department';
        var schemeName = 'Health For All';
        var email = 'npd@somaiya.edu';
        function getData() {
            receiver = '0xC94a06CaC980aedD3246fb4296589BA932EeA5F3';
            userAccount = '0xCca7560Aa7362F49F3E3bA3CC6f248f6d34900Ee';
            if (amt > 0 && !isNaN(amt) && (balance - amt) >= 0) {
                $('#amt').val('');
                Swal.fire({
                    title: 'Sending the funds...',
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                    }
                });
                return contract.methods.transferFunds(receiver, amt, scheme)
                    .send({ from: userAccount })
                    .once('transactionHash',function(hash){
                        console.log(hash);
                    })
                    .on('receipt', function (receipt) {
                        if (receipt) {
                            updateBalance();
                            Swal.fire({
                                icon: 'success',
                                title: 'Funds Disbursed',
                                text: 'Successfully sent money to ' + hashToName(receiver) + '!'
                            })
                                .then(function (){
                                    sendEmail(amt,deptName,schemeName,email)
                                });
                        }
                    })
                    .on("error", function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error,
                        });
                    });
            } else if ((balance - amt) < 0) {
                $('#amt').val('');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Insufficient Balance!'
                });
            }
            else {
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
                {/*<input type="email" placeholder={"Enter Destination email:"} id="destMail"/>*/}
                <button type="submit" className="button1" onClick={sendTransaction}>SEND</button>
                <br/><br/>
                <p id='balance'> </p><br/>
                <button onClick={genReport}>Generate report</button>
                <br/><br/>
                <br/>
                Notifications:
                <p id='notifs'> </p>
                <br/>
            </center>
        </div>
    );
};

export default sendFunds;