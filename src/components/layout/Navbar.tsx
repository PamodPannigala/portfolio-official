import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useAppRoute } from '@/context/RouteContext';

export const Navbar: React.FC = () => {
  const isScrolled = useScrollPosition(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { isProjectsArchive, isCertificationsArchive, navigate } = useAppRoute();
  const isArchive = isProjectsArchive || isCertificationsArchive;

  // Active section tracking for homepage scroll-spy
  const [activeSection, setActiveSection] = useState<string>('#home');

  // Ref tracking for moving underline indicator
  const navListRef = useRef<HTMLUListElement | null>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Close mobile drawer on Escape key or window resize to desktop
  useEffect(() => {
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

  // Scroll-spy active section detection
  useEffect(() => {
    if (isArchive) {
      if (isProjectsArchive) {
        setActiveSection('#projects');
      } else {
        setActiveSection('');
      }
      return;
    }

    const sectionIds = ['home', 'about', 'projects', 'experience', 'contact'];

    const handleScrollSpy = () => {
      const scrollY = window.scrollY;
      const offset = 200; // Visual viewport threshold

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop - offset;
          if (scrollY >= top) {
            setActiveSection(`#${sectionIds[i]}`);
            return;
          }
        }
      }
      setActiveSection('#home');
    };

    handleScrollSpy();
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [isArchive, isProjectsArchive]);

  // Recalculate moving underline position
  const updateIndicatorPosition = useCallback(() => {
    const container = navListRef.current;
    const targetLink = linkRefs.current[activeSection];

    if (container && targetLink) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetLink.getBoundingClientRect();

      setIndicatorStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  useEffect(() => {
    updateIndicatorPosition();
    window.addEventListener('resize', updateIndicatorPosition);
    return () => window.removeEventListener('resize', updateIndicatorPosition);
  }, [updateIndicatorPosition]);

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
      setActiveSection(href);
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
      setActiveSection('#home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/90 backdrop-blur-md border-b border-white/[0.06] py-3.5 shadow-lg shadow-black/30'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Name Logo */}
        <a
          href="/"
          onClick={handleBrandClick}
          className="group flex items-center gap-2.5 text-text-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan rounded-md"
          aria-label="Pamod Pannigala Portfolio Home"
        >
          <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_6px_#38bdf8] transition-transform duration-300 group-hover:scale-110" />
          <span className="font-display font-bold text-lg tracking-wider text-white group-hover:text-accent-cyan transition-colors duration-300">
            {PORTFOLIO_DATA.brandName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-9" aria-label="Main Navigation">
          <ul
            ref={navListRef}
            className="relative flex items-center space-x-7 lg:space-x-8"
          >
            {PORTFOLIO_DATA.navLinks.map((link) => {
              const isCurrentActive = isArchive
                ? isProjectsArchive && link.name === 'Projects'
                : activeSection === link.href;

              return (
                <li key={link.name} className="relative">
                  <a
                    ref={(el) => {
                      linkRefs.current[link.href] = el;
                    }}
                    href={isArchive && !isCurrentActive ? `/${link.href}` : link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.name)}
                    aria-current={isCurrentActive ? 'page' : undefined}
                    className={`relative inline-block font-body text-sm tracking-normal transition-colors duration-200 py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan rounded ${
                      isCurrentActive
                        ? 'text-white font-medium'
                        : 'text-slate-400 hover:text-slate-100 font-normal'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}

            {/* Smooth Moving Underline Active Indicator */}
            <span
              className="absolute -bottom-1 h-[2px] bg-accent-cyan shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-300 ease-out pointer-events-none rounded-full"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
              aria-hidden="true"
            />
          </ul>

          {/* Social Links */}
          <div className="flex items-center space-x-3.5 pl-5 border-l border-white/[0.08]">
            {PORTFOLIO_DATA.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-slate-400 hover:text-accent-cyan transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan rounded p-1"
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
            className="p-2 text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-md focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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
          className="md:hidden bg-[#050b14]/98 backdrop-blur-xl border-b border-white/[0.08] px-4 pt-3 pb-6 space-y-4 shadow-2xl transition-all duration-300"
        >
          <ul className="flex flex-col space-y-1">
            {PORTFOLIO_DATA.navLinks.map((link) => {
              const isCurrentActive = isArchive
                ? isProjectsArchive && link.name === 'Projects'
                : activeSection === link.href;

              return (
                <li key={link.name}>
                  <a
                    href={isArchive && !isCurrentActive ? `/${link.href}` : link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.name)}
                    className={`flex items-center min-h-[44px] font-body text-base px-3 rounded-lg transition-colors ${
                      isCurrentActive
                        ? 'text-accent-cyan font-medium border-l-2 border-accent-cyan pl-2.5 bg-accent-cyan/[0.04]'
                        : 'font-normal text-slate-300 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="pt-3 border-t border-white/[0.08] flex items-center space-x-6 px-3">
            {PORTFOLIO_DATA.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 min-h-[44px] text-sm text-slate-300 hover:text-accent-cyan transition-colors"
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

