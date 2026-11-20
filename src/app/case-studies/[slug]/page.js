import { notFound } from 'next/navigation';

import { CaseStudyTemplate } from '../../../components/case-studies/CaseStudyTemplate.js';
import {
  getCaseStudies,
  getCaseStudyBySlug,
} from '../../../lib/case-studies.js';

export function generateStaticParams() {
  return getCaseStudies().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return { title: 'Case Study Not Found | Dotix' };
  }

  return {
    title: `${caseStudy.title} | Dotix`,
    description: caseStudy.description,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyTemplate caseStudy={caseStudy} />;
}
