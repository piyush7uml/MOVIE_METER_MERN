import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="py-3" style={{ marginTop: "5rem", backgroundColor: "#282828" }}>
            <Container>
                <Row >
                    <Col className="text-center my-3">
                        copyrights &copy; Moviemeter
                 </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
