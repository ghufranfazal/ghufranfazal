/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink, 
  Code2, 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  ChevronRight,
  Menu,
  X,
  ArrowUp,
  Wallet,
  Shield,
  Trash2,
  Key,
  Search,
  Grid,
  Layers,
  MessageSquare,
  Moon,
  Sun
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { 
  ABOUT_ME, 
  CONTACT_INFO, 
  OTHER_SKILLS, 
  PROJECTS, 
  SKILL_ICONS, 
  TIMELINE 
} from './constants.ts';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
    }
  }, []);

  // Update theme class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Toggle scroll to top button
      setShowScrollTop(window.scrollY > 500);

      const sections = ['about', 'projects', 'vision', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 font-sans`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-xl font-bold tracking-tighter cursor-pointer ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
              onClick={() => scrollTo('home')}
            >
              GHUFRAN FAZAL
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {['About', 'Projects', 'Vision', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    activeSection === item.toLowerCase() ? 'text-blue-600' : isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {item}
                </button>
              ))}
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-all hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <a 
                href="/resume.pdf" 
                download 
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm ${isDarkMode ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </a>
            </div>

            {/* Mobile Nav Actions */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${isDarkMode ? 'text-yellow-400' : 'text-slate-600'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-b overflow-hidden ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}
            >
              <div className="px-4 py-6 space-y-4">
                {['About', 'Projects', 'Vision', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className={`block w-full text-left text-lg font-medium transition-colors ${isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}
                  >
                    {item}
                  </button>
                ))}
                <a 
                  href="/resume.pdf" 
                  download 
                  className={`flex items-center justify-center px-4 py-3 text-lg font-medium rounded-xl ${isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}
                >
                  <Download className="w-5 h-5 mr-3" />
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-40 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
            >
              Learning and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Solving Hard Problems</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
            >
              I am Ghufran Fazal, a Computer Science enthusiast focused on mastering complex infrastructures and architecting scalable solutions.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button 
                onClick={() => scrollTo('projects')}
                className={`px-8 py-3 font-semibold rounded-full transition-all shadow-lg ${isDarkMode ? 'bg-white text-slate-900 hover:bg-slate-100 shadow-white/5' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'}`}
              >
                View My Projects
              </button>
              <button 
                onClick={() => scrollTo('contact')}
                className={`px-8 py-3 font-semibold rounded-full border transition-all ${isDarkMode ? 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800' : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'}`}
              >
                Let's Talk
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className={`text-3xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <GraduationCap className="text-blue-500 w-8 h-8" />
                Education Roadmap
              </h2>
              
              <div className={`space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px ${isDarkMode ? 'before:bg-slate-800' : 'before:bg-slate-200'}`}>
                {TIMELINE.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="pl-8 relative"
                  >
                    <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 ${isDarkMode ? 'border-slate-900 bg-blue-500' : 'border-white bg-blue-600'} shadow-sm`} />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">{item.period}</span>
                      <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.grade} — {item.school}</h4>
                      <div className="flex items-center text-emerald-500 text-xs font-bold mb-2">
                        <ChevronRight className="w-3 h-3 mr-1" />
                        {item.achievement}
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed italic">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Coding Skills */}
              <div className="space-y-6">
                <h3 className={`text-sm font-semibold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Coding Languages</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(SKILL_ICONS).map(([name, icon], index) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className={`group p-4 border rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all ${isDarkMode ? 'bg-slate-800/50 border-slate-800 hover:bg-slate-800 hover:border-blue-500/50' : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-md hover:shadow-blue-50'}`}
                    >
                      <img src={icon} alt={name} className={`w-10 h-10 transition-all ${isDarkMode ? 'opacity-90 group-hover:opacity-100' : 'grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100'}`} />
                      <span className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-900'}`}>{name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Other Skills */}
              <div className="space-y-6">
                <h3 className={`text-sm font-semibold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Other Skills & Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {OTHER_SKILLS.map((skill) => (
                    <span key={skill} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-24 px-4 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className={`text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Featured Projects</h2>
            <p className="text-slate-500 max-w-xl mx-auto">A collection of systems-focused applications exploring security, data visualization, and utility.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`group relative border rounded-3xl overflow-hidden transition-all duration-500 flex flex-col ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-2xl hover:shadow-slate-200'}`}
              >
                <div className={`aspect-[16/9] overflow-hidden relative group ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  {/* 
                    Project Logo Placeholder (Commented as per user request to replace later)
                    <img src={project.logo} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800 group-hover:bg-blue-900/20' : 'bg-gradient-to-br from-slate-50 to-slate-100 group-hover:bg-blue-50/50'}`}>
                    <div className={`p-4 rounded-2xl shadow-sm mb-3 group-hover:scale-110 group-hover:shadow-md transition-all duration-500 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                      {project.id === 'lunox' && <Cpu className="w-10 h-10 text-blue-500" />}
                      {project.id === 'expense' && <Wallet className="w-10 h-10 text-emerald-500" />}
                      {project.id === 'docguard' && <Shield className="w-10 h-10 text-indigo-500" />}
                      {project.id === 'unclutter' && <Trash2 className="w-10 h-10 text-rose-500" />}
                      {project.id === 'authflow' && <Key className="w-10 h-10 text-amber-500" />}
                      {project.id === 'jsonlens' && <Search className="w-10 h-10 text-blue-400" />}
                      {project.id === 'tictactoe' && <Grid className={`w-10 h-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`} />}
                      {project.id === 'utilihub' && <Layers className="w-10 h-10 text-violet-500" />}
                      {project.id === 'weightless' && <MessageSquare className="w-10 h-10 text-sky-400" />}
                    </div>
                    <div className={`font-mono text-[10px] uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`}>
                      {project.title}
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow space-y-4">
                  <h3 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>{project.title}</h3>
                  <p className={`text-sm leading-relaxed flex-grow ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{project.description}</p>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center text-sm font-bold transition-colors pt-4 border-t ${isDarkMode ? 'text-slate-300 hover:text-blue-400 border-slate-800' : 'text-slate-900 hover:text-blue-600 border-slate-50'}`}
                  >
                    View Project <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}

            {/* FUTURE PROJECT CARD TEMPLATE (Commented)
            {/* 
            <div className="group relative bg-white border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <Briefcase className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-300 italic">Upcoming Project</h3>
              <p className="text-slate-300 text-sm italic">New innovation in the pipeline...</p>
              <div className="w-32 h-2 bg-slate-100 rounded-full" />
            </div>
            */}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className={`py-24 transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-slate-900 text-white'}`}>
        <div className={`absolute top-0 right-0 w-1/2 h-full blur-[120px] pointer-events-none ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-500/10'}`} />
        <div className={`absolute bottom-0 left-0 w-1/3 h-full blur-[100px] pointer-events-none ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-500/10'}`} />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-8 rotate-12 flex items-center justify-center shadow-xl shadow-blue-900/40"
          >
            <Code2 className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-white'}`}>The Vision</h2>
          <p className={`text-lg md:text-xl leading-relaxed italic ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
            "To architect digital environments that are not just high-performing, but inherently secure. I believe the future of technology lies in the harmonious integration of security and scalability at the atomic level of code."
          </p>
          <div className="pt-8 flex justify-center gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 border-t transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className={`text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Let's Connect</h2>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Whether you're looking for a collaborator, have a question about my projects, or just want to discuss systems architecture—my inbox is always open.
              </p>
              
              <div className="space-y-6">
                <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all mr-4 ${isDarkMode ? 'bg-slate-900 text-slate-400 group-hover:bg-blue-600 group-hover:text-white' : 'bg-slate-50 text-slate-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Email Me</p>
                    <p className={`font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>{CONTACT_INFO.email}</p>
                  </div>
                </a>
                <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all mr-4 ${isDarkMode ? 'bg-slate-900 text-slate-400 group-hover:bg-blue-700 group-hover:text-white' : 'bg-slate-50 text-slate-600 group-hover:bg-blue-700 group-hover:text-white'}`}>
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Find Me On LinkedIn</p>
                    <p className={`font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-700'}`}>Ghufran Fazal</p>
                  </div>
                </a>
                <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="flex items-center group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all mr-4 ${isDarkMode ? 'bg-slate-900 text-slate-400 group-hover:bg-slate-700 group-hover:text-white' : 'bg-slate-50 text-slate-600 group-hover:bg-slate-900 group-hover:text-white'}`}>
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Check My GitHub</p>
                    <p className={`font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-slate-300' : 'text-slate-900 group-hover:text-slate-900'}`}>ghufranfazal</p>
                  </div>
                </a>
              </div>
            </div>

            <div className={`rounded-3xl p-8 md:p-12 border flex flex-col justify-center items-center text-center space-y-6 ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-sm ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <Briefcase className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Looking for a CS Specialist?</h3>
              <p className={isDarkMode ? 'text-slate-500' : 'text-slate-500'}>I am open to internship opportunities and collaborative technical projects.</p>
              <a 
                href="/resume.pdf" 
                download
                className={`w-full py-4 font-bold rounded-2xl transition-all flex items-center justify-center shadow-lg ${isDarkMode ? 'bg-white text-slate-900 hover:bg-slate-100 shadow-white/5' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'}`}
              >
                <Download className="w-5 h-5 mr-3" />
                Download CV
              </a>
            </div>
          </div>
          
          <footer className={`mt-24 pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${isDarkMode ? 'border-slate-900' : 'border-slate-100'}`}>
            <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Ghufran Fazal. All rights reserved.</p>
            <div className="flex items-center space-x-6">
               <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isDarkMode ? 'text-slate-700' : 'text-slate-300'}`}>Built with React & Motion</span>
            </div>
          </footer>
        </div>
      </section>
      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => scrollTo('home')}
            className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90 ${isDarkMode ? 'bg-slate-100 text-slate-900 hover:bg-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
