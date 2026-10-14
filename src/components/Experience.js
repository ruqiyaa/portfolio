import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import colourSharp from "../assets/img/color-sharp2.png"

const experiences = [
  {
    id: "capgemini",
    role: "Senior Analyst (Frontend Developer)",
    company: "Capgemini",
    period: "May 2022 - Jul 2025",
    points: [
      "Built 20+ responsive pages and modules using React.js and CoreUI.",
      "Created and documented 25+ reusable React components.",
      "Converted 30+ Figma designs into accessible, WCAG-compliant JSX components.",
      "Implemented Redux and React Query caching to reduce redundant API calls and improve page load time.",
      "Designed Blue Prism automation workflows and built C# backend components.",
    ],
  },
  {
    id: "career-break",
    role: "Career Break - Upskilling",
    company: "Self-learning",
    period: "Jul 2025 - Present",
    points: [
      "Learning TypeScript, Jest, Data Structures, and the MERN stack.",
      "Building projects, including this portfolio.",
    ],
  },
];

export const Experience = () => {
  return (
    <section className="experience" id="experience">
      <Container>
        <Row>
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                 <div className={isVisible ? "animate__animated animate__slideInDown" : ""}>
                  <h2>Experience</h2>
                  <p>my professional experience</p>
                </div>
              )}
            </TrackVisibility>

            <div className="exp-timeline">
              {experiences.map((exp) => (
                <div className="exp-item" key={exp.id}>
                  <div className="exp-dot"></div>
                  <div className="exp-card">
                    <span className="exp-period">{exp.period}</span>
                    <h3>{exp.role}</h3>
                    <h4>{exp.company}</h4>
                    <ul>
                      {exp.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
       <img className="background-image-left" src={colourSharp} alt="gradient" />
    </section>
  );
};