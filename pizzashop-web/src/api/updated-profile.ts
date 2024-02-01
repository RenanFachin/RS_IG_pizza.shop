import { api } from '@/lib/axios'

export interface UpdateProfileBody {
  name: string
  description: string | null
}

export async function updateProfile({ name, description }: UpdateProfileBody) {
  await new Promise((resolve, reject) => {
    setTimeout(reject, 2000)
  })

  await api.put('/profile', { name, description })
}
