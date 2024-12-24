import React, { useState } from 'react';

const SkillsSection = ({ skillsData, onUpdate }) => {
  const [localSkillsData, setLocalSkillsData] = useState(skillsData);

  const handleAddCategory = () => {
    const newCategory = { category: '', skills: '' };
    const updatedData = [...localSkillsData, newCategory];
    setLocalSkillsData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveCategory = (index) => {
    const updatedData = localSkillsData.filter((_, i) => i !== index);
    setLocalSkillsData(updatedData);
    onUpdate(updatedData);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedData = [...localSkillsData];
    updatedData[index][field] = value;
    setLocalSkillsData(updatedData);
    onUpdate(updatedData);
  };

  return (
    <div>
      <h2>Skills</h2>
      {localSkillsData.map((entry, index) => (
        <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <input
            type="text"
            placeholder="Category Name"
            value={entry.category}
            onChange={(e) => handleFieldChange(index, 'category', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <textarea
            placeholder="Skills (comma-separated)"
            value={entry.skills}
            onChange={(e) => handleFieldChange(index, 'skills', e.target.value)}
            style={{ width: '100%', height: '50px', marginBottom: '10px', padding: '5px' }}
          />
          <button onClick={() => handleRemoveCategory(index)} style={{ padding: '5px 10px', background: 'red', color: 'white' }}>
            Remove Category
          </button>
        </div>
      ))}
      <button onClick={handleAddCategory} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Add Skill Category
      </button>
    </div>
  );
};

export default SkillsSection;
