import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${id}`)
        .then(res => {
            if (res.status === 404) {
                 // If course not found, we will navigate to /notfound (once that page is set up)
                 navigate('/notfound');
                } else if (res.status === 500) {
                  navigate('/error');
                }
                return res.json();
            })
            .then(data => setCourse(data))
            .catch(err => {
              console.error(err);
              navigate('/error');
            });
        }, [id, navigate]);
        if (!course) {
            return <p>Loading...</p>;
        }
          // Destructure data for convenience
  const { title, description, estimatedTime, materialsNeeded, User } = course;
  
  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
        <button className="button">Delete Course</button>
        <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <div className="main--flex">
          <div>
          <h3 className="course--detail--title">Course</h3>
          <h4 className="course--name">{title}</h4>
            <p>By {User.firstName} {User.lastName}</p>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{estimatedTime}</p>
            <h3 className="course--detail--title">Materials Needed</h3>
            <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
            </div>
        </div>
      </div>
    </main>
      );
    };
    
export default CourseDetail;