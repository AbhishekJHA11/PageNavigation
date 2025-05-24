import React, { useState, useEffect } from "react";
import { logoutUser, isAuthenticated } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [docs, setDocs] = useState([]);
  const [newDoc, setNewDoc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem("documents")) || [];
    setDocs(storedDocs);
  }, []);

  const saveDocs = (updatedDocs) => {
    localStorage.setItem("documents", JSON.stringify(updatedDocs));
    setDocs(updatedDocs);
  };

  const handleUpload = () => {
    if (newDoc.trim()) {
      saveDocs([...docs, newDoc.trim()]);
      setNewDoc("");
    }
  };

  const handleDelete = (index) => {
    const updated = [...docs];
    updated.splice(index, 1);
    saveDocs(updated);
  };

  const handleUpdate = (index) => {
    const updated = [...docs];
    const newName = prompt("Enter new name:", updated[index]);
    if (newName) {
      updated[index] = newName;
      saveDocs(updated);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!isAuthenticated()) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <input
        placeholder="New Document"
        value={newDoc}
        onChange={(e) => setNewDoc(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>

      <ul>
        {docs.map((doc, index) => (
          <li key={index}>
            {doc}
            <button onClick={() => handleUpdate(index)}>Update</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
