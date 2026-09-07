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
};
