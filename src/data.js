// Skills grouped by category
export const skills = [
  { category: "Backend (Java)", items: ["Java 17", "Spring Boot", "JPA", "Kafka", "REST", "Security"] },
  { category: ".NET & Mobile", items: [".NET 8", "MAUI", "MVVM", "Clean Architecture"] },
  { category: "Databases & Data", items: ["SQL Server", "Firebase", "MongoDB", "Oracle DB"] },
  { category: "DevOps", items: ["Docker", "Elastik", "Grafana", "Prometheus"] },
  { category: "Frontend", items: ["React", "Vue", "Tailwind",] },
  { category: "Tooling / IDE", items: ["Visual Studio", "VS Code", "IntelliJ IDEA", "SSMS","Git"] }
];
// Cursuri extra
export const courses = [
  {
    title: "Software Engineering Career Program - Digital Stack",
    description: "Hands-on training in algorithms, data structures, and interview techniques using Java",
    stack: [
      { name: "Java", icon: "FaJava", color: "#f89820" },
      { name: "Spring Boot", icon: "SiSpringboot", color: "#6db33f" }
      
    ],
    period: "09/2023 – 11/2023"
  },
  {
    title: "{Dev} School – Java League",
    description: "I enhanced my expertise in Java, Docker, Unit Testing and the Spring Framework, particularly in Spring Boot, Spring REST, Spring Data and Spring Security.",
    stack: [
      { name: "Java", icon: "FaJava", color: "#f89820" },
      { name: "Spring", icon: "SiSpring", color: "#6db33f" },
      { name: "Docker", icon: "SiDocker", color: "#2496ed" }
    ],
    period: "04/2025 - 06/2025"
  }
];
// Tooling/IDE skills
export const toolingSkills = [
  { name: "Visual Studio", icon: "SiVisualstudio", color: "#5c2d91" },
  { name: "IntelliJ IDEA", icon: "SiIntellijidea", color: "#000000" },
  { name: "VS Code", icon: "SiVscode", color: "#007acc" }
];
// src/data.js

export const projects = [
  {
    title: "Course Management Backend App",
    tags: ["Spring Boot", "Spring Security", "Spring Data", "REST Api"],
    link: "https://github.com/dejanmarius/ING-Devschool-Course-Management-Project",
    description: "I developed with a colleague at {Dev} School a Spring Boot backend application for university course management, designing RESTful APIs for courses, teacher, and student enrollments, and integrated security features using Spring Security.",
    year: 2025
  },
  {
    title: "RateFlix",
    tags: ["Vue", "Node.JS", "Firebase"],
    link: "https://github.com/dejanmarius/RateFlix",
  description: "Developed RateFlix, an IMDb-like movie rating platform that enables users to browse, rate, and review movies with a dynamic, interactive experience.",
    year: 2024
  },
  {
    title: "Job Journey",
    tags: ["React", "Node.JS", "MongoDB", "Tailwind CSS"],
    link: "https://github.com/dejanmarius/Job-Journey",
  description: "Developed a recruitment platform with two user interfaces (for employers and job seekers). Integrated Cloudinary for image and CV file storage, EmailJS for automated acceptance/rejection emails, and the OpenAI API for automatic job description generation.",
    year: 2024
  }
];

export const experience = [
  {
    role: "Java Software Engineer",
    company: "ING Hubs",
    period: "2025 August — prezent",
    technologies: [
      { name: "Java", icon: "FaJava", color: "#f89820" },
      { name: "Spring Boot", icon: "SiSpringboot", color: "#6db33f" },
      { name: "Kafka", icon: "SiApachekafka", color: "#231f20" },
      { name: "Maven", icon: "SiApachemaven", color: "#c71a36" },
      { name: "Oracle DB", icon: "SiOracle", color: "#f80000" }
    ],
    bullets: [
      "Developed and maintained Java microservices with Spring Boot, Kafka, and Oracle, focusing on clean code and scalability.",
      "Wrote unit and integration tests, participated in code reviews, and improved code quality across the team.",
      "Investigated and resolved production incidents, collaborating with colleagues to ensure system reliability.",
      "Worked in distributed teams, shared knowledge, and contributed to backend best practices."
    ]
  },
  {
    company: "Societatea Națională de Informatică SA",
    roles: [
      
      {
        role: "Software Developer",
        period: "04/2025 — 07/2025",
        technologies: [
          { name: "", icon: "TbBrandCSharp", color: "#9B4F96" },
          { name: "", icon: "SiDotnet", color: "#512BD4" },
          { name: "SQL Server", icon: "DiMsqlServer", color: "#CC2927" },
          { name: "Visual Studio ", icon: "DiVisualstudio", color: "#5C2D91" }
        ],
        bullets: [
          "Developed and maintained desktop applications using WinForms",
          "Used LINQ to efficiently query and manipulate data in C# applications, improving readability and performance of data-related operations",
          "Collaborated with QA and stakeholders to clarify requirements, troubleshoot issues, and deliver timely updates.",
          "Experience working in Agile teams with daily stand-ups and sprint ceremonies"
        ]
      },
      {
        role: "Software Tester",
        period: "07/2023 — 03/2025",
        bullets: [
          "Designed and executed detailed test cases, identifying and prioritizing defects based on severity and business impact",
          "Collaborated closely with development teams to diagnose and resolve issues, significantly improving application stability and performance",
          "Used T-SQL to write complex queries for data validation, test automation, and data extraction, as well as to assist with data migration and integration across systems, ensuring accuracy and consistency",
          "Created unit tests using tSQLt to validate payroll calculation procedures and contributed to the improvement of test coverage",
          "Provided technical training and support for operators, helping them understand system functionalities and use the software effectively"
        ]
      }
    ]
  }
];

export const education = [
  {
    name: "Mathematics-Informatics",
    org: "Ferdinand I National College",
    period: "09/2017 — 07/2021",
    city: { name: "Bacău", icon: "MapPin" }
  },
  {
    name: "Bachelor’s Degree in Economic Informatics",
    org: "Faculty of Economic Cybernetics, Statistics and Informatics",
    period: "10/2021 — 07/2024",
    city: { name: "București", icon: "MapPin" }
  },
  {
    name: "Master’s Degree in E-Business",
    org: "Faculty of Economic Cybernetics, Statistics and Informatics",
    period: "10/2024 — 07/2026",
    inProgress: true,
    city: { name: "București", icon: "MapPin" }
  }
];
