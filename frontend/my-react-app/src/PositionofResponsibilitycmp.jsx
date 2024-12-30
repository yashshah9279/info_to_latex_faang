import React, { useState } from 'react';

const ResponsibilitySection = ({ data, onUpdate }) => {
  const [localData, setLocalData] = useState(data);

  const handleAddResponsibility = () => {
    const newResponsibility = {
      position: '',
      organization: '',
      dateRange: '',
      bulletPoints: [''],
    };
    const updatedData = [...localData, newResponsibility];
    setLocalData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveResponsibility = (index) => {
    const updatedData = localData.filter((_, i) => i !== index);
    setLocalData(updatedData);
    onUpdate(updatedData);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedData = [...localData];
    updatedData[index][field] = value;
    setLocalData(updatedData);
    onUpdate(updatedData);
  };

  const handleBulletChange = (resIndex, bulletIndex, value) => {
    const updatedData = [...localData];
    updatedData[resIndex].bulletPoints[bulletIndex] = value;
    setLocalData(updatedData);
    onUpdate(updatedData);
  };

  const handleAddBullet = (resIndex) => {
    const updatedData = [...localData];
    updatedData[resIndex].bulletPoints.push('');
    setLocalData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveBullet = (resIndex, bulletIndex) => {
    const updatedData = [...localData];
    updatedData[resIndex].bulletPoints.splice(bulletIndex, 1);
    setLocalData(updatedData);
    onUpdate(updatedData);
  };

  return (
    <div>
      <h2>Positions of Responsibility</h2>
      {localData.map((responsibility, resIndex) => (
        <div
          key={resIndex}
          style={{
            marginBottom: '20px',
            borderBottom: '1px solid #ccc',
            paddingBottom: '10px',
          }}
        >
          <input
            type="text"
            placeholder="Position"
            value={responsibility.position}
            onChange={(e) => handleFieldChange(resIndex, 'position', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <input
            type="text"
            placeholder="Organization Name"
            value={responsibility.organization}
            onChange={(e) => handleFieldChange(resIndex, 'organization', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <input
            type="text"
            placeholder="Date Range e.g. May 2024- July 2024"
            value={responsibility.dateRange}
            onChange={(e) => handleFieldChange(resIndex, 'dateRange', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />

          <h4>What You Did (Bullet Points)</h4>
          {responsibility.bulletPoints.map((bullet, bulletIndex) => (
            <div key={bulletIndex} style={{ display: 'flex', marginBottom: '10px' }}>
              <textarea
                placeholder="Description"
                value={bullet}
                onChange={(e) => handleBulletChange(resIndex, bulletIndex, e.target.value)}
                style={{ width: '100%', marginRight: '10px', padding: '5px' }}
              />
              <button
                onClick={() => handleRemoveBullet(resIndex, bulletIndex)}
                style={{ padding: '5px 10px', background: 'red', color: 'white' }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddBullet(resIndex)}
            style={{ padding: '5px 10px', marginTop: '10px' }}
          >
            Add Bullet Point
          </button>

          <button
            onClick={() => handleRemoveResponsibility(resIndex)}
            style={{
              padding: '5px 10px',
              marginTop: '20px',
              background: 'red',
              color: 'white',
            }}
          >
            Remove Responsibility
          </button>
        </div>
      ))}
      <button
        onClick={handleAddResponsibility}
        style={{ padding: '10px 20px', marginTop: '20px' }}
      >
        Add Responsibility
      </button>
    </div>
  );
};

export default ResponsibilitySection;
