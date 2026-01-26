import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import {
  Navbar,
  Hero,
  FeaturedProjects,
  LiveDemos,
  AllRepositories,
  About,
  Contact,
  FAQ,
  Footer,
  ProjectPage,
  ProjectsIndex,
} from './components';

// Get the base path from the environment variable (set during build)
// Remove trailing slash and return undefined for root path
const rawBasePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const isSubdirectory = rawBasePath !== '';

function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-bg-base text-[#1a1814] dark:text-dark-text-primary transition-colors duration-300">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content">
        <Hero />
        <FeaturedProjects />
        <LiveDemos />
        <AllRepositories />
        <About />
        <FAQ />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsIndex />} />
      <Route path="/project/:slug" element={<ProjectPage />} />
    </Routes>
  );
}

function App() {
  // Use HashRouter for subdirectory deployments (preview builds) to handle GitHub Pages 404 limitation
  // Use BrowserRouter for root deployments (production) for cleaner URLs
  if (isSubdirectory) {
    return (
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
