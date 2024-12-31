import React, { useState } from 'react';

const CertificationsSection = ({ certificationsData, onUpdate }) => {
  const [localCertificationsData, setLocalCertificationsData] = useState(certificationsData);

  const handleAddCertification = () => {
    const newCertification = {
      name: '', // Certification name (mandatory)
      validUntil: '', // Validity date (optional)
      link: '', // Link to certification (optional)
    };
    const updatedData = [...localCertificationsData, newCertification];
    setLocalCertificationsData(updatedData);
    onUpdate(updatedData);
  };

  const handleRemoveCertification = (index) => {
    const updatedData = localCertificationsData.filter((_, i) => i !== index);
    setLocalCertificationsData(updatedData);
    onUpdate(updatedData);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedData = [...localCertificationsData];
    updatedData[index][field] = value;
    setLocalCertificationsData(updatedData);
    onUpdate(updatedData);
  };

  return (
    <div>
      <h2>Certifications</h2>
      {localCertificationsData.map((certification, index) => (
        <div
          key={index}
          style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}
        >
          <input
            type="text"
            placeholder="Certification Name"
            value={certification.name}
            onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
            required
          />
          <input
            type="text"
            placeholder="Valid Until (optional) e.g May 2024"
            value={certification.validUntil}
            onChange={(e) => handleFieldChange(index, 'validUntil', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <input
            type="url"
            placeholder="Certification Link (optional)"
            value={certification.link}
            onChange={(e) => handleFieldChange(index, 'link', e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />

          <button
            onClick={() => handleRemoveCertification(index)}
            style={{
              padding: '5px 10px',
              marginTop: '10px',
              background: 'red',
              color: 'white',
            }}
          >
            Remove Certification
          </button>
        </div>
      ))}
      <button onClick={handleAddCertification} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Add Certification
      </button>
    </div>
  );
};

export default CertificationsSection;
