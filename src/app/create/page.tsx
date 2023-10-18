import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Create from "./Create"

// Layout del componente Create
export default function CreateComponent() {
  return (
    <main className="bg-gray-100">
      <Header />
      <Create />
      <Footer />
    </main>
  )
}
