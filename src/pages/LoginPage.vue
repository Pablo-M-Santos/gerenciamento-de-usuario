<template>
  <v-app>
    <v-container
      fluid
      fill-height
      class="login-container"
    >
      <v-row
        align="center"
        justify="center"
        style="height: 100%;"
      >
        <v-col
          xs12
          sm8
          md4
        >
          <v-card class="elevation-12">
            <v-toolbar
              dark
              color="primary"
            >
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field
                  v-model="usuario"
                  label="Usuário"
                  variant="outlined"
                  :rules="[
                    (value) => !!value || 'O campo Usuário é obrigatório.'
                  ]"
                  required
                />
                <v-text-field
                  v-model="senha"
                  label="Senha"
                  type="password"
                  variant="outlined"
                  :rules="[
                    (value) => !!value || 'O campo Senha é obrigatório.'
                  ]"
                  required
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                type="submit"
                color="primary"
                @click="login"
              >
                Entrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Snackbar para feedback -->
    <v-snackbar
      v-model="snackbar.visible"
      :timeout="2000"
      :color="snackbar.color"
      elevation="24"
      top
    >
      {{ snackbar.message }}
      <template #activator="{ props }">
        <v-btn
          class="ma-2"
          v-bind="props"
          @click="snackbar.visible = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserService from '../services/AuthService';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const usuario = ref('');
const senha = ref('');
const authStore = useAuthStore();
const router = useRouter();

const snackbar = ref({
  visible: false,
  message: '',
  color: '',
});

const login = async () => {
  const user = await UserService.login(usuario.value, senha.value);
  if (user) {
    snackbar.value = {
      visible: true,
      message: 'Login realizado com sucesso! Bem-vindo!',
      color: 'green',
    };
    authStore.setUser (user);
    router.push('/user');
  } else {
    snackbar.value = {
      visible: true,
      message: 'Usuário ou senha incorretos. Tente novamente.',
      color: 'red',
    };
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
}

.v-card {
  width: 100%; 
  max-width: 400px;
  margin: auto;
}
</style>
