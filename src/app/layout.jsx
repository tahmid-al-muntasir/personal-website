import '../styles/globals.css';
import Nav from '../components/Nav';
import ScrollReveal from '../components/ScrollReveal';

export const metadata = {
  metadataBase: new URL('https://tahmidalmuntasir.com'),
  title: 'Tahmid Al Muntasir | Textile Engineering × AI',
  description: 'Portfolio bridging textile engineering, ML, computer vision, and robotics. Smart thermal garments, fabric defect detection, and robotic manipulation.',
  keywords: 'textile engineering, machine learning, computer vision, robotics, reinforcement learning, PhD candidate',
  authors: [{ name: 'Tahmid Al Muntasir' }],
  creator: 'Tahmid Al Muntasir',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tahmidalmuntasir.com',
    siteName: 'Tahmid Al Muntasir | Portfolio',
    title: 'Tahmid Al Muntasir | Textile Engineering × AI',
    description: 'Portfolio bridging textile engineering, ML, computer vision, and robotics. Smart thermal garments, fabric defect detection, and robotic manipulation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tahmid Al Muntasir Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tahmid Al Muntasir | Textile Engineering × AI',
    description: 'Portfolio bridging textile engineering, ML, computer vision, and robotics.',
    creator: '@tahmidalmuntasir',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://tahmidalmuntasir.com" />
          {/* Note: Create a 1200x630px OG image and save as public/og-image.png */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Tahmid Al Muntasir',
              url: 'https://tahmidalmuntasir.com',
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
