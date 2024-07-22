<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <div class="container">
    <br>
    <header>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link"><RouterLink to="/">Home</RouterLink></a>
              </li>
              <li class="nav-link">
                <RouterLink to="/products"><a class="navbar-item">Productos</a></RouterLink>
              </li>
              <li class="nav-link">
                <RouterLink to="/orders"><a class="navbar-item">Pedidos</a></RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <hr>
    <RouterView/>
  </div>
</template>

<style scoped>
</style>
