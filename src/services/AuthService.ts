interface Usuario {
  usuario: string
  senha: string
  tipo: number
}

class AuthService  {
  static async login(usuario: string, senha: string): Promise<Usuario | null> {
    try {
      const response = await fetch('http://localhost:3000/login')
      const users: Usuario[] = await response.json()

      const user = users.find((user) => user.usuario === usuario && user.senha === senha)

      return user || null
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
      return null
    }
  }
}

export default AuthService
