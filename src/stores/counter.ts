import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  
  const msg = ref('')
  function setMsg(e: string){
    msg.value = e
  }
  function showMsg(){
    return msg.value
  }

  return { msg, setMsg, showMsg }
})
