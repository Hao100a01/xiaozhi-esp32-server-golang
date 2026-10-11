const defaultOption = { label: 'Mặc định', value: 'default' }
const enableOption = { label: 'Bật', value: 'enabled' }
const disableOption = { label: 'Tắt', value: 'disabled' }
const clearHistoryOptions = [
  { label: 'Mặc định', value: 'default' },
  { label: 'Xóa', value: true },
  { label: 'Giữ lại', value: false }
]

function withDefault(options) {
  return [defaultOption, ...options]
}

function createModel(value, thinking, extra = {}) {
  return {
    value,
    label: value,
    thinking,
    ...extra
  }
}

const openAIReasoningStandard = withDefault([
  { label: 'Rất thấp', value: 'minimal' },
  { label: 'Thấp', value: 'low' },
  { label: 'Trung bình', value: 'medium' },
  { label: 'Cao', value: 'high' }
])

const openAIReasoningCodex = withDefault([
  { label: 'Tắt', value: 'none' },
  { label: 'Thấp', value: 'low' },
  { label: 'Trung bình', value: 'medium' },
  { label: 'Cao', value: 'high' }
])

const openAIReasoningCodexMax = withDefault([
  { label: 'Tắt', value: 'none' },
  { label: 'Thấp', value: 'low' },
  { label: 'Trung bình', value: 'medium' },
  { label: 'Cao', value: 'high' },
  { label: 'Rất cao', value: 'xhigh' }
])

const openAIReasoningLegacy = withDefault([
  { label: 'Thấp', value: 'low' },
  { label: 'Trung bình', value: 'medium' },
  { label: 'Cao', value: 'high' }
])

const openAIReasoningHighOnly = withDefault([
  { label: 'Cao', value: 'high' }
])

const booleanThinkingOptions = withDefault([
  enableOption,
  disableOption
])

const doubaoReasoningOptions = withDefault([
  { label: 'Tắt', value: 'minimal' },
  { label: 'Thấp', value: 'low' },
  { label: 'Trung bình', value: 'medium' },
  { label: 'Cao', value: 'high' }
])

const anthropicAdaptiveOptions = [
  { label: 'Thấp', value: 'low' },
  { label: 'Trung bình', value: 'medium' },
  { label: 'Cao', value: 'high' },
  { label: 'Rất cao', value: 'max' }
]

const openAIReasoningLatest = withDefault([
  { label: 'Tắt', value: 'none' },
  { label: 'Thấp', value: 'low' },
  { label: 'Trung bình', value: 'medium' },
  { label: 'Cao', value: 'high' },
  { label: 'Rất cao', value: 'xhigh' }
])

const openAIReasoningLatestPro = withDefault([
  { label: 'Trung bình', value: 'medium' },
  { label: 'Cao', value: 'high' },
  { label: 'Rất cao', value: 'xhigh' }
])

const openAIReasoningRequest = {
  allowMaxTokens: false,
  allowTemperature: false,
  allowTopP: false
}

const anthropicManualThinking = {
  label: 'Suy luận sâu',
  options: withDefault([{ label: 'Suy luận thủ công', value: 'enabled' }]),
  showBudgetFor: ['enabled'],
  budgetMin: 1024,
  budgetRequiredFor: ['enabled']
}

const anthropicAdaptiveThinking = {
  label: 'Suy luận sâu',
  options: withDefault([
    { label: 'Suy luận thủ công', value: 'enabled' },
    { label: 'Suy luận thích ứng', value: 'adaptive' }
  ]),
  showBudgetFor: ['enabled'],
  budgetMin: 1024,
  budgetRequiredFor: ['enabled'],
  showEffortFor: ['adaptive'],
  effortOptions: anthropicAdaptiveOptions
}

const zhipuThinkingConfig = {
  label: 'Suy luận sâu',
  options: booleanThinkingOptions,
  showClearThinkingFor: ['enabled'],
  clearThinkingOptions: clearHistoryOptions
}

const aliyunThinkingConfig = {
  label: 'Suy luận sâu',
  options: booleanThinkingOptions,
  showBudgetFor: ['enabled'],
  budgetMin: 1,
  budgetStep: 256
}

