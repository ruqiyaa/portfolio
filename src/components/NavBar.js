import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useEffect, useState } from 'react';
import logo from '../assets/img/logo-image.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/git-icon-nav.png';
import navIcon3 from '../assets/img/email-icon-nav.png';

export const NavBar = () => {
    const[activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() =>{
        const onScroll = () =>{
            if(window.scrollY > 50){
                setScrolled(true);
            }
            else{
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll)

        return()=>window.removeEventListener("scroll", onScroll);
    },[]);

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

    const [showEmail, setShowEmail] = useState(false);
    const [copied, setCopied] = useState(false);
    const myEmail = "ruqiya.syed@gmail.com"; 

    const copyEmail = () => {
      navigator.clipboard.writeText(myEmail);
      setCopied(true);
       setTimeout(() => {
          setCopied(false);
          setShowEmail(false); // closes the popup
        }, 1200);
    };

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home">
            <img src={logo} alt="logo" style={{ width: "auto", height: "100px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className='navbar-toggler-icon'></span>
        </Navbar.Toggle >
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className={activeLink === 'home'? 'active-navbar-link': 'navbar-link'} onClick={()=> onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="#skills" className={activeLink === 'skills'? 'active-navbar-link': 'navbar-link'} onClick={()=> onUpdateActiveLink('skills')}>Skills</Nav.Link>
           <Nav.Link href="#projects" className={activeLink === 'projects'? 'active-navbar-link': 'navbar-link'} onClick={()=> onUpdateActiveLink('projects')}>Projects</Nav.Link>
            <Nav.Link href="#experience" className={activeLink === 'experience'? 'active-navbar-link': 'navbar-link'} onClick={()=> onUpdateActiveLink('experience')}>Experience</Nav.Link>

          </Nav>
          <span className='navbar-text'>
            <div className='social-icon'>
                
              <a href="https://www.linkedin.com/in/ruqiya-syeda/" target="_blank" rel="noreferrer">
                <img src={navIcon1} alt="LinkedIn" />
              </a>
              <a href="https://github.com/ruqiyaa" target="_blank" rel="noreferrer">
                <img src={navIcon2} alt="GitHub" />
              </a>

              <span className="email-wrapper">
                <button
                  type="button"
                  className="email-toggle"
                  aria-label="Show email"
                  aria-expanded={showEmail}
                  onClick={() => setShowEmail(!showEmail)}
                >
                  <img src={navIcon3} alt="" />
                </button>

                {showEmail && (
                  <div className="email-popup">
                    <a href={`mailto:${myEmail}`}>{myEmail}</a>
                    <button onClick={copyEmail}>{copied ? "Copied!" : "Copy"}</button>
                  </div>
                )}
              </span>

           </div>
           <button className='vvd' onClick={()=>document.getElementById("connect")?.scrollIntoView({behavior:"smooth"})}><span>Let's connect</span></button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

