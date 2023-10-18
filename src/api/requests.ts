import { UserData } from "@/types/types"
import axios from "axios"

// url y headers por defecto para todas las peticiones
const url = "https://dummyapi.io/data/v1"
const headers = {
  "app-id": process.env.NEXT_PUBLIC_APP_DATA,
}
// Petición GET
export async function getRequest(params: string): Promise<UserData[]> {
  let result: UserData[] = []
  await axios
    .get(url + params, { headers })
    .then((response) => (result = response.data.data))
    .catch((error) => {
      // Manejar errores
      throw "Error al hacer la petición:" + error
    })
  return result
}
