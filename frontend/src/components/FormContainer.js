import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const FormContainer = ({ children }) => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
