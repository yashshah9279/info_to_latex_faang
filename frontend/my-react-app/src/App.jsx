import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [linkedinusrn, setLinkedinusrn] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [codingProfile, setCodingProfile] = useState('');
  const [codingProfileplatname, setCodingProfileplatname] = useState('');
  const [github, setGithub] = useState('');
  const [githubusrn, setGithubusrn] = useState('');
  const [objective, setObjective] = useState('');
  const [education, setEducation] = useState(['']);
  const [skills, setSkills] = useState(['']);
  const [experience, setExperience] = useState(['']);
  const [projects, setProjects] = useState(['']);
  const [extraCurricular, setExtraCurricular] = useState(['']);
  const [leadership, setLeadership] = useState(['']);
  const [latexCode, setLatexCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddField = (setter, array) => {
    setter([...array, '']);
  };

  const handleRemoveField = (setter, array, index) => {
    const updatedArray = [...array];
    updatedArray.splice(index, 1);
    setter(updatedArray);
  };

  const handleChangeField = (setter, array, index, value) => {
    const updatedArray = [...array];
    updatedArray[index] = value;
    setter(updatedArray);
  };

  const handleGenerateLatex = async () => {
    if (!firstName || !lastName || !phone || !email) {
      setErrorMessage('Please fill in all required fields: First Name, Last Name, Phone, and Email.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/users', {
        firstName,
        lastName,
        phone,
        email,
        address,
        linkedin,
        linkedinusrn,
        portfolio,
        codingProfile,
        codingProfileplatname,
        github,
        githubusrn,
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
          placeholder="First Name (Required)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Last Name (Required)"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
          type="email"
          placeholder="Email (Required)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="City,State"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        
         <input
          type="text"
          placeholder="LinkedInusername"
          value={linkedinusrn}
          onChange={(e) => setLinkedinusrn(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="LinkedIn Link"
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
        
        <input
          type="text"
          placeholder="Coding Platformname"
          value={codingProfileplatname}
          onChange={(e) => setCodingProfileplatname(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Coding Profile Link"
          value={codingProfile}
          onChange={(e) => setCodingProfile(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
         <input
          type="text"
          placeholder="GitHub username"
          value={githubusrn}
          onChange={(e) => setGithubusrn(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="GitHub Link"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
      </div>

      <textarea
        placeholder="Objective"
        value={objective}
        onChange={(e) => setObjective(e.target.value)}
        style={{ width: '100%', height: '50px', marginBottom: '10px' }}
      ></textarea>

      {[{ label: 'Education', state: education, setter: setEducation },
        { label: 'Skills', state: skills, setter: setSkills },
        { label: 'Experience', state: experience, setter: setExperience },
        { label: 'Projects', state: projects, setter: setProjects },
        { label: 'Extra-Curricular Activities', state: extraCurricular, setter: setExtraCurricular },
        { label: 'Leadership', state: leadership, setter: setLeadership },
      ].map(({ label, state, setter }) => (
        <div key={label} style={{ marginBottom: '20px' }}>
          <h3>{label}</h3>
          {state.map((value, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <textarea
                value={value}
                onChange={(e) => handleChangeField(setter, state, index, e.target.value)}
                style={{ width: '100%', height: '50px', marginRight: '10px' }}
              />
              <button onClick={() => handleRemoveField(setter, state, index)} style={{ padding: '5px 10px' }}>
                Remove
              </button>
            </div>
          ))}
          <button onClick={() => handleAddField(setter, state)} style={{ padding: '5px 10px' }}>
            Add {label}
          </button>
        </div>
      ))}

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
