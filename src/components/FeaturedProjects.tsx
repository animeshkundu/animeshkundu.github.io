import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork, ArrowUpRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '../lib/constants';
import { getLanguageColor } from '../lib/github';
import { OopsTerminalAnimation, YouTubeAudioPreview } from './ProjectPreviews';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Get preview component for a project
function getProjectPreview(projectId: string) {
  switch (projectId) {
    case 'oops':
      return <OopsTerminalAnimation />;
    case 'youtube-audio':
      return <YouTubeAudioPreview />;
    default:
      return null;
  }
}

export function FeaturedProjects() {
  const featuredProjects = FEATURED_PROJECTS.filter((p) => p.featured);

  return (
    <section id="projects" className="py-20 lg:py-28 bg-white dark:bg-dark-bg-alt">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header - left aligned, editorial */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary-600 dark:text-[#f0927a] mb-3 block">
            Featured Work
          </span>
          <h2 className="section-title text-[#1a1814] dark:text-[#e8e6e3] mb-4">
            Selected Projects
          </h2>
          <p className="section-subtitle text-left mx-0 max-w-lg">
            Open source developer tools solving real problems, built with modern technologies.
          </p>
        </motion.div>

        {/* Projects Grid - asymmetric layout */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
        >
          {featuredProjects.map((project, index) => {
            const preview = getProjectPreview(project.id);
            const hasDemo = !!project.demoUrl;
            
            return (
              <motion.article
                key={project.id}
                variants={item}
                className={`group relative bg-[#faf8f5] dark:bg-dark-bg-surface border border-[#1a1814]/6 dark:border-[#3a3a3a] p-6 lg:p-8 transition-all duration-200 hover:border-[#1a1814]/12 dark:hover:border-dark-border-hover ${
                  index === 0 ? 'lg:row-span-2' : ''
                }`}
              >
                {/* Preview Animation for non-demo projects */}
                {preview && !hasDemo && (
                  <div className="mb-5">
                    {preview}
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getLanguageColor(project.language) }}
                    />
                    <span className="text-xs font-medium text-[#1a1814]/50 dark:text-[#a0a0a0] uppercase tracking-wide">
                      {project.language}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#1a1814]/40 dark:text-[#707070]">
                    {project.stars && project.stars > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        <span>{project.stars}</span>
                      </div>
                    )}
                    {project.forks && project.forks > 0 && (
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        <span>{project.forks}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-semibold text-[#1a1814] dark:text-[#e8e6e3] mb-3 group-hover:text-primary-600 dark:group-hover:text-[#f0927a] transition-colors">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-[#1a1814]/60 dark:text-dark-text-secondary mb-5 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Highlights as inline text */}
                {project.highlights && (
                  <p className="text-sm text-[#1a1814]/40 dark:text-[#a0a0a0] mb-6">
                    {project.highlights.slice(0, 3).join(' · ')}
                  </p>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-[#1a1814]/4 dark:bg-[#2a2a2a] text-[#1a1814]/70 dark:text-dark-text-secondary text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-[#1a1814]/6 dark:border-[#3a3a3a]">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-[#1a1814]/70 dark:text-dark-text-secondary hover:text-[#1a1814] dark:hover:text-[#e8e6e3] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-[#f0927a] hover:text-primary-700 dark:hover:text-[#ffb399] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <a
            href="#repositories"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1a1814]/60 dark:text-dark-text-secondary hover:text-primary-600 dark:hover:text-[#f0927a] transition-colors"
          >
            View all repositories
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
