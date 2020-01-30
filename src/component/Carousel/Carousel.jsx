import React, { Component } from "react";
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

export default class Carousel extends Component {
    render() {
        const settings = {
            dots: true,
            infinite:true,
            speed: 500,
            slidesToShow: 4,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div>
                <h2> Department of Maharashta </h2>
                <Slider {...settings}>
                    <div>
                        <img src={health}/>
                        <h3>BKMB</h3>
                    </div>
                    <div>
                        <img src={agri}/>
                        <h3>2</h3>
                    </div>
                    <div>
                        <img src={swachh}/>
                        <h3>3</h3>
                    </div>
                    <div>
                        <img src={midday}/>
                        <h3>4</h3>
                    </div>
                    <div>
                        <img src={household}/>
                        <h3>5</h3>
                    </div>
                </Slider>
            </div>
        );
    }
}