import React, { useState } from 'react';

const ExperienceSection = ({ experienceData, onUpdate }) => {
  const [localExperienceData, setLocalExperienceData] = useState(experienceData);

  const handleAddExperience = () => {
    const newExperience = {
      roleName: '',
      companyName: '',
      dateRange: '',
      location: '',
      achievements: [''],
    };
    const updatedData = [...localExperienceData, newExperience];
    setLocalExperienceData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveExperience = (index) => {
    const updatedData = localExperienceData.filter((_, i) => i !== index);
    setLocalExperienceData(updatedData);
    onUpdate(updatedData);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedData = [...localExperienceData];
    updatedData[index][field] = value;
    setLocalExperienceData(updatedData);
    onUpdate(updatedData);
  };

  const handleAchievementChange = (expIndex, achIndex, value) => {
    const updatedData = [...localExperienceData];
    updatedData[expIndex].achievements[achIndex] = value;
    setLocalExperienceData(updatedData);
    onUpdate(updatedData);
  };

  const handleAddAchievement = (expIndex) => {
    const updatedData = [...localExperienceData];
    updatedData[expIndex].achievements.push('');
    setLocalExperienceData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveAchievement = (expIndex, achIndex) => {
    const updatedData = [...localExperienceData];
    updatedData[expIndex].achievements.splice(achIndex, 1);
    setLocalExperienceData(updatedData);
    onUpdate(updatedData);
  };

  return (
    <div>
      <h2>Experience</h2>
      {localExperienceData.map((experience, expIndex) => (
        <div
          key={expIndex}
          style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}
        >
          <input
            type="text"
            placeholder="Role Name"
            value={experience.roleName}
            onChange={(e) => handleFieldChange(expIndex, 'roleName', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <input
            type="text"
            placeholder="Company Name"
            value={experience.companyName}
            onChange={(e) => handleFieldChange(expIndex, 'companyName', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <input
            type="text"
            placeholder="Date Range e.g. e.g May 2024 - July 2024"
            value={experience.dateRange}
            onChange={(e) => handleFieldChange(expIndex, 'dateRange', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <input
            type="text"
            placeholder="Location"
            value={experience.location}
            onChange={(e) => handleFieldChange(expIndex, 'location', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />

          <h4>Highlights or Achievements in this role</h4>
          {experience.achievements.map((achievement, achIndex) => (
            <div key={achIndex} style={{ display: 'flex', marginBottom: '10px' }}>
              <textarea
                placeholder="Highlights or Achievements"
                value={achievement}
                onChange={(e) => handleAchievementChange(expIndex, achIndex, e.target.value)}
                style={{ width: '100%', marginRight: '10px', padding: '5px' }}
              />
              <button
                onClick={() => handleRemoveAchievement(expIndex, achIndex)}
                style={{ padding: '5px 10px', background: 'red', color: 'white' }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddAchievement(expIndex)}
            style={{ padding: '5px 10px', marginTop: '10px' }}
          >
            Add Achievement
          </button>

          <button
            onClick={() => handleRemoveExperience(expIndex)}
            style={{
              padding: '5px 10px',
              marginTop: '20px',
              background: 'red',
              color: 'white',
            }}
          >
            Remove Experience
          </button>
        </div>
      ))}
      <button onClick={handleAddExperience} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceSection;
