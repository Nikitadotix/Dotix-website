import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const caseStudiesDirectory = path.join(
  process.cwd(),
  'src',
  'content',
  'case-studies'
);
const publicDirectory = path.join(process.cwd(), 'public');
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validatePublicAsset(assetPath, field, fileName) {
  if (!assetPath.startsWith('/') || assetPath.startsWith('//')) {
    throw new Error(`The "${field}" in ${fileName} must be a public asset path`);
  }

  const resolvedPath = path.resolve(publicDirectory, `.${assetPath}`);

  if (
    !resolvedPath.startsWith(`${publicDirectory}${path.sep}`) ||
    !existsSync(resolvedPath)
  ) {
    throw new Error(`The "${field}" asset in ${fileName} does not exist in public`);
  }
}

function readCaseStudy(fileName) {
  const slug = path.basename(fileName, '.md');

  if (!slugPattern.test(slug)) {
    throw new Error(`Invalid case-study filename: ${fileName}`);
  }

  const filePath = path.join(caseStudiesDirectory, fileName);
  const { data, content } = matter(readFileSync(filePath, 'utf8'));
  const requiredFields = [
    'title',
    'description',
    'author',
    'category',
    'date',
    'updated',
    'cover',
    'icon',
    'link',
  ];

  for (const field of requiredFields) {
    if (typeof data[field] !== 'string' || data[field].trim() === '') {
      throw new Error(`Missing "${field}" in ${fileName} frontmatter`);
    }
  }

  if (data.slug !== slug) {
    throw new Error(
      `The frontmatter slug in ${fileName} must match its filename ("${slug}")`
    );
  }

  if (!Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === 'string')) {
    throw new Error(`The "tags" field in ${fileName} must be a list of strings`);
  }

  if (typeof data.draft !== 'boolean') {
    throw new Error(`The "draft" field in ${fileName} must be true or false`);
  }

  if (!Number.isFinite(Date.parse(data.date))) {
    throw new Error(`Invalid "date" in ${fileName} frontmatter`);
  }

  if (!Number.isFinite(Date.parse(data.updated))) {
    throw new Error(`Invalid "updated" in ${fileName} frontmatter`);
  }

  if (!Number.isInteger(data.readingTime) || data.readingTime < 1) {
    throw new Error(`The "readingTime" in ${fileName} must be a positive integer`);
  }

  if (!content.trim()) {
    throw new Error(`The Markdown body in ${fileName} cannot be empty`);
  }

  validatePublicAsset(data.cover, 'cover', fileName);
  validatePublicAsset(data.icon, 'icon', fileName);

  return {
    ...data,
    slug,
    content,
  };
}

export function getCaseStudies({ includeDrafts = false } = {}) {
  return readdirSync(caseStudiesDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map(readCaseStudy)
    .filter((caseStudy) => includeDrafts || !caseStudy.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getCaseStudyBySlug(slug) {
  if (!slugPattern.test(slug)) {
    return null;
  }

  const fileName = `${slug}.md`;
  const filePath = path.join(caseStudiesDirectory, fileName);

  if (!existsSync(filePath)) {
    return null;
  }

  const caseStudy = readCaseStudy(fileName);
  return caseStudy.draft ? null : caseStudy;
}
