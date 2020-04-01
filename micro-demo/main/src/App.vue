<template>
  <a-config-provider :locale="locale">
    <div id="root">
      <!-- <router-view/> -->
      <basic-layout></basic-layout>
      <div class="appContainer" v-html="content">content</div>
      <!-- <nav>
        <ol>
          <li>
            <a @click="goto('one', '/one')">one</a>
          </li>
          <li>
            <a @click="goto('two', '/two')">two</a>
          </li>
        </ol>
      </nav>-->
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
// import { AppDeviceEnquire } from '@/utils/mixin'
import BasicLayout from '@/layouts/BasicLayout'

export default {
  // mixins: [AppDeviceEnquire],
  components: {
    BasicLayout
  },
  data () {
    return {
      locale: zhCN
    }
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    content: String
  },
  watch: {
    content (val) {
      // console.log(val)
    }
  },
  provide () {
    return {
      content: () => this.content
    }
  },
  mounted () {},
  methods: {
    goto (title, href) {
      window.history.pushState({}, title, href)
    }
  }
}
</script>
