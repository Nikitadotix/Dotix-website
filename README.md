This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Adding a Case Study

Create `src/content/case-studies/<slug>.md` and add a matching `slug` in its
frontmatter. Use the same slug in the filename and frontmatter; published
case studies with `draft: false` automatically get a page at
`/case-studies/<slug>`, appear on `/case-studies`, and are added to the sitemap.

Each file needs `title`, `description`, `slug`, `cover`, `date`, `updated`,
`author`, `category`, `tags`, `icon`, `link`, `draft`, and `readingTime`
frontmatter fields. Put `cover`, `icon`, and Markdown image files under `public/`
and reference them with paths such as `/images/case-studies/example.webp`.
The shared page template supplies the hero, tag icons, article typography,
section-heading markers, and list markers.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
