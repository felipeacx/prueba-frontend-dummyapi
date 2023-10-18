import React from "react"

const Pagination = ({ currentPage, setCurrentPage }: { currentPage: number; setCurrentPage: any }) => {
  function backPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  function nextPage() {
    if (currentPage < 999) {
      setCurrentPage(currentPage + 1)
    }
  }
  function firstPage() {
    if (currentPage !== 0) {
      setCurrentPage(0)
    }
  }
  function lastPage() {
    if (currentPage !== 999) {
      setCurrentPage(998)
    }
  }

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
            {"999"}
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
