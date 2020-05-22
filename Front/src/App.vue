<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info" style="min-width: 675px">
        <b-navbar-brand>Musical Hendrix</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          
          <b-navbar-nav>
            <b-nav-item href="/">Home</b-nav-item>
            <b-nav-item href="/mapa" >Donde Estamos</b-nav-item>
            <b-nav-item href="/productos" >Productos</b-nav-item>
            <b-nav-item href="/list" >Lista</b-nav-item>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
