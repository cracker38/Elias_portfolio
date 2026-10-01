import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { db } from '../config/db.js';
import { userModel } from '../models/userModel.js';
import { projectModel } from '../models/projectModel.js';
import { skillModel } from '../models/skillModel.js';
import { educationModel } from '../models/educationModel.js';
import { certificationModel } from '../models/certificationModel.js';

const projects = [
  {
    title: 'AIMHSA',
    slug: 'aimhsa',
    summary:
      'AI mental health support platform for Rwanda with multilingual conversation, counseling booking, and SMS notifications.',
    description:
      'AIMHSA is an AI-based mental health companion that combines conversational support with operational workflows for counselors and administrators. The system is built for multilingual use in Rwanda, covering English, French, Kinyarwanda, and Kiswahili.',
    problem:
      'Access to timely mental health support is limited, and people often need a first-response channel that can converse in local languages and connect them to a counselor.',
    solution:
      'A Python-based assistant with chatbot support, counselor and admin dashboards, automated session booking, and SMS delivery through HDEV.',
    architecture:
      'Python application with SQLite persistence, local inference via Ollama, counselor/admin dashboards, and an SMS gateway integration. A Docker image is published for Hugging Face Spaces deployment.',
    features: [
      'AI-powered mental health chatbot',
      'Automated therapy session booking',
      'SMS notifications',
      'Counselor and admin dashboards',
      'Multilingual support: English, French, Kinyarwanda, Kiswahili',
    ],
    challenges:
      'Balancing conversational usefulness with responsible handling of sensitive topics, and supporting multiple languages without overstating clinical capability.',
    lessons:
      'Mental health products need clear scope, human escalation paths, and infrastructure that can run locally as well as in a hosted environment.',
    technologies: ['Python', 'SQLite', 'Ollama', 'Docker', 'SMS APIs'],
    github_url: 'https://github.com/cracker38/AIMHSA',
    live_url: '',
    featured: 1,
    sort_order: 1,
  },
  {
    title: 'AI-CSGTS',
    slug: 'ai-csgts',
    summary:
      'AI-powered competency and skill-gap tracking system with role-based dashboards for employees, managers, HR, and administrators.',
    description:
      'AI-CSGTS is a workforce intelligence platform that maps employee skills against role requirements, supports training assignment, and uses optional LLM assistance for job-description analysis and coaching insights.',
    problem:
      'Organizations struggle to see where skill gaps exist across roles, and training decisions are often disconnected from actual competency data.',
    solution:
      'A modular full-stack system: Spring Boot APIs with JWT and RBAC, MySQL persistence, and React dashboards tailored to employee, manager, HR, and admin workflows.',
    architecture:
      'Java Spring Boot 3 REST API, MySQL schema, JWT authentication, and a React frontend. Optional OpenAI-compatible LLM calls for NLP on job descriptions, with heuristic fallbacks if the model is unavailable.',
    features: [
      'Role-based access for Employee, Manager, HR, and Admin',
      'Skill inventory and required-skill mapping',
      'Training programs and assignment workflow',
      'Manager auto-allocation support',
      'Optional LLM-assisted job description analysis',
    ],
    challenges:
      'Keeping authorization strict across roles while remaining usable, and designing AI features that degrade safely when an LLM is not configured.',
    lessons:
      'Workforce tools succeed when data models (users, roles, skills, training) are explicit and AI is an assistive layer rather than a single point of failure.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'React', 'JWT', 'REST APIs'],
    github_url: 'https://github.com/cracker38/AI-CSGTS',
    live_url: '',
    featured: 1,
    sort_order: 2,
  },
  {
    title: 'Crop Recommendation System',
    slug: 'crop-recommendation-system',
    summary:
      'Machine-learning crop ranking and fertilizer planning for Rwanda, delivered as a Flutter app with a FastAPI inference service.',
    description:
      'AgriSmart RW ranks crops from soil, climate, and seasonal inputs, then produces fertilizer plans and soil-health context for farmers and extension staff.',
    problem:
      'Crop and fertilizer decisions are often made with incomplete soil, climate, and seasonal information, which increases production risk.',
    solution:
      'A multi-factor recommendation pipeline: agronomic rules plus a trained scikit-learn model, exposed through FastAPI and consumed by a Flutter client with Firebase authentication.',
    architecture:
      'Flutter client (web, desktop, mobile), Firebase Auth and Firestore, Python FastAPI with scikit-learn, local SQLite backup, and Open-Meteo weather for Rwanda districts.',
    features: [
      'Ranked crop suitability from soil N-P-K, pH, moisture, and season',
      'Fertilizer planning (Urea, DAP, MOP, lime, organic)',
      'Soil health scoring and scientific reasoning text',
      'District weather forecasts',
      'Farmer and admin roles',
    ],
    challenges:
      'Combining model output with agronomic rules so recommendations remain explainable, and coordinating Flutter, FastAPI, and Firebase as one system.',
    lessons:
      'Agricultural ML is more useful when predictions are ranked, explained, and tied to practical next actions such as fertilizer plans.',
    technologies: ['Flutter', 'Python', 'FastAPI', 'scikit-learn', 'Firebase', 'SQLite'],
    github_url:
      'https://github.com/cracker38/AI-Powered-Multi-Factor-Crop-Recommendation-and-Fertilizer-System',
    live_url: '',
    featured: 1,
    sort_order: 3,
  },
  {
    title: 'AI-Powered Virtual IT Support Agent',
    slug: 'ai-powered-virtual-it-support-agent',
    summary:
      'Helpdesk platform with chat-based IT support, knowledge-base management, ticket escalation, and role-based admin tools.',
    description:
      'Built for CYPADI Ltd, this system provides conversational IT support, troubleshooting workflows, password-reset handling, ticket escalation, and analytics.',
    problem:
      'Internal IT support is often slow because common issues, knowledge, and escalation paths live in disconnected tools.',
    solution:
      'A FastAPI backend with JWT and RBAC plus a React TypeScript frontend for end-user chat and administrative operations.',
    architecture:
      'Python FastAPI REST APIs (auth, conversations, knowledge base, tickets, analytics) and a React + TypeScript SPA for chat and admin dashboards. SQLAlchemy with SQLite by default.',
    features: [
      'Chat-based IT support',
      'Knowledge base CRUD',
      'Ticket creation and escalation',
      'Password-reset workflows',
      'Admin and super-admin dashboards',
    ],
    challenges:
      'Structuring support flows so automation can handle routine issues while still escalating incomplete or high-risk cases.',
    lessons:
      'Helpdesk products need clear identity, knowledge, and ticket models before adding conversational AI on top.',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'JWT', 'SQLite'],
    github_url: 'https://github.com/cracker38/AI-Powered-Virtual-IT-Support-Agent',
    live_url: '',
    featured: 1,
    sort_order: 4,
  },
  {
    title: 'GRB-AI Navigator',
    slug: 'grb-ai-navigator',
    summary:
      'Prototype assistant for gender-responsive budgeting with dashboards, budget analysis, and explainable recommendations.',
    description:
      'GRB-AI Navigator is a Streamlit application that helps review budgets with gender and intersectionality signals, using structured sample datasets and rule-based recommendations.',
    problem:
      'Gender-responsive budgeting requires combining fragmented datasets and making budget signals understandable to non-specialist reviewers.',
    solution:
      'Interactive dashboards, a budget analyzer, a recommendation engine, and a data lab that normalizes sample datasets into a shared schema.',
    architecture:
      'Python Streamlit app with Pandas/NumPy processing and local sample datasets generated for analysis.',
    features: [
      'Gender data dashboard with intersectionality filters',
      'Budget analyzer',
      'Explainable, rule-based recommendations',
      'Simulated gender data lab',
    ],
    challenges:
      'Presenting budget and gender indicators without implying production-grade statistical certainty from prototype data.',
    lessons:
      'Policy-facing tools should make methods visible: filters, rules, and data provenance matter as much as charts.',
    technologies: ['Python', 'Streamlit', 'Pandas', 'NumPy'],
    github_url: 'https://github.com/cracker38/GRB-AI',
    live_url: '',
    featured: 0,
    sort_order: 5,
  },
  {
    title: 'Rwanda Maternal Digital Platform',
    slug: 'rwanda-maternal-digital-platform',
    summary:
      'Web platform for maternal health information and digital service workflows in Rwanda.',
    description:
      'A JavaScript web application focused on maternal health digital services, deployed as a public demo.',
    problem:
      'Maternal health information and related digital workflows are often fragmented across paper processes and disconnected tools.',
    solution:
      'A web platform that centralizes maternal-health oriented digital flows in a deployable JavaScript application.',
    architecture:
      'JavaScript web client with a public Vercel deployment. Implementation details are maintained in the GitHub repository.',
    features: [
      'Public web interface',
      'Maternal health oriented information architecture',
      'Deployed demo environment',
    ],
    challenges:
      'Keeping the product focused on useful maternal-health workflows rather than a generic informational site.',
    lessons:
      'Health-related systems should stay scoped, inspectable, and honest about what is a demo versus a clinical system.',
    technologies: ['JavaScript', 'React'],
    github_url: 'https://github.com/cracker38/Maternal',
    live_url: 'https://maternal-xi.vercel.app',
    featured: 0,
    sort_order: 6,
  },
  {
    title: 'Visit Kirehe',
    slug: 'visit-kirehe',
    summary:
      'Tourism platform for Kirehe District covering attractions, activities, accommodation, events, and trip planning.',
    description:
      'Visit Kirehe is a full-stack tourism website with a React frontend, Express API, and MySQL content for attractions, lodging, events, gallery, and contact.',
    problem:
      'District tourism information is often scattered, making it harder for visitors to discover places, stay options, and cultural events.',
    solution:
      'A content-driven tourism site with search, maps, and structured pages for planning a visit to Kirehe.',
    architecture:
      'React + Vite frontend, Node.js/Express API, and MySQL for attractions, accommodations, activities, events, gallery, and messages.',
    features: [
      'Attraction and accommodation search',
      'Interactive map',
      'Events, gallery, and travel information pages',
      'Contact and newsletter endpoints',
    ],
    challenges:
      'Structuring tourism content so it remains maintainable through a database rather than hardcoded pages.',
    lessons:
      'Content platforms need a clear data model early: places, stays, events, and messages should be first-class records.',
    technologies: ['React', 'Node.js', 'Express.js', 'MySQL', 'Vite'],
    github_url: 'https://github.com/cracker38/visitkirehe-tourismdemo',
    live_url: 'https://visitkirehe-tourismdemo.vercel.app',
    featured: 0,
    sort_order: 7,
  },
  {
    title: 'SUN CITY Nyakarambi Hotel',
    slug: 'suncity-nyakarambi-hotel',
    summary:
      'Hotel website for SUN CITY Nyakarambi with a public client experience deployed on Vercel.',
    description:
      'A JavaScript web project presenting hotel information and a public-facing client for SUN CITY Nyakarambi Hotel.',
    problem:
      'Hospitality businesses need a maintainable public site for discovery and basic guest-facing information.',
    solution:
      'A dedicated hotel web client with a live deployment for browsing the property offering.',
    architecture:
      'JavaScript web client. Source and deployment are available from the GitHub repository and Vercel host.',
    features: ['Public hotel website', 'Client deployment on Vercel'],
    challenges:
      'Keeping the site focused on real property information rather than generic hotel template copy.',
    lessons:
      'Small business sites still benefit from a clean split between content, presentation, and deployment.',
    technologies: ['JavaScript', 'React'],
    github_url: 'https://github.com/cracker38/suncity',
    live_url: 'https://suncity-client.vercel.app',
    featured: 0,
    sort_order: 8,
  },
];

