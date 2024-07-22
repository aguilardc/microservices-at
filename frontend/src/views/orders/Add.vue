<script lang="js">
import {uuid} from 'vue-uuid';
import Swal from 'sweetalert2'
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      transactionId: uuid.v1(),
      status: 'PENDING',
      products: [],
      flag: true,
    }
  },
  methods: {
    addItem() {
      if (!this.products.length) {
        return Swal.fire({
          title: "Oops...!",
          text: "Debe agregar un producto como mínimo",
          icon: "error"
        });
      }
        const _products = this.products.map(product => {
          return {
            "productId": product.productId,
            "productCount": product.productCount
          }
        })
        axios.post("http://localhost:5000/api/orders", {
          "transactionId": this.transactionId,
          "status": this.status,
          "products": _products
        })
            .then(response => {
              this.flag = false;
              Swal.fire({
                title: "Exito",
                text: "Se genero el pedido correctamente",
                icon: "success"
              });
            })

    },
    addProduct(product) {
      Swal.fire({
        title: `Ingrese la cantidad de ${product.productName}`,
        input: "number",
        inputAttributes: {
          autocapitalize: "off"
        },
        confirmButtonText: "Aceptar",
        showLoaderOnConfirm: true,
        preConfirm: async (inputValue) => {

          if (inputValue > 0) {
            for (const item of this.items) {
              if (item._id === product._id) {
                item.productStock = item.productStock - inputValue;
                break;
              }
            }

            this.products.push({
              productId: product._id,
              productName: product.productName,
              productPrice: product.productPrice,
              productCount: Number(inputValue)
            })

          }
        }
      });
    },
    listProducts() {
      axios.get('http://localhost:5000/api/products')
          .then(response => {
            this.items = response.data;
          })
    }
  }
}
</script>

<template>
  <h2>Nuevo Pedido</h2>
  <br>
  <form @submit.prevent="addItem">
    <div class="mb-3">
      <label class="form-label" for="transactionId">Codigo de Transacción</label>
      <input class="form-control" readonly="true" type="text" id="transactionId" placeholder="Codigo de Transacción"
             v-model="transactionId" required/>
    </div>
    <div class="mb-3">
      <label class="form-label" for="status">Estado</label>
      <input class="form-control" readonly="true" type="text" id="status" placeholder="Codigo de Transacción"
             v-model="status" required/>
    </div>

    <div class="row">
      <div class="col-6">
        <button v-if="this.flag"  @click="this.listProducts()" type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#exampleModal">
          Agregar Producto
        </button>
      </div>
    </div>

    <table class="table is-striped is-bordered">
      <thead>
      <tr>
        <th>Nombre producto</th>
        <th>Precio producto</th>
        <th>Cantidad producto</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, i) in products" :key="i">
        <td>{{ product.productName }}</td>
        <td>S/. {{ product.productPrice }}</td>
        <td>{{ product.productCount }}</td>
      </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col-2">
        <button v-if="this.flag" type="submit" class="btn btn-success">Generar Pedido</button>
      </div>
    </div>
  </form>
  <div class="modal modal-lg fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table table is-striped is-hoverable is-fullwidth">
            <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio Unitario S/.</th>
              <th>Stock</th>
              <th>-</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items" :key="item._id">
              <td>{{ item.productName }}</td>
              <td>S/. {{ item.productPrice }}</td>
              <td>{{ item.productStock }}</td>
              <td>
                <button class="button is-info" @click="this.addProduct(item)">Agregar</button>
              </td>
            </tr>
            </tbody>
          </table>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>