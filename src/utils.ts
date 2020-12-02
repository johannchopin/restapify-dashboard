import type { RouteResponse } from "./types"

export const replaceAll = (str: string, find: string, replace: string): string => {
  return str.split(find).join(replace)
}

export const getRouteSectionId = (route: RouteResponse): string => {
  return route.method + replaceAll(route.route, '/', '-')
}
