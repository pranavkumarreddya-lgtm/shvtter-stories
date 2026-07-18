import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, RefreshCw } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'PORTRAIT',
    budget: '2500-5000',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Generate a unique transaction/booking reference ID
      const randHex = Math.random().toString(16).substring(2, 8).toUpperCase();
      setReferenceId(`SST-${randHex}`);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      category: 'PORTRAIT',
      budget: '2500-5000',
      message: ''
    });
    setIsSubmitted(false);
  };

  const contactContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const contactItemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 85, 
        damping: 16 
      } 
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-black/30 border-t border-neutral-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Direct Inquiries */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <span className="font-mono text-[9px] tracking-[0.35em] text-gold-400 font-semibold uppercase">
                INQUIRIES & COMMISSIONS
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-white mt-3 leading-tight">
                Let's Frame a Story
              </h2>
              <p className="font-sans text-xs text-neutral-400 font-light mt-6 leading-relaxed max-w-sm">
                Available for international editorial commissions, premium commercial portfolios, and customized fine-art prints.
              </p>
            </div>

            {/* Direct Coordinates card lists */}
            <div className="space-y-6 pt-4 border-t border-neutral-900/80">
              <motion.div 
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="flex items-start space-x-4 pl-0 hover:pl-2 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-gold-400 mt-1 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase font-bold">EMAIL INQUIRIES</span>
                  <a 
                    href="mailto:contact@shvtterstories.com" 
                    className="block font-sans text-sm text-white hover:text-gold-400 transition-colors duration-200 mt-1 cursor-pointer"
                  >
                    contact@shvtterstories.com
                  </a>
                  <span className="text-[10px] text-neutral-500 font-light">Response within 24 business hours</span>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="flex items-start space-x-4 pl-0 hover:pl-2 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-gold-400 mt-1 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase font-bold">DIRECT TELEPHONE</span>
                  <a 
                    href="tel:+12125558920" 
                    className="block font-sans text-sm text-white hover:text-gold-400 transition-colors duration-200 mt-1 cursor-pointer"
                  >
                    +1 (212) 555-8920
                  </a>
                  <span className="text-[10px] text-neutral-500 font-light">Mon - Fri • 9:00 AM - 6:00 PM EST</span>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="flex items-start space-x-4 pl-0 hover:pl-2 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-gold-400 mt-1 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase font-bold">STUDIO LOCATION</span>
                  <p className="font-sans text-sm text-white mt-1">
                    422 Greenwich St, Tribeca
                  </p>
                  <span className="text-[10px] text-neutral-500 font-light">New York, NY 10013 (By Appointment Only)</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Custom Interactive Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 bg-neutral-950 border border-neutral-900 rounded-xl p-8 relative"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="contact-form"
                  variants={contactContainerVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <motion.h3 
                    variants={contactItemVariants}
                    className="font-serif text-xl text-white font-normal mb-2 border-b border-neutral-900 pb-3"
                  >
                    Booking Request Form
                  </motion.h3>

                  {/* Name field */}
                  <motion.div variants={contactItemVariants} className="space-y-2">
                    <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alexander Mercer"
                      className="w-full bg-[#0d0d0d] border border-neutral-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none rounded-md px-4 py-3 font-sans text-xs text-white transition-all duration-300"
                    />
                  </motion.div>

                  {/* Email field */}
                  <motion.div variants={contactItemVariants} className="space-y-2">
                    <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. alex@example.com"
                      className="w-full bg-[#0d0d0d] border border-neutral-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none rounded-md px-4 py-3 font-sans text-xs text-white transition-all duration-300"
                    />
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Category selection */}
                    <motion.div variants={contactItemVariants} className="space-y-2">
                      <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                        Commission Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-[#0d0d0d] border border-neutral-800 focus:border-gold-500 focus:outline-none rounded-md px-4 py-3 font-sans text-xs text-neutral-400 focus:text-white transition-all duration-300 cursor-pointer"
                      >
                        <option value="PORTRAIT">PORTRAIT SESSION</option>
                        <option value="LANDSCAPE">LANDSCAPE COMMISSION</option>
                        <option value="WILDLIFE">WILDLIFE / OUTDOORS</option>
                        <option value="TRAVEL">TRAVEL EDITORIAL</option>
                        <option value="STREET">STREET / DOCUMENTARY</option>
                        <option value="COMMERCIAL">COMMERCIAL CAMPAIGN</option>
                      </select>
                    </motion.div>

                    {/* Budget selection */}
                    <motion.div variants={contactItemVariants} className="space-y-2">
                      <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                        Estimated Budget (USD)
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-[#0d0d0d] border border-neutral-800 focus:border-gold-500 focus:outline-none rounded-md px-4 py-3 font-sans text-xs text-neutral-400 focus:text-white transition-all duration-300 cursor-pointer"
                      >
                        <option value="1500-2500">$1,500 - $2,500</option>
                        <option value="2500-5000">$2,500 - $5,000</option>
                        <option value="5000-10000">$5,000 - $10,000</option>
                        <option value="10000+">$10,000+ USD</option>
                      </select>
                    </motion.div>
                  </div>

                  {/* Message field */}
                  <motion.div variants={contactItemVariants} className="space-y-2">
                    <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                      Mission Brief / Messages *
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Outline your visual goals, timelines and output dimensions..."
                      className="w-full bg-[#0d0d0d] border border-neutral-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none rounded-md px-4 py-3 font-sans text-xs text-white transition-all duration-300 resize-none"
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={contactItemVariants} className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, backgroundColor: '#a97c55', boxShadow: '0 4px 15px rgba(156, 122, 85, 0.4)' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-[#9c7a55] text-white font-sans text-[11px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-md shadow-black/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-45 disabled:pointer-events-none"
                      id="contact-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin mr-2" />
                          <span>TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 mr-2" />
                          <span>SUBMIT CREATIVE BRIEF</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div 
                  key="submission-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="text-center py-12 flex flex-col items-center space-y-6"
                  id="contact-success-screen"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-950/20 border border-gold-800 flex items-center justify-center text-gold-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-white font-normal">Brief Transmission Secured</h3>
                    <p className="font-sans text-xs text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-medium">{formData.name}</span>. Your creative portfolio inquiry has been successfully serialized and routed to our central inbox.
                    </p>
                  </div>

                  {/* Fictional ticket details */}
                  <div className="border border-neutral-900 bg-[#0d0d0d] p-5 rounded-lg max-w-md w-full text-left font-mono text-[10px] text-neutral-400 space-y-2">
                    <div className="flex justify-between border-b border-neutral-900 pb-2 text-[11px] text-gold-400 font-bold">
                      <span>REFERENCE TICKET</span>
                      <span>{referenceId}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>EMAIL TARGET:</span>
                      <span className="text-white">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>COMMISSION:</span>
                      <span className="text-white">{formData.category} SESSION</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BUDGET RANGE:</span>
                      <span className="text-white">${formData.budget} USD</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-neutral-900 text-neutral-500">
                      <span>TIMESTAMP:</span>
                      <span>{new Date().toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={resetForm}
                    className="mt-6 px-6 py-2.5 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white font-sans text-[10px] tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer"
                  >
                    SUBMIT NEW BRIEF
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
