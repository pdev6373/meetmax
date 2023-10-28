import { RootLayoutType } from "@/types";
import { notFound } from "next/navigation";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import { locales } from "@/constants";
import { AuthProvider } from "@/context/authContext";
import { AppWrapper } from "@/components";
import "./globals.css";
import { PostProvider } from "@/context/postContext";
import { GeneralProvider } from "@/context/generalContext";
import og from "../../public/assets/og.png";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Meetmax",
  description:
    "Explore a vibrant online community. Connect, share, and stay updated on our engaging social platform.",
  keywords: [
    "Social networking platform",
    "Social media network",
    "Connect with friends",
    "Share photos and videos",
    "Network with peers",
    "Stay updated with friends",
    "Online community",
    "Follow users",
    "Like, comment, and share",
    "Chat and messaging",
    "Newsfeed updates",
    "Profile customization",
    "Event creation",
    "Groups and communities",
    "Privacy settings",
    "Online friendships",
    "Notifications and alerts",
    "User profiles",
    "Social interactions",
  ],
  metadataBase: new URL("https://meetmax-media.vercel.app/"),
  openGraph: {
    title:
      "Meetmax - Your social world, connected. Share, engage, stay updated.",
    description:
      "Connect with friends, share your life, and explore new horizons on our vibrant social media platform. Post updates, photos, and videos, engage in meaningful conversations, and stay in the loop with the latest trends. Join our global community today and make every moment count!",
    images: [
      {
        url: og.src,
      },
    ],
    type: "website",
    url: "https://meetmax-media.vercel.app/",
  },
  twitter: {
    title:
      "Meetmax - Your social world, connected. Share, engage, stay updated.",
    description:
      "Connect with friends, share your life, and explore new horizons on our vibrant social media platform. Post updates, photos, and videos, engage in meaningful conversations, and stay in the loop with the latest trends. Join our global community today and make every moment count!",
    // images: "https://meetmax-media.vercel.app/og.png",
    images: [
      {
        url: og.src,
      },
    ],
    card: "summary_large_image",
  },
};

export default function LocaleLayout({
  children,
  params: { locale },
}: RootLayoutType) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body className={roboto.className}>
        <AuthProvider>
          <AppWrapper>
            <GeneralProvider>
              <PostProvider>{children}</PostProvider>
            </GeneralProvider>
          </AppWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
