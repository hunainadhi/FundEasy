import React,{useContext, useState, useEffect} from 'react';
import './send_funds.css';
import Web3 from 'web3';
import $ from 'jquery';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import { UserContext } from '../../UserContext';
import {Button} from 'reactstrap'

const RequestFunds = () => {
    let senderId, receiverId, schemeId, receiver1, receiver2, receiver3, contract, newLen, balance;
    //const [user, setUser]  = useContext(UserContext);
    const  refund = {
        scheme:"Agriculture",
        department:"Agriculture department"
    };
    const sendEmail =()=>{

        

        fetch('http://localhost:5000/notification/reqfund', {
            method: 'POST',
            body: JSON.stringify(refund),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    icon: 'success',
                    text:data.message}
                  )
            });
    }

    return (
        <div className={"sendForm"}>
            <Navbar/>
            <div className={"scheme"}><br/><br/>
                <center>
                    <h2 id='schemeId'>{refund.scheme}</h2><br/><br/>
                    <p id={'desc'}>The Universal Health Insurance Scheme covers medical expenses, provides a personal accident cover to the primary breadwinner of the family, and offers compensation to the family if the earning member passes away. Universal Health Insurance Scheme is offered to Indians by the Indian Government. Both APL (Above poverty Line) and BPL (Below Poverty Line) families can apply for this scheme.</p>
                    <br></br>
                    <Button type="submit" className="button1" onClick={sendEmail}>Request</Button>
                </center>
            </div>
            <div className={"history"}>
                <div id={"hist"}><center>HISTORY</center></div><br/>
                <div id={"prev"}>
                    <div><i className="fa fa-arrow-right" aria-hidden="true"></i>  25th January 2019 : 50000</div><br/>
                    <div><i className="fa fa-arrow-right" aria-hidden="true"></i>  21th October 2018 : 40000</div><br/>
                    <div><i className="fa fa-arrow-right" aria-hidden="true"></i>  17th July 2018 : 45000</div><br/>
                    <div><i className="fa fa-arrow-right" aria-hidden="true"></i>  22th April 2018 : 30000</div><br/>
                    <div><i className="fa fa-arrow-right" aria-hidden="true"></i>  27th January 2018 : 40000</div><br/>
                </div>
            </div>
            <div className={"footer"}>
                <p className={"contact"}>Contact : 00001111 </p>
                <p className={"email"}>Incase of any query, contact us at : support@gmail.com </p>
            </div>
        </div>

    );
};

export default RequestFunds;