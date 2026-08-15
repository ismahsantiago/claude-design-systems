import type { Meta, StoryObj } from '@storybook/react-vite';
import { LandingDemo } from '@ds/shared/demo';
import { Button, Hero, MediaShowcase, Nav, ThemeProvider } from '@ds/shared';
import './index';

/**
 * This system has no light variant — both theme values resolve to the same
 * black palette — so there is one landing story rather than the light/dark
 * pair the other systems ship.
 */
const meta = {
  title: 'Landing page',
  parameters: { layout: 'fullscreen', theme: 'off' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The shared reference page, for comparison against the other systems. */
export const Reference: Story = {
  render: () => (
    <ThemeProvider theme="dark" fullBleed>
      <LandingDemo />
    </ThemeProvider>
  ),
};

/**
 * What the system is actually for: a full-bleed hero with the display type at
 * its real size over a moving background, and media as the subject below it.
 */
export const CinematicHero: Story = {
  render: () => (
    <ThemeProvider theme="dark" fullBleed>
      <Nav
        sticky
        bordered={false}
        brand="RUNWAY"
        links={[
          { label: 'Research', href: '#' },
          { label: 'Product', href: '#' },
          { label: 'Studios', href: '#' },
        ]}
        actions={<Button size="sm">Try it free</Button>}
      />
      <Hero
        height="screen"
        headline="Everything you can imagine"
        subhead="Generate video, images and worlds from a prompt. The tools that made the last decade of film look like the next one."
        actions={
          <>
            <Button size="lg">Start creating</Button>
            <Button size="lg" variant="secondary">
              Watch the reel
            </Button>
          </>
        }
        note="No card required · Free tier includes 125 credits"
        background={<AmbientBackdrop />}
      />
      <MediaShowcase
        eyebrow="Recent"
        title="Made with Runway"
        ratio="portrait"
        columns={4}
        items={[
          { media: <Plate from="#ff2d8e" to="#a855f7" />, title: 'Gen-4 Turbo', meta: '00:12 · 24fps' },
          { media: <Plate from="#a855f7" to="#00e5ff" />, title: 'Motion Brush', meta: '00:08 · 24fps' },
          { media: <Plate from="#ff6b35" to="#f72585" />, title: 'Act-One', meta: '00:21 · 30fps' },
          { media: <Plate from="#00e5ff" to="#ff2d8e" />, title: 'Frames', meta: '00:05 · 24fps' },
        ]}
      />
    </ThemeProvider>
  ),
};

function Plate({ from, to }: { from: string; to: string }) {
  return (
    <div style={{ width: '100%', height: '100%', background: `linear-gradient(160deg, ${from}, ${to})` }} />
  );
}

/**
 * A stand-in for the autoplaying hero video: two slow-drifting gradient orbs
 * over black. No network assets, and it stops moving for anyone who has asked
 * for reduced motion.
 */
function AmbientBackdrop() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
      <style>{`
        @keyframes ds-drift-a {
          0%, 100% { transform: translate3d(-8%, -6%, 0) scale(1); }
          50%      { transform: translate3d(6%, 8%, 0) scale(1.15); }
        }
        @keyframes ds-drift-b {
          0%, 100% { transform: translate3d(10%, 4%, 0) scale(1.1); }
          50%      { transform: translate3d(-6%, -8%, 0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ds-orb { animation: none !important; }
        }
      `}</style>
      <div
        className="ds-orb"
        style={{
          position: 'absolute',
          width: '70vw',
          height: '70vw',
          top: '-15%',
          left: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,45,142,0.55) 0%, rgba(255,45,142,0) 65%)',
          filter: 'blur(40px)',
          animation: 'ds-drift-a 18s ease-in-out infinite',
        }}
      />
      <div
        className="ds-orb"
        style={{
          position: 'absolute',
          width: '60vw',
          height: '60vw',
          bottom: '-20%',
          right: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.45) 0%, rgba(0,229,255,0) 65%)',
          filter: 'blur(40px)',
          animation: 'ds-drift-b 22s ease-in-out infinite',
        }}
      />
    </div>
  );
}
