
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { TypingText } from "./TypingText";
import Portrait from "./Portrait";


export const Banner = () => {

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
                                    <TypingText />
                                </h1>
                                <p>Frontend developer by experience, problem-solver by nature, and a curious mind always exploring what's next. </p>
                                <p>I build for the web, enjoy automating the boring stuff, and believe the best way to learn is to build.</p>

                                <button onClick={()=> document.getElementById("connect")?.scrollIntoView({behavior: "smooth"})}>Let's Connect < ArrowRightCircle size={25}/> </button>
                            </div>}
                        </TrackVisibility>
                    </Col>
                    

                    <Col xs={12} md={6} xl={5}>
                        <Portrait />
                    </Col>
                </Row>
            </Container>
        </section>

    )
};
