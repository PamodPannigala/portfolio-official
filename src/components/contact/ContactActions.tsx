import React, { useState } from 'react';
import { Mail, Linkedin, Github, Check, Copy } from 'lucide-react';
import { ActiveContactChannel } from './SignalConvergenceVisual';

interface ContactActionsProps {
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  onHoverChannel: (channel: ActiveContactChannel) => void;
}

export const ContactActions: React.FC<ContactActionsProps> = ({
  email,
  linkedinUrl,
  githubUrl,
  onHoverChannel,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 w-full max-w-lg">
      {/* 1. Primary Action: EMAIL ME */}
      <div
        onMouseEnter={() => onHoverChannel('email')}
        onMouseLeave={() => onHoverChannel(null)}
        className="group relative w-full flex items-center justify-between p-4 sm:p-4.5 rounded-xl border border-accent-cyan/35 bg-accent-cyan/[0.04] hover:bg-accent-cyan/[0.08] hover:border-accent-cyan/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,240,255,0.03)]"
      >
        <a
          href={`mailto:${email}`}
          className="flex-1 flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-md"
          aria-label={`Send email to ${email}`}
        >
          <div className="w-8 h-8 rounded-lg bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan group-hover:scale-105 transition-transform">
            <Mail className="w-4 h-4" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-[13px] font-bold tracking-wider text-white group-hover:text-accent-cyan uppercase transition-colors">
                EMAIL ME
              </span>
              <span className="font-mono text-xs text-accent-cyan transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                ↗
              </span>
            </div>
            <span className="font-mono text-[11px] sm:text-xs text-text-secondary/80 group-hover:text-text-primary transition-colors">
              {email}
            </span>
          </div>
        </a>

        {/* Copy Email Button */}
        <button
          type="button"
          onClick={handleCopyEmail}
          aria-label="Copy email address to clipboard"
          title="Copy email to clipboard"
          className="relative px-2.5 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all text-[11px] font-mono flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-accent-cyan"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-slate-400 group-hover:text-white" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Secondary Social Actions: LINKEDIN & GITHUB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 w-full">
        {/* LinkedIn */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => onHoverChannel('linkedin')}
          onMouseLeave={() => onHoverChannel(null)}
          className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04] hover:border-accent-cyan/30 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent-cyan"
          aria-label="Visit LinkedIn Profile"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-text-secondary group-hover:text-accent-cyan transition-colors">
              <Linkedin className="w-3.5 h-3.5" />
            </div>
            <span className="font-mono text-xs font-semibold tracking-wider text-slate-200 group-hover:text-white uppercase">
              LINKEDIN
            </span>
          </div>
          <span className="font-mono text-xs text-text-secondary/70 group-hover:text-accent-cyan transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>

        {/* GitHub */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => onHoverChannel('github')}
          onMouseLeave={() => onHoverChannel(null)}
          className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04] hover:border-accent-cyan/30 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent-cyan"
          aria-label="Visit GitHub Profile"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-text-secondary group-hover:text-accent-cyan transition-colors">
              <Github className="w-3.5 h-3.5" />
            </div>
            <span className="font-mono text-xs font-semibold tracking-wider text-slate-200 group-hover:text-white uppercase">
              GITHUB
            </span>
          </div>
          <span className="font-mono text-xs text-text-secondary/70 group-hover:text-accent-cyan transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>
    </div>
  );
};
