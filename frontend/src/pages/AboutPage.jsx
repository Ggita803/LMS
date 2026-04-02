import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Globe, Heart, Zap, Sun, Moon, ChevronDown, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
// import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';
import Breadcrumb from '../components/Breadcrumb';
import Doreen from '../assets/team/doreen.jpeg';
import hanifah from '../assets/team/hanifah.jpeg';
import victoria from '../assets/team/victoria.jpeg';
import mathias from '../assets/team/mathias.jpeg';
import shafik from '../assets/team/shafik.jpeg';      
import lucy from '../assets/team/lucy.jpeg';
import nobert from '../assets/team/nobert.jpeg';
import vivian from '../assets/team/vivian.jpeg';


const AboutPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Vast Collection',
      description: 'Access our extensive library of books across multiple categories and genres.',
    },
    {
      icon: Zap,
      title: 'Easy Management',
      description: 'Seamlessly borrow, return, and reserve books with our intuitive platform.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with readers, share reviews, and discover recommendations.',
    },
    {
      icon: Award,
      title: 'Quality Service',
      description: 'Dedicated support team ensuring the best library experience for all members.',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Our library management system was established to revolutionize book management.',
    },
    {
      year: '2021',
      title: 'Digital Launch',
      description: 'Launched our online platform enabling members to access services remotely.',
    },
    {
      year: '2022',
      title: 'Expansion',
      description: 'Expanded collection to 50,000+ books and welcomed 10,000+ active members.',
    },
    {
      year: '2026',
      title: 'Innovation',
      description: 'Introduced advanced search, recommendations, and mobile app features.',
    },
  ];

  const team = [
    {
      name: 'Mbawadde Doreen',
      role: 'Founder & Director',
      emoji: '👩‍💼',
      photo: Doreen,
      bio: 'Visionary leader with a passion for literacy and community empowerment.',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson',
      github: 'https://github.com/sarahjohnson',
    },
    {
      name: 'Kibuuka Mathias',
      role: 'Head Librarian',
      emoji: '👨‍💼',
      photo: mathias,
      bio: 'Expert in library science, dedicated to curating diverse collections.',
      linkedin: 'https://linkedin.com/in/michaelchen',
      twitter: 'https://twitter.com/michaelchen',
      github: 'https://github.com/michaelchen',
    },
    {
      name: 'Mbazira Shafik',
      role: 'Tech Lead',
      emoji: '👩‍💻',
      photo: shafik,
      bio: 'Full-stack developer building seamless digital library experiences.',
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      twitter: 'https://twitter.com/emilyrodriguez',
      github: 'https://github.com/emilyrodriguez',
    },
    {
      name: 'Kyazze Victoria',
      role: 'Community Manager',
      emoji: '👨‍💼',
      photo: victoria,
      bio: 'Connecting readers and organizing engaging library events.',
      linkedin: 'https://linkedin.com/in/jamessmith',
      twitter: 'https://twitter.com/jamessmith',
      github: 'https://github.com/jamessmith',
    },
    {
      name: 'Katono Vivian',
      role: 'Community Manager',
      emoji: '👨‍💼',
      photo: vivian,
      bio: 'Connecting readers and organizing engaging library events.',
      linkedin: 'https://linkedin.com/in/jamessmith',
      twitter: 'https://twitter.com/jamessmith',
      github: 'https://github.com/jamessmith',
    },
    {
      name: 'Achom Hannifah',
      role: 'Community Manager',
      emoji: '👨‍💼',
      photo: hanifah,
      bio: 'Connecting readers and organizing engaging library events.',
      linkedin: 'https://linkedin.com/in/jamessmith',
      twitter: 'https://twitter.com/jamessmith',
      github: 'https://github.com/jamessmith',
    },
    {
      name: 'Ssenyonga Lucy',
      role: 'Community Manager',
      emoji: '👨‍💼',
      photo: lucy,
      bio: 'Connecting readers and organizing engaging library events.',
      linkedin: 'https://linkedin.com/in/jamessmith',
      twitter: 'https://twitter.com/jamessmith',
      github: 'https://github.com/jamessmith',
    },
    {
      name: 'Owing Nobert D', 
      role: 'Community Manager',
      emoji: '👨‍💼',
      photo: nobert,
      bio: 'Connecting readers and organizing engaging library events.',
      linkedin: 'https://linkedin.com/in/jamessmith',
      twitter: 'https://twitter.com/jamessmith',
      github: 'https://github.com/jamessmith',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Books in Collection' },
    { number: '25K+', label: 'Active Members' },
    { number: '150K+', label: 'Borrows Annually' },
    { number: '4.8★', label: 'Customer Rating' },
  ];

  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navbar from LandingPage
  const Navbar = () => (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-50 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-sky-600 to-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent">LMS</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 transition-smooth capitalize">features</a>
            <Link to="/about" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 transition-smooth capitalize">about</Link>
            <a href="#pricing" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 transition-smooth capitalize">pricing</a>
            <a href="#contact" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 transition-smooth capitalize">contact</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-smooth">
              {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-sky-600" />}
            </button>
            <Link to="/login" className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-sky-600 border border-sky-600 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900 transition-smooth">Login</Link>
            <Link to="/register" className="hidden sm:inline-block px-6 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-smooth font-medium text-sm">Get Started</Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <ChevronDown className={`w-5 h-5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 p-4 space-y-3">
          <a href="#features" className="block text-slate-700 dark:text-slate-300 hover:text-sky-600 capitalize">features</a>
          <Link to="/about" className="block text-slate-700 dark:text-slate-300 hover:text-sky-600 capitalize">about</Link>
          <a href="#pricing" className="block text-slate-700 dark:text-slate-300 hover:text-sky-600 capitalize">pricing</a>
          <Link to="/login" className="block text-slate-700 dark:text-slate-300 hover:text-sky-600">Login</Link>
          <Link to="/register" className="block w-full px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg text-center">Get Started</Link>
        </div>
      )}
    </nav>
  );

  return (
    <>
      <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-slate-50 dark:bg-slate-950 font-outfit`}>
        <Navbar />
        <div className="space-y-12 animate-fade-in max-w-4xl mx-auto py-24 px-4 md:px-0">
          <WelcomeBanner
            userName="About Our Library"
            userRole="member"
            primaryText="Building a community of readers"
            secondaryText="Discover our mission, vision, and impact"
          />
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'About Us' },
            ]}
          />
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800">
              <h2 className="text-2xl font-bold mb-4 text-sky-900 dark:text-sky-100">Our Mission</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                To provide equitable access to knowledge and foster a love of reading by maintaining a diverse, inclusive, and well-managed library that serves the needs of our entire community.
              </p>
            </div>
            <div className="card bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
              <h2 className="text-2xl font-bold mb-4 text-emerald-900 dark:text-emerald-100">Our Vision</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                To become the leading digital library platform, transforming how people discover, access, and enjoy books while building a vibrant community of lifelong learners.
              </p>
            </div>
          </div>
          {/* Core Values */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <Heart className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Community</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    We believe in building a supportive community where knowledge is shared and everyone feels welcome.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <BookOpen className="w-6 h-6 text-sky-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Accessibility</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    We strive to make knowledge accessible to everyone, regardless of background or ability.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Award className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Excellence</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Through continuous improvement, we maintain the highest standards in library services.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Innovation</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    We embrace technology and new ideas to enhance the library experience for all.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="card text-center">
                <p className="text-3xl font-bold text-sky-600 mb-2">{stat.number}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
          {/* Why Choose Us */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Why Choose Our Library?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="card hover:shadow-lg transition-shadow">
                    <Icon className="w-8 h-8 text-sky-600 mb-3" />
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Milestones */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Journey</h2>
            <div className="space-y-4">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="card border-l-4 border-sky-600">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-600 text-white px-3 py-1 rounded font-bold text-sm flex-shrink-0">
                      {milestone.year}
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{milestone.title}</h3>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Team */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="card text-center p-6 flex flex-col items-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                >
                  <div className="relative mb-3">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-20 h-20 rounded-full border-4 border-sky-200 dark:border-sky-700 object-cover shadow-lg group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-2 -right-2 text-2xl select-none animate-bounce-slow group-hover:scale-110 transition-transform">
                      {member.emoji}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs text-muted mb-1">{member.role}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 min-h-[40px]">{member.bio}</p>
                  <div className="flex gap-3 justify-center mt-2">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600" aria-label="GitHub"><Github className="w-4 h-4" /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Contact Section (from LandingPage) */}
          <section id="contact" className="py-20 bg-white dark:bg-slate-900 rounded-3xl">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="heading-md mb-4 text-slate-900 dark:text-white">Get in Touch</h2>
              <p className="text-muted mb-12">Have questions? We're here to help you scale your collection.</p>
              <div className="grid sm:grid-cols-3 gap-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-sky-50 dark:bg-sky-900/30 rounded-full"><Mail className="w-6 h-6 text-sky-600" /></div>
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">support@lms.com</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-sky-50 dark:bg-sky-900/30 rounded-full"><Phone className="w-6 h-6 text-sky-600" /></div>
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">+256 700 000000</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-sky-50 dark:bg-sky-900/30 rounded-full"><MapPin className="w-6 h-6 text-sky-600" /></div>
                  <span className="font-semibold text-slate-900 dark:text-white text-sm text-center">Plot 12, Kampala Rd, Kampala</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Footer from LandingPage */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-sky-600 to-blue-500 rounded flex items-center justify-center font-bold text-white text-sm">L</div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">LMS</span>
              </Link>
              <p className="text-sm text-muted leading-relaxed">The standard for library management in Uganda. Professional, academic, and community-focused.</p>
            </div>
            {['Product', 'Company', 'Legal'].map((cat) => (
              <div key={cat}>
                <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">{cat}</h3>
                <ul className="space-y-4">
                  {['Features', 'Pricing', 'About', 'Contact'].map((link) => (
                    <li key={link}><a href="#" className="text-sm text-muted hover:text-sky-600 transition-smooth">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted">&copy; 2026 LMS Uganda. All rights reserved.</p>
            <div className="flex gap-8 text-xs text-muted">
              <a href="#" className="hover:text-sky-600 transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-sky-600 transition-smooth">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AboutPage;
