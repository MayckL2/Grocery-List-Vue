<template>
    <li id="linha" @click="mark(id, toggleMark)" :class="classItem">
        <span class="text-xl font-bold">{{ id }}# </span>

        <div class="flex flex-col items-center sm:items-end">
            <p class="text-xl capitalize">{{ name }}</p>
            <span class="text-sm ">R$ {{ Number(price)?.toFixed(2) }}</span>
        </div>
        
        <div class="flex gap-4 items-center sm:absolute -right-28">
            <confirm text="Wish to Edit this item?" :isDelete="false" :id="id" @update="update" :name="name" :price="Number(price)"/>
            <confirm text="Wish to Delete this item?" :isDelete="true" :id="id" @update="update"/>
        </div>
    </li>
</template>

<script lang="ts">
import { mark } from '@/services/api';
import { useCounterStore } from '@/stores/counter';
import confirm from './confirm.vue';

export default {
    components:{
        confirm
    },
    data() {
        return {
            toggleMark: this.marked,
            counter: useCounterStore(),
            classItem: 'flex justify-between items-center gap-4 relative p-2 rounded-lg bg-palette2 hover:bg-opacity-50 transition-all cursor-pointer'
        }
    },
    props: {
        id: String ,
        name: String,
        price: Number,
        marked: Boolean
    },
    created() {
        if (this.marked) {
            this.classItem = this.classItem.replace('bg-palette2', 'bg-palette3/50 line-through')
        }
    },
    methods: {
        async mark(id: string | number | undefined, isMarked: boolean) {
            let response = await mark(id, isMarked)
            this.toggleMark = response.marked
            console.log(response)
            if (response.marked) {
                this.counter.setMsg(this.name + ' item has marked!')
                this.classItem = this.classItem.replace('bg-palette2', 'bg-palette3/50 line-through')
            } else {
                this.counter.setMsg(this.name + ' item has desmarked!')
                this.classItem = this.classItem.replace('bg-palette3/50 line-through', 'bg-palette2')
            }
        },
        update(){
            this.$emit('update')
        }
    }
}
</script>