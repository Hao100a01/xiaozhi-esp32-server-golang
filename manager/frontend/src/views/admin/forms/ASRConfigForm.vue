<template>
  <el-form ref="formRef" :model="model" :rules="rules" label-width="140px">
    <el-form-item label="Nhà cung cấp" prop="provider">
      <el-select v-model="model.provider" placeholder="Chọn nhà cung cấp" style="width: 100%" @change="onProviderChange">
        <el-option label="FunASR" value="funasr" />
        <el-option label="Aliyun FunASR" value="aliyun_funasr" />
        <el-option label="Doubao" value="doubao" />
        <el-option label="Aliyun Qwen3" value="aliyun_qwen3" />
        <el-option label="iFlytek" value="xunfei" />
      </el-select>
    </el-form-item>
    <el-form-item label="Tên cấu hình" prop="name">
      <el-input v-model="model.name" placeholder="Nhập tên cấu hình" />
    </el-form-item>
    <el-form-item label="ID cấu hình" prop="config_id">
      <el-input v-model="model.config_id" placeholder="Nhập ID cấu hình duy nhất" />
    </el-form-item>
    <div v-if="model.provider === 'funasr'">
      <el-form-item label="Địa chỉ host" prop="funasr.host">
        <el-input v-model="model.funasr.host" placeholder="Nhập địa chỉ host" />
      </el-form-item>
      <el-form-item label="Cổng" prop="funasr.port">
        <el-input-number v-model="model.funasr.port" :min="1" :max="65535" style="width: 100%" />
      </el-form-item>
      <el-form-item label="Chế độ" prop="funasr.mode">
        <el-select v-model="model.funasr.mode" placeholder="Chọn chế độ" style="width: 100%">
          <el-option label="2pass" value="2pass" />
          <el-option label="offline" value="offline" />
          <el-option label="online" value="online" />
        </el-select>
      </el-form-item>
      <el-form-item label="Tần số lấy mẫu" prop="funasr.sample_rate">
        <el-select v-model="model.funasr.sample_rate" placeholder="Chọn tần số lấy mẫu" style="width: 100%">
          <el-option label="8000" :value="8000" />
          <el-option label="16000" :value="16000" />
          <el-option label="44100" :value="44100" />
          <el-option label="48000" :value="48000" />
        </el-select>
      </el-form-item>
      <el-form-item label="Kích thước khối" prop="funasr.chunk_size">
        <div style="display: flex; gap: 8px; width: 100%">
          <el-input-number v-model="model.funasr.chunk_size[0]" :min="1" placeholder="Trước" style="flex: 1" />
          <el-input-number v-model="model.funasr.chunk_size[1]" :min="1" placeholder="Giữa" style="flex: 1" />
          <el-input-number v-model="model.funasr.chunk_size[2]" :min="1" placeholder="Sau" style="flex: 1" />
        </div>
        <div class="form-tip">
          <el-icon><InfoFilled /></el-icon>
          Định dạng: [trước, giữa, sau], ví dụ: [5, 10, 5]
        </div>
      </el-form-item>
      <el-form-item label="Khoảng cách khối" prop="funasr.chunk_interval">
        <el-input-number v-model="model.funasr.chunk_interval" :min="1" style="width: 100%" />
      </el-form-item>
      <el-form-item label="Số kết nối tối đa" prop="funasr.max_connections">
        <el-input-number v-model="model.funasr.max_connections" :min="1" style="width: 100%" />
      </el-form-item>
      <el-form-item label="Thời gian chờ (giây)" prop="funasr.timeout">
        <el-input-number v-model="model.funasr.timeout" :min="1" style="width: 100%" />
      </el-form-item>
      <el-form-item label="Tự động kết thúc" prop="funasr.auto_end">
        <el-switch v-model="model.funasr.auto_end" />
        <div class="form-tip">
          <el-icon><InfoFilled /></el-icon>
          Đảm bảo FunASR đã được cấu hình tương ứng
        </div>
      </el-form-item>
    </div>
    <div v-if="model.provider === 'aliyun_funasr'">
      <el-form-item label="API Key" prop="aliyun_funasr.api_key">
        <el-input v-model="model.aliyun_funasr.api_key" type="password" show-password placeholder="Có thể để trống, đọc DASHSCOPE_API_KEY" />
        <div class="form-tip">
          <el-icon><InfoFilled /></el-icon>
          Có thể để trống, mặc định dùng DASHSCOPE_API_KEY
        </div>
      </el-form-item>
      <el-form-item label="WS URL" prop="aliyun_funasr.ws_url">
        <el-input v-model="model.aliyun_funasr.ws_url" placeholder="wss://dashscope.aliyuncs.com/api-ws/v1/inference/" />
      </el-form-item>
      <el-form-item label="Model" prop="aliyun_funasr.model">
        <el-input v-model="model.aliyun_funasr.model" placeholder="fun-asr-realtime" />
      </el-form-item>
      <el-form-item label="Định dạng âm thanh" prop="aliyun_funasr.format">
        <el-select v-model="model.aliyun_funasr.format" placeholder="Chọn định dạng" style="width: 100%">
          <el-option label="pcm" value="pcm" />
        </el-select>
      </el-form-item>
      <el-form-item label="Tần số lấy mẫu" prop="aliyun_funasr.sample_rate">
        <el-select v-model="model.aliyun_funasr.sample_rate" placeholder="Chọn tần số lấy mẫu" style="width: 100%">
          <el-option label="16000" :value="16000" />
        </el-select>
      </el-form-item>
      <el-form-item label="Gợi ý ngôn ngữ" prop="aliyun_funasr.language_hints">
        <el-select
          v-model="model.aliyun_funasr.language_hints"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="zh"
          style="width: 100%"
        >
          <el-option label="Tiếng Trung zh" value="zh" />
          <el-option label="Tiếng Anh en" value="en" />
          <el-option label="Tiếng Nhật ja" value="ja" />
          <el-option label="Tiếng Hàn ko" value="ko" />
        </el-select>
      </el-form-item>
      <el-form-item label="ID từ vựng" prop="aliyun_funasr.vocabulary_id">
        <el-input v-model="model.aliyun_funasr.vocabulary_id" placeholder="Có thể để trống" />
      </el-form-item>
      <el-form-item label="Loại bỏ từ đệm" prop="aliyun_funasr.disfluency_removal_enabled">
        <el-switch v-model="model.aliyun_funasr.disfluency_removal_enabled" />
      </el-form-item>
      <el-form-item label="Thời gian chờ (giây)" prop="aliyun_funasr.timeout">
        <el-input-number v-model="model.aliyun_funasr.timeout" :min="1" style="width: 100%" />
      </el-form-item>
    </div>
    <div v-if="model.provider === 'doubao'">
      <el-form-item label="ID ứng dụng" prop="doubao.appid">
        <el-input v-model="model.doubao.appid" placeholder="Nhập ID ứng dụng" />
      </el-form-item>
      <el-form-item label="Access Token" prop="doubao.access_token">
        <el-input v-model="model.doubao.access_token" type="password" placeholder="Nhập Access Token" show-password />
      </el-form-item>
      <el-form-item label="WebSocket URL" prop="doubao.ws_url">
        <el-input v-model="model.doubao.ws_url" placeholder="Nhập WebSocket URL" />
      </el-form-item>
      <el-form-item label="Thông số tài nguyên" prop="doubao.resource_id">
        <el-select v-model="model.doubao.resource_id" placeholder="Chọn thông số tài nguyên" style="width: 100%">
          <el-option label="Model nhận dạng giọng nói streaming Doubao 1.0 (tính theo giờ)" value="volc.bigasr.sauc.duration" />
          <el-option label="Model nhận dạng giọng nói streaming Doubao 1.0 (đồng thời)" value="volc.bigasr.sauc.concurrent" />
          <el-option label="Model nhận dạng giọng nói streaming Doubao 2.0 (tính theo giờ)" value="volc.seedasr.sauc.duration" />
          <el-option label="Model nhận dạng giọng nói streaming Doubao 2.0 (đồng thời)" value="volc.seedasr.sauc.concurrent" />
        </el-select>
      </el-form-item>
      <el-form-item label="Kích thước cửa sổ kết thúc" prop="doubao.end_window_size">
        <el-input-number v-model="model.doubao.end_window_size" :min="1" style="width: 100%" />
      </el-form-item>
      <el-form-item label="Bật dấu câu" prop="doubao.enable_punc">
        <el-switch v-model="model.doubao.enable_punc" />
      </el-form-item>
      <el-form-item label="Bật chuẩn hoá văn bản nghịch đảo" prop="doubao.enable_itn">
        <el-switch v-model="model.doubao.enable_itn" />
      </el-form-item>
      <el-form-item label="Bật sửa lỗi phát hiện số" prop="doubao.enable_ddc">
        <el-switch v-model="model.doubao.enable_ddc" />
      </el-form-item>
      <el-form-item label="Độ dài khối (ms)" prop="doubao.chunk_duration">
        <el-input-number v-model="model.doubao.chunk_duration" :min="1" style="width: 100%" />
      </el-form-item>
      <el-form-item label="Thời gian chờ (giây)" prop="doubao.timeout">
        <el-input-number v-model="model.doubao.timeout" :min="1" style="width: 100%" />
      </el-form-item>
    </div>
    <div v-if="model.provider === 'xunfei'">
      <el-form-item label="ID ứng dụng" prop="xunfei.appid">
        <el-input v-model="model.xunfei.appid" placeholder="Nhập ID ứng dụng iFlytek" />
      </el-form-item>
      <el-form-item label="API Key" prop="xunfei.api_key">
        <el-input v-model="model.xunfei.api_key" type="password" show-password placeholder="Nhập API Key iFlytek" />
      </el-form-item>
      <el-form-item label="API Secret" prop="xunfei.api_secret">
        <el-input v-model="model.xunfei.api_secret" type="password" show-password placeholder="Nhập API Secret iFlytek" />
      </el-form-item>
      <el-form-item label="Host" prop="xunfei.host">
        <el-input v-model="model.xunfei.host" placeholder="iat-api.xfyun.cn" />
      </el-form-item>
      <el-form-item label="Path" prop="xunfei.path">
        <el-input v-model="model.xunfei.path" placeholder="/v2/iat" />
      </el-form-item>
      <el-form-item label="Lĩnh vực nghiệp vụ" prop="xunfei.domain">
        <el-input v-model="model.xunfei.domain" placeholder="iat" />
      </el-form-item>
      <el-form-item label="Ngôn ngữ" prop="xunfei.language">
        <el-input v-model="model.xunfei.language" placeholder="zh_cn" />
      </el-form-item>
      <el-form-item label="Phương ngữ" prop="xunfei.accent">
        <el-input v-model="model.xunfei.accent" placeholder="mandarin" />
      </el-form-item>
      <el-form-item label="Tần số lấy mẫu" prop="xunfei.sample_rate">
        <el-select v-model="model.xunfei.sample_rate" placeholder="Chọn tần số lấy mẫu" style="width: 100%">
          <el-option label="16000" :value="16000" />
        </el-select>
      </el-form-item>
      <el-form-item label="Thời gian chờ (giây)" prop="xunfei.timeout">
        <el-input-number v-model="model.xunfei.timeout" :min="1" style="width: 100%" />
      </el-form-item>
    </div>
    <div v-if="model.provider === 'aliyun_qwen3'">
      <el-form-item label="API Key" prop="aliyun_qwen3.api_key">
        <el-input v-model="model.aliyun_qwen3.api_key" type="password" show-password placeholder="Có thể để trống, đọc DASHSCOPE_API_KEY" />
        <div class="form-tip">
          <el-icon><InfoFilled /></el-icon>
          Có thể để trống, mặc định dùng DASHSCOPE_API_KEY
        </div>
      </el-form-item>
      <el-form-item label="WS URL" prop="aliyun_qwen3.ws_url">
        <el-input v-model="model.aliyun_qwen3.ws_url" placeholder="wss://dashscope.aliyuncs.com/api-ws/v1/realtime" />
      </el-form-item>
      <el-form-item label="Model" prop="aliyun_qwen3.model">
        <el-input v-model="model.aliyun_qwen3.model" placeholder="qwen3-asr-flash-realtime" />
      </el-form-item>
      <el-form-item label="Định dạng âm thanh" prop="aliyun_qwen3.format">
        <el-select v-model="model.aliyun_qwen3.format" placeholder="Chọn định dạng" style="width: 100%">
          <el-option label="pcm" value="pcm" />
          <el-option label="opus" value="opus" />
        </el-select>
      </el-form-item>
      <el-form-item label="Tần số lấy mẫu" prop="aliyun_qwen3.sample_rate">
        <el-select v-model="model.aliyun_qwen3.sample_rate" placeholder="Chọn tần số lấy mẫu" style="width: 100%">
          <el-option label="8000" :value="8000" />
          <el-option label="16000" :value="16000" />
        </el-select>
        <div class="form-tip">
          <el-icon><InfoFilled /></el-icon>
          Chương trình chính hiện chỉ hỗ trợ 16000
        </div>
      </el-form-item>
      <el-form-item label="Ngôn ngữ" prop="aliyun_qwen3.language">
        <el-input v-model="model.aliyun_qwen3.language" placeholder="zh" />
      </el-form-item>
      <el-form-item label="Tự động kết thúc" prop="aliyun_qwen3.auto_end">
        <el-switch v-model="model.aliyun_qwen3.auto_end" />
        <div class="form-tip">
          <el-icon><InfoFilled /></el-icon>
          Khi bật dùng server_vad, khi tắt dùng chế độ Manual
        </div>
      </el-form-item>
      <el-form-item label="Ngưỡng VAD" prop="aliyun_qwen3.vad_threshold" v-if="model.aliyun_qwen3?.auto_end">
        <el-input-number v-model="model.aliyun_qwen3.vad_threshold" :min="0" :max="1" :step="0.1" :precision="2" style="width: 100%" />
      </el-form-item>
      <el-form-item label="Thời gian im lặng VAD (ms)" prop="aliyun_qwen3.vad_silence_ms" v-if="model.aliyun_qwen3?.auto_end">
        <el-input-number v-model="model.aliyun_qwen3.vad_silence_ms" :min="0" style="width: 100%" />
      </el-form-item>
      <el-form-item label="Thời gian chờ (giây)" prop="aliyun_qwen3.timeout">
        <el-input-number v-model="model.aliyun_qwen3.timeout" :min="1" style="width: 100%" />
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'

