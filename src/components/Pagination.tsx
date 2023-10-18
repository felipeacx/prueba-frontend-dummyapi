import React from "react"

const Pagination = ({
  currentPage,
  setCurrentPage,
  total,
}: {
  currentPage: number
  setCurrentPage: any
  total: number
}) => {
  const itemsPerPage = 10
  //Funciones para una paginación básica
  function backPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  function nextPage() {
    if (currentPage < total / itemsPerPage - 1) {
      setCurrentPage(currentPage + 1)
    }
  }
  // Primera página es 0 por defecto
  function firstPage() {
    if (currentPage !== 0) {
      setCurrentPage(0)
    }
  }
  // Última página según la documentación de la API
  function lastPage() {
    if (currentPage !== total / itemsPerPage) {
      setCurrentPage(Math.ceil(total / itemsPerPage - 1))
    }
  }

  //Mostrar navegación de la paginación
  return (
    <nav className="grid place-items-center">
      <ul className="flex gap-5">
        <li className="page-item">
          <a onClick={backPage} href="#" className="p-2 rounded hover:bg-blue-700 hover:font-bold hover:underline">
            {"<"}
          </a>
        </li>
        <li className="page-item">
          <a onClick={firstPage} href="#" className="p-2 rounded hover:bg-blue-700 hover:font-bold hover:underline">
            {"1"}
          </a>
        </li>
        <li className="page-item">
          Página actual: <strong>{currentPage + 1}</strong>
        </li>
        <li className="page-item">
          <a onClick={lastPage} href="#" className="p-2 rounded hover:bg-blue-700 hover:font-bold hover:underline">
            {Math.ceil(total / itemsPerPage)}
          </a>
        </li>
        <li className="page-item">
          <a onClick={nextPage} href="#" className="p-2 rounded hover:bg-blue-700 hover:font-bold hover:underline">
            {">"}
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
