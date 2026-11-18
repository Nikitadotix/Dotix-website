import Link from 'next/link';
import { Button } from '../components/common/Button.js';

export default function NotFound() {
  return (
    <section className="py-24 bg-background-primary min-h-screen flex items-center">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Page not found
        </h2>
        <p className="text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button href="/" variant="primary">
          Go Home
        </Button>
      </div>
    </section>
  );
}
