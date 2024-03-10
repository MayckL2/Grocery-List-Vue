<template>
    <v-dialog class="max-w-[30rem]">
        <template v-slot:activator="{ props: activatorProps }">
            <img v-if="!isDelete" src="./icons/botao-editar.png" v-bind="activatorProps"
                class="w-10 opacity-20 hover:opacity-100 transition-all" alt="Edit">
            <img v-if="isDelete" src="./icons/trash.png" v-bind="activatorProps"
                class="w-10 opacity-20 hover:opacity-100 transition-all" alt="Edit">

        </template>

        <template v-slot:default="{ isActive }">
            <v-card :title="text" color="#c3bbc9">
                <v-card-text v-if="!isDelete">
                    <v-sheet class="mx-auto" color="#c3bbc9">
                        <v-form @submit.prevent>
                            <v-text-field v-model="editName" :rules="rules" label="Item name"></v-text-field>
                            <v-text-field v-model="editPrice" :rules="rules" label="Item price"></v-text-field>
                        </v-form>
                    </v-sheet>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-if="isDelete" color="red" text="Delete"
                        @click="deleteItem(); isActive.value = false"></v-btn>
                    <v-btn v-if="!isDelete" color="purple" text="Editar" @click="edit(); isActive.value = false"></v-btn>

                    <v-btn text="Cancel" @click="isActive.value = false"></v-btn>

                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts">
import { deleteItem, editItem } from '@/services/api';
import { useCounterStore } from '@/stores/counter';

export default {
    data() {
        return {
            counter: useCounterStore(),
            editName: this.name || '',
            editPrice: this.price || 0,
            rules: [
                (value: string | number) => {
                    if (value) return true

                    return 'Write something...'
                },
            ],
        }
    },
    props: {
        id: String,
        img: String,
        text: String,
        isDelete: Boolean,
        name: String,
        price: Number
    },
    methods: {
        async deleteItem() {
            if (this.id) {
                let response = await deleteItem(this.id)
                console.log(response)
                if (response != 'error') {
                    this.$emit('update')
                    this.counter.setMsg('Item was deleted!')
                }
            }
        },
        async edit() {
            let response = await editItem(String(this.id), this.editName, this.editPrice)
            console.log(response)
            if (response != 'error') {
                this.$emit('update')
                this.counter.setMsg('Item was edited!')
            }
        }
    }
}
</script>