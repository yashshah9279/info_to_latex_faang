import React, { useState } from 'react';

const EducationSection = ({ educationData, onUpdate }) => {
  const [localEducationData, setLocalEducationData] = useState(educationData);

  const handleAddEntry = () => {
    const newEntry = {
      degree: '',
      institution: '',
      year: '',
      coursework: '',
      scoreType: 'CGPA', // Default to CGPA
      score: '',
    };
    const updatedData = [...localEducationData, newEntry];
    setLocalEducationData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveEntry = (index) => {
    const updatedData = localEducationData.filter((_, i) => i !== index);
    setLocalEducationData(updatedData);
    onUpdate(updatedData);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedData = [...localEducationData];
    updatedData[index][field] = value;
    setLocalEducationData(updatedData);
    onUpdate(updatedData);
  };

  return (
    <div>
      <h2>Education</h2>
      {localEducationData.map((entry, index) => (
        <div
          key={index}
          style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}
        >
          <input
            type="text"
            placeholder="Degree"
            value={entry.degree}
            onChange={(e) => handleFieldChange(index, 'degree', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <input
            type="text"
            placeholder="Institution"
            value={entry.institution}
            onChange={(e) => handleFieldChange(index, 'institution', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <input
            type="text"
            placeholder="Year e.g 2021-2025"
            value={entry.year}
            onChange={(e) => handleFieldChange(index, 'year', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <textarea
            placeholder="Relevant Coursework"
            value={entry.coursework}
            onChange={(e) => handleFieldChange(index, 'coursework', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name={`scoreType-${index}`}
                value="CGPA"
                checked={entry.scoreType === 'CGPA'}
                onChange={(e) => handleFieldChange(index, 'scoreType', e.target.value)}
              />
              CGPA
            </label>
            <label>
              <input
                type="radio"
                name={`scoreType-${index}`}
                value="Percentage"
                checked={entry.scoreType === 'Percentage'}
                onChange={(e) => handleFieldChange(index, 'scoreType', e.target.value)}
              />
              Percentage
            </label>
          </div>
          <input
            type="text"
            placeholder={entry.scoreType === 'CGPA' ? 'Enter CGPA' : 'Enter Percentage'}
            value={entry.score}
            onChange={(e) => handleFieldChange(index, 'score', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <button
            onClick={() => handleRemoveEntry(index)}
            style={{ padding: '5px 10px', background: 'red', color: 'white' }}
          >
            Remove Entry
          </button>
        </div>
      ))}
      <button onClick={handleAddEntry} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Add Education Entry
      </button>
    </div>
  );
};

export default EducationSection;
