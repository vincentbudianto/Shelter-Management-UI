<template>
  <v-app>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="w-75">
          <img src='/static/assets/RedCrossIcon.png' width=50px height=50px>
          <router-link class="navbar-brand text-light" :to="links[0].to">{{ links[0].name }}</router-link>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active" v-if="$cookies.get('Type') == 'Admin'">
              <router-link class="nav-link text-light" :to="links[1].to">{{ links[1].name }}</router-link>
            </li>
            <li class="nav-item active" v-if="$cookies.get('Type') == 'Admin'">
              <router-link class="nav-link text-light" :to="links[2].to">{{ links[2].name }}</router-link>
            </li>
            <li class="nav-item" v-if="$cookies.get('Type') == 'Admin' || $cookies.get('Type') == 'Staff'">
              <router-link class="nav-link text-light" :to="links[3].to">{{ links[3].name }}</router-link>
            </li>
            <li class="nav-item" v-if="$cookies.get('Type') == 'Admin' || $cookies.get('Type') == 'Staff'">
              <router-link class="nav-link text-light" :to="links[4].to">{{ links[4].name }}</router-link>
            </li>
            <li class="nav-item" v-if="$cookies.get('Type') == 'Admin' || $cookies.get('Type') == 'Staff'">
              <router-link class="nav-link text-light" :to="links[5].to">{{ links[5].name }}</router-link>
            </li>
            <li class="nav-item" v-if="$cookies.get('Type') == 'Guest' || $cookies.get('Type') == null">
              <router-link class="nav-link text-light" :to="links[6].to">{{ links[6].name }}</router-link>
            </li>
            <li class="nav-item" v-if="$cookies.get('Type') == 'Admin'">
              <router-link class="nav-link text-light" :to="links[7].to">{{ links[7].name }}</router-link>
            </li>
            <li class="nav-item" v-if="$cookies.get('Type') == 'Admin' || $cookies.get('Type') == 'Staff'">
              <router-link class="nav-link text-light" :to="links[8].to">{{ links[8].name }}</router-link>
            </li>
          </ul>
          <!-- <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Type a victim's name" aria-label="Search">
            <button class="btn my-2 my-sm-0" type="submit">Search</button>
          </form> -->
        </div>
      </nav>
      <main>
        <router-view/>
        <notifications group="update-notification" position="bottom left"/>
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
  }
  .navbar li a:hover {
    color: #404040;
  }
  .navbar {
    background-color: black;
  }
</style>

<script>
import axios from 'axios';
export default {
  data: () => ({
    links: [
      {
        name: 'Disaster Management System',
        to: '/'
      },
      {
        name: 'Dashboard',
        to: '/dashboard'
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
        name: 'Search',
        to: '/search'
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
        name: 'Settings',
        to: '/settings'
      },
      {
        name: 'Logout',
        to: '/logout'
      },
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
        this.$cookies.set('AccountID', "null", -1);
        this.$cookies.set('Type', 'Guest', -1);
      }
    },
    showNotification() {
      let cObj = this;
      if(this.$cookies.get("Type") == 'Admin'){
        axios.get(process.env.API_ROUTE + '/shelter/all')
        .then(function (response) {
          for (let i = 0; i < response.data.data.length; i++){
            let sid = response.data.data[i].ShelterID;
            axios.get(process.env.API_ROUTE + '/shelter/conditions?id=' + sid)
            .then(response => {
              let lu = 0;
              let temp = 0;
              let condLength = response.data.data.length;
              for (let j = 0; j < condLength; j++) {
                temp = Date.parse(response.data.data[j].Timestamp);
                if (temp > lu) {
                  lu = temp;
                }
              }
              axios.get(process.env.API_ROUTE + '/shelter/needs?id=' + sid)
              .then(response => {
                for (let j = 0; j < response.data.data.length; j++) {
                  temp = Date.parse(response.data.data[j].Timestamp);
                  if (temp > lu) {
                    lu = temp;
                  }
                }
                let cu = Date.now();
                if (cu - lu > 86400000 || (response.data.data.length == 0 && condLength == 0)) {
                  cObj.$notify({
                    group: 'update-notification',
                    title: 'The Data is Outdated',
                    text: 'Hello Admin! Shelter ' + sid + ' has not been updated for a while',
                    duration: -1
                  });
                }
              })
              .catch(e => {
                console.log(e)
              })
            })
            .catch(e => {
              console.log(e)
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
      } else if(this.$cookies.get("Type") == 'Staff'){
        axios.get(process.env.API_ROUTE + '/shelter/all')
        .then(function (response) {
          for (let i = 0; i < response.data.data.length; i++){
            let sid = response.data.data[i].ShelterID;
            axios.get(process.env.API_ROUTE + '/check/shelter/staff?staffId=' + cObj.$cookies.get('AccountID') + '&shelterId=' + sid)
            .then(function (response) {
              if (response.data.data.isStaffShelter == true) {
                axios.get(process.env.API_ROUTE + '/shelter/conditions?id=' + sid)
                .then(response => {
                  let lu = 0;
                  let temp = 0;
                  let condLength = response.data.data.length;
                  for (let j = 0; j < condLength; j++) {
                    temp = Date.parse(response.data.data[j].Timestamp);
                    if (temp > lu) {
                      lu = temp;
                    }
                  }
                  axios.get(process.env.API_ROUTE + '/shelter/needs?id=' + sid)
                  .then(response => {
                    for (let j = 0; j < response.data.data.length; j++) {
                      temp = Date.parse(response.data.data[j].Timestamp);
                      if (temp > lu) {
                        lu = temp;
                      }
                    }
                    let cu = Date.now();
                    if (cu - lu > 86400000 || (response.data.data.length == 0 && condLength == 0)) {
                      cObj.$notify({
                        group: 'update-notification',
                        title: 'Data is outdated',
                        text: 'Hello Staff! Shelter ' + sid + ' has not been updated for a while',
                        duration: -1
                      });
                    }
                  })
                  .catch(e => {
                    console.log(e)
                  })
                })
                .catch(e => {
                  console.log(e)
                });
              }
            })
            .catch(error => {
              console.log(error);
            })
          }
        })
        .catch(error => {
          console.log(error);
        })
      }
    }
  },

  mounted () {
    this.fillInGuestCookie ()
    this.showNotification()
  },
}
</script>