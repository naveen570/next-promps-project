import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { getSession } from "next-auth/react";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const RootLayout = async ({ children }: { children: ReactNode }) => {
  // const session = await getSession();
  return (
    <html lang='en'>
      <body className={`${inter.variable}`}>
        <Provider>
          <div className='main'>
            <div className='gradient'></div>
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
