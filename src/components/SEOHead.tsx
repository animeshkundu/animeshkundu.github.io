import { useEffect } from 'react';
import type { ProjectData } from '../lib/projects';

interface SEOHeadProps {
  project?: ProjectData;
  title?: string;
  description?: string;
  url?: string;
}

/**
 * Component to manage document head for SEO
 * Updates title, meta description, and Open Graph tags
 */
export function SEOHead({ project, title, description, url }: SEOHeadProps) {
  useEffect(() => {
    const baseUrl = 'https://animeshkundu.github.io';
    
    // Determine page-specific values
    const pageTitle = project 
      ? `${project.title} - ${project.tagline} | Animesh Kundu`
      : title || 'Animesh Kundu - Full-Stack Developer & Open Source Creator';
    
    const pageDescription = project
      ? `${project.description} Built with ${project.technologies.slice(0, 3).join(', ')}. ${project.features.slice(0, 3).join('. ')}.`
      : description || 'Full-stack developer building innovative web tools, browser extensions, and developer utilities.';
    
    const pageUrl = project
      ? `${baseUrl}/project/${project.id}`
      : url || baseUrl;

    // Update document title
    document.title = pageTitle;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateMeta('description', pageDescription);
    updateMeta('keywords', project 
      ? `${project.title}, ${project.topics.join(', ')}, Animesh Kundu, ${project.language}`
      : 'Animesh Kundu, developer, open source, TypeScript, React, Python'
    );

    // Open Graph tags
    updateMeta('og:title', pageTitle, true);
    updateMeta('og:description', pageDescription, true);
    updateMeta('og:url', pageUrl, true);
    updateMeta('og:type', project ? 'article' : 'website', true);

    // Twitter tags
    updateMeta('twitter:title', pageTitle);
    updateMeta('twitter:description', pageDescription);
    updateMeta('twitter:url', pageUrl);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl);

    // Add structured data for project pages
    if (project) {
      let script = document.querySelector('#project-schema') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = 'project-schema';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: project.title,
        description: project.description,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: project.demoUrl ? 'Web Browser' : 'Any',
        url: project.demoUrl || project.githubUrl,
        codeRepository: project.githubUrl,
        programmingLanguage: project.language,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        author: {
          '@type': 'Person',
          name: 'Animesh Kundu',
          url: 'https://animeshkundu.github.io'
        }
      };

      script.textContent = JSON.stringify(schema);
    }

    // Cleanup function
    return () => {
      // Remove project schema when navigating away
      const script = document.querySelector('#project-schema');
      if (script) {
        script.remove();
      }
    };
  }, [project, title, description, url]);

  return null;
}
