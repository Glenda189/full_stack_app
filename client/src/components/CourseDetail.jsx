import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import ReactMarkdown from "react-markdown";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  const [course, setCourse] = useState(null);
  const [errors, setErrors] = useState([]);

  // Fetch course details 
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (response.status === 200) {
          const data = await response.json();
          setCourse(data);
        } else if (response.status === 404) {
          setErrors(["Course not found."]);
          navigate("/notfound");
        } else {
          setErrors(["An unexpected error occurred."])
          navigate("/error");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setErrors(["Failed to load course details. Please try again later."])
        navigate("/error");
      }
    };

    fetchCourse();
  }, [id, navigate]);

  //  Function handles when user deletes a course 
  const handleDelete = async () => {
    if (!authUser) {
      setErrors(["You must be signed in to delete this course."])
      navigate("/signin");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course? This action cannot be undone."
    );
    if(!confirmDelete) {
      return;
    }

    const encodedCredentials = btoa(
      `${authUser.emailAddress}:${authUser.password}`
    );

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      if (response.status === 204) {
        navigate("/"); // Redirect to courses list after deleting 
      } else if (response.status === 403) {
        setErrors(["You do not have permission to delete this course."]);
        navigate("/forbidden"); 
      } else {
        setErrors(["An unexpected error occured while deleting the course"])
        navigate("/error"); // Unexpected errors
      }
    } catch (err) {
      console.error("Error deleting course:", err);
      setErrors(["Failed to delete the course. Please try again later"])
      navigate("/error");
    }
  };


  //  Update and delete buttons if the auth user owns the course 
  const renderButtons = () => {
    if (authUser && course && authUser.id === course.User.id) {
      return (
        <div className="course--buttons">
          <button
            className="button"
            onClick={() => navigate(`/courses/${id}/update`)}
          >
            Update Course
          </button>
          <button className="button button-secondary" onClick={handleDelete}>
            Delete Course
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="wrap">
      {course ? (
        <>
          <h2>Course Detail</h2>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">{course.title}</h3>
              <p>
                By {course.User.firstName} {course.User.lastName}
              </p>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
            </div>
          </div>
          {renderButtons()}
          <button className="button button-secondary"
          onClick={() => navigate("/")}>
            Return to list 
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {errors.length > 0 && (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
