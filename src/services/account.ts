import auth from '@/plugins/auth'

export function getBalance(): Promise<any> {
  return auth.http({
    url: '/balance'
  })
}
