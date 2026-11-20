import { Hero } from '../components/home/Hero.js';
import { Services } from '../components/home/Services.js';
import { WhyDotix } from '../components/home/WhyDotix.js';
import { FeaturedProducts } from '../components/home/FeaturedProducts.js';
import { ProjectsPreview } from '../components/home/ProjectsPreview.js';
import { Process } from '../components/home/Process.js';
import { TechStack } from '../components/home/TechStack.js';
import { Testimonials } from '../components/home/Testimonials.js';
import { FAQ } from '../components/home/FAQ.js';
import { FinalCTA } from '../components/home/FinalCTA.js';
import { getCaseStudies } from '../lib/case-studies.js';

export default function Home() {
  const caseStudySlugs = getCaseStudies().map(({ slug }) => slug);

  return (
    <>
      <Hero />
      <Process />
      <Services />
      <WhyDotix />
      <FeaturedProducts caseStudySlugs={caseStudySlugs} />
      <ProjectsPreview caseStudySlugs={caseStudySlugs} />
      <TechStack />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
