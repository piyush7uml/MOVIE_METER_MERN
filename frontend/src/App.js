import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import HeaderComponent from './components/HeaderComponent';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import AddMovieScreen from './Screens/AddMovieScreen';
import AdminMoviesScreen from './Screens/AdminMoviesScreen';
import EditMovieScreen from './Screens/EditMovieScreen';
import MovieDetailsScreen from './Screens/MovieDetailsScreen';
import UpdateReviewScreen from './Screens/UpdateReviewScreen';
import UserProfileScreen from './Screens/UserProfileScreen';
import MyReviewsScreen from './Screens/MyReviewsScreen';
import MyWatchedListScreen from './Screens/MyWatchedListScreen';
import AdminUsersScreen from './Screens/AdminUsersScreen';

const App = () => {
  return (
    <BrowserRouter>
      <HeaderComponent />

      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/register" element={<RegisterScreen />} />
        <Route exact path="/admin/movies/add" element={<AddMovieScreen />} />
        <Route exact path="/admin/movies" element={<AdminMoviesScreen />} />
        <Route exact path="/admin/movies/edit/:id" element={<EditMovieScreen />} />
        <Route exact path="/movies/get/:id" element={<MovieDetailsScreen />} />
        <Route exact path="/review/update/:reviewId" element={<UpdateReviewScreen />} />
        <Route exact path="/user/profile/:userId" element={<UserProfileScreen />} />
        <Route exact path="/user/myReviews" element={<MyReviewsScreen />} />
        <Route exact path="/user/myWatchList" element={<MyWatchedListScreen />} />
        <Route exact path="/admin/users" element={<AdminUsersScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
