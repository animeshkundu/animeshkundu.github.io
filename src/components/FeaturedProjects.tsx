import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork, ArrowUpRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '../lib/constants';
import { getLanguageColor } from '../lib/github';
import { OopsTerminalAnimation, YouTubeAudioPreview, FixTerminalAnimation, TorrentDLPreview, PyFlixPreview, MediaServerPreview } from './ProjectPreviews';

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

const cardLayouts = [
  'lg:col-span-4',
  'lg:col-span-2',
  'lg:col-span-3',
  'lg:col-span-3',
  'lg:col-span-2',
  'lg:col-span-4',
] as const;

// Get unique preview component for each project
function getProjectPreview(projectId: string) {
  switch (projectId) {
    case 'oops':
      return <OopsTerminalAnimation />;
    case 'youtube-audio':
      return <YouTubeAudioPreview />;
    case 'fix':
      return <FixTerminalAnimation />;
    case 'torrent-dl':
      return <TorrentDLPreview />;
    case 'pyflix':
      return <PyFlixPreview />;
    case 'media-server':
      return <MediaServerPreview />;
    default:
      return null;
  }
}

export function FeaturedProjects() {
  const featuredProjects = FEATURED_PROJECTS.filter((p) => p.featured);

  return (
    <section id="projects" className="relative overflow-hidden bg-white py-24 dark:bg-dark-bg-alt lg:py-32">
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-primary-100/60 blur-3xl dark:bg-primary-950/10" />
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-20"
        >
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-[#f0927a]">
              Featured Work
            </span>
            <h2 className="section-title mb-4 text-[#1a1814] dark:text-[#e8e6e3]">
              Selected Projects
            </h2>
            <p className="section-subtitle mx-0 max-w-xl text-left">
              Open source developer tools solving real problems, built with modern technologies.
            </p>
          </div>
          <p className="max-w-[15rem] font-mono text-xs leading-relaxed text-[#1a1814]/40 dark:text-white/35">
            A working archive of small ideas turned into useful software.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6"
        >
          {featuredProjects.map((project, index) => {
            const preview = getProjectPreview(project.id);
            
            return (
              <motion.article
                key={project.id}
                variants={item}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#1a1814]/10 bg-[#faf8f5] transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-[0_24px_60px_-32px_rgba(51,39,28,0.45)] dark:border-[#3a3a3a] dark:bg-dark-bg-surface dark:hover:border-primary-800 ${cardLayouts[index] ?? 'lg:col-span-3'}`}
              >
                {preview && (
                  <div className="border-b border-[#1a1814]/8 bg-[#eee9e2] p-3 dark:border-white/10 dark:bg-[#171717] sm:p-4">
                    {preview}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: getLanguageColor(project.language) }}
                      />
                      <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#1a1814]/50 dark:text-[#a0a0a0]">
                        {project.language}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#1a1814]/40 dark:text-[#707070]">
                      {project.stars && project.stars > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" />
                          <span>{project.stars}</span>
                        </div>
                      )}
                      {project.forks && project.forks > 0 && (
                        <div className="flex items-center gap-1">
                          <GitFork className="h-3.5 w-3.5" />
                          <span>{project.forks}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3 flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl font-semibold tracking-tight text-[#1a1814] transition-colors group-hover:text-primary-600 dark:text-[#e8e6e3] dark:group-hover:text-[#f0927a] lg:text-3xl">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#1a1814]/25 dark:text-white/20">
                      0{index + 1}
                    </span>
                  </div>
                
                  <p className="mb-5 line-clamp-3 leading-relaxed text-[#1a1814]/60 dark:text-dark-text-secondary">
                    {project.description}
                  </p>

                  {project.highlights && (
                    <p className="mb-6 text-sm text-[#1a1814]/40 dark:text-[#a0a0a0]">
                      {project.highlights.slice(0, 3).join(' · ')}
                    </p>
                  )}

                  <div className="mb-7 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[#1a1814]/8 bg-white/60 px-2.5 py-1 text-[11px] font-medium text-[#1a1814]/65 dark:border-white/10 dark:bg-white/5 dark:text-dark-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-4 border-t border-[#1a1814]/8 pt-5 dark:border-white/10">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-[#1a1814]/70 transition-colors hover:text-[#1a1814] dark:text-dark-text-secondary dark:hover:text-[#e8e6e3]"
                    >
                      <Github className="h-4 w-4" />
                      Source
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-[#f0927a] dark:hover:text-[#ffb399]"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
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
          className="mt-12 text-center"
        >
          <a
            href="#repositories"
            className="inline-flex items-center gap-2 rounded-full border border-[#1a1814]/10 px-5 py-3 text-sm font-medium text-[#1a1814]/60 transition-colors hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:text-dark-text-secondary dark:hover:border-primary-800 dark:hover:text-[#f0927a]"
          >
            View all repositories
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
