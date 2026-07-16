import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.47.240.46","192.168.1.209","10.62.60.46"],
  {
        source: 'https://www.devocionalnowhatsapp.com.br/devocional-para-whatsapp',
        destination: 'https://www.devocionalnowhatsapp.com.br/',
        permanent: true,
      },
}

export default nextConfig