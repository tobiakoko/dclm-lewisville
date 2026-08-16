import HomePage from "@/app/(site)/page";
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <HomePage />
      </main>
      <Footer />
    </>
    
  );
}
