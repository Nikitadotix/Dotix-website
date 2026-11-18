import Link from 'next/link';

export const metadata = {
  title: 'Case Studies | Dotix',
  description: 'In-depth case studies of projects and products built by Dotix.',
};

export default function CaseStudiesPage() {
  return (
    <section className="py-24 bg-background-primary min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Case Studies
        </h1>
        <p className="text-xl text-text-secondary mb-8">
          Detailed case studies coming soon.
        </p>
        <p className="text-text-muted mb-8">
          In the meantime, visit our <Link href="/projects" className="text-accent hover:text-accent-hover">Projects page</Link> to see our work.
        </p>
      </div>
    </section>
  );
}
