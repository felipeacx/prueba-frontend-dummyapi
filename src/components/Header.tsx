import Link from "next/link"
import React from "react"

export default function Header() {
  // Header de la app con navegación a todas las opciones
  return (
    <div className="!fixed top-0 left-0 bg-green-600 w-full h-12 text-gray-100">
      <div className="grid p-2 bg-primary-color h-auto sm:flex sm:justify-between sm:h-20">
        <p>Bienvenido</p>
        <div className="flex gap-3">
          <Link href="/home" className="cursor-pointer text-white font-bold rounded hover:underline">
            Usuarios registrados
          </Link>
          <Link href="/create" className="cursor-pointer text-white font-bold rounded hover:underline">
            Nuevo usuario
          </Link>
        </div>
      </div>
    </div>
  )
}
