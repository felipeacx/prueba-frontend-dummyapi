import Link from "next/link"
import React from "react"

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 bg-green-500 w-full h-8 text-gray-100">
      <small className="p-5">
        Desarrollado por{" "}
        <strong>
          <Link href="https://www.linkedin.com/in/felipeacx/">Felipe Bonilla Acosta</Link>
        </strong>
      </small>
    </div>
  )
}
