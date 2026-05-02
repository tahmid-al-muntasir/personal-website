import '../styles/globals.css';
import Nav from '../components/Nav';
import ScrollReveal from '../components/ScrollReveal';

export const metadata = {
  metadataBase: new URL('https://tahmids-website.vercel.app'),
  title: 'Tahmid Al Muntasir | Textile Engineering × AI',
  description: 'Final-year engineering student building systems at the intersection of textile engineering, machine learning, and robotics.',
  openGraph: {
    title: 'Tahmid Al Muntasir | Textile Engineering × AI',
    description: 'Final-year engineering student building systems at the intersection of textile engineering, machine learning, and robotics.',
    url: 'https://tahmids-website.vercel.app',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Tahmid Al Muntasir | Textile Engineering × AI',
    description: 'Final-year engineering student building systems at the intersection of textile engineering, machine learning, and robotics.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://tahmids-website.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Tahmid Al Muntasir',
              url: 'https://tahmids-website.vercel.app',
              sameAs: [
                'https://github.com/tahmid-al-muntasir',
                'https://linkedin.com/in/tahmid-al-muntasir',
              ],
              jobTitle: 'Final-Year Student | AI/ML Engineer',
              description: 'Building rigorous AI systems at the intersection of textile engineering, machine learning, computer vision, and robotics.',
              knowsAbout: ['Machine Learning', 'Computer Vision', 'Robotics', 'Textile Engineering', 'Reinforcement Learning'],
            }),
          }}
        />
      </head>
      <body>
        <ScrollReveal />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="site-wrap">
          <div className="layout-main">
            <Nav />
            <main id="main-content" className="content-main page-shell">
              {children}
            </main>
            <footer className="site-footer" role="contentinfo">
              <div className="footer-content">
                <p className="label">© 2026 Tahmid Al Muntasir. Built with Next.js, CSS, and rigor.</p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
