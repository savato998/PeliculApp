<template>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div class="container">
            <!-- <a class="navbar-brand" href="#">¡PeliculApp!</a> -->
            <router-link class="navbar-brand" to="/peliculas">¡PELICULAPP!</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ms-auto">
                    <router-link class="nav-link active" aria-current="page" to="/peliculas">Ver películas</router-link>
                        <router-link class="nav-link" to="/actores" v-if="isAdmin">Actores</router-link>
                        <router-link class="nav-link" to="/generos" v-if="isAdmin">Géneros</router-link>
                </div>
                <div class="navbar-nav ms-auto">
                    <template v-if="!user">
                        <router-link class="nav-link" to="/register">Registrarse</router-link>
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </template>
                    <template v-else>
                        <span class="nav-link me-3">¡Hola {{ nombre }}!</span>
                        <button @click="cerrarSesion" class="btn btn-outline-light">cerrar sesión</button>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {logout} from '@/services/authService'
// import router from '@/router';


const store = useStore()
const router = useRouter()

const user = computed(()=>store.state.user)
const isAdmin = computed(()=> store.state.rol === 'admin')


const nombre = computed(()=>{
    return store.state.userProfile?.nombre || ''
})

const cerrarSesion = async () => {
    await logout()
    store.commit('logout')
    router.push('/peliculas')
}
</script>

<style scoped>
</style>