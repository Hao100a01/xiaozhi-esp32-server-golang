<template>
  <div class="mobile-more-page">
    <van-cell-group inset title="Chức năng thường dùng">
      <van-cell
        v-for="item in commonItems"
        :key="item.path"
        :title="item.title"
        :label="item.desc"
        is-link
        @click="go(item.path)"
      />
    </van-cell-group>

    <template v-if="authStore.isAdmin">
      <van-cell-group inset title="Cấu hình dịch vụ">
        <van-cell
          v-for="item in serviceItems"
          :key="item.path"
          :title="item.title"
          is-link
          @click="go(item.path)"
        />
      </van-cell-group>

      <van-cell-group inset title="Cấu hình AI">
        <van-cell
          v-for="item in aiItems"
          :key="item.path"
          :title="item.title"
          is-link
          @click="go(item.path)"
        />
      </van-cell-group>

      <van-cell-group inset title="Quản trị hệ thống">
        <van-cell
          v-for="item in systemItems"
          :key="item.path"
          :title="item.title"
          is-link
          @click="go(item.path)"
        />
      </van-cell-group>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const commonItems = computed(() => {
  if (authStore.isAdmin) {
    return [
      { title: 'Trình hướng dẫn cấu hình', desc: 'Khi triển khai lần đầu nên bắt đầu từ đây', path: '/admin/config-wizard' },
      { title: 'Thống kê pool tài nguyên', desc: 'Xem tình hình sử dụng pool tài nguyên hệ thống', path: '/admin/pool-stats' }
    ]
  }

  return [
    { title: 'Vai trò của tôi', desc: 'Quản lý mẫu vai trò cá nhân', path: '/user/roles' },
    { title: 'Nhân bản giọng nói', desc: 'Quản lý tác vụ nhân bản giọng nói', path: '/voice-clones' },
    { title: 'Kho tri thức của tôi', desc: 'Quản lý tài liệu kho tri thức', path: '/user/knowledge-bases' }
  ]
})

const serviceItems = [
  { title: 'Cấu hình OTA', path: '/admin/ota-config' },
  { title: 'Cấu hình MQTT', path: '/admin/mqtt-config' },
  { title: 'Cấu hình MQTT Server', path: '/admin/mqtt-server-config' },
  { title: 'Cấu hình UDP', path: '/admin/udp-config' },
  { title: 'Cấu hình MCP', path: '/admin/mcp-config' },
  { title: 'MCP Market', path: '/admin/mcp-market' },
  { title: 'Cấu hình nhận dạng giọng nói', path: '/admin/speaker-config' },
  { title: 'Cài đặt trò chuyện', path: '/admin/chat-settings' }
]

const aiItems = [
  { title: 'Cấu hình VAD', path: '/admin/vad-config' },
  { title: 'Cấu hình ASR', path: '/admin/asr-config' },
  { title: 'Cấu hình LLM', path: '/admin/llm-config' },
  { title: 'Cấu hình TTS', path: '/admin/tts-config' },
  { title: 'Cấu hình Vision', path: '/admin/vision-config' },
  { title: 'Cấu hình Memory', path: '/admin/memory-config' },
  { title: 'Cấu hình truy xuất kho tri thức', path: '/admin/knowledge-search-config' }
]

const systemItems = [
  { title: 'Vai trò toàn cục', path: '/admin/global-roles' },
  { title: 'Quản lý người dùng', path: '/admin/users' },
  { title: 'Quản lý thiết bị', path: '/admin/devices' },
  { title: 'Quản lý agent', path: '/admin/agents' }
]

const go = (path) => {
  router.push(path)
}
</script>

<style scoped>
.mobile-more-page {
  padding: 12px 0 96px;
}

:deep(.van-cell-group) {
  margin-bottom: 14px;
  border-radius: 20px;
  overflow: hidden;
}

:deep(.van-cell-group__title) {
  padding: 0 18px 10px;
  font-weight: 700;
  color: var(--apple-text);
}

:deep(.van-cell) {
  min-height: 62px;
}

:deep(.van-cell__label) {
  margin-top: 6px;
  color: var(--apple-text-secondary);
}
</style>
