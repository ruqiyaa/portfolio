import { Container, Row, Col, Nav, Tab, Tabs } from "react-bootstrap";
import { ProjectsCard } from "./ProjectsCard";
import colorsharp2 from "../assets/img/color-sharp2.png";
import projimg1 from '../assets/img/project-img1.png';
import projimg2 from '../assets/img/project-img2.png';
import projimg3 from '../assets/img/project-img3.png';


export const Projects = () => {
    const projects = [
        {
            title: "spin-wheel",
            description: "Created a basic spin wheel game",
            imgurl: projimg1,
        },
        {
            title: "fractal tree",
            description: "Animated fractal tree",
            imgurl: projimg2
        },
        {
            title: "Movie App",
            description: "search movie whoch shows details",
            imgurl: projimg3
        },
        // {
        //     title: "demark project",
        //     description: "telecom project maintenance and adding functionalities",
        //     imgurl: projimg4
        // }
    ];

    return (
        <section className="project" id="project">
            <Container>
                <Row>
                    <Col>
                    <h2>
                        Projects
                    </h2>
                    <p>this the is the description part need to be added later
                    </p>



                    {/* react bootstrap tabs pill*/}
                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                        <Row>
                            <Col>
                            <Nav variant="pills" fill className="projects-nav mb-5 justify-content-center align-items-center" id="pills-tab">
                                <Nav.Item>
                                <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="third">Tab 3</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            </Row>

                            <Row>
                            <Col>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Row>
                                        {
                                            projects.map((project, index) => {
                                                return(
                                                    <ProjectsCard
                                                    key = {index}
                                                    {...project}
                                                    />
                                                )
                                            })
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">Second</Tab.Pane>
                                <Tab.Pane eventKey="third"> Third</Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                     </Tab.Container>

                    </Col>
                </Row>
            </Container>
            <img className= "background-image-right" src={colorsharp2} />
        </section>
    )
}