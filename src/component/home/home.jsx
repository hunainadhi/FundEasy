import React from 'react';
import NavHome from '../NavHome/NavHome';
import Carousel from '../Carousel/Carousel';
import {Modal} from "react-bootstrap";
import Login from "../login/login";
function home(props) {
  return (
    <div >
        <NavHome />
        <center><br/>
        <h3 id={"init"}>LATEST INITIATIVES</h3><br/>
        </center>
        <Carousel />
    </div>
  );
};
export default home;
