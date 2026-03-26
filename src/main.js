import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'
import { firebaseApp } from './firebase/firebase'
import store from './store'
import {auth} from './firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getUserProfile } from './services/authService'

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

//mi css
import '../src/assets/css/main.css'



const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueFire,{
    firebaseApp,
    modules: [
        VueFireFirestoreOptionsAPI()
    ]
})

onAuthStateChanged(auth, async (user) =>{
    if(user){
        store.commit('setUser', user)
        const profile = await getUserProfile(user.uid)
        if(profile){
            store.commit('setUserProfile', profile)
            store.commit('setRol', profile.rol)
        }
    } else{
        store.commit('logout')
    }
})

app.mount('#app')
