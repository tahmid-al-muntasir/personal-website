'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '../data/site';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/projects', label: 'Projects' },
  { href: '/papers', label: 'Papers' },
  { href: '/blog', label: 'Blog' },
  { href: '/media', label: 'Media' },
  { href: '/now', label: 'Now' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="top-nav" data-reveal>
        <div className="top-nav-inner">
          <Link href="/" className="nav-brand">
            <span className="brand-mark">TAM</span>
            <span className="nav-brand-copy">
              <span className="label">Tahmid Al Muntasir</span>
              <span className="nav-subline">Textile Engineering × AI</span>
            </span>
          </Link>

          <nav className="nav-links nav-links-desktop" aria-label="Main">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link key={href} href={href} className={`nav-link ${active ? 'is-active' : ''}`}>
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="nav-meta nav-meta-desktop">
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="label link-inline" aria-label="GitHub (opens in new window)">
              GitHub ↗
            </a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="label link-inline" aria-label="LinkedIn (opens in new window)">
              LinkedIn ↗
            </a>
            <a href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer" className="label link-inline" aria-label="Download CV (opens in new window)">
              CV ↗
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="nav-toggle" aria-expanded={open} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}>
            {open ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {open && (
        <div className="nav-drawer">
          <nav className="nav-drawer-links">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`nav-drawer-link ${pathname === href ? 'is-active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="nav-drawer-meta">
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="label link-inline" aria-label="GitHub (opens in new window)">GitHub ↗</a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="label link-inline" aria-label="LinkedIn (opens in new window)">LinkedIn ↗</a>
            <a href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer" className="label link-inline" aria-label="Download CV (opens in new window)">CV ↗</a>
          </div>
        </div>
      )}
    </>
  );
}
