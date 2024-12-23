import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import Error from './components/Error';
import PrivateRoute from './components/PrivateRoute';



const App = () => {
  return (
<>
      <Header authUser={null} />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/signin" element={< SignIn />} />
        <Route path="/signup" element={< SignUp />} />
       
        <Route element={<PrivateRoute />}>
        <Route path= "courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/update" element={<UpdateCourse />} />
        </Route>
       
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/error" element={<Error />} />
        <Route path ="*" element={<NotFound />} />
      </Routes>
     </>
  );
};

export default App;
