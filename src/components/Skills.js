import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import colourSharp from "../assets/img/color-sharp.png";

const skillGroups = [
  {
    id: "frontend",
    tabName: "Frontend",
    skills: [
      "React.js", "JavaScript (ES6+)", "HTML5", "CSS3", 
      "Redux", "React Query", "React Bootstrap", "CoreUI",
      "Responsive Design", "Accessibility (WCAG)",
    ],
  },
  {
    id: "backend",
    tabName: "Backend & Data",
    skills: [
      "Python", "Node.js", "Express.js", "REST API Integration",
      "SQL", "SQLite", "Socket.io", "C#", ".NET",
    ],
  },
  {
    id: "tools",
    tabName: "Tools & Practices",
    skills: [
      "Blue Prism (RPA)", "Git", "Figma to Code", "Performance Optimization",
      "Cross-browser Compatibility", "Agile / Scrum",
      
    ],
  },
  {
    id: "learning",
    tabName: "Upskilling",
    skills: ["Data Structures", "MERN stack"],
  },
];

export const Skills = () => {
  return (
    <section className="skill" id="skills">
      <Container>
        <Row>
          <Col>
            <div className="skill-bx">
              <h2>Skills</h2>
              <p>The languages, frameworks and strengths I bring</p>

              <Tab.Container id="skills-tabs" defaultActiveKey={skillGroups[0].id}>
                <Nav
                  variant="pills"
                  fill
                  className="skills-nav mb-4 justify-content-center align-items-center"
                >
                  {skillGroups.map((group) => (
                    <Nav.Item key={group.id}>
                      <Nav.Link eventKey={group.id}>{group.tabName}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                <Tab.Content>
                  {skillGroups.map((group) => (
                    <Tab.Pane eventKey={group.id} key={group.id}>
                      <div className="skill-chips">
                        {group.skills.map((skill) => (
                          <span className="skill-chip" key={skill}>{skill}</span>
                        ))}
                      </div>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </div>
          </Col>
        </Row>
      </Container>
      <img className="background-image-left" src={colourSharp} alt="" />
    </section>
  );
};