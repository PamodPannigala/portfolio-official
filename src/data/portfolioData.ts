export interface NavLink {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin';
}

export interface ProjectCapability {
  index: string;
  title: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  navLabel: string;
  shortLabel?: string;
  conceptPhase: string;
  conceptLabel?: string;
  category: string;
  categories: string[];
  title: string;
  fullTitle: string;
  date: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  capabilities: ProjectCapability[];
  githubUrl?: string;
  caseStudyUrl?: string | null;
  featured: boolean;
  visualType?: 'campus' | 'f1' | 'service' | string;
}

export interface ProjectsArchiveData {
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  supportingLine: string;
}

export interface ExperienceContextArea {
  id: string;
  step: string;
  title: string;
  shortTitle: string;
  descriptor: string;
  highlight: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  team: string;
  type: string;
  period: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  workMode: string;
  summary: string;
  contextTags: string[];
  contextAreas: ExperienceContextArea[];
  logoText: string;
}

export interface ExperienceSectionData {
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  supportingLine: string;
  chapterLabel: string;
  chapterPeriod: string;
  experiences: ExperienceItem[];
}

export interface TechnologyItem {
  id: string;
  name: string;
  category: string;
  relationshipHint?: string;
}

export interface TechLane {
  id: string;
  index: string;
  title: string;
  descriptor: string;
  motifType: 'analytics' | 'pipeline' | 'fullstack' | 'databases';
  technologies: TechnologyItem[];
}

export interface TechStackSectionData {
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  supportingLine: string;
  lanes: TechLane[];
  workflowTools: TechnologyItem[];
}

export interface ProjectsSectionData {
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  supportingLine: string;
  projects: ProjectItem[];
}

