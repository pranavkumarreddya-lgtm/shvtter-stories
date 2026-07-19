import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { blogPosts } from '../data';
import { BlogPost } from '../types';

export default function Blog() {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  // Helper function to render simple mock markdown blocks
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('###')) {
        return (
          <h4 key={index} className="font-serif text-lg text-white mt-6 mb-3 font-semibold">
            {paragraph.replace('###', '').trim()}
          </h4>
        );
      }
      if (paragraph.startsWith('-') || paragraph.startsWith('*')) {
        return (
          <ul key={index} className="list-disc pl-6 space-y-2 my-4 text-[13px] text-neutral-300 font-light">
            {paragraph.split('\n').map((li, liIdx) => (
              <li key={liIdx}>{li.replace(/^[-*]\s*/, '').trim()}</li>
            ))}
          </ul>
        );
      }
      if (paragraph.match(/^\d+\./)) {
        return (
          <ol key={index} className="list-decimal pl-6 space-y-2 my-4 text-[13px] text-neutral-300 font-light">
            {paragraph.split('\n').map((li, liIdx) => (
              <li key={liIdx}>{li.replace(/^\d+\.\s*/, '').trim()}</li>
            ))}
          </ol>
        );
      }
      return (
        <p key={index} className="font-sans text-[13px] md:text-[14px] leading-relaxed text-neutral-300 font-light mb-4">
          {paragraph}
        </p>
      );
    });
  };

  const blogContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const blogItemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="blog" className="py-24 px-6 md:px-12 lg:px-24 bg-black/30 border-t border-neutral-900/50 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <span className="font-mono text-[9px] tracking-[0.35em] text-gold-400 font-semibold uppercase">
              WRITINGS & EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white mt-3">
              The Field Journal
            </h2>
          </div>
          <p className="font-sans text-xs text-neutral-500 max-w-xs mt-4 md:mt-0 font-light leading-relaxed">
            Written records of optical studies, philosophical shifts, and notes from travels.
          </p>
        </motion.div>

        {/* Blog Posts list */}
        <motion.div 
          variants={blogContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-6" 
          id="blog-posts-list"
        >
          {blogPosts.map((post) => {
            const isExpanded = expandedPostId === post.id;
            return (
              <motion.article 
                key={post.id}
                variants={blogItemVariants}
                className="bg-neutral-950/60 border border-neutral-900 hover:border-neutral-800 transition-all duration-300 rounded-lg overflow-hidden"
              >
                {/* Header Section (Clickable) */}
                <div 
                  onClick={() => toggleExpand(post.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      toggleExpand(post.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-controls={`${post.id}-content`}
                  aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${post.title}`}
                  className="p-6 md:p-8 cursor-pointer flex justify-between items-start gap-4 select-none"
                >
                  <div className="space-y-3 flex-grow">
                    {/* Tags line */}
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-neutral-500">
                      <span className="text-gold-400 border border-gold-900/30 bg-gold-950/20 px-2 py-0.5 uppercase tracking-wider font-bold">
                        {post.category}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h3 className="font-serif text-xl md:text-2xl font-normal text-white group-hover:text-gold-300 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt Summary */}
                    {!isExpanded && (
                      <p className="font-sans text-[12px] md:text-[13px] text-neutral-400 font-light leading-relaxed max-w-2xl pt-1">
                        {post.summary}
                      </p>
                    )}
                  </div>

                  {/* Expand/Collapse Chevron Indicator */}
                  <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Content Drawer */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`${post.id}-content`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="border-t border-neutral-900/80"
                    >
                      <div className="p-6 md:p-8 md:pt-4 bg-neutral-950/20">
                        {/* Divider */}
                        <div className="w-full h-[1px] bg-neutral-900 my-4" />
                        
                        {/* Body copy render */}
                        <div className="prose prose-invert max-w-none pt-2">
                          {renderContent(post.content)}
                        </div>

                        {/* Collapsing prompt at the bottom */}
                        <div className="flex justify-end mt-8 pt-4 border-t border-neutral-900/80">
                          <button
                            type="button"
                            onClick={() => toggleExpand(post.id)}
                            className="text-[10px] font-mono tracking-widest text-neutral-500 hover:text-white transition-colors cursor-pointer"
                          >
                            [ COLLAPSE JOURNAL ]
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </motion.article>
              );
            })}
        </motion.div>
      </div>
    </section>
  );
}
