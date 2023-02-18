<template>
  <div id="app">
    <el-container style="height: 100%;" id="page">
      <el-container>
        <side-nav v-if="!hideNav"></side-nav>
        <el-main>
          <transition :name="transitionName" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideNav from '@/components/nav/SideNav'

export default {
  name: 'App',
  components: {
    SideNav
  },
  data () {
    return {
      transitionName: 'fade',
      interval: null
    }
  },
  computed: {
    hideNav () {
      return this.$route.meta.full
    },
    token () {
      return this.$store.state.user.token
    }
  },
  created () {
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  mounted () {
    let self = this
    if (self.$refs.main) {
      self.$refs.main.$el.addEventListener('scroll', function () {
        self.$eventBus.$emit('main-scroll', {
          width: document.documentElement.offsetWidth,
          height: document.documentElement.offsetHeight,
          top: self.$refs.main.$el.scrollTop,
          left: self.$refs.main.$el.scrollLeft
        })
      })
    }
  },
  methods: {}
}
</script>

<style lang="scss">
#app {
  background-color: #FAFAFA;

  .el-aside {
    width: 230px !important;
    background-color: rgb(24, 25, 26);
    height: 100vh;
  }

  .el-main {
    height: 100%;
    overflow: hidden;
    padding: 0 !important;
  }
}

@media (max-width: 749px) {
  #app {
    .el-container {
      flex-direction: column;
    }

    .el-aside {
      width: 100% !important;
      height: 74px;
    }
    .el-main {
      height: calc(100vh - 74px);
    }
  }
}
</style>
