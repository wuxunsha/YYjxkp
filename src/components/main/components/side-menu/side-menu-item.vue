<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <Icon :custom="'icon-font ' + parentItem.meta.icon " size="20" />
      <!-- <common-icon :type="parentItem.meta.icon || ''"/> -->
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item">
        </side-menu-item>
        <template v-else>
          <menu-item v-if="!item.meta.hideInMenu" :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
            <Icon :custom="'icon-font ' + item.children[0].meta.icon " size="20" />
            <!-- <common-icon :type="item.children[0].meta.icon || ''"/> -->
            <span>{{ showTitle(item.children[0]) }}</span>
          </menu-item>
        </template>
      </template>
      <template v-else>
        <!-- 第三级或更深层级菜单 -->
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item">
        </side-menu-item>
        <!-- 第二级菜单 -->
        <menu-item v-if="!item.meta.hideInMenu" :name="getNameOrHref(item)" :key="`menu-${item.name}`">
          <Icon :custom="'icon-font ' + item.meta.icon " size="18" />
          <!-- <common-icon :type="item.meta.icon || ''"/> -->
          <span>{{ showTitle(item) }}</span>
        </menu-item>
      </template>
    </template>
  </Submenu>
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'
export default {
  name: 'SideMenuItem',
  mixins: [ mixin, itemMixin ]
}
</script>
