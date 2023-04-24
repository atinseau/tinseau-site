import Footer from "src/components/Footer"
import Header from "src/components/Header"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="page__wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
