import React, { useState } from "react";

const ProjectsSection = ({ projectsData, onUpdate }) => {
  const [localProjectsData, setLocalProjectsData] = useState(projectsData);

  const handleAddProject = () => {
    const newProject = { title: "", description: [""], links: [], date: "" };
    const updatedData = [...localProjectsData, newProject];
    setLocalProjectsData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveProject = (index) => {
    const updatedData = localProjectsData.filter((_, i) => i !== index);
    setLocalProjectsData(updatedData);
    onUpdate(updatedData);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedData = [...localProjectsData];
    updatedData[index][field] = value;
    setLocalProjectsData(updatedData);
    onUpdate(updatedData);
  };

  const handleDescriptionChange = (index, bulletIndex, value) => {
    const updatedData = [...localProjectsData];
    updatedData[index].description[bulletIndex] = value;
    setLocalProjectsData(updatedData);
    onUpdate(updatedData);
  };

  const handleAddBullet = (index) => {
    const updatedData = [...localProjectsData];
    updatedData[index].description.push("");
    setLocalProjectsData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveBullet = (index, bulletIndex) => {
    const updatedData = [...localProjectsData];
    updatedData[index].description = updatedData[index].description.filter((_, i) => i !== bulletIndex);
    setLocalProjectsData(updatedData);
    onUpdate(updatedData);
  };

  const handleAddLink = (index) => {
    const updatedData = [...localProjectsData];
    updatedData[index].links.push({ name: "", url: "" });
    setLocalProjectsData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveLink = (index, linkIndex) => {
    const updatedData = [...localProjectsData];
    updatedData[index].links = updatedData[index].links.filter((_, i) => i !== linkIndex);
    setLocalProjectsData(updatedData);
    onUpdate(updatedData);
  };

  const handleLinkChange = (index, linkIndex, field, value) => {
    const updatedData = [...localProjectsData];
    updatedData[index].links[linkIndex][field] = value;
    setLocalProjectsData(updatedData);
    onUpdate(updatedData);
  };

  return (
    <div>
      <h2>Projects</h2>
      {localProjectsData.map((project, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => handleFieldChange(index, "title", e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          />
          <input
            type="text"
            placeholder="Date (Optional)"
            value={project.date}
            onChange={(e) => handleFieldChange(index, "date", e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          />
          <div>
            <h4>Project Description:</h4>
            {project.description.map((bullet, bulletIndex) => (
              <div key={bulletIndex} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <span>•</span>
                <input
                  type="text"
                  placeholder="Bullet point"
                  value={bullet}
                  onChange={(e) => handleDescriptionChange(index, bulletIndex, e.target.value)}
                  style={{
                    width: "90%",
                    marginLeft: "10px",
                    padding: "5px",
                    marginBottom: "10px",
                  }}
                />
                <button
                  onClick={() => handleRemoveBullet(index, bulletIndex)}
                  style={{
                    padding: "5px 10px",
                    background: "red",
                    color: "white",
                    marginLeft: "10px",
                  }}
                >
                  Remove Bullet
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddBullet(index)}
              style={{
                padding: "5px 10px",
                background: "#4CAF50",
                color: "white",
                marginTop: "10px",
              }}
            >
              Add Bullet Point
            </button>
          </div>
          <div>
            <h4>Project Links:</h4>
            {project.links.map((link, linkIndex) => (
              <div key={linkIndex} style={{ display: "flex", marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Link Name"
                  value={link.name}
                  onChange={(e) => handleLinkChange(index, linkIndex, "name", e.target.value)}
                  style={{ width: "45%", marginRight: "10px", padding: "5px" }}
                />
                <input
                  type="text"
                  placeholder="Link URL"
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, linkIndex, "url", e.target.value)}
                  style={{ width: "45%", marginRight: "10px", padding: "5px" }}
                />
                <button
                  onClick={() => handleRemoveLink(index, linkIndex)}
                  style={{
                    padding: "5px 10px",
                    background: "red",
                    color: "white",
                  }}
                >
                  Remove Link
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddLink(index)}
              style={{
                padding: "5px 10px",
                background: "#4CAF50",
                color: "white",
                marginTop: "10px",
              }}
            >
              Add Link
            </button>
          </div>
          <button
            onClick={() => handleRemoveProject(index)}
            style={{
              padding: "5px 10px",
              marginTop: "10px",
              background: "red",
              color: "white",
            }}
          >
            Remove Project
          </button>
        </div>
      ))}
      <button
        onClick={handleAddProject}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          background: "green",
          color: "white",
        }}
      >
        Add Project
      </button>
    </div>
  );
};

export default ProjectsSection;
