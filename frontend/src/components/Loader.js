import React from 'react'
import { Spinner } from 'react-bootstrap';


const Loader = ({ size }) => {
    return (
        <Spinner size={size && size} variant="secondary" animation="border" role="status" style={{ display: "block", margin: "10px auto" }}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default Loader


