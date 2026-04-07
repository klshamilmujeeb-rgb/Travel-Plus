import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  Globe, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Menu, 
  X,
  Calendar,
  Users,
  CreditCard,
  CheckCircle2,
  Search,
  Sparkles,
  Play,
  FileText,
  HelpCircle,
  ArrowRight,
  Info
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { geminiService } from './services/geminiService';

// --- Types ---

interface Package {
  id: string;
  title: string;
  location: string;
  price: string;
  duration: string;
  image: string;
  description: string;
}

interface VisaType {
  id: string;
  name: string;
  docs: string[];
  steps: string[];
  fee: string;
  time: string;
}

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-200/50 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl shadow-[0_10px_20px_rgba(0,113,227,0.2)]">
              <Plane className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Travel<span className="text-primary">Plus</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Packages', 'Visa Services', 'Travel Search', 'About'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-[14px] font-semibold text-slate-500 hover:text-primary transition-colors tracking-tight"
              >
                {item}
              </a>
            ))}
            <a 
              href="https://wa.me/917902745614" 
              target="_blank" 
              rel="noreferrer"
              className="bg-primary text-white px-8 py-2.5 rounded-full text-[14px] font-bold hover:bg-blue-700 transition-all shadow-[0_10px_20px_rgba(0,113,227,0.2)]"
            >
              Book Now
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-900">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-slate-100 px-6 py-8 flex flex-col gap-6 overflow-hidden"
          >
            {['Packages', 'Visa Services', 'Travel Search', 'About'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-xl font-semibold text-slate-900"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <a 
              href="https://wa.me/917902745614"
              target="_blank"
              rel="noreferrer"
              className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 text-center"
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await geminiService.searchTravelTrends(query);
      setResult(response || "No results found.");
    } catch (error) {
      setResult("Error fetching real-time data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="travel-search" ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white py-32">
      <motion.div 
        style={{ y, opacity, scale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=2000" 
          alt="Travel Background" 
          className="w-full h-full object-cover opacity-[0.03] grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,113,227,0.05),transparent_70%)]" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Search Bar at the Top */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-all duration-500" />
              <div className="relative flex items-center bg-white/80 backdrop-blur-2xl border border-slate-200/50 rounded-full px-8 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
                <Search className="w-5 h-5 text-slate-400 mr-4" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search destinations, visas, or updates..."
                  className="flex-1 bg-transparent text-slate-900 text-lg outline-none placeholder:text-slate-400 font-medium"
                />
                <button 
                  onClick={handleSearch}
                  disabled={loading}
                  className="ml-4 bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <Clock className="animate-spin w-4 h-4" /> : 'Search'}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 p-8 rounded-[2.5rem] bg-white/90 backdrop-blur-2xl border border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-left overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 text-primary">
                      <Info className="w-5 h-5" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Instant Insights</span>
                    </div>
                    <button onClick={() => setResult(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap font-medium text-[15px]">
                    {result}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <h1 className="text-8xl md:text-[10rem] font-bold tracking-tight text-slate-900 mb-8 leading-[0.85] md:leading-[0.85]">
            Explore <br />
            <span className="text-primary">Beyond.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 mb-16 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
            TravelPlus Kozhikode: Redefining your journey with instant travel updates, 
            seamless visa processing, and world-class destinations.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button className="bg-primary text-white px-14 py-5 rounded-full text-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,113,227,0.3)] flex items-center gap-3">
              Explore Packages <ChevronRight className="w-5 h-5" />
            </button>
            <button className="text-slate-900 px-14 py-5 rounded-full text-lg font-bold hover:bg-slate-100 transition-all flex items-center gap-2">
              Visa Services <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const VisaSection = () => {
  const visaTypes: VisaType[] = [
    {
      id: 'tourist',
      name: 'Tourist Visa',
      docs: ['Passport (6 months validity)', 'Recent Photos', 'Bank Statement', 'Return Tickets'],
      steps: ['Document Review', 'Form Submission', 'Appointment Booking', 'Visa Grant'],
      fee: 'Starting from ₹4,500',
      time: '5-7 Working Days'
    },
    {
      id: 'business',
      name: 'Business Visa',
      docs: ['Invitation Letter', 'Company Profile', 'Tax Returns', 'Covering Letter'],
      steps: ['Verification', 'Submission', 'Interview Prep', 'Visa Collection'],
      fee: 'Starting from ₹8,000',
      time: '10-15 Working Days'
    },
    {
      id: 'student',
      name: 'Student Visa',
      docs: ['Offer Letter', 'Financial Proof', 'Academic Records', 'English Proficiency'],
      steps: ['I-20/CAS Issuance', 'Fee Payment', 'Biometrics', 'Interview'],
      fee: 'Varies by Country',
      time: '3-6 Weeks'
    }
  ];

  const [activeVisa, setActiveVisa] = useState(visaTypes[0]);

  return (
    <section id="visa-services" className="py-40 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-6 block">Visa Expertise</span>
            <h2 className="text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
              Global Access, <br />Simplified.
            </h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Our dedicated visa consultants in Kozhikode handle everything from documentation to 
              embassy appointments, ensuring a stress-free application process.
            </p>
            
            <div className="space-y-4">
              {visaTypes.map((visa) => (
                <button 
                  key={visa.id}
                  onClick={() => setActiveVisa(visa)}
                  className={`w-full text-left p-6 rounded-3xl transition-all flex items-center justify-between group ${activeVisa.id === visa.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-secondary hover:bg-slate-200'}`}
                >
                  <span className="text-xl font-bold">{visa.name}</span>
                  <ChevronRight className={`w-6 h-6 transition-transform ${activeVisa.id === visa.id ? 'rotate-90' : 'group-hover:translate-x-2'}`} />
                </button>
              ))}
            </div>

            <div className="mt-12 p-8 rounded-3xl bg-blue-50 border border-blue-100 flex items-start gap-6">
              <div className="bg-primary p-3 rounded-2xl text-white">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Need Personalized Help?</h4>
                <p className="text-slate-600 mb-4">Our experts are ready to assist you with specific requirements.</p>
                <a href="tel:+917902745614" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Call Consultant <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <motion.div 
            key={activeVisa.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-secondary p-12 rounded-[3rem] border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                <FileText className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">{activeVisa.name} Details</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Required Documents</h4>
                <ul className="space-y-4">
                  {activeVisa.docs.map((doc, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Process Steps</h4>
                <div className="space-y-6">
                  {activeVisa.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-primary font-bold text-lg">0{i + 1}</span>
                      <p className="text-slate-700 font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-slate-200 grid grid-cols-2 gap-8">
              <div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-2">Service Fee</span>
                <p className="text-2xl font-bold text-primary">{activeVisa.fee}</p>
              </div>
              <div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-2">Processing Time</span>
                <p className="text-2xl font-bold text-slate-900">{activeVisa.time}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BookingModal = ({ isOpen, onClose, selectedPackage }: any) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl"
      >
        <div className="p-12">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-xl">
                {step}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {step === 1 ? 'Select Details' : step === 2 ? 'Personal Info' : 'Confirmation'}
                </h3>
                <p className="text-slate-500 text-sm">Step {step} of 3</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-8">
              <div className="p-6 bg-secondary rounded-3xl border border-slate-100 flex items-center gap-6">
                <img src={selectedPackage?.image} className="w-24 h-24 rounded-2xl object-cover" />
                <div>
                  <h4 className="text-xl font-bold">{selectedPackage?.title}</h4>
                  <p className="text-primary font-bold">{selectedPackage?.price}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Travel Date</label>
                  <input type="date" className="w-full bg-secondary border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Travelers</label>
                  <select className="w-full bg-secondary border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary">
                    <option>1 Person</option>
                    <option>2 Persons</option>
                    <option>Family (4+)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl text-primary">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-bold">Include Visa Processing Service (+₹2,500)</span>
                <input type="checkbox" className="ml-auto w-5 h-5 rounded-md border-primary text-primary focus:ring-primary" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <input type="text" placeholder="Full Name" className="w-full bg-secondary border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary" />
              <input type="email" placeholder="Email Address" className="w-full bg-secondary border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary" />
              <input type="tel" placeholder="Phone Number" className="w-full bg-secondary border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary" />
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h4 className="text-3xl font-bold mb-4">Booking Confirmed!</h4>
              <p className="text-slate-500 text-lg mb-8">Our team in Kozhikode will contact you shortly to finalize the details.</p>
            </div>
          )}

          <div className="mt-12 flex gap-4">
            {step < 3 ? (
              <>
                {step > 1 && (
                  <button 
                    onClick={() => setStep(step - 1)}
                    className="flex-1 bg-secondary text-slate-900 py-5 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                  >
                    Back
                  </button>
                )}
                <button 
                  onClick={() => setStep(step + 1)}
                  className="flex-[2] bg-primary text-white py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-primary/20"
                >
                  {step === 1 ? 'Continue' : 'Complete Booking'}
                </button>
              </>
            ) : (
              <button 
                onClick={onClose}
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const PackageCard = ({ pkg, onBook }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
  >
    <div className="relative h-72 overflow-hidden">
      <img 
        src={pkg.image} 
        alt={pkg.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-bold text-primary shadow-sm">
        {pkg.duration}
      </div>
    </div>
    <div className="p-8">
      <div className="flex items-center gap-2 text-slate-400 mb-2">
        <MapPin className="w-3.5 h-3.5" />
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]">{pkg.location}</span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{pkg.title}</h3>
      <p className="text-slate-500 text-[14px] mb-8 line-clamp-2 leading-relaxed font-medium">{pkg.description}</p>
      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
        <div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">From</span>
          <p className="text-2xl font-bold text-primary">₹{pkg.price}</p>
        </div>
        <button 
          onClick={() => onBook(pkg)}
          className="bg-primary text-white px-8 py-3 rounded-full font-bold text-[14px] hover:bg-blue-700 transition-all shadow-[0_10px_20px_rgba(0,113,227,0.15)]"
        >
          Book
        </button>
      </div>
    </div>
  </motion.div>
);

const Packages = ({ onBook }: any) => {
  const packages: Package[] = [
    {
      id: 'maldives',
      title: "Maldives Escape",
      location: "Maldives",
      price: "45,000",
      duration: "4N/5D",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800",
      description: "Experience luxury overwater villas and crystal clear waters in the heart of the Indian Ocean."
    },
    {
      id: 'dubai',
      title: "Dubai City Lights",
      location: "UAE",
      price: "38,000",
      duration: "5N/6D",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
      description: "From the Burj Khalifa to desert safaris, discover the ultimate modern oasis."
    },
    {
      id: 'bali',
      title: "Bali Adventure",
      location: "Indonesia",
      price: "52,000",
      duration: "6N/7D",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
      description: "Immerse yourself in the spiritual beauty and lush landscapes of the Island of Gods."
    }
  ];

  return (
    <section id="packages" className="py-40 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-3xl">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-6 block">Curated Experiences</span>
            <h2 className="text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">Popular Destinations</h2>
            <p className="text-xl text-slate-600 leading-relaxed">Handpicked travel packages designed for comfort, adventure, and unforgettable memories.</p>
          </div>
          <button className="text-primary font-bold text-lg flex items-center gap-3 hover:gap-5 transition-all">
            View All Packages <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-primary p-3 rounded-2xl">
                <Plane className="text-white w-8 h-8" />
              </div>
              <span className="text-3xl font-bold tracking-tight">Travel<span className="text-primary">Plus</span></span>
            </div>
            <p className="text-slate-400 max-w-md text-lg leading-relaxed mb-12">
              Kozhikode's premier travel agency. We combine local expertise with modern travel technology 
              to bring you the world's best travel experiences.
            </p>
            <div className="flex gap-6">
              {[Globe, Users, Sparkles].map((Icon, i) => (
                <div key={i} className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary transition-all cursor-pointer group">
                  <Icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-10">Explore</h4>
            <ul className="space-y-6 text-slate-400 text-lg">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Packages</a></li>
              <li><a href="#visa-services" className="hover:text-white transition-colors">Visa Services</a></li>
              <li><a href="#travel-search" className="hover:text-white transition-colors">Travel Search</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-10">Contact</h4>
            <ul className="space-y-6 text-slate-400 text-lg">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span>Kozhikode, Kerala, <br />India 673001</span>
              </li>
              <li className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                <span>info@travelplus.com</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 text-primary flex-shrink-0 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current rotate-90" />
                </div>
                <a href="https://wa.me/917902745614" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  +91 7902745614
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm font-medium">
          <p>© 2026 TravelPlus Kozhikode. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function TravelPlusApp() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleBook = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen selection:bg-primary/20">
      <Navbar />
      <main>
        <Hero />
        <Packages onBook={handleBook} />
        <VisaSection />
      </main>
      <Footer />
      
      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/917902745614" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-10 right-10 z-[90] bg-green-500 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all active:scale-95 group"
      >
        <div className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap pointer-events-none">
          Chat with us
        </div>
        <Play className="w-6 h-6 fill-current rotate-90" />
      </a>
      
      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
            selectedPackage={selectedPackage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

