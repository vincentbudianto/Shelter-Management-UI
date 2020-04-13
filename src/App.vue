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
              <router-link class="nav-link text-light" :to="links[1].to">{{ links[1].name }}</router-link>
            </li>
            <li class="nav-item active">
              <router-link class="nav-link text-light" :to="links[2].to">{{ links[2].name }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-light" :to="links[3].to">{{ links[3].name }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-light" :to="links[4].to">{{ links[4].name }}</router-link>
            </li>
            <li class="nav-item" v-if="$cookies.get('Type') == 'guest'">
              <router-link class="nav-link text-light" :to="links[5].to">{{ links[5].name }}</router-link>
            </li>
            <li class="nav-item" v-if="$cookies.get('Type') == 'admin' || $cookies.get('Type') == 'staff'">
              <router-link class="nav-link text-light" :to="links[6].to">{{ links[6].name }}</router-link>
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
  </v-app>
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
    font-family: Quattrocento;
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
        name: 'Placement',
        to: '/placement'
      },
      {
        name: 'Login',
        to: '/login'
      },
      {
        name: 'Logout',
        to: '/logout'
      }
    ],
    icons: [
      {
        icon: 'home',
        link: '/static/assets/Red Cross Icon.png'
      }
    ]
  }),

  methods: {
    fillInGuestCookie () {
      if (this.$cookies.get("AccountID") == null && this.$cookies.get("Type") == null){
        this.$cookies.set('AccountID', "null", 1);
        this.$cookies.set('Type', 'Guest', 1);
      }
    }
  },

  mounted () {
    this.fillInGuestCookie ()
  },
}
</script>