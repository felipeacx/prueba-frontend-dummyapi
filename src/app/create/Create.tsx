"use client"

import { getRequest } from "@/api/requests"
import Pagination from "@/components/Pagination"
import { UserData } from "@/types/types"
import React, { useState, useEffect } from "react"

export default function Create() {
  //  Hooks para manejar info
  const [users, setusers] = useState<UserData[]>([])
  const [currentPage, setCurrentPage] = useState(0)

  //Cargar datos al iniciar la aplicación
  async function loadData(currentPage: number) {
    const data = await getRequest(`/user?page=${currentPage}&limit=10`)
    setusers(data)
  }
  //Llamar a loadData cuando cambie currentPage
  useEffect(() => {
    loadData(currentPage)
  }, [currentPage])
  //Convertir los datos a un string con el nombre completo del usuario
  function parseTitle(title: string, firstName: string, lastName: String): string {
    let result = ""
    if (title.toLowerCase().includes("mr")) result = "Señor"
    if (title.toLowerCase().includes("mrs")) result = "Señora"
    if (title.toLowerCase().includes("miss") || title.toLowerCase().includes("ms")) result = "Señorita"
    return `${result} ${firstName} ${lastName}`
  }

  return (
    <>
      {/* Tabla de Usuarios */}
      <div className="grid place-items-center m-5">
        {users && users.length > 0 ? (
          <table className="table-auto mt-6">
            <thead>
              <tr>
                <th className="px-4 py-2">Identificador</th>
                <th className="px-4 py-2">Usuario</th>
                <th className="px-4 py-2">Imagen</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UserData) => {
                return (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2 font-bold">
                      {parseTitle(user.title, user.firstName, user.lastName)}
                    </td>
                    <td className="border px-4 py-2">
                      <img className="w-24 h-auto" src={user.picture} alt="User picture" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div>No encontramos usuarios registrados.</div>
        )}
      </div>
      {/* Paginación */}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  )
}
