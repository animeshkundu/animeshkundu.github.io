import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork, ChevronRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '../lib/constants';
import { getLanguageColor } from '../lib/github';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FeaturedProjects() {
  const featuredProjects = FEATURED_PROJECTS.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-semibold mb-4">
            Featured Work
          </span>
          <h2 className="section-title text-slate-900 dark:text-white mb-4">
            Projects I'm Proud Of
          </h2>
          <p className="section-subtitle">
            Developer tools that solve real problems — all open source and built with modern technologies
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProjects.map((project) => (
            <motion.article
              key={project.id}
              variants={item}
              className="group relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500"
            >
              {/* Gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: `${getLanguageColor(project.language)}20`,
                        color: getLanguageColor(project.language),
                      }}
                    >
                      {project.language}
                    </span>
                    {project.stars && project.stars > 0 && (
                      <div className="flex items-center gap-1 text-sm text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{project.stars}</span>
                      </div>
                    )}
                    {project.forks && project.forks > 0 && (
                      <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                        <GitFork className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Highlights */}
                {project.highlights && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.highlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#repositories"
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold transition-colors group"
          >
            View all repositories
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
