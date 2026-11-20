export const metadata = {
  title: 'Career | Dotix',
  description: 'Join the Dotix team and build great software.',
};

export default function CareerPage() {
  return (
    <section className="py-16 sm:py-24 bg-background-primary min-h-[70vh] flex items-center">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">
          Join Our Team
        </h1>
        <p className="text-lg sm:text-xl text-text-secondary mb-6 sm:mb-8">
          We&apos;re always looking for talented people to join us.
        </p>
        <p className="text-text-muted text-sm sm:text-base leading-relaxed">
          Open positions will be listed here. For now, send your resume to{' '}
          <a href="mailto:hello@dotix.io" className="text-accent hover:text-accent-hover underline underline-offset-4">
            hello@dotix.io
          </a>.
        </p>
      </div>
    </section>
  );
}
