import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronDown, BookOpen, Users, Zap, Globe, Star, ArrowRight, 
  Search, BarChart3, Heart, Bell, Mail, Phone, MapPin, 
  Sparkles, Check, HelpCircle, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import LibraryHeroImage from '../assets/images/LibraryHeroImage.jpg';

const featureColors = {
  sky: {
    bg: 'bg-sky-100 dark:bg-sky-900/30',
    text: 'text-sky-600 dark:text-sky-400',
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
  },
  indigo: {
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-accent-600',
  },
};

const Navbar = ({ isDark, toggleTheme, isMenuOpen, setIsMenuOpen }) => (
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
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-smooth">
            <ChevronDown className={`w-5 h-5 text-slate-700 dark:text-white transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
    {isMenuOpen && (
      <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <a href="#features" className="block text-slate-700 dark:text-slate-300 hover:text-sky-600 transition-smooth capitalize">features</a>
        <Link to="/about" className="block text-slate-700 dark:text-slate-300 hover:text-sky-600 transition-smooth capitalize">about</Link>
        <a href="#pricing" className="block text-slate-700 dark:text-slate-300 hover:text-sky-600 transition-smooth capitalize">pricing</a>
        <Link to="/login" className="block text-slate-700 dark:text-slate-300 hover:text-sky-600 transition-smooth">Login</Link>
        <Link to="/register" className="block w-full px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg text-center font-semibold hover:shadow-lg transition-smooth">Get Started</Link>
      </div>
    )}
  </nav>
);

const Hero = () => (
  <motion.section 
    className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat pt-16 relative overflow-hidden"
    style={{
      backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85)), url(${LibraryHeroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    animate={{ 
      backgroundSize: ['cover', '110%', 'cover'],
    }}
    transition={{ 
      duration: 15, 
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span 
          className="px-4 py-2 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          ✨ Next-Gen Library Management
        </motion.span>

        <motion.h1 
          className="heading-lg text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Discover, Borrow & Manage <span className="bg-gradient-to-r from-sky-400 to-blue-300 bg-clip-text text-transparent">Your Library</span>
        </motion.h1>

        <motion.p 
          className="text-lg text-slate-200 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Combining institutional power with modern analytics. A beautiful, intuitive platform for librarians and members in Uganda.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Link to="/register" className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-smooth w-full sm:w-auto text-sm sm:text-base">
              Start Free Trial <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
            </Link>
          </motion.div>
          <motion.a 
            href="#features"
            className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-sky-300 text-sky-300 rounded-xl font-bold hover:bg-sky-500 hover:bg-opacity-20 transition-smooth w-full sm:w-auto text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.a>
        </motion.div>

        <motion.div 
          className="pt-8 border-t border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
          <p className="text-sm text-slate-300">Trusted by 200+ local libraries across Kampala</p>
        </motion.div>
      </motion.div>

      {/* Right Card - Floating Animation */}
      <motion.div 
        className="hidden md:block relative"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-500 rounded-2xl blur-3xl opacity-20"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="relative bg-gradient-to-br from-white/95 to-blue-50/95 dark:from-slate-700/95 dark:to-slate-800/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/40 dark:border-slate-600/40"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="space-y-4">
            <motion.div 
              className="h-3 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full w-32"
              animate={{ width: ["80%", "100%", "80%"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="h-2 bg-sky-200 dark:bg-slate-600 rounded w-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="h-2 bg-sky-200 dark:bg-slate-600 rounded w-5/6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <motion.div 
                className="h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg shadow-lg"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div 
                className="h-12 bg-sky-100 dark:bg-sky-600 rounded-lg shadow-sm"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </motion.section>
);

const Features = () => (
  <section id="features" className="py-20 bg-white dark:bg-slate-900">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="heading-md mb-4 text-slate-900 dark:text-white">Powerful Features</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to manage your library efficiently and beautifully.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: Search, title: 'Smart Catalog', description: 'Advanced search with filters and personalized recommendations.', color: 'sky' },
          { icon: Users, title: 'Member Portal', description: 'Manage history, reservations, and fines seamlessly in Shs.', color: 'blue' },
          { icon: BarChart3, title: 'Real-time Analytics', description: 'Powerful dashboards with borrowing trends and insights.', color: 'indigo' },
          { icon: Globe, title: 'Global Access', description: 'Mobile-friendly platform accessible anywhere, anytime.', color: 'sky' },
          { icon: Heart, title: 'Reviews', description: 'Rate and review books to help your community discover great reads.', color: 'blue' },
          { icon: Bell, title: 'Notifications', description: 'Get alerts about reservations and upcoming return dates.', color: 'indigo' },
        ].map((feature, idx) => (
          <div key={idx} className="card group hover:scale-[1.02] transition-smooth border-slate-50 dark:border-slate-800">
            <div className={`w-12 h-12 ${featureColors[feature.color].bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
              <feature.icon className={`w-6 h-6 ${featureColors[feature.color].text}`} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const LandingPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-slate-50 dark:bg-slate-950 font-outfit`}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <Features />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-4 text-slate-900 dark:text-white">Simple, Transparent Pricing</h2>
            <p className="text-muted">Choose the plan that fits your community needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Community', price: 'Free', features: ['Up to 1,000 Books', '50 Members', 'Basic Analytics'], recommended: false },
              { name: 'Professional', price: 'Shs 180,000', features: ['Unlimited Books', '500 Members', 'Advanced Analytics', 'Email Notifications'], recommended: true },
              { name: 'Institutional', price: 'Shs 750,000', features: ['Multiple Branches', 'Unlimited Members', 'API Access', '24/7 Priority Support'], recommended: false }
            ].map((plan, i) => (
              <div key={i} className={`card relative flex flex-col p-8 ${plan.recommended ? 'border-2 border-sky-500 shadow-xl dark:bg-slate-900' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
                {plan.recommended && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest">RECOMMENDED</span>}
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6 text-sky-600">{plan.price}{plan.price !== 'Free' && <span className="text-sm text-muted font-normal">/mo</span>}</div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-muted">
                      <Check className="w-4 h-4 text-sky-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={`w-full py-3 sm:py-4 rounded-xl font-bold text-center block transition-smooth text-sm sm:text-base ${plan.recommended ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:shadow-lg' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white'}`}>Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-md text-center mb-12 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do I return a book?", a: "Visit your dashboard, go to 'My Library', and click the 'Return' button. You can also drop it off at the physical library kiosk." },
              { q: "What happens if I have an overdue book?", a: "LMS automatically calculates fines based on Shs 500/day. You will receive notifications 3 days before the due date." },
              { q: "Can I reserve a book that is currently borrowed?", a: "Yes! Place a reservation and we will notify you via the app and email as soon as the book is returned." }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex gap-4">
                  <HelpCircle className="w-6 h-6 text-sky-500 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-2 text-slate-900 dark:text-white">{faq.q}</h4>
                    <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-md mb-6 text-slate-900 dark:text-white">Built for the Modern Librarian</h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">LMS was founded with a single mission: to democratize access to knowledge by providing world-class tools to the guardians of information in East Africa.</p>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-sky-100 dark:bg-sky-900 rounded-lg"><Sparkles className="w-5 h-5 text-sky-600" /></div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Our Mission</h4>
                <p className="text-muted text-sm">Empowering local communities through digital transformation of traditional libraries.</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-subtle border border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-sky-600 mb-1">500+</div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Libraries</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">1M+</div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Books Managed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-md mb-4 text-slate-900 dark:text-white">Get in Touch</h2>
          <p className="text-muted mb-12">Have questions? We're here to help you scale your collection.</p>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-sky-50 dark:bg-sky-900/30 rounded-full"><Mail className="w-6 h-6 text-sky-600" /></div>
              <span className="font-semibold text-slate-900 dark:text-white text-sm">mbawaddedoreen83@gmail.com</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-sky-50 dark:bg-sky-900/30 rounded-full"><Phone className="w-6 h-6 text-sky-600" /></div>
              <span className="font-semibold text-slate-900 dark:text-white text-sm">+256 746812427</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-sky-50 dark:bg-sky-900/30 rounded-full"><MapPin className="w-6 h-6 text-sky-600" /></div>
              <span className="font-semibold text-slate-900 dark:text-white text-sm text-center">Plot 12, Kampala Rd, Kampala</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-0 bg-gradient-to-r from-sky-600 to-blue-600 mx-4 sm:mx-8 rounded-2xl sm:rounded-3xl mb-20 text-center">
        <h2 className="text-2xl sm:heading-md text-white mb-3 sm:mb-4">Ready to Transform Your Library?</h2>
        <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto px-2">Join hundreds of libraries using LMS to engage members and streamline operations.</p>
        <Link to="/register" className="inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-10 py-3 sm:py-4 bg-white text-sky-600 rounded-xl font-bold hover:shadow-2xl transition-smooth hover:scale-105 text-sm sm:text-base">Get Started Free <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" /></Link>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
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
    </div>
  );
};

export default LandingPage;
