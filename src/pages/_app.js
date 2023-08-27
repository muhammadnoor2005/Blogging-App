import '../styles/globals.css'
import "../components/Form/LoginForm/LoginForm.css"
import "../components/Form/SignupForm/SignupForm.css"
import "../components/DashboardTextArea/DashboardTextArea.css"

import { SessionProvider } from 'next-auth/react'
import "../components/Blogs/Blogs.css"
export default function App({ Component, pageProps:{session,...pageProps} }) {
  return (
    <>
    <SessionProvider session={session}> 
      <Component {...pageProps} />
    </SessionProvider>
    </>
  );
}
