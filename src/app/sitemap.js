import { products } from '../data/products.js';
import { blogPosts } from '../data/blog.js';

const baseUrl = 'https://dotix.io';

const staticPages = [
  '',
  '/about',
  '/contact',
  '/projects',
  '/case-studies',
  '/career',
  '/blog',
  '/services/saas-development',
  '/services/web-development',
  '/services/mobile-app-development',
  '/legal/privacy-policy',
  '/legal/cookie-policy',
  '/legal/terms-and-conditions',
];

export default function sitemap() {
  const urls = [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: path === '' ? 1 : 0.8,
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/projects/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];

  return urls;
}
