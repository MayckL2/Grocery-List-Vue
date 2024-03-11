<script lang="ts">
import { getAll, clearAll } from '@/services/api';
import addItem from '../components/addItem.vue';
import { useCounterStore } from '@/stores/counter'
import item from '@/components/item.vue';
import total from '@/components/total.vue';

export default {
  name: 'home',
  components: {
    addItem,
    item,
    total
  },
  data() {
    return {
      counter: useCounterStore(),
      list: <Array<{ id: number, item: string, marked: boolean, preco: number }>>[],
      statusAlert: <"error" | "success" | "warning" | "info" | undefined>'info',
      soma: 0
    }
  },
  async created() {
    let response = await getAll()
    console.log(response)
    if (response == 'error') {
      this.counter.setMsg('Something wrong...')
      this.statusAlert = 'error'
    } else {
      if (this.list.length == 0) {
        this.statusAlert = 'info'
        this.counter.setMsg('Is nothing on the list...')
      }else{
        this.statusAlert = 'success'
        this.counter.setMsg('There is you list!')
      }
      this.list = response
    }
    this.somaTotal()
  },
  methods: {
    async updateList() {
      let response = await getAll()
      console.log(response)
      this.list = response
      this.somaTotal()
    },
    async clear() {
      let response = await clearAll()
      this.counter.setMsg(response)
      setTimeout(() => {
        this.updateList()
      }, 500)
    },
    somaTotal() {
      this.soma = 0
      for (let i = 0; i < this.list.length; i++) {
        this.soma += Number(this.list[i].preco)
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 text-palette mx-[0%] sm:mx-[17%] md:mx-[23%]">
    <total :total="soma" />
    <div
      class="flex justify-between items-start sm:items-end gap-2 py-2 flex-col sm:flex-row sticky top-0 z-10 bg-palette">
      <h1 class="text-5xl">Grocery List</h1>
      <addItem @update="updateList" />
    </div>

    <v-alert :text="counter.msg" :type="statusAlert"></v-alert>

    <ul class="flex flex-col gap-2">
      <item v-for="item in list" :key="item.id" :id="String(item.id)" :name="item.item" :price="item.preco"
        :marked="item.marked" @update="updateList"></item>
      <div v-if="list.length == 0" class="flex flex-col self-center relative">
        <img class="w-80" src="/empity.png" alt="empity list">
        <p class="absolute bottom-6 text-xl font-bold capitalize">write something on yout list!</p>
      </div>
    </ul>

    <v-dialog class="max-w-[30rem]">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-if="list.length > 0" v-bind="activatorProps" color="red" class="rounded-lg w-fit" text="Clear List"
          variant="flat"></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Clear ALL the itens?" color="#c3bbc9">
          <v-card-text>
            This action is irreversible!
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Clear List" variant="outlined" class="font-bold" color="red"
              @click="clear(); isActive.value = false"></v-btn>
            <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

  </div>

</template>
