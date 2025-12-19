# Animesh Kundu - Portfolio Website

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fanimeshkundu.github.io)](https://animeshkundu.github.io)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Personal portfolio website showcasing my open source projects, web tools, and developer utilities.

🔗 **Live Site**: [https://animeshkundu.github.io](https://animeshkundu.github.io)

## Features

### 🎨 Modern Design
- Clean, professional interface with Tailwind CSS
- Responsive design that works on all devices
- Dark mode with system preference detection
- Smooth animations and transitions

### 🚀 Dynamic Content
- Automatic repository fetching from GitHub API
- Real-time filtering by programming language
- Live demo embeds for web tools
- Session storage caching to minimize API calls

### 🔍 SEO Optimized
- Complete meta tags for search engines
- Open Graph and Twitter Card support
- Schema.org structured data (Person, WebSite, SoftwareApplication, FAQPage)
- Semantic HTML5 structure
- Sitemap.xml and robots.txt

### ♿ Accessible
- WCAG 2.1 compliant
- Keyboard navigation support
- Screen reader friendly
- Skip to main content link
- Proper ARIA labels

## Featured Projects

### Recent Projects (2023-2025)
- **[Mermaid Editor](https://animeshkundu.github.io/mermaid-editor)** - Online Mermaid diagram editor with Monaco editor
- **[Gist Preview](https://animeshkundu.github.io/gist-preview)** - GitHub Gist renderer with React/JSX support
- **[SAZ Viewer](https://animeshkundu.github.io/saz-viewer)** - Fiddler SAZ file viewer (100% client-side)
- **[HAR Viewer](https://animeshkundu.github.io/har-viewer)** - HAR file analyzer with waterfall charts
- **[Bing HTTP MCP](https://github.com/animeshkundu/bing-http-mcp)** - Model Context Protocol server for Bing APIs

### Popular Projects
- **[YouTube Audio](https://github.com/animeshkundu/youtube-audio)** - Firefox extension (167+ stars, 39 forks)
- **[Torrent DL](https://github.com/animeshkundu/torrent-dl)** - Python streaming torrent client (33 stars)
- **[PyFlix](https://github.com/animeshkundu/pyflix)** - Torrent streaming library (14 stars)

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (via CDN)
- **Fonts**: Inter (Google Fonts)
- **APIs**: GitHub REST API
- **Hosting**: GitHub Pages

## Project Structure

```
/
├── index.html          # Main portfolio page
├── styles.css          # Custom styles beyond Tailwind
├── app.js              # Dynamic repository fetching & interactions
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Crawler directives
└── README.md           # This file
```

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/animeshkundu/animeshkundu.github.io.git
cd animeshkundu.github.io
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

3. Visit `http://localhost:8000` in your browser

## Performance

- **Load Time**: < 3 seconds
- **Lazy Loading**: iframes and images below the fold
- **Caching**: Repository data cached for 1 hour
- **Optimization**: Preconnect to external domains

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contact

- **GitHub**: [@animeshkundu](https://github.com/animeshkundu)
- **LinkedIn**: [animeshkundu](https://www.linkedin.com/in/animeshkundu)
- **Email**: anik.edu@gmail.com

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Tailwind CSS
