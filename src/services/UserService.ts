export interface Usuario {
  id: number
  nome: string
  matricula: string
  idade: number
  cargo: string
  tipo_usuario: number
}

class UserService {
  // GetAll
  static async getUsuarios(): Promise<Usuario[]> {
    try {
      const response = await fetch('http://localhost:3000/usuarios')
      const usuarios: Usuario[] = await response.json()
      return usuarios
    } catch (error) {
      console.error('Erro ao buscar os usuários:', error)
      return []
    }
  }

  // Post
  static async createUsuario(usuario: Usuario): Promise<Usuario> {
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      })
      return await response.json()
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error)
      throw error
    }
  }

  // Put
  static async updateUsuario(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      })
      return await response.json()
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error)
      throw error
    }
  }

  // Delete
  static async deleteUsuario(id: number): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Erro ao excluir o usuário')
      }
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error)
      throw error
    }
  }

  // Pesquisa
  static async searchUsuarios(query: string): Promise<Usuario[]> {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const usuarios: Usuario[] = await response.json();

      return usuarios.filter((usuario) =>
        usuario.nome.toLowerCase().includes(query.toLowerCase()) ||
        usuario.matricula.toLowerCase().includes(query.toLowerCase()) ||
        usuario.idade.toString().includes(query) ||
        usuario.cargo.toLowerCase().includes(query.toLowerCase()) ||
        usuario.tipo_usuario.toString().includes(query) ||
        (query.toLowerCase() === 'admin' && usuario.tipo_usuario === 1) ||
        (query.toLowerCase() === 'comum' && usuario.tipo_usuario === 2)
      );
    } catch (error) {
      console.error('Erro ao buscar os usuários:', error);
      return [];
    }
  }
}

export default UserService
