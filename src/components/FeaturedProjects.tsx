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
    <section id="projects" className="section-space bg-[#fffdfa] dark:bg-[#151412]">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 grid gap-5 lg:mb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <span className="eyebrow mb-4">Featured Work</span>
            <h2 className="section-title text-[#1a1814] dark:text-[#f2efea]">
              Selected Projects
            </h2>
          </div>
          <p className="section-subtitle max-w-xl lg:justify-self-end lg:text-right">
            Open source developer tools solving real problems, designed to feel immediate, private, and dependable.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6"
        >
          {featuredProjects.map((project, index) => {
            const preview = getProjectPreview(project.id);
            
            return (
              <motion.article
                key={project.id}
                variants={item}
                className="group relative overflow-hidden rounded-[2rem] border border-[#1a1814]/[0.08] bg-[#f6f3ee] p-4 shadow-[0_18px_60px_-45px_rgba(26,24,20,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1a1814]/15 hover:shadow-[0_28px_70px_-40px_rgba(26,24,20,0.45)] dark:border-white/[0.08] dark:bg-[#1b1a18] dark:shadow-[0_18px_60px_-45px_rgba(0,0,0,0.9)] dark:hover:border-white/15 sm:p-5 lg:p-6"
              >
                {preview && (
                  <div className="mb-6 overflow-hidden rounded-[1.35rem] border border-[#1a1814]/[0.06] bg-[#ebe6df] shadow-inner dark:border-white/[0.06] dark:bg-[#11100f]">
                    {preview}
                  </div>
                )}

                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getLanguageColor(project.language) }}
                    />
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#746e66] dark:text-[#aaa49c]">
                      {project.language}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#6f6a62] dark:text-[#908a82]">
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
                    <span className="font-mono text-[0.625rem]">0{index + 1}</span>
                  </div>
                </div>

                <h3 className="mb-3 text-2xl font-semibold tracking-[-0.035em] text-[#1a1814] transition-colors group-hover:text-primary-700 dark:text-[#f2efea] dark:group-hover:text-[#ef8b70] lg:text-3xl">
                  {project.title}
                </h3>
                
                <p className="mb-5 line-clamp-3 leading-relaxed text-[#69635b] dark:text-[#b7b1a9]">
                  {project.description}
                </p>

                {project.highlights && (
                  <p className="mb-6 text-sm text-[#6f6a62] dark:text-[#99938b]">
                    {project.highlights.slice(0, 3).join(' · ')}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#1a1814]/[0.07] bg-white/60 px-2.5 py-1 text-[0.7rem] font-medium text-[#625d56] dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-[#b7b1a9]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 border-t border-[#1a1814]/[0.07] pt-4 dark:border-white/[0.07]">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-[#625d56] transition-colors hover:bg-white hover:text-[#1a1814] dark:text-[#b7b1a9] dark:hover:bg-white/[0.07] dark:hover:text-[#f2efea]"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-50 dark:text-[#ef8b70] dark:hover:bg-primary-500/10 dark:hover:text-[#ffb399]"
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center sm:justify-start"
        >
          <a
            href="#repositories"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#1a1814]/10 px-5 text-sm font-medium text-[#625d56] transition-colors hover:border-primary-500/40 hover:bg-primary-50 hover:text-primary-700 dark:border-white/10 dark:text-[#b7b1a9] dark:hover:border-primary-400/30 dark:hover:bg-primary-500/10 dark:hover:text-[#ef8b70]"
          >
            View all repositories
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
