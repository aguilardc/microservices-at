<script lang="ts">
import {RouterLink} from "vue-router";
import axios from "axios";

export default {
  components: {RouterLink},
  data() {
    return {
      items: [],
    }
  },
  methods: {},
  mounted() {
    axios.get('http://localhost:5000/api/orders').then(response => {
      this.items = response.data;
    })
  }
}

</script>

<template>
  <div class="orders">
    <div class="row justify-content-between">
      <div class="col-6"><h2>Lista de Pedidos</h2></div>
      <div class="col-2">
        <RouterLink to="/orders/add" class="btn btn-success">NUEVO</RouterLink>
      </div>
    </div>
    <table class="table table is-striped is-hoverable is-fullwidth">
      <thead>
      <tr>
        <th>transactionId</th>
        <th>status</th>
        <th>detalle</th>
      </tr>
      </thead>
      <tbody>
      <tr :class="item.status === 'PAID' ? 'table-success' : item.status === 'CANCELLED' ? 'table-danger' : 'table-warning'"
          v-for="item in items" :key="item._id">
        <td>{{ item.transactionId }}</td>
        <td>{{ item.status }}</td>
        <td>
          <RouterLink :to="{path: `orders/${item._id}`}">
            <button class="btn btn-warning">
              ver detalle
            </button>
          </RouterLink>
        </td>

      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>