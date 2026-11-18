import { projects } from '../../../data/projects.js';
import { Button } from '../../../components/common/Button.js';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }) {
  const project = projects.find(p => p.id === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.name} | Dotix`,
    description: project.description,
  };
}

const projectDetails = {
  duddy: {
    overview: 'Duddy is an AI-enabled no-code app builder that allows users to create real native Android, iOS and web applications without writing code.',
    problem: 'Building mobile applications traditionally requires significant technical expertise, time, and resources. Many businesses and individuals have app ideas but lack the development skills to bring them to life.',
    solution: 'Duddy uses AI to understand user requirements and automatically generate native application code. The platform provides a visual interface for designing apps and handles the entire build pipeline.',
    techStack: ['Next.js', 'React', 'AI layer', 'Firebase', 'Custom build pipeline'],
    techReason: 'Next.js and React provide a modern, performant frontend. The AI layer enables intelligent code generation. Firebase offers backend services and real-time capabilities. Custom build pipeline ensures native app generation.',
    impact: 'Duddy enables non-technical users to build and deploy mobile applications, significantly reducing the barrier to entry for app development.',
  },
  omnibase: {
    overview: 'Omnibase is a backend-as-a-service platform that provides database, authentication, file storage, payouts, notifications, and an admin dashboard.',
    problem: 'Building backend infrastructure from scratch is time-consuming and requires expertise in multiple areas like databases, authentication, and file storage.',
    solution: 'Omnibase provides a comprehensive backend solution with all essential services in one platform. Developers can focus on frontend development while Omnibase handles backend operations.',
    techStack: ['Go', 'MariaDB', 'MySQL', 'Fastify', 'Node.js', 'Express', 'Firebase', 'Vite', 'React', 'Tailwind', 'TypeScript'],
    techReason: 'Go provides high-performance backend services. MariaDB and MySQL offer reliable database solutions. Fastify and Express enable flexible API development. Firebase adds real-time capabilities. React and Tailwind create a modern admin dashboard.',
    impact: 'Omnibase accelerates development by providing ready-to-use backend services, reducing development time and infrastructure complexity.',
  },
  rewardhub: {
    overview: 'RewardHub is a rewards and monetisation platform connecting advertisers with real users.',
    problem: 'Advertisers need effective ways to reach real users, while users want to be rewarded for their engagement with content and offers.',
    solution: 'RewardHub creates a marketplace where advertisers can run campaigns and users can earn rewards by completing tasks. The platform ensures genuine user engagement through verification systems.',
    techStack: ['Next.js', 'React', 'Vite', 'TypeScript', 'Tailwind', 'Node.js', 'Express', 'MySQL', 'Redis', 'OpenAI API', 'Firebase Cloud Messaging'],
    techReason: 'Next.js and React provide a responsive frontend. Node.js and Express power the backend APIs. MySQL and Redis handle data storage and caching. OpenAI API enhances user experience. Firebase Cloud Messaging enables real-time notifications.',
    impact: 'RewardHub creates a transparent ecosystem where advertisers reach real users and users are fairly compensated for their engagement.',
  },
};

export default function ProjectPage({ params }) {
  const project = projects.find(p => p.id === params.slug);
  const details = projectDetails[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-background-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
            <Link href="/projects" className="hover:text-accent transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-text-secondary">{project.name}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            {project.name}
          </h1>
          
          <p className="text-xl text-text-secondary max-w-3xl mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-background-card border border-border text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.website && (
            <Button
              href={project.website}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </Button>
          )}
        </div>
      </section>

      {/* Project Details */}
      {details ? (
        <>
          <section className="py-24 bg-background-secondary">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-8">
                Project Overview
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                {details.overview}
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">
                The Problem
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                {details.problem}
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">
                What Dotix Created
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                {details.solution}
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {details.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm px-3 py-1 rounded bg-background-card border border-border text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">
                Why These Technologies
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                {details.techReason}
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">
                Project Impact
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {details.impact}
              </p>
            </div>
          </section>

          {/* Conclusion */}
          <section className="py-24 bg-background-primary">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-8">
                Conclusion
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                {project.name} demonstrates Dotix's capability to build complex, production-ready software solutions that solve real business problems.
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className="py-24 bg-background-secondary">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-text-secondary">
              Detailed case study coming soon.
            </p>
          </div>
        </section>
      )}

      {/* Get In Touch */}
      <section className="py-24 bg-background-secondary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-text-secondary mb-10">
            Have a similar project in mind? Let's discuss it.
          </p>
          <Button href="/contact" variant="primary">
            Contact Us
          </Button>
        </div>
      </section>

      {/* Explore More */}
      <section className="py-24 bg-background-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">
            Explore more projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.filter(p => p.id !== project.id).slice(0, 3).map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="p-6 rounded-lg bg-background-card border border-border hover:border-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {p.name}
                </h3>
                <p className="text-sm text-text-secondary">
                  {p.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-background-secondary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Have an idea?
          </h2>
          <p className="text-xl text-text-secondary mb-10">
            Let's build something great together.
          </p>
          <Button href="/contact" variant="primary">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
}
