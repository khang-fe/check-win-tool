import { i18n as nextI18NextConfig } from './next-i18next.config.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  i18n: nextI18NextConfig.i18n,
  middleware: ['middleware'],
};

export default nextConfig;
