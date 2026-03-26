<template>
    <div class="row justify-content-center my-5">
    <h2 class="text-center my-5">iniciar sesión </h2>
    <div class="col-4 border-rounded shadow fondo-form">
        <div class="mb-3">
            <form @submit.prevent="iniciarSesion" class="mb-3">

                <div class="mb-3">
                    <label class="form-label" >Email</label>
                    <input type="email" class="form-control" v-model="email" required>
                </div>
                <div class="mb-3">
                
                    <label class="form-label" >Password</label>
                    <input type="password" class="form-control" v-model="password" required>
                    
                </div>
                <button class="btn btn-primary w-100">Iniciar Sesión </button>
            </form>
            <div class="text-center">
                <router-link to="/register" >Registrarse</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import {ref} from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {login, getUserRol, getUserProfile} from '@/services/authService'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const iniciarSesion = async () => {
    try {
        const user = await login(email.value, password.value)

        store.commit('setUser', user)
        const rol = await getUserRol(user.uid)
        store.commit('setRol', rol)

        const profile = await getUserProfile(user.uid)
        store.commit('setUserProfile', profile)

        router.push('/peliculas')

    } catch (error) {
        console.error(error.message)
    }
}
</script>

<style scoped></style>