const skills = [
  ['JavaScript', 'Programming', 'Production use'],
  ['Python', 'Programming', 'Production use'],
  ['Java', 'Programming', 'Project use'],
  ['React', 'Frontend', 'Production use'],
  ['HTML', 'Frontend', 'Production use'],
  ['CSS', 'Frontend', 'Production use'],
  ['Flutter', 'Frontend', 'Project use'],
  ['Node.js', 'Backend', 'Production use'],
  ['Express.js', 'Backend', 'Production use'],
  ['REST APIs', 'Backend', 'Production use'],
  ['MySQL', 'Databases', 'Project use'],
  ['SQLite', 'Databases', 'Production use'],
  ['Firebase', 'Databases', 'Project use'],
  ['Machine Learning', 'AI / Machine Learning', 'Project use'],
  ['Artificial Intelligence', 'AI / Machine Learning', 'Project use'],
  ['Data Processing', 'AI / Machine Learning', 'Project use'],
  ['Model Evaluation', 'AI / Machine Learning', 'Project use'],
  ['Cybersecurity', 'Cybersecurity', 'Foundational'],
  ['Network Security', 'Cybersecurity', 'Foundational'],
  ['Ethical Hacking', 'Cybersecurity', 'Foundational'],
  ['Security Fundamentals', 'Cybersecurity', 'Foundational'],
  ['Git', 'Tools', 'Production use'],
  ['GitHub', 'Tools', 'Production use'],
  ['VS Code', 'Tools', 'Daily use'],
  ['Linux', 'Tools', 'Working knowledge'],
];

