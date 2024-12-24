import React, { useState } from 'react';

const EducationSection = ({ educationData, onUpdate }) => {
  const [localEducationData, setLocalEducationData] = useState(educationData);

  const handleAddEntry = () => {
    const newEntry = {
      degree: '',
      institution: '',
      year: '',
      coursework: '',
      CGPA: '',
     
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
        <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
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
            placeholder="Year"
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
          <input
            type="text"
            placeholder="CGPA"
            value={entry.CGPA}
            onChange={(e) => handleFieldChange(index, 'CGPA', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          
          <button onClick={() => handleRemoveEntry(index)} style={{ padding: '5px 10px', background: 'red', color: 'white' }}>
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
