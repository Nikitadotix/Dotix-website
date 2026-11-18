import { projects } from '../../data/projects.js';
import { ProjectFilter } from '../../components/common/ProjectFilter.js';

export const metadata = {
  title: 'Projects | Dotix',
  description: 'Things we\'ve built. Products we run. Software that works.',
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-background-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Things we've built. Products we run. Software that works.
          </h1>
        </div>
      </section>

      <ProjectFilter projects={projects} />
    </>
  );
}
