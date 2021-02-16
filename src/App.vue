<template>
  <div id="app">
    <div id="nav">
       <router-link to="/">Hello page</router-link>
        <router-link to="/mappage">Map page</router-link>
        <router-link to="/tablepage">Table page</router-link>
    </div>
    <router-view/>
  </div>
</template>
<style>
body {
    margin:0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin:0;
}
#nav a {
    text-decoration:none;
    margin: 0 20px;
    font-weight:bolder;
    text-transform: uppercase;
    font-size: 20px;
    color: cornflowerblue;
}
#nav a:hover {
    color: blue;
    text-decoration:underline;
}
</style>
