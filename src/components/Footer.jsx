import React from 'react';
import { Instagram, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-chardonnay/20 dark:border-twine/30 bg-gradient-to-r from-saddle via-black to-saddle text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">Todo Manager</h3>
            <div className="space-y-3 max-w-xl">
              <p className="text-white/90 text-lg font-medium">
                Your Personal Productivity Companion
              </p>
              <p className="text-white/80 leading-relaxed">
                Transform your daily workflow with our intuitive task management system. 
                Organize, prioritize, and track your progress with beautiful, responsive design 
                that adapts to your preferences.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-eastern-blue rounded-full"></span>
                  Real-time Sync
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-chardonnay rounded-full"></span>
                  Dark/Light Mode
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-logan rounded-full"></span>
                  Secure & Private
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white/90 mb-3">Connect</h4>
            <div className="flex flex-col items-start gap-3">
              <a
                href="https://www.instagram.com/akkhilll_09.__/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-white/90"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
                <span className="text-sm">Instagram</span>
              </a>
              <a
                href="mailto:akhilkumarreddyseelam@gmail.com"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-white/90"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
                <span className="text-sm">Gmail</span>
              </a>
              <a
                href="https://www.linkedin.com/in/akhil-kumar-reddy-seelam-1241402b3/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-white/90"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/80">© {new Date().getFullYear()} Todo Manager. All rights reserved.</p>
            <p className="text-xs text-white/60">Built with React, Tailwind CSS & Supabase</p>
          </div>
          <p className="mt-3 text-xs text-white/60 leading-relaxed">
            This system routes you to official web profiles for updates and support. By using this site you agree to our basic terms of use and privacy guidelines. 
            Your data is securely stored and never shared with third parties.
          </p>
          
          {/* Made with love section */}
          <div className="mt-6 pt-4 border-t border-white/5">
            <p className="text-center text-sm text-white/70">
              Made with <span className="text-red-400">❤️</span> and lots of <span className="text-eastern-blue">☕</span> by{' '}
              <span className="text-chardonnay font-medium">Akhil Kumar Reddy Seelam</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


