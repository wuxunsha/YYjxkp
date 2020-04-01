<template>
  <Card shadow style="height: 100%;width: 100%;overflow:hidden">
    <div class="department-outer">
        <div class="view-box">
            <org-view v-if="data" :data="data"></org-view>
        </div>
    </div>
  </Card>
</template>

<script>
import OrgView from './components/org-view.vue'
import { getOrgData } from '@/api/data'
import './framework.less'
export default {
  name: 'org_tree_page',
  components: {
    OrgView
  },
  data () {
    return {
      data: null,
      zoom: 100
    }
  },
  computed: {

  },
  methods: {
    getDepartmentData () {
      getOrgData().then(res => {
        const { data } = res
        this.data = data
      })
    }
  },
  mounted () {
    this.getDepartmentData()
  }
}
</script>
