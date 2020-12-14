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
  states?: {
    [state: string]: Pick<RouteResponse, 'fileContent'
      | 'statusCode'
      | 'body'
    >
  }
}
export interface StateResponse {
  route: string
  state: string
  method?: HttpMethod
}

export interface GetRoutesResponse {
  [route: string]: {
    [method in HttpMethod]: RouteResponse
  }
}

export type GetStatesResponse = StateResponse[]