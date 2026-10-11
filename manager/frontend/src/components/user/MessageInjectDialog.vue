<template>
  <el-dialog
    v-model="visible"
    title="Đẩy giọng nói"
    width="620px"
    class="inject-message-dialog"
    :close-on-click-modal="false"
    @closed="resetForm"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="Chọn thiết bị" prop="device_id">
        <el-select
          v-model="form.device_id"
          placeholder="Chọn thiết bị cần đẩy giọng nói"
          style="width: 100%"
          filterable
          :disabled="deviceSelectDisabled"
          popper-class="inject-device-select-popper"
        >
          <el-option
            v-for="device in devices"
            :key="device.id || device.device_code"
            :label="getDeviceOptionLabel(device)"
            :value="device.device_name || ''"
          >
            <div class="device-option">
              <div class="device-option-header">
                <span class="device-name">{{ getDeviceNickName(device) }}</span>
                <el-tag :type="isDeviceOnline(device.last_active_at) ? 'success' : 'danger'" size="small">
                  {{ isDeviceOnline(device.last_active_at) ? 'Trực tuyến' : 'Ngoại tuyến' }}
                </el-tag>
              </div>
              <div class="device-code">ID thiết bị: {{ getDeviceIdText(device) }}</div>
              <div v-if="device.device_code" class="device-code">Mã kích hoạt: {{ device.device_code }}</div>
              <div class="device-agent">Trợ lý AI: {{ device.agent_name || 'Chưa liên kết' }}</div>
            </div>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Nội dung đẩy" prop="message">
        <el-input
          v-model="form.message"
          type="textarea"
          :rows="4"
          placeholder="Nhập nội dung cần đẩy phát"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="Phát trực tiếp" prop="skip_llm">
        <div class="switch-field">
          <div class="switch-copy">
            <div class="switch-title">{{ directPlayback ? 'Bật' : 'Tắt' }}</div>
            <div class="switch-desc">
              {{ directPlayback ? 'Tin nhắn sẽ được chuyển thẳng thành giọng nói để phát, không qua suy luận LLM.' : 'Tin nhắn sẽ được LLM xử lý trước, rồi mới phát.' }}
            </div>
          </div>
          <el-switch
            v-model="directPlayback"
            inline-prompt
            active-text="Bật"
            inactive-text="Tắt"
          />
        </div>
      </el-form-item>

      <el-form-item label="Có chuyển sang trạng thái chờ" prop="auto_listen">
        <div class="switch-field">
          <div class="switch-copy">
            <div class="switch-title">{{ returnToIdleAfterPlayback ? 'Bật' : 'Tắt' }}</div>
            <div class="switch-desc">
              {{ returnToIdleAfterPlayback ? 'Sau khi phát xong trở về trạng thái chờ, phù hợp với thông báo phát thanh và phát một chiều.' : 'Sau khi phát xong tiếp tục lắng nghe, có thể trực tiếp bước vào vòng hội thoại tiếp theo.' }}
            </div>
          </div>
          <el-switch
            v-model="returnToIdleAfterPlayback"
            inline-prompt
            active-text="Bật"
            inactive-text="Tắt"
          />
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Hủy</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">
          {{ submitting ? 'Đang đẩy...' : 'Đẩy giọng nói' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import api from '../../utils/api'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  devices: {
    type: Array,
    default: () => []
  },
  defaultDeviceId: {
    type: String,
    default: ''
  },
  lockDevice: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'success'])

const formRef = ref()
const submitting = ref(false)
const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const directPlayback = computed({
  get: () => form.skip_llm,
  set: (value) => {
    form.skip_llm = value
  }
})

const returnToIdleAfterPlayback = computed({
  get: () => !form.auto_listen,
  set: (value) => {
    form.auto_listen = !value
  }
})

const deviceSelectDisabled = computed(() => props.lockDevice && !!props.defaultDeviceId)

const form = reactive({
  device_id: '',
  message: '',
  skip_llm: false,
  auto_listen: true
})

const rules = {
  device_id: [
    { required: true, message: 'Chọn thiết bị', trigger: 'change' }
  ],
  message: [
    { required: true, message: 'Nhập nội dung đẩy', trigger: 'blur' },
    { min: 1, max: 500, message: 'Nội dung đẩy phải nằm trong 1-500 ký tự', trigger: 'blur' }
  ]
}

const isDeviceOnline = (lastActiveAt) => {
  if (!lastActiveAt) return false
  const lastActive = new Date(lastActiveAt)
  return (Date.now() - lastActive.getTime()) < 5 * 60 * 1000
}

const getDeviceNickName = (device) => {
  const nickName = String(device?.nick_name || '').trim()
  if (nickName) return nickName
  return String(device?.device_name || '').trim() || 'Thiết bị chưa đặt tên'
}

const getDeviceIdText = (device) => String(device?.device_name || '').trim() || '-'

const getDeviceOptionLabel = (device) => {
  const nickName = getDeviceNickName(device)
  const deviceId = getDeviceIdText(device)
  return `${nickName} (${deviceId})`
}

const resetForm = () => {
  form.device_id = props.defaultDeviceId || ''
  form.message = ''
  form.skip_llm = false
  form.auto_listen = true
  formRef.value?.clearValidate?.()
}

watch(
  () => [props.modelValue, props.defaultDeviceId],
  ([visible]) => {
    if (!visible) return
    resetForm()
  }
)

const closeDialog = () => {
  visible.value = false
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
  } catch {
    return
  }

  submitting.value = true
  try {
    const response = await api.post('/user/devices/inject-message', {
      device_id: form.device_id,
      message: form.message,
      skip_llm: form.skip_llm,
      auto_listen: form.auto_listen
    })
    if (response.data?.success) {
      ElMessage.success('Đẩy giọng nói thành công')
      emit('success', response.data?.data || null)
      closeDialog()
    }
  } catch (error) {
    ElMessage.error(error.response?.data?.error || 'Đẩy giọng nói thất bại')
  } finally {
    submitting.value = false
  }
}

const handleClose = () => {
  resetForm()
  closeDialog()
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.device-option {
  padding: 8px 0;
}

.device-option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  gap: 12px;
}

.device-name {
  font-weight: 600;
  color: var(--apple-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.device-code,
.device-agent {
  font-size: 12px;
  color: rgba(107, 114, 128, 0.72);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.switch-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(248, 250, 252, 0.9);
  border: 1px solid rgba(229, 229, 234, 0.72);
}

.switch-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.switch-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--apple-text);
}

.switch-desc {
  font-size: 12px;
  line-height: 1.5;
  color: var(--apple-text-secondary);
}

:deep(.inject-device-select-popper .el-select-dropdown__item) {
  height: auto;
  line-height: 1.4;
  padding-top: 8px;
  padding-bottom: 8px;
  white-space: normal;
}

@media (max-width: 768px) {
  .dialog-footer {
    flex-wrap: wrap;
  }

  .dialog-footer .el-button {
    flex: 1;
    min-width: 120px;
  }

  .switch-field {
    align-items: flex-start;
  }
}
</style>
