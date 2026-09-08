export interface NavLink {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin';
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
};
