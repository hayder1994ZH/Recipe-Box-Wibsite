<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav id="sidebar">
      <ul
        class="list-unstyled components"
        style="height: 41rem; background: white"
      >
        <li aria-expanded="false" v-if="rule_name === 'admin'">
          <router-link exact :to="{ name: 'dashboard.home-1' }" class="d-flex">
            <i class="fas fa-suitcase iq-arrow-left icon-block"></i>
            <a class="a-font" href="#">Dashboard</a>
          </router-link>
        </li>
        <li aria-expanded="false" v-if="rule_name === 'admin'">
          <router-link exact :to="{ name: 'dashboard.users' }" class="d-flex">
            <i class="fas fa-user iq-arrow-left icon-block"></i>
            <a class="a-font" href="#">Users</a>
          </router-link>
        </li>
        <li aria-expanded="false" v-if="rule_name !== 'admin'">
          <router-link exact :to="{ name: 'dashboard.client.products' }" class="d-flex">
            <i class="fas fa-sliders-h"></i>
            <a class="a-font" href="#"> Products</a>
          </router-link>
        </li>
        <li aria-expanded="false" v-if="rule_name === 'admin'">
          <router-link exact :to="{ name: 'dashboard.products' }" class="d-flex">
            <i class="fas fa-sliders-h"></i>
            <a class="a-font" href="#"> Products</a>
          </router-link>
        </li>
        <li aria-expanded="false" v-if="rule_name === 'admin' || rule_name === 'client'">
          <router-link exact :to="{ name: 'auth1.sign-in1' }" class="d-flex">
            <i class="fas fa-sign-out-alt icon-block"></i>
            <a class="a-font" href="#">Logout</a>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
// import List from './CollapseMenu'
import { core } from '../../../config/pluginInit'
export default {
  name: 'Videos',
  props: {
    items: Array,
    className: { type: String, default: 'iq-menu' },
    open: { type: Boolean, default: false },
    idName: { type: String, default: 'sidebar' },
    accordianName: { type: String, default: 'sidebar' },
    sidebarGroupTitle: { type: Boolean, default: true }
  },
  data () {
    return {
      rule_id: null,
      uid: null,
      rule_name: null,
      itemsd: [
        {
          class_name: '',
          icon: 'las la-house-damage',
          is_active: false,
          is_heading: false,
          is_icon_class: true,
          link: {
            name: 'auth.sign-in1'
          },
          name: 'sidebar.dashboard1',
          title: 'sidebar'
        }
      ]
    }
  },
  components: {
    // List
  },
  computed: {
    hideListMenuTitle () {
      return this.sidebarGroupTitle
    }
  },
  mounted () {
     this.rule_name = this.$jwt.decode(
      localStorage.getItem('access_token')
    ).rule_name
  },
  methods: {
    
    activeLink (item) {
      return core.getActiveLink(item, this.$route.name)
    }
  }
}
</script>
<style scoped>
p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: rgb(109, 235, 240);
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar {
  /* don't forget to add all the previously mentioned styles here too */
  background: #f4f4f4;
  color: #525666;
  transition: all 1.3s;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #515566;
}

#sidebar ul.components {
  padding: 20px 0;
}

#sidebar ul p {
  /* color: rgb(95, 81, 81); */
  padding: 10px;
}
.a-font {
  font-size: 1rem !important;
  padding: 0;
}
#sidebar ul li a {
  padding: 5px 10px;
  font-size: 1.1em;
  display: flex;
  align-items: center;
  color: #333;
}
#sidebar ul li a i {
  color: var(--iq-primary);
}
#sidebar ul li a:hover {
  color: rgb(85, 70, 70);
  background: #e0c9c1;
}

/* #sidebar ul li.active > a, a[aria-expanded="true"] {
    color: rgb(18, 16, 22);
    background: #e0c9c1;
} */
ul ul a {
  font-size: 0.9em !important;
  background: #b8afac;
}
.dropdown-toggle i {
  /* margin-right: 1rem; */
  color: var(--iq-primary-hover);
}
.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}
.icon-block {
  font-size: 1rem;
}
</style>
