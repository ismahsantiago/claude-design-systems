import { createElement as h } from 'react';

/**
 * A tree that renders every exported component and section at least once.
 *
 * The validator's class-coverage check is only as good as what gets rendered,
 * so this is built from the package's own exports rather than from the demo
 * page: a section nobody put on the demo would otherwise ship unverified.
 *
 * @param {Record<string, any>} DS the built package's exports.
 */
export function buildCoverageTree(DS) {
  const button = h(DS.Button, null, 'Action');

  return h(
    DS.ThemeProvider,
    { theme: 'light', fullBleed: true },
    h(DS.Nav, {
      sticky: true,
      brand: 'Northwind',
      links: [{ label: 'Features', href: '#f' }],
      actions: button,
    }),
    h(DS.Hero, {
      eyebrow: 'New',
      headline: 'Headline',
      subhead: 'Subhead copy.',
      actions: button,
      note: 'No card required.',
      layout: 'split',
      media: h('div', null, 'media'),
      height: 'screen',
      background: h('div', null, 'bg'),
    }),
    h(DS.LogoCloud, { caption: 'Trusted by', logos: [h('span', null, 'Vertex')] }),
    h(DS.FeatureGrid, {
      eyebrow: 'Why',
      title: 'Features',
      subtitle: 'Subtitle.',
      variant: 'card',
      tone: 'sunken',
      features: [{ icon: h('span', null, '*'), title: 'One', description: 'Desc.' }],
    }),
    h(DS.MediaShowcase, {
      title: 'Showcase',
      ratio: 'square',
      columns: 2,
      items: [
        { media: h('div', null, 'still'), title: 'Tile', meta: '00:12' },
        { videoSrc: 'clip.mp4', posterSrc: 'poster.jpg', title: 'Clip', href: '#' },
      ],
    }),
    h(DS.Testimonials, {
      title: 'Quotes',
      variant: 'grid',
      testimonials: [{ quote: 'Great.', name: 'Ada Lovelace', role: 'CTO' }],
    }),
    h(DS.Testimonials, {
      variant: 'feature',
      testimonials: [{ quote: 'Great.', name: 'Ada Lovelace' }],
    }),
    h(DS.Pricing, {
      title: 'Pricing',
      note: 'Excludes VAT.',
      plans: [
        { name: 'Free', price: '$0', features: ['One'], action: button },
        {
          name: 'Team',
          price: '$29',
          period: 'per month',
          description: 'For teams.',
          features: ['One'],
          action: button,
          featured: true,
          badge: 'Popular',
        },
      ],
    }),
    h(DS.StorySteps, {
      eyebrow: '03 / Route',
      title: 'Route',
      steps: [
        { label: 'Intake', owner: 'Operator', description: 'Desc.', outcome: 'Outcome.' },
        { label: 'Transit', description: 'Desc.' },
      ],
    }),
    h(DS.StorySteps, { layout: 'column', steps: [{ label: 'Only', description: 'Desc.' }] }),
    h(DS.MetricStrip, {
      eyebrow: '05 / Evidence',
      title: 'Evidence',
      metrics: [
        { value: '98%', label: 'On time', footnote: 'Sample data' },
        { value: '11', label: 'Countries' },
      ],
    }),
    h(DS.StoryChapter, {
      index: '04',
      eyebrow: 'Control',
      title: 'Chapter title',
      media: h('div', null, 'media'),
      mediaSide: 'start',
      sticky: true,
      action: button,
    }, h('p', null, 'Body copy.')),
    h(DS.FAQSection, {
      title: 'FAQ',
      defaultOpen: 0,
      items: [{ question: 'Why?', answer: 'Because.' }],
    }),
    h(DS.CTASection, {
      headline: 'Start now',
      subhead: 'Copy.',
      actions: button,
      note: 'Free.',
      align: 'split',
    }),
    // Every Section tone, so the banding rules are covered too.
    ...['default', 'sunken', 'accent', 'inverted'].map((tone, index) =>
      h(
        DS.Section,
        { tone, key: `tone-${index}`, spacing: index === 0 ? 'tight' : 'normal' },
        h(
          DS.Stack,
          { direction: 'row', gap: 'md', wrap: true, align: 'center' },
          h(DS.Container, { width: 'prose' }, h(DS.Text, { tone: 'muted' }, 'Body')),
          h(DS.Heading, { level: 2 }, 'Heading'),
          h(DS.Badge, { tone: 'success', dot: true, variant: 'solid' }, 'Live'),
          h(DS.Badge, { tone: 'warning', variant: 'outline' }, 'Beta'),
          h(DS.Avatar, { name: 'Ada Lovelace' }),
          h(DS.Spinner, null),
          h(DS.Divider, { orientation: 'vertical' }),
          h(DS.Button, { variant: 'secondary', loading: true }, 'Loading'),
          h(DS.Button, { variant: 'danger', iconStart: h('span', null, '!') }, 'Delete'),
          h(DS.Alert, { tone: 'danger', title: 'Failed', onDismiss: () => {} }, 'Body'),
          h(DS.Card, { title: 'Card', subtitle: 'Sub', elevation: 'raised', footer: 'Footer' }, 'Body'),
          h(DS.Field, { label: 'Email', error: 'Bad' }, h(DS.Input, { defaultValue: 'x' })),
          h(DS.Field, { label: 'Notes' }, h(DS.Textarea, { rows: 2 })),
          h(DS.Field, { label: 'Region' }, h(DS.Select, { placeholder: 'Pick', defaultValue: '' })),
          h(DS.Checkbox, { label: 'Check', indeterminate: true }),
          h(DS.Switch, { label: 'Toggle', defaultChecked: true }),
        ),
      ),
    ),
    h(DS.Footer, {
      brand: 'Northwind',
      description: 'Description.',
      columns: [{ title: 'Product', links: [{ label: 'Docs', href: '#' }] }],
      copyright: '© 2026',
      meta: h('span', null, 'meta'),
    }),
  );
}
