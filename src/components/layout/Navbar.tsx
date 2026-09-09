import React, { useState } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useAppRoute } from '@/context/RouteContext';

export const Navbar: React.FC = () => {
  const isScrolled = useScrollPosition(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { isProjectsArchive, isCertificationsArchive, navigate } = useAppRoute();
  const isArchive = isProjectsArchive || isCertificationsArchive;

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Close mobile drawer on Escape key or window resize to desktop
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    e.preventDefault();
    closeMobileMenu();

    if (isArchive) {
      if (isProjectsArchive && name === 'Projects') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      navigate(href);
    } else {
      if (href.startsWith('#')) {
        const id = href.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        navigate(href);
      }
    }
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMobileMenu();
    if (isArchive) {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-deep-space/85 backdrop-blur-md border-b border-navy-border py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Name Logo */}
        <a
          href="/"
          onClick={handleBrandClick}
          className="group flex items-center gap-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan rounded-md"
          aria-label="Pamod Pannigala Portfolio Home"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_#38bdf8]" />
          <span className="font-display font-bold text-lg tracking-wider text-text-primary group-hover:text-accent-cyan transition-colors duration-300">
            {PORTFOLIO_DATA.brandName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          <ul className="flex items-center space-x-6">
            {PORTFOLIO_DATA.navLinks.map((link) => {
              const isProjectsLink = link.name === 'Projects';
              const isActive = isProjectsArchive && isProjectsLink;

              return (
                <li key={link.name}>
                  <a
                    href={isArchive && !isActive ? `/${link.href}` : link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.name)}
                    className={`inline-block font-body text-sm transition-all duration-300 ease-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent-cyan rounded px-2 py-1 ${
                      isActive
                        ? 'text-accent-cyan font-semibold'
                        : 'font-medium text-text-secondary hover:text-accent-cyan'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Social Links */}
          <div className="flex items-center space-x-4 pl-4 border-l border-navy-border">
            {PORTFOLIO_DATA.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-text-secondary hover:text-accent-cyan transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent-cyan rounded p-1.5"
                aria-label={social.name}
              >
                {social.icon === 'github' && <Github className="w-4 h-4" />}
                {social.icon === 'linkedin' && <Linkedin className="w-4 h-4" />}
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-navy-card rounded-md focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-accent-cyan" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-label="Mobile Navigation"
          className="md:hidden bg-navy-card/95 backdrop-blur-xl border-b border-navy-border px-4 pt-3 pb-6 space-y-4 shadow-2xl transition-all duration-300"
        >
          <ul className="flex flex-col space-y-1">
            {PORTFOLIO_DATA.navLinks.map((link) => {
              const isProjectsLink = link.name === 'Projects';
              const isActive = isProjectsArchive && isProjectsLink;

              return (
                <li key={link.name}>
                  <a
                    href={isArchive && !isActive ? `/${link.href}` : link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.name)}
                    className={`flex items-center min-h-[44px] font-body text-base px-3 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors ${
                      isActive
                        ? 'text-accent-cyan font-semibold'
                        : 'font-medium text-text-secondary hover:text-accent-cyan'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="pt-3 border-t border-navy-border flex items-center space-x-6 px-3">
            {PORTFOLIO_DATA.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 min-h-[44px] text-sm text-text-secondary hover:text-accent-cyan transition-colors"
                aria-label={social.name}
              >
                {social.icon === 'github' && <Github className="w-5 h-5" />}
                {social.icon === 'linkedin' && <Linkedin className="w-5 h-5" />}
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
