import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [objective, setObjective] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [projects, setProjects] = useState('');
  const [extraCurricular, setExtraCurricular] = useState('');
  const [leadership, setLeadership] = useState('');
  const [latexCode, setLatexCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerateLatex = async () => {
    if (!name || !objective || !education || !phone || !email) {
      setErrorMessage(
        'Please fill in all required fields: Name, Objective, Education, Phone, and Email.'
      );
      return;
    }

    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/users', {
        name,
        phone,
        address,
        email,
        linkedin,
        portfolio,
        objective,
        education,
        skills,
        experience,
        projects,
        extraCurricular,
        leadership,
      });

      setLatexCode(response.data.latexCode);
    } catch (error) {
      console.error('Error sending data:', error);
      setErrorMessage('An error occurred while sending data. Please try again.');
    }
  };

  const handleFetchLatex = async () => {
    try {
      const response = await axios.get('http://localhost:5000/generate-latex', {
        responseType: 'text',
      });

      setLatexCode(response.data);
    } catch (error) {
      console.error('Error fetching LaTeX:', error);
      setErrorMessage('An error occurred while fetching LaTeX data. Please try again.');
    }
  };

  const handleDownloadClassFile = () => {
    const googleDriveLink = 'https://drive.google.com/file/d/1jExUoDlZ2A6NQse4PLF8mT4gfHY8cQFZ/view?usp=sharing';
    window.open(googleDriveLink, '_blank');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>LaTeX Resume Builder</h1>

      {errorMessage && (
        <div
          style={{
            color: 'red',
            marginBottom: '20px',
            border: '1px solid red',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#ffe6e6',
          }}
        >
          {errorMessage}
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Name (Required)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Phone (Required)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="email"
          placeholder="Email (Required)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="LinkedIn"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Portfolio Link"
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
      </div>

      <textarea
        placeholder="Objective (Required)"
        value={objective}
        onChange={(e) => setObjective(e.target.value)}
        style={{ width: '100%', height: '50px', marginBottom: '10px' }}
      ></textarea>
      <textarea
        placeholder="Education (Required)"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        style={{ width: '100%', height: '50px', marginBottom: '10px' }}
      ></textarea>
      <textarea
        placeholder="Skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        style={{ width: '100%', height: '50px', marginBottom: '10px' }}
      ></textarea>
      <textarea
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        style={{ width: '100%', height: '50px', marginBottom: '10px' }}
      ></textarea>
      <textarea
        placeholder="Projects"
        value={projects}
        onChange={(e) => setProjects(e.target.value)}
        style={{ width: '100%', height: '50px', marginBottom: '10px' }}
      ></textarea>
      <textarea
        placeholder="Extra-Curricular Activities"
        value={extraCurricular}
        onChange={(e) => setExtraCurricular(e.target.value)}
        style={{ width: '100%', height: '50px', marginBottom: '10px' }}
      ></textarea>
      <textarea
        placeholder="Leadership"
        value={leadership}
        onChange={(e) => setLeadership(e.target.value)}
        style={{ width: '100%', height: '50px', marginBottom: '10px' }}
      ></textarea>

      <button onClick={handleGenerateLatex} style={{ padding: '10px 20px', marginBottom: '20px' }}>
        Generate LaTeX
      </button>

      <button onClick={handleFetchLatex} style={{ padding: '10px 20px', marginBottom: '20px' }}>
        Fetch LaTeX
      </button>

      <button onClick={handleDownloadClassFile} style={{ padding: '10px 20px', marginBottom: '20px' }}>
        Download resume.cls
      </button>

      <h2>Generated LaTeX Code</h2>
      <textarea
        value={latexCode}
        onChange={(e) => setLatexCode(e.target.value)}
        style={{
          width: '100%',
          height: '300px',
          background: '#f4f4f4',
          padding: '10px',
          borderRadius: '5px',
          fontFamily: 'monospace',
        }}
      ></textarea>
    </div>
  );
};

export default App;
