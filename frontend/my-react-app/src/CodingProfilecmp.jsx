import React from 'react';

const CodingProfilesSection = ({ codingProfiles, onAdd, onRemove, onUpdate }) => {
  const handleProfileChange = (index, field, value) => {
    const updatedProfiles = [...codingProfiles];
    updatedProfiles[index][field] = value;
    onUpdate(updatedProfiles);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Coding Profiles</h3>
      {codingProfiles.map((profile, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Platform Name / Platform username (Required)"
            value={profile.platform}
            onChange={(e) => handleProfileChange(index, 'platform', e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="text"
            placeholder="Profile Link (Required)"
            value={profile.link}
            onChange={(e) => handleProfileChange(index, 'link', e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button
            onClick={() => onRemove(index)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#ff4d4d',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        disabled={codingProfiles.length >= 4} // Disable if 4 profiles already exist
        style={{
          padding: '10px 20px',
          marginTop: '10px',
          backgroundColor: codingProfiles.length >= 4 ? '#ccc' : '#4CAF50', // Change color if disabled
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: codingProfiles.length >= 4 ? 'not-allowed' : 'pointer',
        }}
      >
        Add Coding Profile
      </button>
    </div>
  );
};

export default CodingProfilesSection;