const siliconflowThinkingConfig = {
  label: 'Suy luận sâu',
  options: booleanThinkingOptions,
  showBudgetFor: ['enabled'],
  budgetMin: 128,
  budgetMax: 32768,
  budgetStep: 128
}

const providerTypeMap = {
  openai: 'openai',
  ollama: 'ollama',
  azure: 'openai',
  anthropic: 'openai',
  zhipu: 'openai',
  aliyun: 'openai',
  doubao: 'openai',
  siliconflow: 'openai',
  deepseek: 'openai',
  dify: 'dify',
  coze: 'coze'
}

const knownProviders = new Set(Object.keys(providerTypeMap))

const editableBaseURLProviders = new Set(['openai', 'ollama', 'azure', 'dify', 'coze'])

const catalog = {
  openai: {
    quickUrl: 'https://api.openai.com/v1',
    modelPlaceholder: 'Chọn hoặc nhập tên model',
    modelHint: 'Mặc định ưu tiên dùng alias ổn định chính thức; nếu cần khóa hành vi, có thể nhập thủ công ID model snapshot chính xác.',
    models: [
      createModel('gpt-5.4', { label: 'Cường độ suy luận', options: openAIReasoningLatest }, { request: openAIReasoningRequest }),
      createModel('gpt-5.4-pro', { label: 'Cường độ suy luận', options: openAIReasoningLatestPro }, { request: openAIReasoningRequest }),
      createModel('gpt-5.4-mini', { label: 'Cường độ suy luận', options: openAIReasoningLatest }, { request: openAIReasoningRequest }),
      createModel('gpt-5.4-nano', { label: 'Cường độ suy luận', options: openAIReasoningLatest }, { request: openAIReasoningRequest }),
      createModel('gpt-5.2', { label: 'Cường độ suy luận', options: openAIReasoningLatest }, { request: openAIReasoningRequest }),
      createModel('gpt-5.2-pro', { label: 'Cường độ suy luận', options: openAIReasoningLatestPro }, { request: openAIReasoningRequest }),
      createModel('gpt-5-chat-latest', false, { hint: 'Alias chuyên dụng cho ChatGPT, phù hợp tương thích workflow cũ; tích hợp mới nên ưu tiên model dòng chính GPT-5.*.' }),
      createModel('gpt-5-pro', { label: 'Cường độ suy luận', options: openAIReasoningHighOnly }, { request: openAIReasoningRequest }),
      createModel('gpt-5', { label: 'Cường độ suy luận', options: openAIReasoningStandard }, { request: openAIReasoningRequest }),
      createModel('gpt-5-mini', { label: 'Cường độ suy luận', options: openAIReasoningStandard }, { request: openAIReasoningRequest }),
      createModel('gpt-5-nano', { label: 'Cường độ suy luận', options: openAIReasoningStandard }, { request: openAIReasoningRequest }),
      createModel('gpt-5.3-codex', { label: 'Cường độ suy luận', options: openAIReasoningCodexMax }, { request: openAIReasoningRequest }),
      createModel('gpt-5.2-codex', { label: 'Cường độ suy luận', options: openAIReasoningCodexMax }, { request: openAIReasoningRequest }),
      createModel('gpt-5-codex', { label: 'Cường độ suy luận', options: openAIReasoningLegacy }, { request: openAIReasoningRequest }),
      createModel('gpt-5.1', { label: 'Cường độ suy luận', options: openAIReasoningCodex }, { request: openAIReasoningRequest }),
      createModel('gpt-5.1-codex', { label: 'Cường độ suy luận', options: openAIReasoningCodex }, { request: openAIReasoningRequest }),
      createModel('gpt-5.1-codex-mini', { label: 'Cường độ suy luận', options: openAIReasoningCodex }, { request: openAIReasoningRequest }),
      createModel('gpt-5.1-codex-max', { label: 'Cường độ suy luận', options: openAIReasoningCodexMax }, { request: openAIReasoningRequest }),
      createModel('o3', { label: 'Cường độ suy luận', options: openAIReasoningLegacy }, { request: openAIReasoningRequest }),
      createModel('o4-mini', { label: 'Cường độ suy luận', options: openAIReasoningLegacy }, { request: openAIReasoningRequest }),
      createModel('o3-mini', { label: 'Cường độ suy luận', options: openAIReasoningLegacy }, { request: openAIReasoningRequest }),
      createModel('o1', { label: 'Cường độ suy luận', options: openAIReasoningLegacy }, { request: openAIReasoningRequest })
    ],
    fallbackThinking: {
      label: 'Cường độ suy luận',
      options: openAIReasoningCodex,
      hint: 'Model tùy chỉnh không có trong danh sách tài liệu, đã lùi về cấu hình reasoning_effort chung; có hiệu lực hay không tùy thuộc model thực tế.'
    }
  },
  ollama: {
    quickUrl: 'http://127.0.0.1:11434/v1',
    modelPlaceholder: 'Chọn hoặc nhập tên model',
    modelHint: 'Ollama dùng dịch vụ model cục bộ hoặc riêng tư, cho phép tùy chỉnh cả danh sách model và địa chỉ.',
    models: [],
    fallbackThinking: null
  },
  azure: {
    quickUrl: 'https://your-resource-name.openai.azure.com/openai/v1/',
    modelPlaceholder: 'Chọn tên model chính thức hoặc nhập tên deployment tùy chỉnh',
    modelHint: 'Ở Azure điền deployment name; tên trong danh sách chủ yếu để tham khảo năng lực model nền.',
    models: [
      createModel('gpt-5.4', { label: 'Cường độ suy luận', options: openAIReasoningLatest }, { request: openAIReasoningRequest }),
      createModel('gpt-5.4-pro', { label: 'Cường độ suy luận', options: openAIReasoningLatestPro }, { request: openAIReasoningRequest }),
      createModel('gpt-5.2', { label: 'Cường độ suy luận', options: openAIReasoningLatest }, { request: openAIReasoningRequest }),
      createModel('gpt-5.2-chat', false, { hint: 'Model Chat trong tài liệu Azure thường được tích hợp qua tên deployment; có mở hay không tùy thuộc khu vực và hạn ngạch.' }),
      createModel('gpt-5.3-codex', { label: 'Cường độ suy luận', options: openAIReasoningCodexMax }, { request: openAIReasoningRequest }),
      createModel('gpt-5.2-codex', { label: 'Cường độ suy luận', options: openAIReasoningCodexMax }, { request: openAIReasoningRequest }),
      createModel('gpt-5-mini', { label: 'Cường độ suy luận', options: openAIReasoningStandard }, { request: openAIReasoningRequest }),
      createModel('gpt-5-nano', { label: 'Cường độ suy luận', options: openAIReasoningStandard }, { request: openAIReasoningRequest }),
      createModel('gpt-5-chat', { label: 'Cường độ suy luận', options: openAIReasoningStandard }, { request: openAIReasoningRequest }),
      createModel('gpt-5-pro', { label: 'Cường độ suy luận', options: openAIReasoningHighOnly }, { request: openAIReasoningRequest }),
      createModel('o4-mini', { label: 'Cường độ suy luận', options: openAIReasoningLegacy }, { request: openAIReasoningRequest }),
      createModel('o3', { label: 'Cường độ suy luận', options: openAIReasoningLegacy }, { request: openAIReasoningRequest }),
      createModel('o3-mini', { label: 'Cường độ suy luận', options: openAIReasoningLegacy }, { request: openAIReasoningRequest }),
      createModel('o1', { label: 'Cường độ suy luận', options: openAIReasoningLegacy }, { request: openAIReasoningRequest })
    ],
    fallbackThinking: {
      label: 'Cường độ suy luận',
      options: openAIReasoningCodex,
      hint: 'Khi deployment tùy chỉnh của Azure không khớp model trong tài liệu, sẽ lùi về cấu hình reasoning_effort chung; khả năng tương thích cụ thể theo model đã triển khai.'
    }
  },
  anthropic: {
    quickUrl: 'https://api.anthropic.com/v1/',
    modelPlaceholder: 'Chọn hoặc nhập tên model',
    modelHint: 'Mặc định ưu tiên alias ổn định chính thức; nếu cần cố định phiên bản hoặc kiểm thử hồi quy, hãy điền ID model chính xác kèm ngày.',
    models: [
      createModel('claude-opus-4-6', anthropicAdaptiveThinking),
      createModel('claude-sonnet-4-6', anthropicAdaptiveThinking),
      createModel('claude-haiku-4-5', anthropicManualThinking),
      createModel('claude-3-7-sonnet', anthropicManualThinking),
      createModel('claude-sonnet-4', anthropicManualThinking),
      createModel('claude-opus-4', anthropicManualThinking),
      createModel('claude-opus-4-1', anthropicManualThinking)
    ],
    fallbackThinking: {
      ...anthropicAdaptiveThinking,
      hint: 'Model tùy chỉnh không có trong danh sách tài liệu. Nếu dùng suy luận thủ công, cần điền rõ budget_tokens; chế độ Adaptive chỉ dùng trên model được tài liệu xác nhận hỗ trợ.'
    }
  },
  zhipu: {
    quickUrl: 'https://open.bigmodel.cn/api/paas/v4',
    modelPlaceholder: 'Chọn hoặc nhập tên model',
    modelHint: 'Tài liệu Zhipu hỗ trợ điều khiển chế độ suy luận qua thinking.type và clear_thinking.',
    models: [
      createModel('glm-5', zhipuThinkingConfig),
      createModel('glm-4.7', zhipuThinkingConfig),
      createModel('glm-4.7-flashx', zhipuThinkingConfig),
      createModel('glm-4.7-flash', zhipuThinkingConfig),
      createModel('glm-4.6', zhipuThinkingConfig),
      createModel('glm-4.6v', zhipuThinkingConfig),
      createModel('glm-4.5', zhipuThinkingConfig),
      createModel('glm-4.5-air', zhipuThinkingConfig),
      createModel('glm-4.5-airx', zhipuThinkingConfig),
      createModel('glm-4.5v', zhipuThinkingConfig)
    ],
    fallbackThinking: {
      ...zhipuThinkingConfig,
      hint: 'Model tùy chỉnh không có trong danh sách tài liệu, đã lùi về cấu hình chung thinking.type / clear_thinking.'
    }
  },
  aliyun: {
    quickUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    modelPlaceholder: 'Chọn hoặc nhập tên model',
    modelHint: 'Mặc định ưu tiên alias ổn định chính thức; nếu muốn khóa phiên bản cụ thể, hãy nhập thủ công ID model kèm hậu tố ngày hoặc phiên bản nhỏ.',
    models: [
      createModel('qwen-plus-latest', aliyunThinkingConfig),
      createModel('qwen-turbo-latest', aliyunThinkingConfig),
      createModel('qwen3-max', aliyunThinkingConfig),
      createModel('qwen3-235b-a22b', aliyunThinkingConfig),
      createModel('qwen3-30b-a3b', aliyunThinkingConfig),
      createModel('qwen3-next-80b-a3b-thinking', aliyunThinkingConfig),
      createModel('glm-4.7', aliyunThinkingConfig),
      createModel('glm-4.6', aliyunThinkingConfig),
      createModel('glm-4.5', aliyunThinkingConfig),
      createModel('glm-4.5-air', aliyunThinkingConfig),
      createModel('kimi-k2-thinking', aliyunThinkingConfig),
      createModel('qwen3-235b-a22b-thinking-2507', aliyunThinkingConfig, { label: 'qwen3-235b-a22b-thinking-2507 (đã chốt phiên bản)' }),
      createModel('qwen3-30b-a3b-thinking-2507', aliyunThinkingConfig, { label: 'qwen3-30b-a3b-thinking-2507 (đã chốt phiên bản)' }),
      createModel('kimi/kimi-k2.5', aliyunThinkingConfig, { label: 'kimi/kimi-k2.5 (đã chốt phiên bản)' })
    ],
    fallbackThinking: {
      ...aliyunThinkingConfig,
      hint: 'Model tùy chỉnh không có trong danh sách tài liệu. Nếu model hỗ trợ thinking_budget, điền theo tài liệu; để trống sẽ không truyền trường này.'
    }
  },
  doubao: {
    quickUrl: 'https://ark.cn-beijing.volces.com/api/v3',
    modelPlaceholder: 'Chọn hoặc nhập Model ID (thường có hậu tố phiên bản)',
    modelHint: 'Doubao ưu tiên điền Model ID chính thức. Hiện chưa xác nhận có alias ổn định thay thế chung, nên lấy Model ID trong bảng điều khiển hoặc danh sách model làm chuẩn.',
    models: [
      createModel('doubao-seed-2-0-pro-260215', { label: 'Cường độ suy luận', options: doubaoReasoningOptions }, { label: 'Doubao Seed 2.0 Pro (doubao-seed-2-0-pro-260215)' }),
      createModel('doubao-seed-2-0-lite-260215', { label: 'Cường độ suy luận', options: doubaoReasoningOptions }, { label: 'Doubao Seed 2.0 Lite (doubao-seed-2-0-lite-260215)' }),
      createModel('doubao-seed-2-0-mini-260215', { label: 'Cường độ suy luận', options: doubaoReasoningOptions }, { label: 'Doubao Seed 2.0 Mini (doubao-seed-2-0-mini-260215)' }),
      createModel('doubao-seed-1-6-251015', { label: 'Cường độ suy luận', options: doubaoReasoningOptions }, { label: 'Doubao Seed 1.6 (doubao-seed-1-6-251015)' })
    ],
    fallbackThinking: {
      label: 'Cường độ suy luận',
      options: doubaoReasoningOptions,
      hint: 'Model tùy chỉnh không có trong danh sách tài liệu, đã lùi về cấu hình reasoning_effort chung; có hiệu lực hay không tùy thuộc model thực tế.'
    }
  },
  siliconflow: {
    quickUrl: 'https://api.siliconflow.cn/v1',
    modelPlaceholder: 'Chọn hoặc nhập tên model',
    modelHint: 'Tài liệu SiliconFlow liệt kê trực tiếp các model hỗ trợ enable_thinking; chỉ hiển thị cấu hình ngân sách cho các model có trong tài liệu.',
    models: [
      createModel('Pro/zai-org/GLM-5', siliconflowThinkingConfig),
      createModel('Pro/zai-org/GLM-4.7', siliconflowThinkingConfig),
      createModel('deepseek-ai/DeepSeek-V3.2', siliconflowThinkingConfig),
      createModel('Pro/deepseek-ai/DeepSeek-V3.2', siliconflowThinkingConfig),
      createModel('zai-org/GLM-4.6', siliconflowThinkingConfig),
      createModel('Qwen/Qwen3-8B', siliconflowThinkingConfig),
      createModel('Qwen/Qwen3-14B', siliconflowThinkingConfig),
      createModel('Qwen/Qwen3-32B', siliconflowThinkingConfig),
      createModel('Qwen/Qwen3-30B-A3B', siliconflowThinkingConfig),
      createModel('tencent/Hunyuan-A13B-Instruct', siliconflowThinkingConfig),
      createModel('zai-org/GLM-4.5V', siliconflowThinkingConfig),
      createModel('deepseek-ai/DeepSeek-V3.1-Terminus', siliconflowThinkingConfig),
      createModel('Pro/deepseek-ai/DeepSeek-V3.1-Terminus', siliconflowThinkingConfig),
      createModel('Qwen/Qwen3.5-397B-A17B', siliconflowThinkingConfig),
      createModel('Qwen/Qwen3.5-122B-A10B', siliconflowThinkingConfig),
      createModel('Qwen/Qwen3.5-35B-A3B', siliconflowThinkingConfig),
      createModel('Qwen/Qwen3.5-27B', siliconflowThinkingConfig),
      createModel('Qwen/Qwen3.5-9B', siliconflowThinkingConfig),
      createModel('Qwen/Qwen3.5-4B', siliconflowThinkingConfig)
    ],
    fallbackThinking: {
      ...siliconflowThinkingConfig,
      hint: 'Model tùy chỉnh không có trong danh sách tài liệu. Nếu model hỗ trợ enable_thinking / thinking_budget, điền theo tài liệu; để trống sẽ không truyền thinking_budget.'
    }
  },
  deepseek: {
    quickUrl: 'https://api.deepseek.com/v1',
    modelPlaceholder: 'Chọn hoặc nhập tên model',
    modelHint: 'DeepSeek chính thức chuyển chế độ suy luận bằng cách chọn model khác nhau: deepseek-chat là không suy luận, deepseek-reasoner là có suy luận.',
    models: [
      createModel('deepseek-chat', false, {
        hint: 'deepseek-chat là model không suy luận, không cần thêm tham số thinking.'
      }),
      createModel('deepseek-reasoner', false, {
        hint: 'deepseek-reasoner đã tích hợp sẵn chế độ suy luận, không cần thêm tham số thinking.'
      })
    ],
    fallbackThinking: {
      label: 'Suy luận sâu',
      options: booleanThinkingOptions,
      hint: 'DeepSeek chính thức khuyến nghị chuyển chế độ suy luận qua tên model. Nếu proxy tùy chỉnh hỗ trợ thêm thinking.type, có thể bật công tắc tương thích tại đây.'
    }
  }
}

