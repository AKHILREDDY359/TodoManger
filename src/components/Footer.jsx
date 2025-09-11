import React from 'react';
import { Instagram, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200/40 dark:border-gray-700 bg-gradient-to-r from-slate-900 via-gray-900 to-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Todo Manager</h3>
            <p className="text-white/80 max-w-xl">
              Stay organized and productive. Manage tasks seamlessly in light or dark mode.
            </p>
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
            <p className="text-xs text-white/60">Built with React & Tailwind CSS</p>
          </div>
          <p className="mt-3 text-xs text-white/60">
            This system routes you to official web profiles for updates and support. By using this site you agree to our basic terms of use and privacy guidelines.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


