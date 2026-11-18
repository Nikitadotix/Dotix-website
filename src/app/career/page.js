import Link from 'next/link';

export const metadata = {
  title: 'Career | Dotix',
  description: 'Join the Dotix team and build great software.',
};

export default function CareerPage() {
  return (
    <section className="py-24 bg-background-primary min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Join Our Team
        </h1>
        <p className="text-xl text-text-secondary mb-8">
          We're always looking for talented people to join us.
        </p>
        <p className="text-text-muted mb-8">
          Open positions will be listed here. For now, send your resume to <a href="mailto:hello@dotix.io" className="text-accent hover:text-accent-hover">hello@dotix.io</a>.
        </p>
      </div>
    </section>
  );
}
