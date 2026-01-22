import '../styles/portfolio.css'

function Portfolio() {
  return (
    <div className="portfolio">
      <Header />
      <main className="container">
        <Bio />
        <Experience />
        <Projects />
        <Skills />
        <Athletics />
        <Contact />
      </main>
      <Footer/>
    </div>
  )
}

function Header() {
  return (
    <header className="header">
      <div className="header-content container">
        <div className="header-info">
          <h1>Cameron Jim</h1>
          <p className="header-title">Computer Engineering Student | Software Developer</p>
          <p className="header-subtitle">University of British Columbia • Expected May 2028</p>
        </div>
        <nav className="header-nav">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#athletics">Athletics</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

function Bio() {
  return (
    <section id="about" className="section">
      <h2 className="section-title">About Me</h2>
      <div className="bio-content">
        <p>
          Hi! I'm Cameron, a third year Computer Engineering student at UBC (expected graduation May 2028 including 5 co-op workterms)
          who enjoys problem solving and working through challenges. I have completed a full co-op workterm at Sitewise Analytics where I gained
          valuable experience with building scalable enterprise applications using React TS.
        </p>
      </div>
    </section>
  )
}

function Experience() {
  const experiences = [
    {
      company: 'Sitewise Analytics',
      location: 'Vancouver, BC',
      role: 'Software Developer (Co-op)',
      period: 'May 2025 - September 2025',
      highlights: [
        'Developed scalable features for an enterprise SaaS application using React, TypeScript, Redux Toolkit (RTK Query), and Vite',
        'Built integrated, data-driven UI components connecting backend (API) services with Google Maps API for dynamic visualizations',
        'Leveraged custom MCP servers, Figma, and Playwright to streamline development workflows',
        'Collaborated in an agile environment following established code review processes and Git workflows',
        'Helped migrate the front-end build to a CI/CD workflow, enabling automatic PR builds, previews, and coverage checks'
      ],
    },
    {
      company: 'Turing AI (Google)',
      location: 'Vancouver, BC (Remote)',
      role: 'STEM Annotator Internship',
      period: 'December 2024 - January 2025',
      highlights: [
        'Led Computer Science and Physics teams to create and verify AP-level problems for training Google\'s AI model, contributing to what is now Gemini 2.5',
        'Matched AI-generated responses against multiple models and collected comparative data from Gemini and other AI systems',
        'Created detailed analytical reports that were sent directly to Google for model improvement insights'
      ],
    },
    {
      company: 'Richmond Country Club',
      location: 'Richmond, BC',
      role: 'Tennis Instructor (Part-Time)',
      period: 'November 2020 - June 2023',
      highlights: [
        'Coached beginner and intermediate students aged 4-13, teaching proper technique, game fundamentals, and strategic thinking',
        'Developed engaging lesson plans that inspired young athletes to develop a passion for tennis while building confidence and sportsmanship',
        'Emphasized teamwork, leadership, and communication skills through structured activities and positive reinforcement'
      ],
    },
  ]

  return (
    <section id="experience" className="section">
      <h2 className="section-title">Experience</h2>
      <div className="experience-list">
        {experiences.map((exp, index) => (
          <article key={index} className="experience-card card">
            <div className="experience-header">
              <div>
                <h3>{exp.role}</h3>
                <p className="experience-company">{exp.company} • {exp.location}</p>
              </div>
              <span className="experience-period">{exp.period}</span>
            </div>
            <ul className="experience-highlights">
              {exp.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  const projects = [
    {
      title: 'Token-Gated Portfolio',
      description: 'This site! A serverless architecture using AWS Lambda, API Gateway, DynamoDB, and CloudFront to create a private portfolio. Access requires a unique token for privacy-respecting analytics without invasive tracking.',
      tags: ['AWS Lambda', 'TypeScript', 'React', 'DynamoDB', 'CloudFront'],
    },
    {
      title: 'NBA Stats & Fantasy Trade Analyzer',
      description: 'In-progress web application that analyzes NBA player statistics, trade values, and waiver wire pickups for fantasy basketball. Features real-time data visualization and trade recommendations.',
      tags: ['React', 'TypeScript', 'SQL', 'In Progress'],
    },
    {
      title: 'JavaFX Desktop Application',
      description: 'Collaborated in a team of 5 to develop a multi-feature desktop app using JavaFX and SceneBuilder. Focused on building intuitive UIs and implementing robust event-driven architecture.',
      tags: ['Java', 'JavaFX', 'SceneBuilder', 'Team Project'],
    },
  ]

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article key={index} className="project-card card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  const skills = {
    'Languages': ['C++', 'C', 'C#', 'Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'ARM Assembly', 'Verilog'],
    'Frontend': ['React', 'Redux Toolkit', 'RTK Query', 'HTML', 'CSS', 'Vite'],
    'Backend & APIs': ['Node.js', 'Google Maps API', 'Apidog', 'Postman'],
    'Frameworks & Libraries': ['Scrapy', 'JavaFX', 'SceneBuilder'],
    'Tools & Platforms': ['Git', 'Linux', 'Ubuntu', 'GDB', 'MCP Servers', 'Playwright', 'Figma', 'ModelSim', 'Quartus', 'LaTeX', 'Arduino'],
    'Cloud & DevOps': ['AWS Lambda', 'AWS S3', 'AWS CloudFront', 'API Gateway', 'CI/CD', 'SAM CLI'],
  }

  return (
    <section id="skills" className="section">
      <h2 className="section-title">Technical Skills</h2>
      <div className="skills-grid">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skill-category">
            <h3>{category}</h3>
            <div className="skill-tags">
              {items.map((skill, i) => (
                <span key={i} className="tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Athletics() {
  return (
    <section id="athletics" className="section">
      <h2 className="section-title">Athletics & Competitive Gaming</h2>
      <div className="athletics-grid">
        <article className="athletics-card card">
          <h3>Tennis</h3>
          <div className="athletics-content">
            <p className="athletics-highlight">UBC Men's Varsity Tennis Team</p>
            <ul className="athletics-achievements">
              <li>Currently competing at the varsity level for UBC, playing both singles and doubles</li>
              <li>UBC was the canadian champions in 2024, and the runner up in 2025</li>
              <li>Former Top 9 Player in Canada</li>
              <li>12 years of competitive experience</li>
              <li>Team captain of high school tennis team (2021-2023), led team to 2 provincial championships</li>
            </ul>
          </div>
        </article>

        <article className="athletics-card card">
          <h3>Valorant Esports</h3>
          <div className="athletics-content">
            <p className="athletics-highlight">High School Team Captain</p>
            <ul className="athletics-achievements">
              <li>High School Team Captain (2021-2023)</li>
              <li>Led team to 2x Provincial Championships, winning MVP in both tournaments</li>
              <li>Current 1000 player in North America</li>
              <li>Team shot caller and strategist</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-content">
        <p>
          I'm actively seeking co-op and internship opportunities for 2026-2027. 
          Feel free to reach out to me if you're interested in working together!
        </p>
        <div className="contact-info">
          <p><a href="mailto:cameroncjim@gmail.com">cameroncjim@gmail.com</a></p>
          <p>604-352-0653</p>
          <p>Vancouver, BC</p>
        </div>
        <div className="contact-links">
          <a href="https://drive.google.com/file/d/1wYourResumeId/view" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Download Resume
          </a>
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/cameron-jim-037b992a6/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/sardinebagel" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Cameron Jim</p>
      </div>
    </footer>
  )
}

export default Portfolio