const props = defineProps({
  model: { type: Object, required: true },
  rules: { type: Object, default: () => ({}) }
})

const formRef = ref()

const ASR_PROVIDER_DEFAULTS = {
  funasr: {
    name: 'FunASR ASR',
    config_id: 'funasr_default',
    data: {
      host: '127.0.0.1',
      port: 10095,
      mode: 'offline',
      sample_rate: 16000,
      chunk_size: [5, 10, 5],
      chunk_interval: 10,
      max_connections: 100,
      timeout: 30,
      auto_end: false
    }
  },
  aliyun_funasr: {
    name: 'Alibaba Cloud FunASR ASR',
    config_id: 'aliyun_funasr_default',
    data: {
      api_key: '',
      ws_url: 'wss://dashscope.aliyuncs.com/api-ws/v1/inference/',
      model: 'fun-asr-realtime',
      format: 'pcm',
      sample_rate: 16000,
      language_hints: ['zh'],
      vocabulary_id: '',
      disfluency_removal_enabled: false,
      timeout: 30
    }
  },
  doubao: {
    name: 'Doubao ASR',
    config_id: 'doubao_default',
    data: {
      appid: '',
      access_token: '',
      ws_url: 'wss://openspeech.bytedance.com/api/v3/sauc/bigmodel_async',
      resource_id: 'volc.bigasr.sauc.duration',
      model_name: 'bigmodel',
      end_window_size: 800,
      enable_punc: true,
      enable_itn: true,
      enable_ddc: false,
      chunk_duration: 200,
      timeout: 30
    }
  },
  aliyun_qwen3: {
    name: 'Alibaba Cloud Qwen3 ASR',
    config_id: 'aliyun_qwen3_default',
    data: {
      api_key: '',
      ws_url: 'wss://dashscope.aliyuncs.com/api-ws/v1/realtime',
      model: 'qwen3-asr-flash-realtime',
      format: 'pcm',
      sample_rate: 16000,
      language: 'zh',
      auto_end: false,
      vad_threshold: 0.0,
      vad_silence_ms: 400,
      timeout: 30
    }
  },
  xunfei: {
    name: 'iFlytek ASR',
    config_id: 'xunfei_default',
    data: {
      appid: '',
      api_key: '',
      api_secret: '',
      host: 'iat-api.xfyun.cn',
      path: '/v2/iat',
      domain: 'iat',
      language: 'zh_cn',
      accent: 'mandarin',
      sample_rate: 16000,
      timeout: 30
    }
  }
}

