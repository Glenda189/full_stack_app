import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const UpdateCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authUser } = useContext(UserContext);

// Form state variables
const [course, setCourse] = useState(null);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [estimatedTime, setEstimatedTime] = useState("");
const [materialsNeeded, setMaterialsNeeded] = useState("");
const [errors, setErrors] = useState([]);

// Fetch course details
useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (res.status === 200) {
          const data = await res.json();
          setCourse(data);
          setTitle(data.title);
          setDescription(data.description);
          setEstimatedTime(data.estimatedTime);
          setMaterialsNeeded(data.materialsNeeded);
        } else if (res.status === 404) {
          navigate("/notfound");
        } else {
          navigate("/error");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        navigate("/error");
      }
    };
    fetchCourse();
  }, [id, navigate]);

  // Handles when form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authUser) {
      navigate("/signin");
      return;
    }
    const { emailAddress, password } = authUser;
    const encodedCredentials = btoa(`${emailAddress}:${password}`);

    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: JSON.stringify({
          title,
          description,
          estimatedTime,
          materialsNeeded,
        }),
      });
      if (res.status === 204) {
        navigate(`/courses/${id}`); // Redirect to course detail page
      } else if (res.status === 400) {
        const data = await res.json();
        setErrors(data.errors); // Display validation errors
      } else if (res.status === 403) {
        navigate("/forbidden");
      } else {
        navigate("/error");
      }
    } catch (err) {
      console.error("Error updating course:", err);
      navigate("/error");
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    navigate(`/courses/${id}`);
  };

  if (!course) {
    return <p>Loading...</p>; 
  }


  // mock up as provided 
  return (
    <div className="wrap">
      <h2>Update Course</h2>
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
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
             <p>
              By {authUser ? `${authUser.firstName} ${authUser.lastName}` : "Unknown User"}
            </p>
            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
            />
<label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              value={materialsNeeded}
              onChange={(e) => setMaterialsNeeded(e.target.value)}
            />
            </div>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={handleCancel}
        >Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;



