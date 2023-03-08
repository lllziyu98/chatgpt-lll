import Register from '@/pages/register'

export default [{
  path: '/register',
  name: 'register',
  component: Register,
  meta: {
    full: true,
    noLogin: true
  }
}]
