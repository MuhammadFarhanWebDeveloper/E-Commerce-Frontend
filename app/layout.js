import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import NextTopLoader from "nextjs-toploader";
import { getUser } from "@/lib/apiCalls/user";
import { cookies } from "next/headers";
import StoreProvider from "./StateWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCategories } from "@/lib/apiCalls/category";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Ventura | Online E-commerce Platform",
  description:
    "Ventura is an e-commerce project developed using Next.js 14, Express.js, and Prisma. Created by Hafiz Muhammad Farhan, this project provides a seamless shopping experience with efficient server-side rendering, user-friendly interfaces, and robust backend support.",
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("authtoken")?.value;
  let user = null;

  if (token) {
    const request = await getUser(token);
    if (request.success) {
      user = request.user;
    }
  }
  const categories = await getAllCategories();
  const { data } = categories;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader
          color="#ff0000"
          height={4}
          showSpinner={false}
          delay={100}
          transitionDuration={300}
        />
        <StoreProvider initialUser={user} initialCategories={data}>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <header className="border">
            <Navbar user={user} />
          </header>
          <main className="py-32 md:py-24">{children}</main>
          <footer></footer>
        </StoreProvider>
      </body>
    </html>
  );
}
