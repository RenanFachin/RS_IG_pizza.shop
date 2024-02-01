import { http, HttpResponse } from 'msw'

export const signInMock = http.post('/authenticate', () => {
  return new HttpResponse(null, { status: 401 })
})
