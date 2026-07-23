import { identity } from '../data/identity';
import type { Essay, Project, Tool } from '../data/types';
import { canonicalUrl } from './urls';

const personId = `${identity.url}/#person`;
const websiteId = `${identity.url}/#website`;

export const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: identity.name,
      givenName: identity.givenName,
      familyName: identity.familyName,
      url: identity.url,
      image: identity.image,
      sameAs: identity.sameAs,
      worksFor: {
        '@type': 'Organization',
        name: identity.worksFor,
      },
      homeLocation: {
        '@type': 'Place',
        name: identity.location,
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'Animesh Kundu public work index',
      url: identity.url,
      author: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${identity.url}/#profile`,
      name: 'Animesh Kundu',
      url: identity.url,
      mainEntity: { '@id': personId },
      isPartOf: { '@id': websiteId },
    },
    {
      '@type': 'CreativeWork',
      name: 'cmd-correct',
      description:
        'A small command correction model trained on roughly 135,000 synthetic examples and published in GGUF form.',
      url: 'https://huggingface.co/animeshkundu/cmd-correct',
      creator: { '@id': personId },
    },
  ],
};

export const projectSchema = (project: Project) => {
  const base = {
    '@type': project.schemaType,
    name: project.title,
    description: project.summary,
    url: canonicalUrl(`/project/${project.slug}/`),
    codeRepository: project.sourceUrl,
    author: { '@id': personId },
    dateModified: project.updatedAt,
  };

  const artifact =
    project.schemaType === 'SoftwareApplication'
      ? {
          ...base,
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        }
      : {
          ...base,
          programmingLanguage: project.technologies[0] ?? 'Multiple',
        };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      artifact,
      ...(project.creativeWork
        ? [
            {
              '@type': 'CreativeWork',
              name: project.creativeWork.name,
              description: project.creativeWork.description,
              url: project.creativeWork.url,
              creator: { '@id': personId },
            },
          ]
        : []),
    ],
  };
};

export const projectsSchema = (projects: Project[]) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Selected work by Animesh Kundu',
  url: canonicalUrl('/projects/'),
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.title,
      url: canonicalUrl(`/project/${project.slug}/`),
    })),
  },
});

export const writingSchema = (essays: Essay[]) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Writing by Animesh Kundu',
      url: canonicalUrl('/writing/'),
      author: { '@id': personId },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: essays.map((essay, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: essay.url,
          name: essay.title,
        })),
      },
    },
    ...essays.slice(0, 12).map((essay) => ({
      '@type': 'BlogPosting',
      headline: essay.title,
      description: essay.summary,
      datePublished: essay.publishedAt,
      url: essay.url,
      author: { '@id': personId },
    })),
  ],
});

export const toolsSchema = (tools: Tool[]) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Browser tools by Animesh Kundu',
  url: canonicalUrl('/tools/'),
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.purpose,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web Browser',
        url: tool.fallbackUrl,
      },
    })),
  },
});

export const collectionSchema = (
  name: string,
  path: string,
  urls: Array<{ name: string; url: string }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  url: canonicalUrl(path),
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: urls.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  },
});

export const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Animesh Kundu',
  url: canonicalUrl('/contact/'),
  mainEntity: { '@id': personId },
};
