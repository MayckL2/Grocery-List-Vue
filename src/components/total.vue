<template>
    <aside class="absolute bottom-4 right-4 rounded-lg p-2 bg-green-500 z-10">
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