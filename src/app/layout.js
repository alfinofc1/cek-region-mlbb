import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const metadata = {
  title: "Region Check for MLBB",
  description: "Region Check for MLBB @ alfin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.className} antialiased`}>
        <div className="flex justify-center items-center min-h-screen p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
