# LƯU Ý: Các literal tiếng Trung KHÔNG dịch được (giữ nguyên có chủ ý)

Khi dịch UI web console sang tiếng Việt, các chuỗi tiếng Trung dưới đây được **giữ nguyên** vì chúng vừa là text hiển thị vừa tham gia vào **logic code / API contract**. Dịch chúng sẽ làm vỡ chức năng.

## 1. Tên cấu hình mặc định gửi lên backend (field `name` trong payload API, lưu vào DB)
| Literal | File | Lý do |
|---|---|---|
| `'默认VAD'`, `'默认LLM'`, `'默认TTS'` | `src/views/admin/ConfigWizard.vue` | Giá trị mặc định của field `name`, gửi lên backend khi lưu cấu hình |
| `'MQTT Server配置'` | `src/views/admin/ConfigWizard.vue`, `src/views/admin/MQTTConfig.vue` | Field `name` trong payload `saveMqttServerConfig` |
| `'MQTT配置'` | `src/views/admin/ConfigWizard.vue`, `src/views/admin/MQTTConfig.vue` | Field `name` trong payload `saveMqttConfig` |
| `'UDP配置'` | `src/views/admin/ConfigWizard.vue`, `src/views/admin/UDPConfig.vue` | Field `name` trong payload `saveUdpConfig` |
| `'OTA配置'` | `src/views/admin/ConfigWizard.vue` | Field `name` trong payload `saveOta` |
| `'MCP全局配置'` | `src/views/admin/MCPConfig.vue` | Identifier gửi trong payload `POST/PUT /admin/mcp-configs` |
| `'声纹识别配置'` | `src/views/admin/SpeakerConfig.vue` | Giá trị gửi trong `api.post/put('/admin/speaker-configs')` |
| `'默认ASR'` | `src/views/admin/forms/ASRConfigForm.vue` | So sánh phát hiện tên cấu hình mặc định cũ (tương thích dữ liệu đã lưu) |

## 2. Keyword khớp giọng nói OpenClaw (vừa hiển thị trong form vừa là keyword backend dùng để khớp lệnh thoại)
- `'打开龙虾'`, `'进入龙虾'`, `'关闭龙虾'`, `'退出龙虾'` — `src/composables/useAgentFormOptions.js` (`OPENCLAW_DEFAULT_ENTER/EXIT_KEYWORDS`)

## 3. Giá trị voice CosyVoice gửi lên backend (chỉ dịch `label` hiển thị)
- `value: '中文女'`, `'中文男'`, `'粤语女'`, `'英文女'`, `'英文男'`, `'日语男'`, `'韩语女'` — `src/views/user/Speakers.vue`

## 4. Văn bản mẫu gửi tới API TTS khi kiểm tra giọng
- `instruct_text: '你好'` — `src/views/admin/TTSConfig.vue` (đổi sang tiếng Việt sẽ làm TTS đọc sai ngôn ngữ test)

## 5. Dữ liệu mẫu JSON trong tài liệu OpenAPI (phải khớp response thật của server)
- `"message":"设备创建成功"`, `"message":"删除成功"`, `"message":"语音推送请求已发送"`, `"name":"家庭助手"`, `"nickname":"小辉"`, `"name":"客厅助手"`, `"name":"家庭助手-更新后"`, `"content":"你好"` — `src/views/OpenAPIDocs.vue`

## 6. Ký tự phân tách Weknora + regex (dữ liệu chức năng, không phải text hiển thị)
- `DEFAULT_WEKNORA_SEPARATORS = ['\n\n','\n','。','！','？',';','；']` — `src/views/admin/KnowledgeSearchConfig.vue` (mảng gửi lên backend)
- Regex `/[，,;；]/` — `src/views/admin/forms/ASRConfigForm.vue` (dấu phẩy/chấm phẩy tiếng Trung dùng để tách chuỗi nhập liệu)
- `'魔搭 ModelScope'` — `src/views/admin/MCPMarket.vue` (tên provider fallback, đồng nhất với dữ liệu backend trả về)

## 7. Các literal logic tiếng Anh khác (đương nhiên giữ nguyên)
`'active'/'inactive'`, `'online'/'offline'/'unknown'`, `'enabled'/'disabled'`, `'sse'/'streamablehttp'`, `'dify'/'ragflow'/'weknora'`, `'latest'`, `'test'/'external'`, `'all'/'selected'`, `'discover'/'imported'`, `'edit'/'delete'/'sync'`, `'user'/'assistant'`, `'global'`, `'none'/'short'/'long'`, `'zh'/'zh_cn'/'mandarin'/'pcm'/'offline'`, provider keys (`funasr`, `doubao`, `webrtc_vad`, `doubao_ws`, `cosyvoice`, `minimax`...), `config_id`, tên field API, URL, CSS class, tên route/command, MIME types, WAV header, locale code `'zh-CN'` trong `toLocaleString()`.

## 8. Thay đổi có chủ ý liên quan locale
- `toLocaleString('zh-CN')` → `toLocaleString('vi-VN')` trong các chỗ chỉ định dạng ngày giờ hiển thị (TTSConfig, Users, PoolStats, MemoryConfig, AgentHistory, SpeakerConfig...).
- `lang="zh-CN"` → `lang="vi"` và `<title>` → "Hệ thống quản lý Tiểu Trí" trong `index.html`.

---
*Tổng hợp từ báo cáo của 9 nhóm dịch — 11/10/2026.*
