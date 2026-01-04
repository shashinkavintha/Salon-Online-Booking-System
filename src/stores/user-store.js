import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)

    const setUser = (newUser) => {
        user.value = newUser
    }

    const clearUser = () => {
        user.value = null
    }

    const isAuthenticated = () => !!user.value

    return {
        user,
        setUser,
        clearUser,
        isAuthenticated
    }
})
