import { Container, Row, Col } from "react-bootstrap";

import logo from '../assets/img/logo-image.png';

import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/git-icon-nav.png';

export const Footer = () => {
    return(
        <footer className="footer">
            <Container>
                <Row className="align-item-center">
                    
                    <Col sm={6}>
            <img src={logo} alt="logo" style={{ width: "auto", height: "100px" }} />
                    </Col>

                    <Col sm={6} className="text-center text-sm-end">
                        <div className="social-icon">
                            <a href="https://www.linkedin.com/in/ruqiya-syeda/" target="_blank" rel="noreferrer">
                                <img src={navIcon1} alt="LinkedIn" />
                            </a>
                            <a href="https://github.com/ruqiyaa" target="_blank" rel="noreferrer">
                                <img src={navIcon2} alt="GitHub" />
                            </a>
                        </div>

                        <p>CopyRight 2026. All rights reserved.</p>
                        <p>Created by Ruqiya Syeda.
                            
                        </p>
                    </Col>

                </Row>
            </Container>
        </footer>
    )
}