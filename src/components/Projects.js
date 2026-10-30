import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorsharp2 from "../assets/img/color-sharp2.png";
import projimg1 from "../assets/img/spin-wheel-img.png";
import projimg2 from "../assets/img/fractal-tree-img.png";
import projimg3 from "../assets/img/movie-app-img.png";
import projimg4 from "../assets/img/proj-img-4.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

const projects = [
  {
    id: "fractal-tree",
    tabName: "Fractal Tree",
    title: "Animated Fractal Tree",
    description:
      "An animated fractal tree drawn using react wrapper. I've used the same under Contact Me page",
    image: projimg2,
    demo: "",
    github: "https://github.com/ruqiyaa/fractalTree",
  },
   {
    id: "movie-app",
    tabName: "Movie App",
    title: "Movie Search App",
    description:
      "Search for movies and view their details such as poster, rating and release year, using a movie API.",
    image: projimg3,
    demo: "",
    github: "https://github.com/ruqiyaa/MovieApp",
  },
  {
    id: "denmark",
    tabName: "Denmark Project",
    title: "Telecom Project (Denmark)",
    description:
      "Worked on maintenance and new functionality for a telecom project, building and fixing UI features.",
    image: projimg4, // replace with a real screenshot
    demo: "",
    github: "",
  },
  {
    id: "spin-wheel",
    tabName: "Spin Wheel",
    title: "Spin Wheel Game",
    description:
      "A basic spin wheel game built with JavaScript. The wheel spins on click and lands on a random result.",
    image: projimg1,
    demo: "", // add your live link
    github: "https://github.com/ruqiyaa/SpinWheel", // add your GitHub link
  },
  
 
//   {
//     id: "game",
//     tabName: "Demark Project",
//     title: "Telecom Project (Demark)",
//     description:
//       "Worked on maintenance and new functionality for a telecom project, building and fixing UI features.",
//     image: projimg3, // replace with a real screenshot
//     demo: "",
//     github: "",
//   },
];

const responsive = {
  desktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 600 }, items: 2 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
};

export const Projects = () => {
  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__slideInDown" : ""}>
                  <h2>Projects</h2>
                  <p>Things I've created</p>
                </div>
              )}
            </TrackVisibility>

            <Carousel
              responsive={responsive}
              infinite={true}
              showDots={true}
              arrows={true}
              itemClass="project-slide"
              className="project-slider"
            >
              {projects.map((project) => (
                <div className="project-card" key={project.id}>
                  <img src={project.image} alt={project.title} />
                  <div className="project-card-body">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-links">
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noreferrer">Live Demo</a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorsharp2} alt="" />
    </section>
  );
};