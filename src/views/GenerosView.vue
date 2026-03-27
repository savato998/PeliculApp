<template>
    <h2 class="text-center my-5">Géneros</h2>
    <div class="container col-6 border rounded shadow fondo-form">
        <div class="row justify-content-center py-5">
            
            <GeneroForm class="col-8"
            :genero="generoSeleccionado"
            @guardar="guardarGenero"
            />
            <!-- aqui ira el formulario de generos -->
        </div>
        <div class="row justify-content-center">

            <table class="table table-striped table-hover mb-5 w-75">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="genero in generos" :key="genero.id">
                        <td>{{ genero.nombre }}</td>
                        <td class="text-end">
                            <button class="btn btn-primary btn-sm me-3" @click="editGenero(genero)">Editar</button>
                            <button class="btn btn-danger btn-sm me-3" @click="removeGenero(genero.id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>    
        </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import GeneroForm from '@/components/GeneroForm.vue';
    import { 
        getGeneros,
        createGenero,
        updateGenero,
        deleteGenero
    } from '@/services/generoService';

    const generos = ref([])
    const generoSeleccionado = ref(null)
    const isEditing = ref(false)
    
    const cargarGeneros = async () => {
        try {
            generos.value = await getGeneros()
        } catch (error) {
            console.error('Error al cargar los generos', error)
        }
    }

    onMounted(cargarGeneros)

    const guardarGenero = async (genero) => {
        if (isEditing.value) {
            await updateGenero(generoSeleccionado.value.id, genero)
        } else {
            await createGenero(genero)
        }

        generoSeleccionado.value = null
        isEditing.value = false

        await cargarGeneros()
    }

    const editGenero = (genero) => {
        generoSeleccionado.value = genero
        isEditing.value = true
    }

    const removeGenero = async (id) => {
        if (!confirm('Seguro/a que deseas eliminar este genero???')) return
        await deleteGenero(id)
        cargarGeneros()
    }
</script>

<style scoped>
</style>