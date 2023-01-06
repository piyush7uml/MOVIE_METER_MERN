import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormContainer from '../components/FormContainer';
import Toast from 'react-bootstrap/Toast';
import { getMovieAction, editMovieAction } from '../Actions/movieActions';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { GET_MOVIE_RESET, EDIT_MOVIE_RESET } from '../Constants/movieConstants';




const EditMovieScreen = () => {

    //FORM FIELDS

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState(new Date());
    const [runTime, setRunTime] = useState("");
    const [image, setImage] = useState('');
    const [director, setDirector] = useState("");
    const [writer, setWriter] = useState("");
    const [producer, setProducer] = useState("");
    const [starcast, setStarcast] = useState("");
    const [certificate, setCertificate] = useState("");
    const [message, setMessage] = useState("");


    // STATE FOR SELECT CATEGORY
    const options = ['Action', 'Animation', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Science-Fiction', 'Thriller'];
    const [category, setCategory] = useState(options[0]);


    const [show, setShow] = useState(false);

    const dispatch = useDispatch();



    // GETTING USER DATA FROM STORE
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;


    //GETTING EDITED MOVIE DATA FROM STORE
    const editMovie = useSelector(state => state.editMovie)
    const { loading, error, movieEdited, success } = editMovie


    // GETTING MOVIE DATA FROM STORE
    const getMovie = useSelector(state => state.getMovie)

    const { loading: getMovieLoading, error: getMovieError, movie } = getMovie


    // TO REDIRECT USING NAVIGATE HOOK
    const navigate = useNavigate()



    // GETTING ID FROM PARAMS
    const { id } = useParams();





    useEffect(() => {

        if (!userInfo || !userInfo.isAdmin) {
            navigate("/")
        } else {

            if (movie) {

                setName(movie.name);
                setDescription(movie.description);
                setRunTime(movie.runTime)
                setImage(movie.image);
                setDirector(movie.director)
                setWriter(movie.writer)
                setProducer(movie.producer)
                setStarcast(movie.starcast)
                setCertificate(movie.certificate)
                setCategory(movie.category)
            }


            if (success) {
                setShow(true)
                dispatch(getMovieAction(id))
                dispatch({
                    type: EDIT_MOVIE_RESET
                })
            }

        }

    }, [userInfo, navigate, movie, success])




    useEffect(() => {
        dispatch(getMovieAction(id))
        return () => {
            dispatch({
                type: GET_MOVIE_RESET
            })
        }
    }, [])



    // CONVERTING IMAGE FILE TO BASE 64 STRING

    const imagefileToString = () => {

        return new Promise((resolve, reject) => {

            const reader = new FileReader();
            reader.readAsDataURL(image);

            reader.onloadend = function () {

                if (reader.result) {
                    resolve(reader.result)
                } else {
                    reject('Error in Conversion image file into base64');
                }
            };


        })
    }



    // HANDLER TO EDIT MOVIE

    const editMovieHandler = async (e) => {
        e.preventDefault();

        setMessage("");

        if (name && description && releaseDate && runTime
            && image && director && writer && producer && starcast
            && certificate && category
        ) {

            let result

            if (image && !image.public_id) {
                console.log("1")
                result = await imagefileToString()
            } else {
                console.log("2", image)
                result = image
            }



            if (!message) {

                const movieData = {
                    name, description, releaseDate, runTime,
                    image: result, director, writer, producer, starcast,
                    certificate, category
                }

                dispatch(editMovieAction(movieData, id))

            }


        } else {
            setMessage("All Fields Are Mandatory")
        }
    }




    return (
        <>

            <FormContainer>
                <h3 className="my-4 text-center">Edit Movie</h3>

                {loading && <Loader />}
                {error && <Message>{error}</Message>}

                {getMovieLoading && <Loader />}
                {getMovieError && <Message>{getMovieError}</Message>}
                {message && <Message>{message}</Message>}

                <div className="d-flex justify-content-between mb-5">

                    <Link to="/admin/movies">
                        <Button variant="secondary">Back</Button>
                    </Link>

                    <Toast onClose={() => setShow(false)} show={show} delay={6000} autohide>
                        <Toast.Header>
                            <strong className="me-auto text-success">Movie Edited Successfully</strong>
                        </Toast.Header>
                    </Toast>

                </div>

                <Form onSubmit={editMovieHandler} className="mb-5">

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {options.map((option) => (
                                <option key={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Release Date</Form.Label>
                        <DatePicker selected={releaseDate} onChange={(date) => setReleaseDate(date)} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="runTime">
                        <Form.Label>Run Time</Form.Label>
                        <Form.Control type="text" placeholder="Enter Run Time"
                            value={runTime}
                            onChange={(e) => setRunTime(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file"
                            name="image"
                            value={''}

                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {image && <Form.Text className="text-success">Selected file: {image.name}</Form.Text>}
                    </Form.Group>



                    <Form.Group className="mb-3" controlId="director">
                        <Form.Label>Director</Form.Label>
                        <Form.Control type="text" placeholder="Enter Director"
                            value={director}
                            onChange={(e) => setDirector(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="writer">
                        <Form.Label>Writer</Form.Label>
                        <Form.Control type="text" placeholder="Enter Writer"
                            value={writer}
                            onChange={(e) => setWriter(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="producer">
                        <Form.Label>Producer</Form.Label>
                        <Form.Control type="text" placeholder="Enter Producer"
                            value={producer}
                            onChange={(e) => setProducer(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="starcast">
                        <Form.Label>Star Cast</Form.Label>
                        <Form.Control type="text" placeholder="Enter Star Cast"
                            value={starcast}
                            onChange={(e) => setStarcast(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="certificate">
                        <Form.Label>Certificate</Form.Label>
                        <Form.Control type="text" placeholder="Enter Certificate"
                            value={certificate}
                            onChange={(e) => setCertificate(e.target.value)}
                        />
                    </Form.Group>



                    <Button variant="primary" type="submit">
                        {loading ? <Loader size='sm' /> : 'Edit Movie'}
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default EditMovieScreen