const defaultNames = new Set(['默认ASR', ...Object.values(ASR_PROVIDER_DEFAULTS).map(item => item.name)])
const defaultConfigIds = new Set(Object.values(ASR_PROVIDER_DEFAULTS).flatMap(item => [item.config_id, item.config_id.replace(/_default$/, '')]))

function cloneDefaultData(provider) {
  const data = ASR_PROVIDER_DEFAULTS[provider]?.data || {}
  return JSON.parse(JSON.stringify(data))
}

function normalizeLanguageHints(value) {
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value.split(/[，,;；]/).map(item => item.trim()).filter(Boolean)
  }
  return []
}

function ensureProviderData(provider) {
  if (!provider || !props.model || !ASR_PROVIDER_DEFAULTS[provider]) return
  const current = props.model[provider]
  props.model[provider] = { ...cloneDefaultData(provider), ...(current || {}) }
  if (provider === 'funasr' && !props.model.funasr.mode) {
    props.model.funasr.mode = 'offline'
  }
  if (provider === 'aliyun_funasr') {
    const hasLanguageHints = current && Object.prototype.hasOwnProperty.call(current, 'language_hints')
    const source = hasLanguageHints
      ? props.model.aliyun_funasr.language_hints
      : (props.model.aliyun_funasr.language || props.model.aliyun_funasr.language_hints)
    props.model.aliyun_funasr.language_hints = normalizeLanguageHints(source)
  }
}