function cloneOptions(options = []) {
  return options.map(option => ({ ...option }))
}

function normalizeModelName(modelName) {
  return String(modelName || '').trim().toLowerCase()
}

export function resolveLLMProvider(provider, type) {
  const normalizedProvider = String(provider || '').trim().toLowerCase()
  const normalizedType = String(type || '').trim().toLowerCase()

  if (normalizedProvider === 'openai' && ['ollama', 'dify', 'coze'].includes(normalizedType)) {
    return normalizedType
  }
  if (knownProviders.has(normalizedProvider)) {
    return normalizedProvider
  }
  if (['ollama', 'dify', 'coze'].includes(normalizedType)) {
    return normalizedType
  }
  return 'openai'
}

export function getProviderFixedType(provider) {
  return providerTypeMap[provider] || 'openai'
}

export function isProviderBaseURLEditable(provider) {
  return editableBaseURLProviders.has(provider)
}

export function getProviderQuickUrl(provider) {
  return catalog[provider]?.quickUrl || ''
}

export function getProviderModelOptions(provider) {
  return (catalog[provider]?.models || []).map(model => ({
    label: model.label,
    value: model.value
  }))
}

export function getProviderModelHint(provider) {
  return catalog[provider]?.modelHint || ''
}

export function getProviderModelFieldLabel(provider) {
  if (provider === 'azure') {
    return 'Tên deployment'
  }
  if (provider === 'doubao') {
    return 'Model ID'
  }
  return 'Tên model'
}