export async function seedIfEmpty() {
  const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;
  if (userCount === 0) {
    const password_hash = await bcrypt.hash(env.adminPassword, 12);
    userModel.create({ email: env.adminEmail.toLowerCase(), password_hash, role: 'admin' });
  }

  if (db.prepare('SELECT COUNT(*) AS count FROM projects').get().count === 0) {
    for (const project of projects) {
      projectModel.create(project);
    }
  }

  if (db.prepare('SELECT COUNT(*) AS count FROM skills').get().count === 0) {
    skills.forEach((skill, index) => {
      skillModel.create({
        name: skill[0],
        category: skill[1],
        proficiency: skill[2],
        sort_order: index,
      });
    });
  }

  if (db.prepare('SELECT COUNT(*) AS count FROM education').get().count === 0) {
    educationModel.create({
      program: 'Bachelor / BTech in Information and Communication Technology',
      institution: 'RP Musanze College',
      period: '2026–2027',
      status: 'Ongoing',
      details:
        'Undergraduate ICT program covering software development, systems, and applied digital technologies.',
      sort_order: 1,
    });
  }

  if (db.prepare('SELECT COUNT(*) AS count FROM certifications').get().count === 0) {
    certificationModel.create({
      name: 'Introduction to Cybersecurity',
      issuer: 'Cisco Networking Academy',
      issued_on: '',
      credential: 'Update credential ID in the admin dashboard if available.',
      url: '',
      sort_order: 1,
    });
    certificationModel.create({
      name: 'Ethical Hacker',
      issuer: 'Cisco Networking Academy',
      issued_on: '',
      credential: 'Update credential ID in the admin dashboard if available.',
      url: '',
      sort_order: 2,
    });
  }
}
