import React, { Component,useState } from "react";
import {Modal} from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import health from "../../Images/health.jpg";
import agri from "../../Images/agriculture.jpg";
import swachh from "../../Images/swacch.jpg";
import midday from "../../Images/midday.jpg";
import household from "../../Images/household.jpg";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, background:"#ea4b32",borderRadius:"50%"}}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, background: "#ea4b32",borderRadius:"50%" }}
            onClick={onClick}
        />
    );
}

function Corousel(props){

        const settings = {
            dots: true,
            infinite:true,
            speed: 500,
            slidesToShow: 4,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        const [show, setShow] = useState(false);
        const handleShow=()=>setShow(true);
        const handleClose=()=>setShow(false);

        return (
            <>
            <div>
                <div className={"dept"}>
                    <div className={"dept_name"}><h4> By  <span style={{color:"green",fontSize:"35px"}}> MAHARASHTRA</span> </h4></div>
                    <Slider {...settings}>
                        <div className="card" onClick={handleShow} style={{cursor:'pointer'}}>
                            <img src={health}/>
                            <h4>Swasthiya Bima Yojana </h4>
                        </div>
                        <div>
                            <img src={agri}/>
                            <h4>Fasal Bima Yojana</h4>
                        </div>
                        <div>
                            <img src={swachh}/>
                            <h4>Swachh Bharat Abhiyan</h4>
                        </div>
                        <div>
                            <img src={midday}/>
                            <h4>Mid-Day Meal Scheme</h4>
                        </div>
                        <div>
                            <img src={household}/>
                            <h4>Jan Dhan Yojana</h4>
                        </div>
                    </Slider>
                </div><br/><br/>

            <div className={"dept"}>
            <div className={"dept_name"}><h4> By  <span style={{color:"#9b59b6",fontSize:"32px"}}> GUJARAT</span> </h4></div>
            <Slider {...settings}>
            <div>
                <img src={health}/>
                <h4>Swasthiya Bima Yojana </h4>
            </div>
            <div>
                <img src={agri}/>
                <h4>Fasal Bima Yojana</h4>
            </div>
            <div>
                <img src={swachh}/>
                <h4>Swachh Bharat Abhiyan</h4>
            </div>
            <div>
                <img src={midday}/>
                <h4>Mid-Day Meal Scheme</h4>
            </div>
            <div>
                <img src={household}/>
                <h4>Jan Dhan Yojana</h4>
            </div>
        </Slider>
        </div></div>
            <Modal show={show} onHide={handleClose}
                   {...props}
                   size="md"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Swasthiya Bima Yojana</Modal.Title>
                 </Modal.Header>
                <Modal.Body>
                    Rashtriya Swasthya Bima Yojana is a government-run health insurance programme for the Indian poor.
                    The scheme aims to provide health insurance coverage to the unrecognised sector workers belonging to the BPL
                    category and their family members shall be beneficiaries under this scheme.
                </Modal.Body>
            </Modal>
        </>

    );
}

export default  Corousel;