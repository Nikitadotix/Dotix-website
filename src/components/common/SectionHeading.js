import { twMerge } from 'tailwind-merge';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: HeadingTag = 'h2',
  className = '',
  spacingClassName = 'mb-10',
  titleClassName = '',
  descriptionClassName = '',
}) {
  const centered = align === 'center';

  return (
    <div
      className={twMerge(
        centered ? 'mx-auto text-center' : '',
        spacingClassName,
        className
      )}
    >
      {eyebrow && (
        <div
          className={twMerge(
            'mb-4 flex items-center gap-3',
            centered && 'justify-center'
          )}
        >
          <span aria-hidden="true" className="h-px w-7 shrink-0 bg-accent" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </span>
        </div>
      )}

      <HeadingTag
        className={twMerge(
          'text-3xl font-bold leading-[1.15] tracking-tight text-text-primary sm:text-4xl',
          titleClassName
        )}
      >
        {title}
      </HeadingTag>

      {description && (
        <p
          className={twMerge(
            'mt-4 max-w-xl text-sm leading-[1.8] text-text-secondary sm:text-[15px]',
            centered && 'mx-auto',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