export function getProviderModelPlaceholder(provider) {
  return catalog[provider]?.modelPlaceholder || 'Chọn hoặc nhập tên model'
}

export function resolveProviderModel(provider, modelName) {
  const normalized = normalizeModelName(modelName)
  if (!normalized) {
    return null
  }

  const models = catalog[provider]?.models || []
  return models.find(model => normalizeModelName(model.value) === normalized) || null
}

export function getProviderRequestConfig(provider, modelName) {
  const model = resolveProviderModel(provider, modelName)
  return {
    allowMaxTokens: true,
    allowTemperature: true,
    allowTopP: true,
    temperatureMax: 2,
    ...(model?.request || {})
  }
}

export function getProviderThinkingConfig(provider, modelName) {
  const model = resolveProviderModel(provider, modelName)
  if (model?.thinking === false) {
    return {
      visible: false,
      hint: model.hint || ''
    }
  }

  const source = model?.thinking || catalog[provider]?.fallbackThinking
  if (!source) {
    return {
      visible: false,
      hint: model?.hint || ''
    }
  }

  return {
    visible: true,
    label: source.label || 'Suy luận sâu',
    options: cloneOptions(source.options),
    showBudgetFor: [...(source.showBudgetFor || [])],
    budgetMin: source.budgetMin || 1,
    budgetMax: source.budgetMax || 100000,
    budgetStep: source.budgetStep || 1,
    budgetRequiredFor: [...(source.budgetRequiredFor || [])],
    showEffortFor: [...(source.showEffortFor || [])],
    effortOptions: cloneOptions(source.effortOptions || []),
    showClearThinkingFor: [...(source.showClearThinkingFor || [])],
    clearThinkingOptions: cloneOptions(source.clearThinkingOptions || clearHistoryOptions),
    hint: model?.hint || source.hint || ''
  }
}
