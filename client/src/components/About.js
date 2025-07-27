import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary mb-4">Welcome to myNoteSync</h1>

      <p className="lead text-center mb-5">
        myNoteSync is a secure and user-friendly note-taking application
        designed to help you create, manage, and sync notes seamlessly across
        your devices. Whether you're a student, professional, or just need a
        place to jot down your thoughts, myNoteSync ensures your ideas are
        always organized and accessible.
      </p>

      <div className="mb-4">
        <h2 className="h4 mb-3">Key Features:</h2>
        <ul className="list-group">
          <li className="list-group-item">
            Create, edit, and delete your personal notes
          </li>
          <li className="list-group-item">
            Access notes anytime from any device
          </li>
          <li className="list-group-item">Secure cloud-based storage</li>
          <li className="list-group-item">
            Minimal and distraction-free interface
          </li>
          <li className="list-group-item">Fast and responsive design</li>
        </ul>
      </div>

      <div className="d-flex justify-content-center mt-5">
        <div className="me-3">
          <button
            onClick={handleLogin}
            className="btn btn-outline-primary px-4 me-3"
          >
            Login
          </button>
        </div>
        <div className="ms-3">
          <button
            onClick={handleSignup}
            className="btn btn-outline-primary px-4 ms-3"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
