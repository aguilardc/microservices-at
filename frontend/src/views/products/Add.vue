<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      productName: '',
      productPrice: '',
      productStock: '',
    }
  },
  methods: {
    addItem() {
      axios.post('http://localhost:5000/api/products', {
        "productName": this.productName,
        "productPrice": this.productPrice,
        "productStock": this.productStock
      })
          .then(() => {
            this.productName = '';
            this.productPrice = '';
            this.productStock = '';
            this.$router.push('/products');
          })
    }
  }
}
</script>

<template>
  <h2>Agregar producto</h2>
  <br>
  <form @submit.prevent="addItem">
    <div class="mb-3">
      <label class="form-label" for="productName">Nombre</label>
      <input class="form-control" type="text" id="productName" placeholder="Nombre" v-model="productName" required/>
    </div>
    <div class="field">
      <label class="form-label" for="productPrice">Precio</label>
      <input class="form-control" type="number" id="productPrice" placeholder="Precio" v-model="productPrice" required/>
    </div>
    <div class="field">
      <label class="form-label" for="productStock">Stock</label>
      <input class="form-control" type="number" id="productStock" placeholder="Stock" v-model="productStock" required/>
    </div>
    <br>
    <button type="submit" class="btn btn-success">Agregar Producto</button>
  </form>
</template>

<style scoped>

</style>