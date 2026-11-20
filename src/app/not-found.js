import { Button } from '../components/common/Button.js';

export default function NotFound() {
  return (
    <section className="py-16 sm:py-24 bg-background-primary min-h-[70vh] flex items-center">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4 sm:mb-6">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
          Page not found
        </h2>
        <p className="text-text-secondary text-sm sm:text-base mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button href="/" variant="primary">
          Go Home
        </Button>
      </div>
    </section>
  );
}
