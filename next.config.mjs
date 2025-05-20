import { withNextVideo } from "next-video/process";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.mux.com',
        pathname: '/**', // Puede ser ajustado si se conoce un patrón específico de las imágenes.
      },
    ],
  },
};

export default withNextVideo(nextConfig);