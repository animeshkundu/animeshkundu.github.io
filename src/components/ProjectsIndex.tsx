import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, ArrowRight } from 'lucide-react';
import { 
  ALL_PROJECTS, 
  CATEGORY_LABELS, 
  CATEGORY_DESCRIPTIONS,
  type ProjectData 
} from '../lib/projects';
import { getLanguageColor } from '../lib/github';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SEOHead } from './SEOHead';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <motion.article
      variants={item}
      className="group p-6 sm:p-5 bg-white dark:bg-dark-bg-surface border border-[#1a1814]/6 dark:border-[#3a3a3a] hover:border-[#1a1814]/12 dark:hover:border-[#4a4a4a] transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: getLanguageColor(project.language) }}
          />
          <span className="text-xs text-[#1a1814]/50 dark:text-[#a0a0a0]">
            {project.language}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#1a1814]/40 dark:text-[#707070]">
          {project.stars > 0 && (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {project.stars}
            </span>
          )}
          {project.forks > 0 && (
            <span className="flex items-center gap-1">
              <GitFork className="w-3 h-3" />
              {project.forks}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <Link to={`/project/${project.id}`}>
        <h3 className="text-lg font-medium text-[#1a1814] dark:text-[#e8e6e3] mb-2 group-hover:text-primary-600 dark:group-hover:text-[#f0927a] transition-colors">
          {project.title}
        </h3>
      </Link>

      {/* Tagline */}
      <p className="text-sm text-[#1a1814]/50 dark:text-[#a0a0a0] mb-4 line-clamp-2">
        {project.tagline}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-1 mb-4">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 bg-[#1a1814]/4 dark:bg-[#2a2a2a] text-[#1a1814]/60 dark:text-[#a0a0a0] text-xs"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap items-center gap-4 text-sm sm:text-xs pt-3 border-t border-[#1a1814]/6 dark:border-[#3a3a3a]">
        <Link
          to={`/project/${project.id}`}
          className="flex items-center gap-1 text-primary-600 dark:text-[#f0927a] hover:text-primary-700 dark:hover:text-[#ffb399] transition-colors font-medium"
        >
          Learn more
          <ArrowRight className="w-3 h-3" />
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#1a1814]/50 dark:text-[#a0a0a0] hover:text-[#1a1814] dark:hover:text-[#e8e6e3] transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          Source
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#1a1814]/50 dark:text-[#a0a0a0] hover:text-[#1a1814] dark:hover:text-[#e8e6e3] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Demo
          </a>
        )}
      </div>
    </motion.article>
  );
}

function CategorySection({ 
  category, 
  projects 
}: { 
  category: ProjectData['category']; 
  projects: ProjectData[];
}) {
  if (projects.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#1a1814] dark:text-[#e8e6e3] mb-2">
          {CATEGORY_LABELS[category]}
        </h2>
        <p className="text-[#1a1814]/50 dark:text-[#a0a0a0]">
          {CATEGORY_DESCRIPTIONS[category]}
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}

export function ProjectsIndex() {
  // Group projects by category
  const categories: ProjectData['category'][] = [
    'web-tools',
    'browser-extensions',
    'cli-tools',
    'python-utilities',
    'php',
    'other'
  ];

  const projectsByCategory = categories.reduce((acc, category) => {
    acc[category] = ALL_PROJECTS.filter(p => p.category === category);
    return acc;
  }, {} as Record<ProjectData['category'], ProjectData[]>);

  const totalProjects = ALL_PROJECTS.length;
  const totalStars = ALL_PROJECTS.reduce((sum, p) => sum + p.stars, 0);

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-bg-base text-[#1a1814] dark:text-dark-text-primary">
      <SEOHead 
        title="All Projects | Animesh Kundu"
        description={`Browse ${totalProjects} open source projects by Animesh Kundu. Web tools, browser extensions, Python utilities, and more.`}
        url="https://animeshkundu.github.io/projects"
      />
      <Navbar />

      <main className="pt-20 pb-16">
        {/* Hero */}
        <section className="py-12 lg:py-20 bg-white dark:bg-dark-bg-alt border-b border-[#1a1814]/6 dark:border-[#3a3a3a]">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Breadcrumb */}
              <nav className="mb-6 flex items-center gap-2 text-sm">
                <Link
                  to="/"
                  className="text-[#1a1814]/50 dark:text-[#a0a0a0] hover:text-primary-600 dark:hover:text-[#f0927a] transition-colors"
                >
                  Home
                </Link>
                <span className="text-[#1a1814]/30 dark:text-[#707070]">/</span>
                <span className="text-[#1a1814]/70 dark:text-[#c0c0c0]">Projects</span>
              </nav>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                All Projects
              </h1>
              <p className="text-lg text-[#1a1814]/60 dark:text-[#a0a0a0] max-w-2xl mb-6">
                A collection of {totalProjects} open source projects spanning web tools, browser extensions, 
                command-line utilities, and more. All built with a focus on developer experience.
              </p>
              <div className="flex items-center gap-6 text-sm text-[#1a1814]/50 dark:text-[#a0a0a0]">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#1a1814] dark:text-[#e8e6e3]">{totalProjects}</span>
                  projects
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span className="font-medium text-[#1a1814] dark:text-[#e8e6e3]">{totalStars}</span>
                  total stars
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects by Category */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            {categories.map((category) => (
              <CategorySection
                key={category}
                category={category}
                projects={projectsByCategory[category]}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
