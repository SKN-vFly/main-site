import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
 
const nextConfig: NextConfig = {
  /* config options here */
  // No need for turbopack config as it's handled by CLI flag
};

export default withNextIntl(nextConfig);
