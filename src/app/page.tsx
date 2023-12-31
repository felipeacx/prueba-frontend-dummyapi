import Image from "next/image"
import Link from "next/link"

// Inicio por defecto de la app
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <div className="grid place-items-center gap-3">
          <h1 className="text-xl">Prueba Técnica de desarrollo Frontend</h1>
          <h1 className="text-xl">React + NextJS + TypeScript + Tailwind</h1>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
      </div>
      <Link
        href="/home"
        className="text-xl cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
      >
        Iniciar
      </Link>
    </main>
  )
}
