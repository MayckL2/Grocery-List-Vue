<script lang="ts">
import { addItem } from '@/services/api'
import { useCounterStore } from '@/stores/counter'

export default {
    data() {
        return {
            counter: useCounterStore(),
            item: '',
            rules: [
                (value: string) => {
                    if (value) return true

                    return 'You must enter a name product.'
                },
            ],
            price: <number|null> null,
            rulesPrice: [
                (value: number) => {
                    if (value > 0) return true

                    return 'Give a price for the item.'
                },
            ],
        }
    },
    methods: {
        async write() {
            if(this.item != '' && this.price && this.price > 0){
                let response = await addItem(this.item, this.price)
                console.log(response)
                this.counter.setMsg(this.item + ' has writen on the list')
                this.$emit('update-list')
                this.$emit('close-modal')
            }
        }
    }
}
</script>

<template>
    <v-sheet class="mx-auto" color="#c3bbc9">
        <v-form @submit.prevent="write">
            <v-text-field v-model="item" :rules="rules" label="Item name"></v-text-field>
            <v-text-field v-model="price" :rules="rulesPrice" label="Item price"></v-text-field>
            <v-btn class="mt-2" type="submit" block>Write</v-btn>
        </v-form>
    </v-sheet>
</template>
