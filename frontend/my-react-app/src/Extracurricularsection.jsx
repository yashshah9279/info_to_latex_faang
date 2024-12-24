import React, { useState } from 'react';

const ExtraCurricularSection = ({ activitiesData, onUpdate }) => {
  const [localActivitiesData, setLocalActivitiesData] = useState(activitiesData);

  const handleAddActivity = () => {
    const newActivity = { description: '', links: [] };
    const updatedData = [...localActivitiesData, newActivity];
    setLocalActivitiesData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveActivity = (index) => {
    const updatedData = localActivitiesData.filter((_, i) => i !== index);
    setLocalActivitiesData(updatedData);
    onUpdate(updatedData);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedData = [...localActivitiesData];
    updatedData[index][field] = value;
    setLocalActivitiesData(updatedData);
    onUpdate(updatedData);
  };

  const handleLinkChange = (activityIndex, linkIndex, field, value) => {
    const updatedData = [...localActivitiesData];
    const updatedLinks = [...updatedData[activityIndex].links];
    updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], [field]: value };
    updatedData[activityIndex].links = updatedLinks;
    setLocalActivitiesData(updatedData);
    onUpdate(updatedData);
  };

  const handleAddLink = (activityIndex) => {
    const updatedData = [...localActivitiesData];
    updatedData[activityIndex].links = [...(updatedData[activityIndex].links || []), { text: '', url: '' }];
    setLocalActivitiesData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveLink = (activityIndex, linkIndex) => {
    const updatedData = [...localActivitiesData];
    updatedData[activityIndex].links = updatedData[activityIndex].links.filter((_, i) => i !== linkIndex);
    setLocalActivitiesData(updatedData);
    onUpdate(updatedData);
  };

  return (
    <div>
      <h2>Extra-Curricular Activities</h2>
      {localActivitiesData.map((activity, activityIndex) => (
        <div
          key={activityIndex}
          style={{
            marginBottom: '20px',
            borderBottom: '1px solid #ccc',
            paddingBottom: '10px',
          }}
        >
          <textarea
            placeholder="Activity Description"
            value={activity.description}
            onChange={(e) => handleFieldChange(activityIndex, 'description', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <h4>Links</h4>
          {activity.links?.map((link, linkIndex) => (
            <div key={linkIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Link Text"
                value={link.text}
                onChange={(e) => handleLinkChange(activityIndex, linkIndex, 'text', e.target.value)}
                style={{ marginRight: '10px', padding: '5px', flex: 1 }}
              />
              <input
                type="url"
                placeholder="Link URL"
                value={link.url}
                onChange={(e) => handleLinkChange(activityIndex, linkIndex, 'url', e.target.value)}
                style={{ marginRight: '10px', padding: '5px', flex: 2 }}
              />
              <button
                onClick={() => handleRemoveLink(activityIndex, linkIndex)}
                style={{ padding: '5px 10px', background: 'red', color: 'white' }}
              >
                Remove Link
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddLink(activityIndex)}
            style={{ padding: '5px 10px', marginBottom: '10px', background: 'blue', color: 'white' }}
          >
            Add Link
          </button>
          <button
            onClick={() => handleRemoveActivity(activityIndex)}
            style={{ padding: '5px 10px', marginTop: '10px', background: 'red', color: 'white' }}
          >
            Remove Activity
          </button>
        </div>
      ))}
      <button
        onClick={handleAddActivity}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          background: 'green',
          color: 'white',
        }}
      >
        Add Activity
      </button>
    </div>
  );
};

export default ExtraCurricularSection;
