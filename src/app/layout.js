import "./globals.css";

export const metadata = {
  title: "Content Monitoring Tool",
  description: "AI-powered Content Monitoring Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
