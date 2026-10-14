import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons"; 
//import headerImg from '../assets/img/header-img.svg';
import bannerimg from '../assets/img/banner-img.png';
import 'animate.css';
import TrackVisibility from "react-on-screen";
import { isVisible } from "@testing-library/user-event/dist/utils";

export const Banner = () => {

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = [
        "Web Developer", 
        "Web Designer", 
        "Frontend Developer"
    ];
    const[text, setText] = useState("");
    const [delta, setDelta] = useState(150);
    const period = 2000;

   useEffect(() => {
    const ticker = setTimeout(() => {
        tick();
    }, delta);

    return () => clearTimeout(ticker);
}, [text, delta, isDeleting, loopNum]);

// just to check commit 
    const tick = () => {
        const i = loopNum % toRotate.length;
        const fullText = toRotate[i];
        const updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if(isDeleting){
            setDelta(40)
        }

        if(!isDeleting && updatedText === fullText){
            setIsDeleting(true);
            setDelta(period);

        } else if(isDeleting && updatedText === ''){
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(80);
        }
    }   

    return (
        <section className= "banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility>
                        {({isVisible}) =>
                            <div className={isVisible ? "animate__animated animate__fadeIn":""}>
                                <span className = "tagline">Welcome to my portfolio</span> 
                                <h1>
                                    Hi, I'm Ruqiya
                                    <br>
                                    </br>
                                    <span className="wrap">{text}</span>
                                </h1>
                                <p>Frontend developer by experience, problem-solver by nature, and a curious mind always exploring what's next. </p>
                                <p>I build for the web, enjoy automating the boring stuff, and believe the best way to learn is to build.</p>

                                <button onClick={()=> document.getElementById("connect")?.scrollIntoView({behavior: "smooth"})}>Let's Connect < ArrowRightCircle size={25}/> </button>
                            </div>}
                        </TrackVisibility>
                    </Col>
                    

                    <Col xs={12} md={6} xl={5}>
                        <img src={bannerimg} alt="header img" />
                    </Col>
                </Row>
            </Container>
        </section>

    )
}