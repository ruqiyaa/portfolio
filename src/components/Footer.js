import { Container, Row, Col } from "react-bootstrap";

import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/git-icon-nav.png';

export const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col xs={12} className="text-center">
                        <div className="social-icon">
                            <a href="https://www.linkedin.com/in/ruqiya-syeda/" target="_blank" rel="noreferrer">
                                <img src={navIcon1} alt="LinkedIn" />
                            </a>
                            <a href="https://github.com/ruqiyaa" target="_blank" rel="noreferrer">
                                <img src={navIcon2} alt="GitHub" />
                            </a>
                        </div>

                        <p>Copyright 2026. All rights reserved.</p>
                        <p>Created by Ruqiya Syeda.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};