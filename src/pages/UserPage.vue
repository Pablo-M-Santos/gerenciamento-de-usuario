<template>
  <v-container class="mt-4">
    <v-row
      v-if="user?.tipo === 1"
      class="mb-3"
      align="center"
    >
      <span>Admin</span>
      <v-btn
        color="error"
        class="ml-3"
        @click="logout"
      >
        Sair
      </v-btn>
    </v-row>

    <v-row
      v-if="user?.tipo === 2"
      class="mb-3"
      align="center"
    >
      <span>Comum</span>
      <v-btn
        color="error"
        class="ml-3"
        @click="logout"
      >
        Sair
      </v-btn>
    </v-row>

    <!-- Barra de pesquisa -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-text-field
          v-model="searchQuery"
          label="Pesquisar Usuário"
          single-line
          hide-details
          clearable
          class="w-100"
          @keydown.enter="searchUsuarios"
        />
      </v-col>
    </v-row>

    <!-- Table -->
    <v-table
      class="elevation-1"
      dense
    >
      <thead>
        <tr>
          <th class="text-left">
            Nome
          </th>
          <th class="text-left">
            Matrícula
          </th>
          <th class="text-left">
            Idade
          </th>
          <th class="text-left">
            Cargo
          </th>
          <th class="text-left">
            Tipo de Usuário
          </th>
          <th
            v-if="!Comum"
            class="text-center"
          >
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="usuario in filteredUsuarios"
          :key="usuario.matricula"
        >
          <td>{{ usuario.nome }}</td>
          <td>{{ usuario.matricula }}</td>
          <td>{{ usuario.idade }}</td>
          <td>{{ usuario.cargo }}</td>
          <td>{{ usuario.tipo_usuario === 1 ? 'Admin' : 'Comum' }}</td>
          <td class="text-center">
            <v-btn
              v-if="!Comum"
              color="primary"
              class="mr-2"
              small
              @click="edicaoUsuario(usuario)"
            >
              Editar
            </v-btn>
            <v-btn
              v-if="!Comum"
              color="error"
              small
              @click="abrirModalConfirmacao(usuario.id)"
            >
              Excluir
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>




    <!-- Cadastro -->
    <v-dialog
      v-model="dialogCadastro"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Cadastrar Usuário</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="cadastrarUsuario"
          >
            <v-text-field
              v-model="novoUsuario.nome"
              label="Nome"
              required
            />
            <v-text-field
              v-model="novoUsuario.matricula"
              label="Matrícula"
              required
            />
            <v-text-field
              v-model="novoUsuario.idade"
              label="Idade"
              type="number"
              required
            />
            <v-text-field
              v-model="novoUsuario.cargo"
              label="Cargo"
              required
            />
            <v-select
              v-model="novoUsuario.tipo_usuario"
              :items="[1, 2]"
              label="Tipo de Usuário"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogCadastro = false">
            Cancelar
          </v-btn>
          <v-btn
            :disabled="!valid"
          >
            Cadastrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- Editar -->
    <v-dialog
      v-model="dialogAtualizar"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Editar Usuário</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="cadastrarUsuario"
          >
            <v-text-field
              v-model="novoUsuario.nome"
              label="Nome"
              required
            />
            <v-text-field
              v-model="novoUsuario.matricula"
              label="Matrícula"
              required
            />
            <v-text-field
              v-model="novoUsuario.idade"
              label="Idade"
              type="number"
              required
            />
            <v-text-field
              v-model="novoUsuario.cargo"
              label="Cargo"
              required
            />
            <v-select
              v-model="novoUsuario.tipo_usuario"
              :items="[1, 2]"
              label="Tipo de Usuário"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogAtualizar = false">
            Cancelar
          </v-btn>
          <v-btn
            :disabled="!valid"
            @click="editarUsuario"
          >
            Atualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Excluir -->
    <v-dialog
      v-model="dialogDeletar"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-title class="headline">
          Confirmar Exclusão
        </v-card-title>
        <v-card-text>
          Tem certeza de que deseja excluir este usuário? Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="secondary"
            @click="dialogDeletar = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="error"
            @click="deletarUsuario"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- Botão para sair -->


    <v-row class="mt-5">
      <v-btn
        v-if="!Comum"
        color="primary"
        @click="abrirModalCadastro"
      >
        Cadastrar Usuário
      </v-btn>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { VContainer, VDialog, VCard, VCardTitle, VCardText, VCardActions, VBtn, VTextField, VSelect, VForm } from 'vuetify/components';
import UserService, { type Usuario } from '../services/UserService';

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const usuarios = ref<Usuario[]>([]);
const filteredUsuarios = ref<Usuario[]>([]);
const usuarioAExcluir = ref<number | null>(null);
const dialogCadastro = ref(false);
const dialogAtualizar = ref(false);
const dialogDeletar = ref(false);
const valid = ref(false);
const searchQuery = ref('');


const Comum = computed(() => authStore.Comum)

onMounted(async () => {
  try {
    usuarios.value = await UserService.getUsuarios();
    loadUsuarios();
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
});

const cadastrarUsuario = async () => {
  try {
    const usuario = await UserService.createUsuario(novoUsuario.value);
    usuarios.value.push(usuario);
    dialogCadastro.value = false;
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
  }
};



const novoUsuario = ref({
  id: 0,
  nome: '',
  matricula: '',
  idade: 0,
  cargo: '',
  tipo_usuario: null,
});

const limparCampos = () => {
  novoUsuario.value = {
    nome: '',
    matricula: '',
    idade: '',
    cargo: '',
    tipo_usuario: null,
  };
};

const edicaoUsuario = (usuario: Usuario) => {
  novoUsuario.value = { ...usuario };
  dialogAtualizar.value = true;
};

const abrirModalCadastro = () => {
  limparCampos(); // Limpar os campos antes de abrir o modal
  dialogCadastro.value = true; // Abrir o modal de cadastro
};

const editarUsuario = async () => {
  if (novoUsuario.value) {
    try {
      await UserService.updateUsuario(novoUsuario.value.id, novoUsuario.value);
      usuarios.value = await UserService.getUsuarios();
      dialogAtualizar.value = false;
      loadUsuarios();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  }
};

const deletarUsuario = async () => {
  if (usuarioAExcluir.value) {
    try {
      await UserService.deleteUsuario(usuarioAExcluir.value);
      usuarios.value = await UserService.getUsuarios();
      dialogDeletar.value = false;
      loadUsuarios();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }
};

const searchUsuarios = async () => {
  if (searchQuery.value) {
    filteredUsuarios.value = await UserService.searchUsuarios(searchQuery.value);
  } else {
    filteredUsuarios.value = usuarios.value;
  }
};

const loadUsuarios = async () => {
  try {
    filteredUsuarios.value = usuarios.value;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
};


const abrirModalConfirmacao = (id: number) => {
  usuarioAExcluir.value = id;
  dialogDeletar.value = true;
};



const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>
