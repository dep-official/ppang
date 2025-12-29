import "./globals.css";
import ClientLayout from "@/client-layout";

export const metadata = {
  title: "팡클리닉",
  description: "팡클리닉",
  icons: {
    icon: '/site_logo.png',
    shortcut: '/site_logo.png',
    apple: '/site_logo.png',
  },
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      
      <body suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
