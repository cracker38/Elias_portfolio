const skillGroups = [
  {
    category: 'Full-Stack Development',
    names: ['React.js', 'Node.js', 'JavaScript', 'PHP', 'Python', 'REST APIs', 'HTML/CSS', 'Bootstrap'],
  },
  {
    category: 'Mobile Development',
    names: ['Flutter', 'Mobile application development'],
  },
  {
    category: 'Applications & Databases',
    names: ['MySQL', 'MongoDB', 'Oracle', 'Java', 'C'],
  },
  {
    category: 'IT Support & Troubleshooting',
    names: ['Computer maintenance', 'System troubleshooting', 'System configuration', 'Hardware support'],
  },
  {
    category: 'Networking & Security',
    names: [
      'Advanced networking',
      'Cybersecurity',
      'Ethical hacking',
      'Penetration testing',
      'Vulnerability scanning',
      'Application security',
    ],
  },
  {
    category: 'Systems Administration',
    names: ['Windows Server', 'Linux Server'],
  },
  {
    category: 'Professional Skills',
    names: ['Leadership', 'Project Management', 'Problem Solving', 'Business & Innovation'],
  },
];

const links = [
  { name: 'CYPADI', display: 'www.cypadi.com', url: 'https://www.cypadi.com/' },
  { name: 'APADI Africa', display: 'https://apadinafrica.org.rw/', url: 'https://apadinafrica.org.rw/' },
  { name: 'DVEXE', display: 'https://www.dvexe.com/', url: 'https://www.dvexe.com/' },
];

export const cv = {
  name: 'DUKUZUMUREMYI Elias',
  title: 'Software Developer and Full-Stack Developer',
  location: 'Eastern Province, Kirehe District, Mahama Sector, Rwanda',
  phone: '+250 785 354 935',
  email: 'it.elias38@gmail.com',
  github: 'https://github.com/cracker38',
  cvFile: '/Elias_DUKUZUMUREMYI_CV.pdf',
  objective:
    'Software Developer and Full-Stack Developer with practical experience in web and mobile application development, frontend and backend programming, databases, APIs, AI-powered applications, and application security. Skilled in React.js, Node.js, JavaScript, PHP, Python, Flutter, HTML/CSS, Bootstrap, MySQL, MongoDB, and Oracle. Experienced in building practical digital solutions, troubleshooting systems, collaborating on software projects, and applying cybersecurity principles throughout the development lifecycle. Strong problem-solving, project technology innovation skills and project management.',
  experience: [
    {
      id: 'klab',
      role: 'Intern – Mobile Application Development',
      organization: 'KLab, Kacyiru, Kigali',
      period: 'Sept 2024 - Oct 2024',
      responsibilities: [
        'Participated in mobile app development projects.',
        'Collaborated with teams to design and implement software solutions.',
        'Enhanced skills in Flutter and UI/UX design.',
      ],
    },
    {
      id: 'bdf',
      role: 'Intern – Computer Maintenance',
      organization: 'Business Development Fund (BDF), Kirehe, Rwanda',
      period: 'July 2019',
      responsibilities: [
        'Performed troubleshooting and maintenance of computer systems.',
        'Assisted in system configuration and hardware support.',
      ],
    },
  ],
  education: [
    {
      id: 'musanze',
      program: "Bachelor's Degree in Information and Communication Technology",
      institution: 'RP Musanze College, Rwanda',
      period: '2026 - 2027',
      status: 'Ongoing',
    },
    {
      id: 'tumba',
      program: 'A1 in Information Technology',
      institution: 'IPRC Tumba College, Rwanda',
      period: '2022 - 2025',
      status: '',
    },
    {
      id: 'aspej',
      program: 'Advanced Level Certificate in Networking',
      institution: 'Lycee du Lac Muhazi (ASPEJ), Rwanda',
      period: '2018 - 2021',
      status: '',
    },
  ],
  skills: skillGroups.flatMap(({ category, names }) =>
    names.map((name, index) => ({
      id: `${category}-${index}`,
      category,
      name,
    }))
  ),
  projects: [
    {
      id: 'aimhsa',
      name: 'AIMHSA – AI Mental Health Support Assistant',
      description:
        'Developed an AI-powered mental health support platform tailored for Rwanda. Supports Kinyarwanda, English, French, and Kiswahili; provides 24/7 confidential AI chatbot assistance and integrates mental-health resources, crisis support, and professional referrals.',
    },
    {
      id: 'farmer-field-management',
      name: 'Farmer Field Management System (Mobile Application)',
      description:
        'Designed and developed a mobile application to help farmers manage agricultural activities and field data, improving data organization and productivity for local farming operations.',
    },
    {
      id: 'web-development',
      name: 'Web Development Projects',
      description: 'Contributed to development and maintenance of:',
      links,
    },
  ],
  certifications: [
    { id: 'eh', name: 'Ethical Hacker', issuer: 'Cisco Networking Academy', issued_on: 'Feb 18, 2026' },
    { id: 'cisco-intro', name: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', issued_on: 'Dec 31, 2025' },
    { id: 'nesa', name: 'Advanced Level Certificate in Networking', issuer: 'NESA', issued_on: '' },
    { id: 'jcac', name: 'Junior Cybersecurity Analyst Career Path Exam', issuer: '', issued_on: '' },
    { id: 'ai-lit', name: 'AI Literacy Certification', issuer: '', issued_on: '' },
    { id: 'gen-ai', name: 'Master Generative AI Certification', issuer: '', issued_on: '' },
    { id: 'fcc-web', name: 'Web Design Certification', issuer: 'FreeCodeCamp', issued_on: 'June 2024' },
    { id: 'fcc-js', name: 'JavaScript Certification', issuer: 'FreeCodeCamp', issued_on: 'July 2024' },
  ],
  languages: [
    { name: 'Kinyarwanda', level: 'Native' },
    { name: 'English', level: 'Excellent' },
    { name: 'French', level: 'Good' },
  ],
  interests: [
    'Cybersecurity and network security',
    'IT infrastructure and systems administration',
    'Technology research and system development',
    'Learning cybersecurity tools and security best practices',
    'Networking and professional growth',
  ],
  references: [
    {
      name: 'Desire ININAHAZWE',
      organization: 'Kirehe District',
      role: 'Network and System Administrator',
      phone: '+250 783 715 426',
    },
    {
      name: 'Pacifique MASENGESHO',
      organization: 'CYPADI Ltd',
      role: 'CEO',
      phone: '+250 792 359 800',
    },
    {
      name: 'J. Luc HIRWA',
      organization: 'IPRC Tumba college',
      role: 'Lecturer',
      phone: '+250 788 274 945',
    },
  ],
  declaration:
    'I hereby declare that the information provided above is true and accurate to the best of my knowledge and belief.',
  webWork: links,
};
