<script lang="js">
import axios from 'axios';
import {RouterLink} from "vue-router";

export default {
  components: {RouterLink},
  data() {
    return {
      items: [],
    }
  },
  methods: {},
  mounted() {
    axios.get('http://localhost:5000/api/products').then(response => {
      this.items = response.data;
    })
  }
}
</script>

<template>
  <div class="products">
    <div class="row justify-content-between">
      <div class="col-6"><h2>Lista de Productos</h2></div>
      <div class="col-2">
        <RouterLink to="/products/add" class="btn btn-success">NUEVO</RouterLink>
      </div>
    </div>
    <table class="table table is-striped is-hoverable is-fullwidth">
      <thead>
      <tr>
        <th>Nombre</th>
        <th>Precio Unitario S/.</th>
        <th>Stock</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item._id">
        <td>{{ item.productName }}</td>
        <td>S/. {{ item.productPrice }}</td>
        <td>{{ item.productStock }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>