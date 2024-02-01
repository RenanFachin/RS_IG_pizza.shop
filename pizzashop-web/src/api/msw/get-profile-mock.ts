import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<
  never,
  never,
  GetProfileResponse // formato do retorno
>('/me', () => {
  return HttpResponse.json({
    id: 'custom-user-id',
    name: 'john doe',
    email: 'johndoe@example.com',
    phone: '559898989898',
    role: 'manager',
    createdAt: new Date(),
    updatedAt: null,
  })
})
