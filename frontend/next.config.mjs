/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    // Permite compilar a un directorio aparte (evita chocar con `next dev`)
    distDir: process.env.NEXT_DIST_DIR || '.next',
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        // Sirve AVIF/WebP automáticamente (mucho más livianas que JPG/PNG)
        formats: ['image/avif', 'image/webp'],
        // Cachea las imágenes optimizadas 30 días
        minimumCacheTTL: 60 * 60 * 24 * 30,
        remotePatterns: [
            { protocol: 'https', hostname: 'placehold.co' },
            { protocol: 'https', hostname: 'dentalevamarcos.com' },
            { protocol: 'https', hostname: 'alignerco.com' },
            { protocol: 'https', hostname: 'via.placeholder.com' },
            { protocol: 'https', hostname: 'res.cloudinary.com' },
        ],
    },
    async headers() {
        return [
            {
                // Imágenes y fuentes estáticas: caché agresiva (son inmutables)
                source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
