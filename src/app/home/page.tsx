import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Home from "./Home"

// Layout del componente Home
export default function HomeComponent() {
  return (
    <main className="bg-gray-100">
      <Header />
      <Home />
      <Footer />
    </main>
  )
}
