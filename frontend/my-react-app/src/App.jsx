import React, { useState } from 'react';
import axios from 'axios';
import CodingProfilesSection from './CodingProfilecmp.jsx';
import EducationSection from './educationcmp.jsx';
import SkillsSection from './skillscmp.jsx';
import ExperienceSection from './Experiencecmp.jsx';
import ProjectsSection from './Projectcmp.jsx';
import GeneralBulletCmp from './generalbulletcmp.jsx';
import ResponsibilitySection from './PositionofResponsibilitycmp.jsx';
import CertificationsSection from './Certificationsection.jsx';
import './App.css';
//https://info-to-latex-faang.onrender.com/users
//donot forget to change backend url to above and also make render updated using latest commit

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [linkedinusrn, setLinkedinusrn] = useState('');
  const [portfolio, setPortfolio] = useState('');
  // const [codingProfile, setCodingProfile] = useState('');
  // const [codingProfileplatname, setCodingProfileplatname] = useState('');
  const [codingProfiles, setCodingProfiles] = useState([]);
  const [github, setGithub] = useState('');
  const [githubusrn, setGithubusrn] = useState('');
  const [objective, setObjective] = useState('');
  const [latexCode, setLatexCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [certifications, setCertifications] = useState([]); // New State for Certifications

  const handleGenerateLatex = async () => {
    if (!firstName || !lastName || !phone || !email) {
      setErrorMessage('Please fill in all required fields: First Name, Last Name, Phone, and Email.');
      return;
    }

    setErrorMessage('');
    try {
      const response = await axios.post('https://info-to-latex-faang.onrender.com/users', {
        firstName,
        lastName,
        phone,
        email,
        address,
        linkedin,
        linkedinusrn,
        portfolio,
        codingProfiles,
        github,
        githubusrn,
        objective,
        education,
        skills,
        experience,
        projects,
        activities,
        responsibilities,
        certifications, // Add certifications to API payload
      });
      setLatexCode(response.data.latexCode);
    } catch (error) {
      console.error('Error sending data:', error);
      setErrorMessage('An error occurred while sending data. Please try again.');
    }
  };

  const handleFetchLatex = async () => {
    try {
      const response = await axios.get('https://info-to-latex-faang.onrender.com/generate-latex', {
        responseType: 'text',
      });
      setLatexCode(response.data);
    } catch (error) {
      console.error('Error fetching LaTeX:', error);
      setErrorMessage('An error occurred while fetching LaTeX data. Please try again.');
    }
  };

  const handleDownloadResumeCls = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/126BT3NS6ya__GCpS8osKLKdme0kAVPVX/view?usp=sharing';
    link.download = 'resume.cls';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>LaTeX Resume Builder</h1>

      <div
      style={{
        border: '1px solid #ccc',
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        marginBottom: '20px',
      }}
    >
      <h2>How to Use</h2>
      <ol style={{ paddingLeft: '20px' }}>
        <li>
          <strong>Welcome!</strong> This website is your helper to convert your data into a LaTeX resume using three simple steps.
        </li>
        <li>
          Download the <strong>resume.cls</strong> file using the button below. It contains basic formatting info. You can use your own
          file, but ensure the name and section structure match this file.
        </li>
        <li>
          Open Overleaf and create a new project. Add the <strong>resume.cls</strong> file.
        </li>
        <li>
          Fill out the form below with your details, and click on <strong>Generate LaTeX</strong> to create your LaTeX code. To fetch
          the code, click on <strong>Fetch LaTeX</strong>. The generated code will appear in the LaTeX Code box below. Copy and paste
          it into your <code>main.tex</code> file and click <strong>Compile</strong>.
        </li>
        <li>
          <strong>Hurray!</strong> Your LaTeX resume is ready!,click and download you have your LaTex resume!.
        </li>
      </ol>
      <p style={{ fontStyle: 'italic', color: '#555' }}>
        Notes 1: If you update any of your info, make sure to click on <strong>Generate LaTeX</strong> before fetching the updated code.
      </p>
      <p style={{ fontStyle: 'italic', color: '#555' }}>
        Notes 2: Of the default fields only First name, last name, phone and email are mandatory rest all are optional fill them if you wish to add it in your resume.If you add fields e.g Add Project,fill up the necessary details dont keep it completely empty else it will throw an error,if you dont need that click on remove button.
             </p>
    </div>

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
        {/* Input Fields */}
        <input type="text" placeholder="First Name (Required)" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <input type="text" placeholder="Last Name (Required)" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <input type="text" placeholder="Phone (Required)" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <input type="email" placeholder="Email (Required)" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <input type="text" placeholder="City, State" value={address} onChange={(e) => setAddress(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <input type="text" placeholder="LinkedIn Username /Linkdein" value={linkedinusrn} onChange={(e) => setLinkedinusrn(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <input type="text" placeholder="LinkedIn Link" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <input type="text" placeholder="Portfolio Link" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <CodingProfilesSection
        codingProfiles={codingProfiles}
        onAdd={() => setCodingProfiles([...codingProfiles, { platform: '', link: '' }])}
        onRemove={(index) =>
          setCodingProfiles(codingProfiles.filter((_, i) => i !== index))
        }
        onUpdate={(updatedProfiles) => setCodingProfiles(updatedProfiles)}
      />
        <input type="text" placeholder="GitHub Username / Github" value={githubusrn} onChange={(e) => setGithubusrn(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <input type="text" placeholder="GitHub Link" value={github} onChange={(e) => setGithub(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
      </div>

      <textarea placeholder="Objective" value={objective} onChange={(e) => setObjective(e.target.value)} style={{ width: '100%', height: '50px', marginBottom: '10px' }}></textarea>
      <ExperienceSection experienceData={experience} onUpdate={setExperience} />
      <EducationSection educationData={education} onUpdate={setEducation} />
      <SkillsSection skillsData={skills} onUpdate={setSkills} />
      <ProjectsSection projectsData={projects} onUpdate={setProjects} />
      <GeneralBulletCmp bulletsData={activities} onUpdate={setActivities} />
      <CertificationsSection certificationsData={certifications} onUpdate={setCertifications} />
      <ResponsibilitySection data={responsibilities} onUpdate={setResponsibilities} />
     

      <button onClick={handleGenerateLatex} style={{ padding: '10px 20px', marginRight: '10px' }}>
        Generate LaTeX
      </button>
      <button onClick={handleFetchLatex} style={{ padding: '10px 20px', marginRight: '10px' }}>
        Fetch LaTeX
      </button>
      <button onClick={handleDownloadResumeCls} style={{ padding: '10px 20px' }}>
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
         <footer
      style={{
        textAlign: 'center',
        padding: '10px',
        marginTop: '20px',
        borderTop: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        fontSize: '14px',
        color: '#555',
      }}
    >
      Created with ❤️ by YD © 2024
    </footer>
    </div>
  );
};

export default App;
