import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Star, 
  GitFork,
  Terminal,
  Copy,
  Check,
  Code2,
  Package,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { getProjectBySlug, CATEGORY_LABELS, type ProjectData } from '../lib/projects';
import { getLanguageColor } from '../lib/github';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SEOHead } from './SEOHead';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 p-1.5 rounded bg-[#1a1814]/10 dark:bg-white/10 hover:bg-[#1a1814]/20 dark:hover:bg-white/20 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4 text-[#1a1814]/50 dark:text-white/50" />
      )}
    </button>
  );
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  return (
    <div className="relative group">
      <pre className="bg-[#1a1814] dark:bg-[#0a0a0a] text-[#e8e6e3] p-4 rounded-lg overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
      {language && (
        <span className="absolute left-3 top-2 text-xs text-[#e8e6e3]/40">{language}</span>
      )}
    </div>
  );
}

function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-bg-base">
      <Navbar />
      <main className="container mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl font-semibold text-[#1a1814] dark:text-[#e8e6e3] mb-4">
          Project Not Found
        </h1>
        <p className="text-[#1a1814]/60 dark:text-[#a0a0a0] mb-8">
          The project you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1814] dark:bg-[#e8e6e3] text-[#faf8f5] dark:text-[#1a1814] font-medium rounded"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function StatusBadge({ status }: { status: ProjectData['status'] }) {
  const colors = {
    active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    maintained: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    archived: 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400',
    experimental: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
  };

  const labels = {
    active: 'Actively Developed',
    maintained: 'Maintained',
    archived: 'Archived',
    experimental: 'Experimental'
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <ProjectNotFound />;
  }

  const installCode = project.installation?.join('\n') || '';

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-bg-base text-[#1a1814] dark:text-dark-text-primary">
      <SEOHead project={project} />
      <Navbar />

      <main className="pt-20 pb-16">
        {/* Hero Section */}
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
                <Link
                  to="/projects"
                  className="text-[#1a1814]/50 dark:text-[#a0a0a0] hover:text-primary-600 dark:hover:text-[#f0927a] transition-colors"
                >
                  Projects
                </Link>
                <span className="text-[#1a1814]/30 dark:text-[#707070]">/</span>
                <span className="text-[#1a1814]/70 dark:text-[#c0c0c0]">{project.title}</span>
              </nav>

              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(project.language) }}
                    />
                    <span className="text-sm font-medium text-[#1a1814]/60 dark:text-[#a0a0a0]">
                      {project.language}
                    </span>
                    <span className="text-[#1a1814]/30 dark:text-[#707070]">•</span>
                    <span className="text-sm text-[#1a1814]/50 dark:text-[#a0a0a0]">
                      {CATEGORY_LABELS[project.category]}
                    </span>
                    <StatusBadge status={project.status} />
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                    {project.title}
                  </h1>

                  <p className="text-lg sm:text-xl text-[#1a1814]/70 dark:text-[#c0c0c0] mb-6">
                    {project.tagline}
                  </p>

                  {/* Stats */}
                  {(project.stars > 0 || project.forks > 0) && (
                    <div className="flex items-center gap-4 text-sm text-[#1a1814]/60 dark:text-[#a0a0a0]">
                      {project.stars > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4" />
                          <span>{project.stars} stars</span>
                        </div>
                      )}
                      {project.forks > 0 && (
                        <div className="flex items-center gap-1.5">
                          <GitFork className="w-4 h-4" />
                          <span>{project.forks} forks</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Try Live Demo
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github className="w-4 h-4" />
                    View Source
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="lg:col-span-2 space-y-10"
              >
                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary-600 dark:text-[#f0927a]" />
                    About
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    {project.longDescription.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-[#1a1814]/70 dark:text-[#c0c0c0] leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Features */}
                {project.features.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary-600 dark:text-[#f0927a]" />
                      Features
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-[#f0927a] flex-shrink-0" />
                          <span className="text-[#1a1814]/70 dark:text-[#c0c0c0]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Installation */}
                {project.installation && project.installation.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-primary-600 dark:text-[#f0927a]" />
                      Installation
                    </h2>
                    <CodeBlock code={installCode} language="bash" />
                  </div>
                )}

                {/* Usage */}
                {project.usage && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary-600 dark:text-[#f0927a]" />
                      Usage
                    </h2>
                    <p className="text-[#1a1814]/70 dark:text-[#c0c0c0] leading-relaxed">
                      {project.usage}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Technologies */}
                <div className="p-6 bg-white dark:bg-dark-bg-surface border border-[#1a1814]/6 dark:border-[#3a3a3a] rounded-lg">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1a1814]/50 dark:text-[#a0a0a0] mb-4">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#1a1814]/5 dark:bg-[#2a2a2a] text-[#1a1814]/70 dark:text-[#c0c0c0] text-sm rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Topics */}
                {project.topics.length > 0 && (
                  <div className="p-6 bg-white dark:bg-dark-bg-surface border border-[#1a1814]/6 dark:border-[#3a3a3a] rounded-lg">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1a1814]/50 dark:text-[#a0a0a0] mb-4">
                      Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-[#f0927a] text-xs font-medium rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="p-6 bg-white dark:bg-dark-bg-surface border border-[#1a1814]/6 dark:border-[#3a3a3a] rounded-lg">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1a1814]/50 dark:text-[#a0a0a0] mb-4">
                    Links
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#1a1814]/70 dark:text-[#c0c0c0] hover:text-primary-600 dark:hover:text-[#f0927a] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub Repository
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#1a1814]/70 dark:text-[#c0c0c0] hover:text-primary-600 dark:hover:text-[#f0927a] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Back Link */}
                <Link
                  to="/projects"
                  className="flex items-center gap-2 text-sm text-[#1a1814]/50 dark:text-[#a0a0a0] hover:text-primary-600 dark:hover:text-[#f0927a] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  View all projects
                </Link>
              </motion.aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
