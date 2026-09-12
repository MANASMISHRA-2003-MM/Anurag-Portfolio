import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allProjects, WORK_CATEGORIES, type Project } from '../assets/portfolio';
import OptimizedVideoCard from '../components/OptimizedVideoCard';
import VideoModal from '../components/VideoModal';

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      return selectedCategory === 'All' || p.category === selectedCategory;
    });
  }, [selectedCategory]);

  return (
    <div className="work-page">
      {/* Work Page Header */}
      <section className="work-page__hero">
        <div className="work-page__container">
          <Link to="/" className="work-page__back-btn">
            <ArrowLeft size={16} /> Back to Overview
          </Link>
          
          <motion.div 
            className="work-page__title-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="kicker">Full Portfolio &amp; Showreel Feed</p>
            <h1>Selected Work &amp;<br /><em>Video Archives.</em></h1>
            <p className="work-page__subtitle">
              An Instagram/Reels-style interactive gallery of commercial cuts, sports hype edits, motion graphics, films, sound scores, and social-first video storytelling.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <div className="work-page__stats">
            <div className="work-page__stat-item">
              <span className="work-page__stat-num">{allProjects.length}</span>
              <span className="work-page__stat-label">Demo Projects</span>
            </div>
            <div className="work-page__stat-item">
              <span className="work-page__stat-num">{WORK_CATEGORIES.length - 1}</span>
              <span className="work-page__stat-label">Categories</span>
            </div>
            <div className="work-page__stat-item">
              <span className="work-page__stat-num">4K / HD</span>
              <span className="work-page__stat-label">Original Drive Quality</span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="work-page__filter-bar">
            <div className="work-page__filter-scroll">
              {WORK_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`work-page__filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                  {cat === 'All' ? (
                    <span className="work-page__chip-count">{allProjects.length}</span>
                  ) : (
                    <span className="work-page__chip-count">
                      {allProjects.filter((p) => p.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Feed & Grid */}
      <section className="work-page__feed-section">
        <div className="work-page__container">
          <div className="work-page__feed-header">
            <h2>
              {selectedCategory === 'All' ? 'All Portfolio Edits' : selectedCategory}
              <span className="work-page__count-badge">{filteredProjects.length} items</span>
            </h2>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="work-page__empty">
              <Film size={48} opacity={0.4} />
              <p>No projects found matching this category.</p>
              <button 
                className="button button--light"
                onClick={() => setSelectedCategory('All')}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div className="work-page__reels-grid" layout>
              <AnimatePresence>
                {filteredProjects.map((project, idx) => (
                  <OptimizedVideoCard
                    key={project.id}
                    project={project}
                    index={idx}
                    variant="feed"
                    onSelect={(p) => setActiveModalProject(p)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
        videoSource={activeModalProject?.driveId}
        title={activeModalProject?.title}
        category={activeModalProject?.category}
      />
    </div>
  );
}