export const PORTFOLIO_DATA = {
  name: "Pamod Pannigala",
  brandName: "PAMOD PANNIGALA",
  title: "Intern AI/ML Engineer",
  badgeText: "Data Science Undergraduate",
  tagline: "''Turning data into meaningful insights and intelligent solutions.''",
  aboutBrief: "Focused on machine learning, predictive modeling, data visualization, and intelligent web applications.",

  navLinks: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ] as NavLink[],

  socialLinks: [
    { name: "GitHub", url: "https://github.com/PamodPannigala", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/pamod-pannigala-b24a3a23b", icon: "linkedin" },
  ] as SocialLink[],

  cta: {
    primary: { text: "View Projects", href: "#projects" },
    secondary: { text: "Contact Me", href: "#contact" },
    download: { text: "Download CV", href: "#" },
  },

  about: {
    sectionLabel: "ABOUT / 01",
    headingLine1: "I turn data into",
    headingLine2: "decisions that matter.",
    concept: "From raw data to meaningful decisions.",
    intro:
      "I'm a Data Science undergraduate focused on turning complex data into practical insights and intelligent solutions. My interests span machine learning, applied AI, analytics, and real-world problem solving.",
    dataFlowStages: [
      {
        id: "data",
        step: "01",
        name: "DATA",
        role: "Raw Inputs & Exploration",
        coord: "inputs",
        desc: "Ingesting, cleaning, and understanding foundational data inputs",
        detail: "Gathering and exploring foundational data without bias.",
      },
      {
        id: "pattern",
        step: "02",
        name: "PATTERN",
        role: "Structure, Trends & Relationships",
        coord: "features",
        desc: "Identifying distributions, correlations, and key variables",
        detail: "Discovering correlations and natural clusters in high-dimensional data.",
      },
      {
        id: "model",
        step: "03",
        name: "MODEL",
        role: "Learning, Prediction & Evaluation",
        coord: "f(x) → ŷ",
        desc: "Training, evaluating, and validating machine learning models",
        detail: "Training, evaluating and validating predictive systems.",
      },
      {
        id: "insight",
        step: "04",
        name: "INSIGHT",
        role: "Interpretation & Understanding",
        coord: "inference",
        desc: "Translating model outputs into clear, understandable findings",
        detail: "Extracting clear, interpretable signals from complex model behavior.",
      },
      {
        id: "decision",
        step: "05",
        name: "DECISION",
        role: "Actionable Outcomes",
        coord: "impact",
        desc: "Applying insights to solve real-world problems effectively",
        detail: "Transforming verified evidence into practical, high-impact action.",
      },
    ],
    focusAreas: [
      {
        id: "01",
        title: "Web Development",
        subtitle: "Full-stack Web Apps & APIs",
        secondaryPhrase: "Digital Products",
      },

      {
        id: "02",
        title: "AI / Machine Learning",
        subtitle: "Models & Applied AI",
        secondaryPhrase: "Intelligent Systems",
      },

      {
        id: "03",
        title: "Data Analysis",
        subtitle: "Insights & Visualization",
        secondaryPhrase: "Better Decisions",
      },

      {
        id: "04",
        title: "Data Engineering",
        subtitle: "Pipelines & Data Systems",
        secondaryPhrase: "Reliable Foundations",
      },
    ],
  },

  projectsSection: {
    sectionLabel: "SELECTED WORK / 02",
    headingLine1: "From systems",
    headingLine2: "to insight.",
    supportingLine: "Selected work across intelligent applications, data engineering and analytical problem solving.",
    projects: [
      {
        id: "01",
        slug: "smart-campus-hub",
        navLabel: "CAMPUS OPERATIONS",
        shortLabel: "Campus Operations",
        conceptPhase: "BUILD",
        conceptLabel: "BUILD",
        category: "FULL-STACK · APPLIED AI",
        categories: ["Full-Stack", "AI / ML"],
        title: "Smart Campus Operations Hub",
        fullTitle: "Smart Campus Operations Hub – Facilities and Assets Management Module",
        date: "Mar — Apr 2026",
        description:
          "A full-stack campus resource management system combining asset tracking, operational analytics, reporting, and AI-assisted equipment health insights.",
        shortDescription:
          "A full-stack campus resource management system combining QR asset tracking, operational analytics, and AI equipment health scoring.",
        technologies: ["React", "Java", "Spring Boot", "MySQL", "REST API"],
        capabilities: [
          { index: "01", title: "Asset Search & Filtering" },
          { index: "02", title: "Operational Analytics" },
          { index: "03", title: "QR Asset Tracking" },
          { index: "04", title: "Equipment Health Scoring" },
        ],
        githubUrl: "https://github.com/PamodPannigala",
        caseStudyUrl: null,
        featured: true,
        visualType: "campus",
      },
      {
        id: "02",
        slug: "f1-analytics-warehouse",
        navLabel: "F1 ANALYTICS",
        shortLabel: "F1 Analytics",
        conceptPhase: "ENGINEER",
        conceptLabel: "ENGINEER",
        category: "DATA ENGINEERING · BUSINESS INTELLIGENCE",
        categories: ["Data Engineering", "Business Intelligence"],
        title: "Formula 1 Analytics Warehouse",
        fullTitle: "Formula 1 Racing Data Warehouse, SSAS Cube, and Power BI Report",
        date: "Jan — Jun 2026",
        description:
          "An end-to-end Formula 1 analytics platform built around ETL pipelines, dimensional modeling, OLAP analysis, and interactive business intelligence reporting.",
        shortDescription:
          "An end-to-end Formula 1 analytics platform featuring SSIS ETL pipelines, star schema warehouse, SSAS OLAP cubes, and Power BI dashboards.",
        technologies: ["SQL", "SSIS", "SSAS", "Power BI", "Excel"],
        capabilities: [
          { index: "01", title: "ETL Pipeline Design" },
          { index: "02", title: "Dimensional Modeling" },
          { index: "03", title: "OLAP Cube Architecture" },
          { index: "04", title: "Analytical Dashboards" },
        ],
        githubUrl: "https://github.com/PamodPannigala",
        caseStudyUrl: null,
        featured: true,
        visualType: "f1",
      },
      {
        id: "03",
        slug: "accommodation-service-quality",
        navLabel: "SERVICE QUALITY",
        shortLabel: "Service Quality",
        conceptPhase: "ANALYZE",
        conceptLabel: "ANALYZE",
        category: "DATA ANALYSIS · STATISTICS",
        categories: ["Data Analysis", "Statistics"],
        title: "Accommodation Service Quality Analysis",
        fullTitle: "Accommodation Service Quality Analysis Using R",
        date: "Jan — Jun 2026",
        description:
          "A statistical investigation of accommodation service quality using exploratory analysis, hypothesis testing, and regression to identify factors associated with customer satisfaction.",
        shortDescription:
          "An empirical statistical study using exploratory analysis, hypothesis testing, and regression modeling to isolate accommodation satisfaction drivers.",
        technologies: ["R", "RStudio", "Excel"],
        capabilities: [
          { index: "01", title: "Data Validation" },
          { index: "02", title: "Correlation Analysis" },
          { index: "03", title: "Hypothesis Testing" },
          { index: "04", title: "Regression Modeling" },
        ],
        githubUrl: "https://github.com/PamodPannigala",
        caseStudyUrl: null,
        featured: true,
        visualType: "service",
      },
    ],
  },

  projectsArchive: {
    sectionLabel: "PROJECTS / ARCHIVE",
    headingLine1: "All work.",
    headingLine2: "Built across systems, data & intelligence.",
    supportingLine:
      "A growing collection of projects across full-stack development, AI/ML, data engineering, analytics, and statistical problem solving.",
  },

  experienceSection: {
    sectionLabel: "EXPERIENCE / 03",
    headingLine1: "Building experience where",
    headingLine2: "AI meets the real world.",
    supportingLine:
      "Hands-on exposure to AI/ML, data science, and enterprise technology within SLT-MOBITEL's Digital Lab.",
    chapterLabel: "CURRENT CHAPTER",
    chapterPeriod: "2026 — PRESENT",
    experiences: [
      {
        id: "01",
        role: "AI/ML Engineer Intern",
        company: "SLT-MOBITEL",
        team: "Digital Lab",
        type: "Internship",
        period: "Aug 2026 — Present",
        startDate: "Aug 2026",
        endDate: "Present",
        current: true,
        location: "Colombo, Sri Lanka",
        workMode: "On-site",
        summary:
          "Gaining hands-on exposure to AI/ML through technical training, enterprise technology, and supervised work within the Digital Lab.",
        contextTags: ["Machine Learning", "Data Science", "Enterprise IT"],
        contextAreas: [
          {
            id: "ai-ml",
            step: "01",
            title: "AI / ML TRAINING",
            shortTitle: "AI & Machine Learning Technologies",
            descriptor:
              "Training activities related to AI and machine learning technologies.",
            highlight: "AI & Machine Learning Technologies",
          },
          {
            id: "data-science",
            step: "02",
            title: "DATA SCIENCE",
            shortTitle: "Data-Oriented Practical Exposure",
            descriptor:
              "Developing practical exposure to data-oriented and intelligent problem solving.",
            highlight: "Data-Oriented Practical Exposure",
          },
          {
            id: "enterprise-it",
            step: "03",
            title: "ENTERPRISE IT",
            shortTitle: "Enterprise IT Environment",
            descriptor:
              "Exposure to AI technologies within an enterprise IT environment.",
            highlight: "Enterprise IT Environment",
          },
          {
            id: "technical-work",
            step: "04",
            title: "TECHNICAL WORK",
            shortTitle: "Assigned IT Tasks",
            descriptor:
              "Assigned IT-related work carried out under Digital Lab supervision.",
            highlight: "Assigned IT Tasks",
          },
        ],
        logoText: "SLT-MOBITEL",
      },
    ],
  } as ExperienceSectionData,

  techStackSection: {
    sectionLabel: "TECH STACK / 04",
    headingLine1: "Tools behind",
    headingLine2: "the work.",
    supportingLine:
      "A focused toolkit across data, engineering and full-stack development.",
    lanes: [
      {
        id: "data-analytics",
        index: "01",
        title: "DATA & ANALYTICS",
        descriptor: "Analysis · Visualization · Statistics",
        motifType: "analytics",
        technologies: [
          { id: "python", name: "Python", category: "Data & Analytics", relationshipHint: "Data → Statistical Modeling" },
          { id: "r", name: "R", category: "Data & Analytics", relationshipHint: "Exploratory Analysis → Hypothesis Testing" },
          { id: "sql", name: "SQL", category: "Data & Analytics", relationshipHint: "Querying → Relational Extraction" },
          { id: "power-bi", name: "Power BI", category: "Data & Analytics", relationshipHint: "Analytical Dashboards → Business Intelligence" },
          { id: "excel", name: "Microsoft Excel", category: "Data & Analytics", relationshipHint: "Modeling → Quantitative Worksheets" },
        ],
      },
      {
        id: "data-engineering",
        index: "02",
        title: "DATA ENGINEERING & BI",
        descriptor: "Pipelines · Warehousing · OLAP",
        motifType: "pipeline",
        technologies: [
          { id: "sql-server", name: "SQL Server", category: "Data Engineering & BI", relationshipHint: "Enterprise Relational Engine → Star Schema" },
          { id: "ssis", name: "SSIS", category: "Data Engineering & BI", relationshipHint: "Automated ETL Pipeline → Data Flows" },
          { id: "ssas", name: "SSAS", category: "Data Engineering & BI", relationshipHint: "Multi-dimensional OLAP Cubes → Hierarchies" },
          { id: "etl", name: "ETL", category: "Data Engineering & BI", relationshipHint: "Extract → Transform → Load Pipeline" },
        ],
      },
      {
        id: "full-stack",
        index: "03",
        title: "FULL-STACK DEVELOPMENT",
        descriptor: "Interfaces · APIs · Backend Systems",
        motifType: "fullstack",
        technologies: [
          { id: "react", name: "React", category: "Full-Stack Development", relationshipHint: "Frontend UI → Component Architecture" },
          { id: "java", name: "Java", category: "Full-Stack Development", relationshipHint: "Object-Oriented Core → Enterprise Backend" },
          { id: "spring-boot", name: "Spring Boot", category: "Full-Stack Development", relationshipHint: "REST APIs → Microservice Infrastructure" },
          { id: "node-js", name: "Node.js", category: "Full-Stack Development", relationshipHint: "Server-side Runtime → Asynchronous Services" },
        ],
      },
      {
        id: "databases",
        index: "04",
        title: "DATABASES",
        descriptor: "Relational · NoSQL",
        motifType: "databases",
        technologies: [
          { id: "mysql", name: "MySQL", category: "Databases", relationshipHint: "Relational Storage → ACID Integrity" },
          { id: "mongodb", name: "MongoDB", category: "Databases", relationshipHint: "Document Store → Flexible Schema" },
        ],
      },
    ],
    workflowTools: [
      { id: "git", name: "Git", category: "Tools / Workflow", relationshipHint: "Version Control" },
      { id: "github", name: "GitHub", category: "Tools / Workflow", relationshipHint: "Repository & Collaboration" },
      { id: "postman", name: "Postman", category: "Tools / Workflow", relationshipHint: "API Testing & Validation" },
    ],
  } as TechStackSectionData,
};
