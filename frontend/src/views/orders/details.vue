<script lang="js">

import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      order: {
        _id: null,
        transactionId: "",
        status: "",
        products: []
      },
      orderPaid: {
        id: null,
        transactionId: "",
        products: []
      }
    }
  },
  methods: {
    getTotal() {
      let total = 0;
      this.order.products.map(product => {
        total += product.productPrice * product.productCount
      })
      return total;
    },
    payOrder() {
      this.orderPaid.id = this.order._id
      this.orderPaid.transactionId = this.order.transactionId
      this.orderPaid.products = this.order.products.map(product => {
        return {
          productId: product.productId,
          productCount: product.productCount,
        }
      });
      axios.post('http://localhost:5000/api/payment', this.orderPaid)
          .then((response) => {
            if (response.data.statusCode === 200) {
              this.order.status = "PAID"
              Swal.fire({
                title: "Exito",
                text: response.data.message,
                icon: "success"
              });
            } else if (response.data.statusCode === 409) {
              this.order.status = "CANCELLED"
              Swal.fire({
                title: "Oops...!",
                text: response.data.message,
                icon: "error"
              });
            }
          });

    },
  },
  mounted() {
    axios.get(`http://localhost:5000/api/orders/${this.$route.params.id}`).then((order) => {
      this.order = order.data;
      this.order.products.map(product => {
        axios.get(`http://localhost:5000/api/products/${product.productId}`).then(response => {
          let _product = response.data;
          this.order.products.push({
            productId: _product._id,
            productName: _product.productName,
            productPrice: _product.productPrice,
            productCount: parseInt(product.productCount),
            totalPrice: _product.productPrice * product.productCount
          });
          this.order.products.shift()
        })
      });
    });
  }
}
</script>

<template>
  <h2>Detalle de Pedido: {{ order._id }} </h2>
  <hr>
  <table class="table is-striped">
    <thead class="table-light">
    <tr>
      <th>id</th>
      <td>{{ order._id }}</td>
    </tr>
    <tr>
      <th>Transaction Id</th>
      <td>{{ order.transactionId }}</td>
    </tr>
    <tr>
      <th>status</th>
      <td>{{ order.status }}</td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td colspan="3">
        <table class="table mb-0 table-striped table-hover">
          <thead class="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Sub Total</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="product in this.order.products">
            <td>{{ product.productName }}</td>
            <td>S/. {{ product.productPrice }}</td>
            <td>{{ product.productCount }}</td>
            <td>S/. {{ product.totalPrice }}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <th>Total</th>
            <td>S/. {{ getTotal() }}</td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td colspan="2"></td>
      <td>
        <button v-if="this.order.status !== 'PAID' && this.order.status !== 'CANCELLED'" class="btn btn-danger" @click="this.payOrder">Pagar</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>