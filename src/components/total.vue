<template>
    <aside class="fixed bottom-4 right-4 rounded-lg p-2 text-white bg-green-500 z-10 hover:scale-110 transition-all">
        <span class="text-sm font-bold flex justify-end">Total</span>
        <p class="text-2xl">R$ {{ total?.toFixed(2) }}</p>
    </aside>
</template>

<script lang="ts">
export default{
    props:{
        total: Number
    }
}
</script>