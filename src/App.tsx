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
} from './components';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
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

export default App;