function isDefaultish(value, knownValues) {
  const normalized = String(value || '').trim()
  return !normalized || knownValues.has(normalized)
}

function applyProviderIdentity(provider) {
  if (!provider || !props.model || !ASR_PROVIDER_DEFAULTS[provider]) return
  const defaults = ASR_PROVIDER_DEFAULTS[provider]
  if (isDefaultish(props.model.name, defaultNames)) {
    props.model.name = defaults.name
  }
  if (isDefaultish(props.model.config_id, defaultConfigIds)) {
    props.model.config_id = defaults.config_id
  }
}

function onProviderChange(provider) {
  ensureProviderData(provider)
  applyProviderIdentity(provider)
}

watch(() => props.model?.provider, (provider) => {
  ensureProviderData(provider)
}, { immediate: true })

function getJsonData() {
  const m = props.model
  if (m.provider === 'funasr') return JSON.stringify(m.funasr || {})
  if (m.provider === 'aliyun_funasr') return JSON.stringify(m.aliyun_funasr || {})
  if (m.provider === 'doubao') return JSON.stringify(m.doubao || {})
  if (m.provider === 'aliyun_qwen3') return JSON.stringify(m.aliyun_qwen3 || {})
  if (m.provider === 'xunfei') return JSON.stringify(m.xunfei || {})
  return '{}'
}

function validate(callback) {
  return formRef.value?.validate(callback)
}

function resetFields() {
  formRef.value?.resetFields()
}

defineExpose({ validate, getJsonData, resetFields })
</script>

<style scoped>
.form-tip {
  margin-top: 8px;
  font-size: 12px;
  color: var(--apple-text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}
.form-tip .el-icon {
  font-size: 14px;
  color: var(--apple-primary);
}
</style>
