<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" >
      <img src="./assets/cumplo.png" width="112" height="28">
    </a>
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
         <router-link to="/">Bienvenido  </router-link>
      </a>

      <a class="navbar-item">
        <router-link to="usd">USD</router-link>
      </a>
      <a class="navbar-item">
          <router-link to="udis">UDIS</router-link>
        </a>

          <a class="navbar-item">
            <router-link to="tie">TIIE</router-link>
          </a>
    </div>
  </div>
</nav>
    <router-view/>
  </div>
</template>
