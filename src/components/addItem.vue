<template>
  <v-dialog class="max-w-[30rem]">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="purple" class="rounded-lg w-fit" text="Add Item" variant="flat"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Add new item" color="#c3bbc9">
        <v-card-text>
          <formItem @close-modal="isActive.value = false" @update-list="output"/>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" @click="isActive.value = false"></v-btn>

        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import formItem from './formItem.vue';
export default{
  components:{
    formItem
  },
  methods:{
    output(){
      this.$emit('update')
    }
  }
}
</script>