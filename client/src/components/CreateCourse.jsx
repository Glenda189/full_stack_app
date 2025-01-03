import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authUser || !authUser.emailAddress || !authUser.password) {
      setErrors(["Authorization failed: Missing user credentials."]);
      return;
    }

    const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);

    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
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

      console.log("Response status:", res.status);

      if (res.status === 201) {
        const location = res.headers.get("Location") || (await res.json()).location;
        console.log("Location header:", location); // Debugging log

        if (location) {
          console.log("Redirecting to:", location.replace("/api",""));
          navigate(location.replace("/api", ""));
        } else {
          console.error("Missing Location header in API response.");
          setErrors(["Unexpected error: Missing Location header."]);
          navigate("/");
        }
      } else if (res.status === 400) {
        const data = await res.json();
        setErrors(data.errors);
      } else if (res.status === 401) {
        setErrors(["You must be signed in to create a course."]);
      } else {
        navigate("/error");
      }
    } catch (err) {
      console.error("Error:", err);
      navigate("/error");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
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
          Create Course
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;



