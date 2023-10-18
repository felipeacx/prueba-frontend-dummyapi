import { UserData } from "@/types/types"
import axios from "axios"

// url y headers por defecto para todas las peticiones
const url = "https://dummyapi.io/data/v1"
const headers = {
  "app-id": process.env.NEXT_PUBLIC_APP_DATA,
}
// Petición para obtener los datos GET
export async function getRequest(params: string): Promise<UserData[]> {
  let result: UserData[] = []
  await axios
    .get(url + params, { headers })
    .then((response) => (result = response.data))
    .catch((error) => {
      // Manejar errores
      throw "Error al obtener datos:" + error
    })
  return result
}

// Petición borrar DELETE
export async function deleteRequest(params: string): Promise<string> {
  let result = ""
  await axios
    .delete(url + params, { headers })
    .then((response) => (result = response.data.id))
    .catch((error) => {
      // Manejar errores
      throw "Error al intentar borrar:" + error
    })
  return result
}

// Petición actualizar PUT
export async function updateRequest(params: string, data: any): Promise<string> {
  let result = ""
  await axios
    .put(url + params, data, { headers })
    .then((response) => (result = response.data))
    .catch((error) => {
      // Manejar errores
      throw "Error al intentar borrar:" + error
    })
  return result
}

// Petición crear POST
export async function postRequest(params: string, data: any): Promise<string> {
  let result = ""
  await axios
    .post(url + params, data, { headers })
    .then((response) => (result = response.data))
    .catch((error) => {
      // Manejar errores
      throw "Error al intentar borrar:" + error
    })
  return result
}
