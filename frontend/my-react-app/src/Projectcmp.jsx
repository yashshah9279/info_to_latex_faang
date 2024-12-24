import React, { useState } from 'react';

const ProjectsSection = ({ projectsData, onUpdate }) => {
  const [localProjectsData, setLocalProjectsData] = useState(projectsData);

  const handleAddProject = () => {
    const newProject = { title: '', description: [''], link: '' };
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
    updatedData[index].description.push('');
    setLocalProjectsData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveBullet = (index, bulletIndex) => {
    const updatedData = [...localProjectsData];
    updatedData[index].description = updatedData[index].description.filter((_, i) => i !== bulletIndex);
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
            marginBottom: '20px',
            borderBottom: '1px solid #ccc',
            paddingBottom: '10px',
          }}
        >
          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <div>
            <h4>Project Description:</h4>
            {project.description.map((bullet, bulletIndex) => (
              <div key={bulletIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span>•</span>
                <input
                  type="text"
                  placeholder="Bullet point"
                  value={bullet}
                  onChange={(e) => handleDescriptionChange(index, bulletIndex, e.target.value)}
                  style={{
                    width: '90%',
                    marginLeft: '10px',
                    padding: '5px',
                    marginBottom: '10px',
                  }}
                />
                <button
                  onClick={() => handleRemoveBullet(index, bulletIndex)}
                  style={{
                    padding: '5px 10px',
                    background: 'red',
                    color: 'white',
                    marginLeft: '10px',
                  }}
                >
                  Remove Bullet
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddBullet(index)}
              style={{
                padding: '5px 10px',
                background: '#4CAF50',
                color: 'white',
                marginTop: '10px',
              }}
            >
              Add Bullet Point
            </button>
          </div>
          <input
            type="text"
            placeholder="Project Link (Optional)"
            value={project.link}
            onChange={(e) => handleFieldChange(index, 'link', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <button
            onClick={() => handleRemoveProject(index)}
            style={{
              padding: '5px 10px',
              marginTop: '10px',
              background: 'red',
              color: 'white',
            }}
          >
            Remove Project
          </button>
        </div>
      ))}
      <button
        onClick={handleAddProject}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          background: 'green',
          color: 'white',
        }}
      >
        Add Project
      </button>
    </div>
  );
};

export default ProjectsSection;
