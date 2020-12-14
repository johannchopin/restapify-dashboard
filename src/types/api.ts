export type HttpMethod = 'GET' | 'PUT' | 'DELETE' | 'POST' | 'PATCH'

export interface RouteResponse {
  body: string
  fileContent: string
  filename: string
  isExtended: boolean
  method: HttpMethod
  normalizedRoute: string
  route: string
  routeVars: string[]
  stateVars: string[]
  statusCode: number
}
export interface StatesResponse {
  route: string
  state: string
  method?: HttpMethod
}

export interface GetRoutesResponse {
  [route: string]: {
    [method in HttpMethod]: RouteResponse
  }
}

export type GetStatesResponse = StatesResponse[]