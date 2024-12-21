import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);
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
