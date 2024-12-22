import { BrowserRouter,Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';




function App() {
  return (
  <BrowserRouter>
      <Header authUser={null} />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/signin" element={< SignIn />} />
        <Route path="/signup" element={< SignUp />} />
      </Routes>
      </BrowserRouter>
  );
};

export default App;
