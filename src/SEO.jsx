// src/SEO.jsx

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from './App.jsx'; // Assuming useTranslation is exported from App.jsx

// --- IMPORTANT: UPDATE THESE VALUES ---
const SITE_URL = 'https://www.your-company-domain.com'; // Change this to your live domain
const SITE_NAME = 'Knights Eng. Services L.L.C.SP';
const OG_IMAGE_URL = 'https://www.your-company-domain.com/images/og-image.jpg'; // A default social media image
const TWITTER_HANDLE = '@yourTwitterHandle'; // Your company's Twitter handle
// --- END CONFIG ---

/**
 * A reusable SEO component to manage page-specific head tags.
 * * @param {object} props
 * @param {string} props.title - The title for the page.
 * @param {string} props.description - The meta description for the page.
 * @param {string} [props.keywords] - Comma-separated keywords.
 * @param {string} [props.ogImage] - A specific Open Graph image for this page.
 */
const SEO = ({ title, description, keywords, ogImage }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${location.pathname}`;
  const effectiveOgImage = ogImage || OG_IMAGE_URL;
  const defaultKeywords = 'Tank Fabrication, API 650, Storage Tanks, Oil and Gas, UAE, Sharjah, Knights Engineering, Pipeline Works, Storage Terminal, EPC Contractor';

  return (
    <Helmet>
      {/* --- Primary Meta Tags --- */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* --- Open Graph / Facebook --- */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={effectiveOgImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* --- Twitter --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={effectiveOgImage} />
      {TWITTER_HANDLE && <meta name="twitter:site" content={TWITTER_HANDLE} />}
    </Helmet>
  );
};

export default SEO;