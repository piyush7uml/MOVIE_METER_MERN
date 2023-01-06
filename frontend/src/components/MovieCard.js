import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const MovieCard = ({ movie }) => {
    return (

        <Card style={{ width: '18rem' }} className="mx-auto my-4 ">
            <Link to={`/movies/get/${movie._id}`} target="_blank">
                <Card.Img variant="top" src={movie.image.secure_url} fluid
                    style={{ height: "20rem" }}
                />
            </Link>
            <Card.Body>
                <Link to={`/movies/get/${movie._id}`} style={{ textDecoration: 'none' }} target="_blank">

                    <Card.Title className="mb-4" >{movie.name}</Card.Title>
                </Link>

                <Card.Text>
                    Directed By: <span className="text-primary">{movie.director}</span>
                </Card.Text>
                <Card.Text>
                    Written By: <span className="text-primary">{movie.writer}</span>
                </Card.Text>

                <Card.Text>
                    Star Cast: <span className="text-primary">{movie.starcast}</span>
                </Card.Text>


                <Card.Text>
                    <Rating rating={movie.sumOfRatings / movie.numberOfReviews} /> ({movie.numberOfReviews})
                </Card.Text>
                <Link to={`/movies/get/${movie._id}`} style={{ textDecoration: 'none' }} target="_blank">
                    <Button className="" variant="primary">See more</Button>
                </Link>
            </Card.Body>
        </Card >

    )
}

export default MovieCard
