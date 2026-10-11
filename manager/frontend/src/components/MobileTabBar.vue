<template>
  <van-tabbar
    v-model="activeTab"
    @change="handleTabChange"
    fixed
    placeholder
    safe-area-inset-bottom
    class="mobile-tabbar"
  >
    <van-tabbar-item
      v-for="tab in tabs"
      :key="tab.name"
      :icon="tab.icon"
      :name="tab.name"
    >
      {{ tab.label }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const activeTab = ref('')

// Định nghĩa thanh tab theo vai trò người dùng
const tabs = computed(() => {
  if (authStore.isAdmin) {
    // Thanh tab quản trị viên
    return [
      { name: 'dashboard', label: 'Trang chủ', icon: 'home-o', path: '/dashboard' },
      { name: 'config', label: 'Cấu hình', icon: 'setting-o', path: '/admin/vad-config' },
      { name: 'manage', label: 'Quản lý', icon: 'apps-o', path: '/admin/users' },
      { name: 'more', label: 'Thêm', icon: 'ellipsis', path: '/more' }
    ]
  } else {
    // Thanh tab người dùng thường
    return [
      { name: 'agents', label: 'Trợ lý AI', icon: 'apps-o', path: '/agents' },
      { name: 'speakers', label: 'Giọng nói', icon: 'user-o', path: '/user/speakers' },
      { name: 'more', label: 'Thêm', icon: 'ellipsis', path: '/more' }
    ]
  }
})

// Đặt tab đang hoạt động theo route hiện tại
const updateActiveTab = () => {
  const currentPath = route.path
  const currentTab = tabs.value.find(tab => {
    if (tab.path === currentPath) {
      return true
    }
    // Hỗ trợ khớp tiền tố đường dẫn
    if (currentPath.startsWith(tab.path)) {
      return true
    }
    return false
  })
  
  if (currentTab) {
    activeTab.value = currentTab.name
  }
}

// Xử lý chuyển tab
const handleTabChange = (name) => {
  const tab = tabs.value.find(item => item.name === name)
  if (tab && tab.path !== route.path) {
    router.push(tab.path)
  }
}

// Theo dõi thay đổi route
watch(
  () => route.path,
  () => {
    updateActiveTab()
  },
  { immediate: true }
)

onMounted(() => {
  updateActiveTab()
})
</script>

<style scoped>
.mobile-tabbar {
  background: transparent;
}

:deep(.van-tabbar) {
  z-index: 1200;
  left: 12px;
  right: 12px;
  bottom: 12px;
  width: auto;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.84);
  box-shadow: var(--apple-shadow-lg);
  overflow: hidden;
}

:deep(.van-tabbar-item--active) {
  color: var(--apple-primary);
}

:deep(.van-tabbar-item) {
  min-height: 58px;
}
</style>
