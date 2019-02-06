<template>
  <div id="app">
    <Header></Header>
    <div id="loading" v-show="isLoading">
      <loading></loading>
    </div>
    <router-view></router-view>
    <router-view name="left"></router-view>
    <router-view name="right"></router-view>
    <tabs :value="filter" @change="handleChangeTab">
      <tab :label="tab" :index="tab" v-for="tab in stats" :key="tab">{{tab}}</tab>
    </tabs>
    <Footer></Footer>
    <button @click="show">notify</button>
    <div>{{red | capitalize}}</div>
    <div v-color="red">v-color</div>
    <input v-focus type="text">
    <todo-list></todo-list>
    <keep-alive>
      <Transition></Transition>
    </keep-alive>
    <div>
      <button @click="handleDecrement">-</button>
      {{count}}
      <button @click="handleIncrement">+</button>
    </div>
  </div>
</template>

<script>
import Header from './layout/header.vue';
import Footer from './layout/footer.vue';
import Loading from './components/loading/loading.vue';
import TodoList from './views/todo2/TodoList.vue';
import Transition from './views/transition.vue';

import directives from './directives/directives';
import filters from './filters/filters';

import fetchApi from './api/fetch.js';

//  mapState,
//  mapGetters,
//  mapActions,
//  mapMutations

import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  metaInfo: {
    title: 'Vue App'
  },
  data() {
    return {
      filter: 'all',
      stats: ['all', 'active', 'completed'],
      red: 'red'
    }
  },
  directives,
  filters,
  created() {
    // this.startLoading()
    this.endLoading()

    this.$myNotify({
      content: '必须输入要做的内容'
    })

    fetchApi.fetchGithub().then(res => console.log(res))
  },
  mounted() {
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
  },
  computed: {
    ...mapState({
      isLoading: state => state.loading,
      count: 'count'
    })
  },
  components: {
    Header,
    Footer,
    Loading,
    TodoList,
    Transition
  },
  methods: {
    ...mapMutations(['startLoading', 'endLoading']),
    ...mapActions(['decrementAsync', 'incrementAsync', 'updateCountAsync']),
    handleChangeTab(value) {
      this.filter = value
    },
    show() {
      this.$MyNotiyPlugin('asdas')
    },
    handleDecrement() {
      this.decrementAsync().then(res => {
        console.log('res', res)
      })
    },
    handleIncrement() {
      this.incrementAsync()
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
