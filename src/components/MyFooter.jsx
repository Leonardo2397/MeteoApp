import { Row, Col } from "react-bootstrap";

function MyFooter() {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <Row>
                <Col className="text-center mb-3 mb-md-0">
                    <h5>Contatti</h5>
                    <p>Email: info@meteoapp.com</p>
                    <p>Telefono: +39 123 456 7890</p>
                </Col>
                <Col className="text-center mb-3 mb-md-0">
                    <h5>Link Utili</h5>
                    <p>Privacy Policy</p>
                    <p>Termini di Servizio</p>
                    <p>Supporto</p>
                </Col>
                <Col className="text-center">
                    <h5>Seguici</h5>
                    <p>Facebook | Twitter | Instagram</p>
                </Col>
            </Row>
        </footer>
    );
}

export default MyFooter;
