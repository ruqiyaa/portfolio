import { useEffect, useState } from "react";
import contactImg from '../assets/img/get-in-touch-hd.png';
import { Container, Row, Col } from "react-bootstrap";
import emailjs from "@emailjs/browser";



export const Contact = () => {
    const formInitialDetails ={
        firstName : '',
        lastName : '',
        email : '',
        phone : '',
        message : ''
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});

    const onFormUpdate =(category, value) => {
        setFormDetails({
            ...formDetails,
            [category] : value
        }

        )
    }

    useEffect (() => {
        if(!status.message) return;

        const timer = setTimeout(() => setStatus({}), 4000);
        return() => clearTimeout(timer);
    }, [status]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    setStatus({});

    try {
        await emailjs.send(
            "service_tp7dt96",
            "template_uvvoly1",
            {
                firstName: formDetails.firstName,
                lastName: formDetails.lastName,
                email: formDetails.email,
                phone: formDetails.phone,
                message: formDetails.message,
            },
            { publicKey: "k3g1Mkym0N1rt-cSr" }
        );
        setStatus({ success: true, message: "Message sent successfully" });
        setFormDetails(formInitialDetails);
    } catch (error) {
        console.error(error);
        setStatus({ success: false, message: "Something went wrong, try again later" });
    } finally {
        setButtonText("Send");
    }
};

    return(
        <section className="contact" id="connect">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImg} alt="Contact us"/>
                    </Col>
                    <Col md={6}>
                        <h2>Get in touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className="px-1">
                                    <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} required />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                                </Col>

                                <Col sm={6} className="px-1">
                                    <input type="email" value={formDetails.email} placeholder="E-mail" onChange={(e) => onFormUpdate('email', e.target.value)} required />
                                </Col>

                                <Col sm={6} className="px-1">
                                    <input type="tel" value={formDetails.phone} placeholder="Phone" onChange={(e) => onFormUpdate('phone', e.target.value)} />
                                </Col>

                                <Col>
                                    <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)} />
                                    <button type="submit"><span>{buttonText}</span></button>
                                </Col>
                                {
                                    status.message &&
                                    <Col>
                                        <p className={status.success === false ? "danger" : "success"} > {status.message}</p>
                                    </Col>
                                }
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}