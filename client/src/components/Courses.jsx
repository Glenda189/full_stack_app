// Displays list of all courses available 

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
  // State to store the list of courses fetched from api 
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();


  // Fetch courses from the api 
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch ("http://localhost:5000/api/courses");
        if (response.status === 200) {
          const data = await response.json();
          setCourses(data);
        } else if (response.status === 500) {
          navigate("/error");
        } else {
          console.log("Unexpected response status:", response.status);
          setErrors(["Unexpected error occurred while loading course."]);
        } 
      } catch (err){
          console.log("Error fetching courses:", err);
          navigate("/error")
        }
      };
      fetchCourses();
    }, [navigate]);

if(errors.length > 0) {
  return (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  // Mockup from provided files 
  return (
    <main>
      <div className="wrap main--grid">
        {courses.map((course) => (
          <Link
            className="course--module
          course--link"
            to={`/courses/${course.id}`}
            key={course.id}
          >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        ))}
        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">New Course</span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
