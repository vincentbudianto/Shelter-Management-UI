<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <img src='/static/assets/RedCrossIcon.png' width=50px height=50px>
      <router-link class="navbar-brand text-light" :to="links[0].to">{{ links[0].name }}</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link text-light" :to="links[2].to">{{ links[2].name }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-light" :to="links[3].to">{{ links[3].name }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-light" :to="links[4].to">{{ links[4].name }}</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Type a victim's name" aria-label="Search">
          <button class="btn my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style scoped>
  .navbar ul {
    list-style: none;
    display: flex;
    padding: 0;
  }
  .navbar li {
    padding: 5px 15px 5px 0;
  }
  .navbar li a {
    font-weight: bold;
    text-decoration: none;
    color: gray;
  }
  .navbar li a:hover {
    color: #404040;
  }
  .navbar {
    background-color: black;
  }
</style>

<script>
export default {
  data: () => ({
    links: [
      {
        name: 'Disaster Management System',
        to: '/'
      },
      {
        name: 'Search',
        to: '/search'
      },
      {
        name: 'Disaster',
        to: '/disaster'
      },
      {
        name: 'Shelter',
        to: '/shelter'
      },
      {
        name: 'Login',
        to: '/login'
      }
    ],
    icons: [
      {
        icon: 'home',
        link: '/static/assets/Red Cross Icon.png'
      }
    ]
  })
}
</script>
<!--
<template>
  <div id="app">
    <header>
      <span>Vue.js PWA</span>
    </header>
    <main>
      <img src="./assets/logo.png" alt="Vue.js PWA">
      <hello></hello>
    </main>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
-->