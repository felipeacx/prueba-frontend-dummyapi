"use client"

import { deleteRequest, getRequest, postRequest, updateRequest } from "@/api/requests"
import Modal from "@/components/Modal"
import Pagination from "@/components/Pagination"
import { UserData } from "@/types/types"
import { useFormik } from "formik"
import React, { useState, useEffect } from "react"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { FaPlusCircle } from "react-icons/fa"

export default function Home() {
  //  Hooks para manejar info
  const [users, setusers] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [showModalEdit, setshowModalEdit] = useState(false)
  const [showModalDelete, setshowModalDelete] = useState(false)
  const [showModalCreate, setshowModalCreate] = useState(false)
  const [selectedUser, setselectedUser] = useState<UserData>()

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
  function parseTitle(title: string | undefined, firstName: string | undefined, lastName: String | undefined): string {
    let result = ""
    if (title && title.toLowerCase().includes("mr")) result = "Señor"
    if (title && title.toLowerCase().includes("mrs")) result = "Señora"
    if ((title && title.toLowerCase().includes("miss")) || (title && title.toLowerCase().includes("ms")))
      result = "Señorita"
    return `${result} ${firstName} ${lastName}`
  }
  function showEditModal() {
    setshowModalEdit(true)
  }
  function showDeleteModal() {
    setshowModalDelete(true)
  }
  function unshowEditModal() {
    setshowModalEdit(false)
  }
  function unshowDeleteModal() {
    setshowModalDelete(false)
  }
  function showCreateModal() {
    setshowModalCreate(true)
  }
  function unshowCreateModal() {
    setshowModalCreate(false)
  }

  async function deleteUser(id: string | undefined) {
    if (id !== undefined) {
      deleteRequest(`/user/${id}`)
      setTimeout(() => {
        loadData(currentPage)
      }, 500)
      unshowDeleteModal()
    } else throw "id not exist"
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      firstName: "",
      lastName: "",
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.firstName) {
        errors.firstName = "Campo requerido"
      }
      if (!values.lastName) {
        errors.lastName = "Campo requerido"
      }
      return errors
    },
    onSubmit: (values) => {
      updateRequest(`/user/${selectedUser?.id}`, values)
      setTimeout(() => {
        loadData(currentPage)
      }, 500)
      unshowEditModal()
    },
  })

  const formikPost = useFormik({
    initialValues: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.title) {
        errors.title = "Campo requerido"
      }
      if (!values.firstName) {
        errors.firstName = "Campo requerido"
      }
      if (!values.lastName) {
        errors.lastName = "Campo requerido"
      }
      if (!values.email) {
        errors.email = "Campo requerido"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Correo electrónico invalido"
      }
      return errors
    },
    onSubmit: (values) => {
      postRequest(`/user/create`, values)
      setTimeout(() => {
        loadData(currentPage)
      }, 500)
      unshowCreateModal()
      formikPost.resetForm()
    },
  })

  return (
    <>
      {/* Tabla de Usuarios */}
      <div className="grid place-items-center m-5">
        {users && users.data && users.data.length > 0 ? (
          <table className="table-auto mt-6">
            <thead>
              <tr>
                <th className="px-4 py-2">Identificador</th>
                <th className="px-4 py-2">Usuario</th>
                <th className="px-4 py-2">Imagen</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.data.map((user: UserData) => {
                return (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2 font-bold">
                      {parseTitle(user.title, user.firstName, user.lastName)}
                    </td>
                    <td className="border px-4 py-2">
                      <img className="w-24 h-auto" src={user.picture} alt="User picture" />
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex gap-3">
                        <AiFillEdit
                          onClick={() => {
                            setselectedUser(user)
                            formik.setFieldValue("title", user.title)
                            formik.setFieldValue("firstName", user.firstName)
                            formik.setFieldValue("lastName", user.lastName)
                            showEditModal()
                          }}
                          className="flex gap-3 text-3xl text-green-500 hover:opacity-40 cursor-pointer"
                        />
                        <AiFillDelete
                          onClick={() => {
                            setselectedUser(user)
                            showDeleteModal()
                          }}
                          className="flex gap-3 text-3xl text-red-500 hover:opacity-40 cursor-pointer"
                        />
                      </div>
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
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={users.total} />
      {/* Botón flotante para agregar usuario nuevo */}
      <div
        onClick={showCreateModal}
        className={
          "!fixed bottom-2 right-2 z-20 text-5xl bg-white rounded-full text-red-500 " +
          "hover:opacity-50 cursor-pointer"
        }
      >
        <FaPlusCircle />
      </div>
      {/* Modales para editar y eliminar un usuario */}
      <Modal show={showModalEdit} setShowEditModal={setshowModalEdit}>
        <div className="flex flex-col items-center text-xl text-center">
          <span className="mt-3 font-bold">Editar usuario</span>
          <span className="text-lg">
            ¿Deseas editar a {parseTitle(selectedUser?.title, selectedUser?.firstName, selectedUser?.lastName)}?
          </span>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col flex-wrap gap-2">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Título
            </label>
            <select
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecciona una opción</option>
              <option value="mr">mr</option>
              <option value="mrs">mrs</option>
              <option value="miss">miss</option>
              <option value="ms">ms</option>
            </select>
            <span className="text-red-600 ">
              <small>{formik.errors.title}</small>
            </span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              Nombre
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Nombre"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span className="text-red-600 ">
              <small>{formik.errors.firstName}</small>
            </span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Apellido
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Apellido"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span className="text-red-600 ">
              <small>{formik.errors.lastName}</small>
            </span>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <button type="submit" className="bg-green-500 text-white rounded p-2 hover:opacity-40">
              Aceptar
            </button>
            <button onClick={unshowEditModal} className="bg-red-500 text-white rounded p-2 hover:opacity-40">
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
      <Modal show={showModalDelete} setShowEditModal={setshowModalDelete}>
        <div className="flex flex-col items-center text-xl text-center">
          <span className="mt-3 font-bold">Borrar usuario</span>
          <span className="text-lg">
            ¿Deseas borrar a {parseTitle(selectedUser?.title, selectedUser?.firstName, selectedUser?.lastName)}?
          </span>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              deleteUser(selectedUser?.id)
            }}
            className="bg-green-500 text-white rounded p-2 hover:opacity-40"
          >
            Aceptar
          </button>
          <button onClick={unshowDeleteModal} className="bg-red-500 text-white rounded p-2 hover:opacity-40">
            Cancelar
          </button>
        </div>
      </Modal>
      <Modal show={showModalCreate} setShowEditModal={setshowModalCreate}>
        <div className="flex flex-col items-center text-xl text-center">
          <span className="mt-3 font-bold">Registrar usuario</span>
          <span className="text-lg">Ingresa los datos para registrar el nuevo usuario</span>
        </div>
        <form onSubmit={formikPost.handleSubmit} className="flex flex-col flex-wrap gap-2">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Título
            </label>
            <select
              id="title"
              name="title"
              value={formikPost.values.title}
              onChange={formikPost.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecciona una opción</option>
              <option value="mr">mr</option>
              <option value="mrs">mrs</option>
              <option value="miss">miss</option>
              <option value="ms">ms</option>
            </select>
            <span className="text-red-600 ">
              <small>{formikPost.errors.title}</small>
            </span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              Nombre
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Nombre"
              value={formikPost.values.firstName}
              onChange={formikPost.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span className="text-red-600 ">
              <small>{formikPost.errors.firstName}</small>
            </span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Apellido
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Apellido"
              value={formikPost.values.lastName}
              onChange={formikPost.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span className="text-red-600 ">
              <small>{formikPost.errors.lastName}</small>
            </span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              type="text"
              placeholder="Correo electrónico"
              value={formikPost.values.email}
              onChange={formikPost.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span className="text-red-600 ">
              <small>{formikPost.errors.email}</small>
            </span>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <button type="submit" className="bg-green-500 text-white rounded p-2 hover:opacity-40">
              Aceptar
            </button>
            <button onClick={unshowCreateModal} className="bg-red-500 text-white rounded p-2 hover:opacity-40">
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
