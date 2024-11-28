const nextConfig = {
  reactStrictMode: true,
  // swMinfy: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 프론트엔드에서 호출하는 경로
        destination: "http://192.168.161.24:8080/api/:path*", // 백엔드 실제 주소 (HTTP)
      },
    ];
  },
};

module.exports = nextConfig;
