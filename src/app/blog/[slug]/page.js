import { blogPosts } from '../../../data/blog.js';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.id === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Dotix Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((p) => p.id === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="py-24 bg-background-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <span className="inline-block text-xs px-3 py-1 rounded-full bg-accent/10 text-accent mb-6">
            {post.category}
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-24 bg-background-secondary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-text-secondary leading-relaxed mb-6">
              {post.content}
            </p>
            <p className="text-text-secondary leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-text-secondary leading-relaxed mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">
              Key Takeaways
            </h2>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mb-6">
              <li>Understanding the fundamentals is crucial for success</li>
              <li>Iterative development leads to better products</li>
              <li>User feedback should guide your decisions</li>
              <li>Technical excellence matters in the long run</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mb-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-24 bg-background-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">More from the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group p-6 rounded-lg bg-background-card border border-border hover:border-accent/50 transition-all duration-300 hover:bg-background-elevated"
                >
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-background-elevated text-text-muted mb-4">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-text-secondary mb-4 leading-relaxed line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="text-sm text-text-muted">
                    {relatedPost.readTime}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
