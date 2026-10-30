import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons"; 
//import headerImg from '../assets/img/header-img.svg';
import bannerimg from '../assets/img/banner-img.png';

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
                    <span className = "tagline">Welcome to my portfolio</span> 
                    <h1>
                        Hi, I'm Ruqiya
                        <br>
                        </br>
                        <span className="wrap">{text}</span>
                    </h1>
                    <p>//need to add a decription here of what i do//</p>
                    <p>//need to add a decription here of what i do//</p>
                    <p>//need to add a decription here of what i do//</p>
                    <p>//need to add a decription here of what i do//</p>
                    <p>//need to add a decription here of what i do//</p>

                    <button onClick={()=>console.log("")}>Let's Connect < ArrowRightCircle size={25}/> </button>
                    </Col>

                    <Col xs={12} md={6} xl={5}>
                        <img src={bannerimg} alt="header img" />
                    </Col>
                </Row>
            </Container>
        </section>

    )
}