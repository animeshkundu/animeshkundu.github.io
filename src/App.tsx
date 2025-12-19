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
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#121212] text-[#1a1814] dark:text-[#e8e6e3] transition-colors duration-300">
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
