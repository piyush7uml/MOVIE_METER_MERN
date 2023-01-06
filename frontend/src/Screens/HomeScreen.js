import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, InputGroup, Form, Carousel, Image } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMoviesAction } from '../Actions/movieActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const HomeScreen = () => {

    // STATE FOR PAGINATION
    const [page, setPage] = useState(1);

    // STATE FOR SEARCH STRING
    const [searchResult, setSearchResult] = useState("");

    // STATE FOR SELECTED CATEGORY
    const [cat, setCat] = useState("")

    // OPTIONS TO SELECT CATEGORY
    const options = ['', 'Action', 'Animation', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Science-Fiction', 'Thriller'];


    const dispatch = useDispatch();


    // GETTING ALL MOVIES DATA FROM STORE
    const getAllMovies = useSelector(state => state.getAllMovies)
    const { loading, movies, error } = getAllMovies





    useEffect(() => {
        dispatch(getAllMoviesAction(page, searchResult, cat))
    }, [])





    // HANDLER TO SERACH MOVIE
    const searchMovieHandler = () => {
        setPage(1)
        dispatch(getAllMoviesAction(1, searchResult, cat))

    }



    // HANLDER TO SELECT PREV PAGE
    const prevHandler = () => {

        if (page !== 1)
            setPage(page - 1)
        dispatch(getAllMoviesAction(page - 1, searchResult, cat))
    }


    // HANLDER TO SELECT NEXT PAGE
    const nextHandler = () => {

        setPage(page + 1)
        dispatch(getAllMoviesAction(page + 1, searchResult, cat))
    }


    // HANLDER TO SELECT CATEGORY
    const catSelectHandler = (opt) => {
        setPage(1)
        setSearchResult("")
        setCat(opt)
        dispatch(getAllMoviesAction(1, "", opt))
    }


    return (
        <Container>

            <Row>
                <Col md={{ span: 10, offset: 1 }}>

                    <InputGroup className="my-5">
                        <Form.Control
                            placeholder="search movie..."
                            aria-label="searchMovie"
                            aria-describedby="basic-addon2"
                            value={searchResult}
                            onChange={(e) => setSearchResult(e.target.value)}
                        />
                        <Button onClick={searchMovieHandler} variant="outline-primary" id="button-addon2">
                            Search
                        </Button>

                        <Button onClick={() => {
                            setSearchResult("")
                            setPage(1)
                            dispatch(getAllMoviesAction(1, "", cat))

                        }} variant="outline-secondary" id="button-addon3">
                            Clear
                        </Button>
                    </InputGroup>




                    <div className="d-flex flex-wrap justify-content-between">

                        {options.map((option, i) => {
                            return <Button className="mt-3 my-5" variant='success' active={option === cat}
                                onClick={() => catSelectHandler(option)}
                            >{option === '' ? 'All' : option}</Button>
                        })}
                    </div>


                    {loading && <Loader />}
                    {error && <Message>{error}</Message>}

                    <div className="d-flex justify-content-between flex-wrap">

                        {movies && movies.map((movie, i) => {

                            return <MovieCard key={movie._id} movie={movie} />

                        })}

                        {(movies && movies.length === 0) && (
                            <div className="my-5 mx-auto">
                                <Message>No Movies</Message>
                            </div>
                        )}

                    </div>


                    <div className="d-flex justify-content-between my-5">
                        <Button disabled={page === 1} onClick={prevHandler} variant="outline-secondary">Prev</Button>
                        {(movies && movies.length > 8) && (
                            <Button onClick={nextHandler} variant="outline-secondary">Next</Button>
                        )}
                    </div>
                </Col>
            </Row>

        </Container >
    )
}

export default HomeScreen
