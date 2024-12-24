import React, { useState } from 'react';

const GeneralBulletCmp = ({ bulletsData, onUpdate }) => {
  const [localBullets, setLocalBullets] = useState(bulletsData);

  const handleAddBullet = () => {
    const updatedBullets = [...localBullets, ''];
    setLocalBullets(updatedBullets);
    onUpdate(updatedBullets);
  };

  const handleRemoveBullet = (index) => {
    const updatedBullets = localBullets.filter((_, i) => i !== index);
    setLocalBullets(updatedBullets);
    onUpdate(updatedBullets);
  };

  const handleBulletChange = (index, value) => {
    const updatedBullets = [...localBullets];
    updatedBullets[index] = value;
    setLocalBullets(updatedBullets);
    onUpdate(updatedBullets);
  };

  return (
    <div>
      <h2>Achievements</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {localBullets.map((bullet, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <textarea
              value={bullet}
              placeholder="Enter achievement description"
              onChange={(e) => handleBulletChange(index, e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '5px',
                boxSizing: 'border-box',
              }}
            />
            <button
              onClick={() => handleRemoveBullet(index)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddBullet}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Add Achievement
      </button>
    </div>
  );
};

export default GeneralBulletCmp;
