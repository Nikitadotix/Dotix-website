import { blogPosts } from '../../data/blog.js';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | Dotix',
  description: 'Insights, tutorials, and thoughts on software development, product building, and technology.',
};

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-background-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Insights & Thoughts
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            Our team shares knowledge on software development, product building, and technology trends.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-24 bg-background-secondary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group p-8 rounded-lg bg-background-card border border-border hover:border-accent/50 transition-all duration-300 hover:bg-background-elevated"
                >
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-accent/10 text-accent mb-4">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-24 bg-background-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">All Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group p-6 rounded-lg bg-background-card border border-border hover:border-accent/50 transition-all duration-300 hover:bg-background-elevated"
              >
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-background-elevated text-text-muted mb-4">
                  {post.category}
                </span>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-secondary mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
