export const metadata = {
  title: 'Terms and Conditions | Dotix',
  description: 'Dotix terms and conditions.',
};

export default function TermsAndConditionsPage() {
  return (
    <section className="py-24 bg-background-primary min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Terms and Conditions
        </h1>
        <p className="text-text-muted mb-4">
          Last updated: [Date]
        </p>
        <div className="prose prose-invert max-w-none">
          <p className="text-text-secondary mb-4">
            This terms and conditions document is a draft placeholder. Approved legal text will be added here.
          </p>
        </div>
      </div>
    </section>
  );
}
