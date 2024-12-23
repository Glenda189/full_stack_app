// Displayes list of all courses available 

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  // State to store the list of courses fetched from api 
  const [courses, setCourses] = useState([]);


  // Fetch courses from the api 
  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

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
