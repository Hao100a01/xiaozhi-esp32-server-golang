<template>
  <div class="vp-docs">
    <aside class="vp-sidebar">
      <div class="vp-sidebar-title">Tài liệu OpenAPI</div>
      <a v-for="item in nav" :key="item.id" :href="`#${item.id}`" class="vp-nav-item">{{ item.label }}</a>
    </aside>

    <main class="vp-content">
      <header class="vp-hero">
        <h1>Tài liệu Tiểu Trí OpenAPI</h1>
        <p class="lead">Truy cập công khai, cung cấp phương thức yêu cầu, tham số và ví dụ đầu vào/đầu ra theo từng giao diện.</p>
        <div class="hero-meta">
          <span>Base URL: <code>/api/open/v1</code></span>
          <span>Content-Type: <code>application/json</code></span>
          <el-button size="small" type="primary" plain @click="$router.push('/login')">Quay lại đăng nhập</el-button>
        </div>
      </header>

      <section id="auth" class="vp-section">
        <h2>Phương thức xác thực</h2>
        <pre><code>Authorization: Bearer &lt;jwt-or-api-token&gt;
X-API-Token: &lt;api-token&gt;</code></pre>
      </section>

      <section id="common" class="vp-section">
        <h2>Giải thích phản hồi chung</h2>
        <ul>
          <li>Mã lỗi thường gặp:<code>400</code> lỗi tham số，<code>401</code> xác thực thất bại，<code>404</code> tài nguyên không tồn tại，<code>500</code> lỗi máy chủ.</li>
          <li>Giao diện phân trang mặc định:<code>page=1</code>、<code>page_size=50</code>。</li>
        </ul>
      </section>

      <section id="profile" class="vp-section">
        <h2>1. Lấy thông tin người dùng hiện tại</h2>
        <div class="api-line"><span class="method get">GET</span><code>/api/open/v1/profile</code></div>
        <h4>Tham số đầu vào</h4><p>Không có (chỉ cần header xác thực).</p>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{
  "user": {"id": 1, "username": "demo", "email": "demo@example.com", "role": "user"}
}</code></pre>
      </section>

      <section id="devices" class="vp-section">
        <h2>2. Giao diện thiết bị</h2>

        <h3>2.1 Lấy danh sách thiết bị</h3>
        <div class="api-line"><span class="method get">GET</span><code>/api/open/v1/devices</code></div>
        <h4>Tham số đầu vào</h4><p>Không có (chỉ cần header xác thực).</p>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"data":[{"id":1,"device_name":"bedroom","device_code":"123456","agent_id":2,"activated":true}]}</code></pre>

        <h3>2.2 Tạo thiết bị</h3>
        <div class="api-line"><span class="method post">POST</span><code>/api/open/v1/devices</code></div>
        <h4>Tham số Body</h4>
        <table><thead><tr><th>Trường</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>device_name</td><td>string</td><td>Có</td><td>Tên thiết bị, 2-50 ký tự</td></tr>
          <tr><td>agent_id</td><td>number</td><td>Có</td><td>ID agent đã liên kết</td></tr>
        </tbody></table>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"success":true,"message":"设备创建成功","data":{"device_code":"654321","device":{"id":8,"device_name":"bedroom"}}}</code></pre>
      </section>

      <section id="agents" class="vp-section">
        <h2>3. Giao diện agent</h2>

        <h3>3.1 Lấy danh sách agent</h3>
        <div class="api-line"><span class="method get">GET</span><code>/api/open/v1/agents</code></div>
        <h4>Tham số đầu vào</h4><p>Không có (chỉ cần header xác thực).</p>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"data":[{"id":2,"name":"家庭助手","nickname":"小辉","llm_config_id":"llm_default"}]}</code></pre>

        <h3>3.2 Tạo agent</h3>
        <div class="api-line"><span class="method post">POST</span><code>/api/open/v1/agents</code></div>
        <h4>Tham số Body</h4>
        <table><thead><tr><th>Trường</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>name</td><td>string</td><td>Có</td><td>Tên, 2-50 ký tự</td></tr>
          <tr><td>nickname</td><td>string</td><td>Không</td><td>Biệt danh, dùng cho mô hình lớn/Prompt; để trống thì mặc định bằng name</td></tr>
          <tr><td>custom_prompt</td><td>string</td><td>Không</td><td>Prompt</td></tr>
          <tr><td>llm_config_id</td><td>string</td><td>Không</td><td>ID cấu hình LLM</td></tr>
          <tr><td>tts_config_id</td><td>string</td><td>Không</td><td>ID cấu hình TTS</td></tr>
          <tr><td>voice</td><td>string</td><td>Không</td><td>Định danh giọng đọc</td></tr>
          <tr><td>asr_speed</td><td>string</td><td>Không</td><td>Mặc định normal</td></tr>
          <tr><td>memory_mode</td><td>string</td><td>Không</td><td>short/long/none</td></tr>
        </tbody></table>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"success":true,"data":{"id":3,"name":"客厅助手","nickname":"小辉"}}</code></pre>

        <h3>3.3 Lấy chi tiết agent</h3>
        <div class="api-line"><span class="method get">GET</span><code>/api/open/v1/agents/:id</code></div>
        <h4>Tham số Path</h4>
        <table><thead><tr><th>Tham số</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>id</td><td>number</td><td>Có</td><td>ID agent</td></tr>
        </tbody></table>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"data":{"id":2,"name":"家庭助手","nickname":"小辉","custom_prompt":"..."}}</code></pre>

        <h3>3.4 Cập nhật agent</h3>
        <div class="api-line"><span class="method put">PUT</span><code>/api/open/v1/agents/:id</code></div>
        <h4>Tham số Path</h4>
        <table><thead><tr><th>Tham số</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>id</td><td>number</td><td>Có</td><td>ID agent</td></tr>
        </tbody></table>
        <h4>Tham số Body</h4>
        <table><thead><tr><th>Trường</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>name</td><td>string</td><td>Có</td><td>Tên, 2-50 ký tự</td></tr>
          <tr><td>nickname</td><td>string</td><td>Không</td><td>Biệt danh, dùng cho mô hình lớn/Prompt; để trống thì mặc định bằng name</td></tr>
          <tr><td>custom_prompt</td><td>string</td><td>Không</td><td>Prompt</td></tr>
          <tr><td>llm_config_id</td><td>string</td><td>Không</td><td>ID cấu hình LLM (có thể để trống)</td></tr>
          <tr><td>tts_config_id</td><td>string</td><td>Không</td><td>ID cấu hình TTS (có thể để trống)</td></tr>
          <tr><td>voice</td><td>string</td><td>Không</td><td>Định danh giọng đọc</td></tr>
          <tr><td>asr_speed</td><td>string</td><td>Không</td><td>Để trống thì dùng normal</td></tr>
          <tr><td>memory_mode</td><td>string</td><td>Không</td><td>short/long/none</td></tr>
        </tbody></table>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"data":{"id":2,"name":"家庭助手-更新后","nickname":"小辉"}}</code></pre>

        <h3>3.5 Xóa agent</h3>
        <div class="api-line"><span class="method delete">DELETE</span><code>/api/open/v1/agents/:id</code></div>
        <h4>Tham số Path</h4>
        <table><thead><tr><th>Tham số</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>id</td><td>number</td><td>Có</td><td>ID agent</td></tr>
        </tbody></table>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"message":"删除成功"}</code></pre>
      </section>

      <section id="history" class="vp-section">
        <h2>4. Giao diện lịch sử trò chuyện</h2>

        <h3>4.1 Truy vấn tin nhắn (phân trang)</h3>
        <div class="api-line"><span class="method get">GET</span><code>/api/open/v1/history/messages</code></div>
        <h4>Tham số Query</h4>
        <table><thead><tr><th>Tham số</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>agent_id</td><td>string</td><td>Không</td><td>ID agent</td></tr>
          <tr><td>device_id</td><td>string</td><td>Không</td><td>Định danh thiết bị (device_name)</td></tr>
          <tr><td>session_id</td><td>string</td><td>Không</td><td>ID phiên</td></tr>
          <tr><td>role</td><td>string</td><td>Không</td><td>user/assistant</td></tr>
          <tr><td>page</td><td>number</td><td>Không</td><td>Mặc định 1</td></tr>
          <tr><td>page_size</td><td>number</td><td>Không</td><td>Mặc định 50</td></tr>
        </tbody></table>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"total":120,"page":1,"page_size":50,"data":[{"id":1,"role":"user","content":"你好"}]}</code></pre>

        <h3>4.2 Xuất tin nhắn</h3>
        <div class="api-line"><span class="method get">GET</span><code>/api/open/v1/history/export</code></div>
        <h4>Tham số Query</h4>
        <table><thead><tr><th>Tham số</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>agent_id</td><td>string</td><td>Không</td><td>ID agent</td></tr>
          <tr><td>device_id</td><td>string</td><td>Không</td><td>Định danh thiết bị (device_name)</td></tr>
          <tr><td>start_date</td><td>string</td><td>Không</td><td>YYYY-MM-DD</td></tr>
          <tr><td>end_date</td><td>string</td><td>Không</td><td>YYYY-MM-DD</td></tr>
        </tbody></table>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"export_time":"2026-03-17 10:00:00","total":20,"messages":[...]}</code></pre>
      </section>

      <section id="inject" class="vp-section">
        <h2>5. Giao diện đẩy giọng nói</h2>
        <div class="api-line"><span class="method post">POST</span><code>/api/open/v1/devices/inject-message</code></div>
        <h4>Tham số Body</h4>
        <table><thead><tr><th>Trường</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>device_id</td><td>string</td><td>Có</td><td>Định danh thiết bị (device_name)</td></tr>
          <tr><td>message</td><td>string</td><td>Có</td><td>Nội dung đẩy</td></tr>
          <tr><td>skip_llm</td><td>boolean</td><td>Không</td><td>Có bỏ qua LLM không, mặc định false</td></tr>
          <tr><td>auto_listen</td><td>boolean</td><td>Không</td><td>Sau khi phát xong có tự động vào chế độ nghe không, mặc định true</td></tr>
        </tbody></table>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"success":true,"message":"语音推送请求已发送","data":{"device_id":"bedroom","message":"hello","skip_llm":false,"auto_listen":true}}</code></pre>
      </section>

      <section id="mcp" class="vp-section">
        <h2>6. Giao diện công cụ MCP</h2>

        <h3>6.1 Lấy danh sách công cụ của agent</h3>
        <div class="api-line"><span class="method get">GET</span><code>/api/open/v1/agents/:id/mcp-tools</code></div>
        <h4>Tham số Path</h4>
        <table><thead><tr><th>Tham số</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>id</td><td>number</td><td>Có</td><td>ID agent</td></tr>
        </tbody></table>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"data":{"tools":[{"name":"tool_a","description":"..."}]}}</code></pre>

        <h3>6.2 Gọi công cụ của agent</h3>
        <div class="api-line"><span class="method post">POST</span><code>/api/open/v1/agents/:id/mcp-call</code></div>
        <h4>Tham số Path</h4>
        <table><thead><tr><th>Tham số</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>id</td><td>number</td><td>Có</td><td>ID agent</td></tr>
        </tbody></table>
        <h4>Tham số Body</h4>
        <table><thead><tr><th>Trường</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>tool_name</td><td>string</td><td>Có</td><td>Tên công cụ</td></tr>
          <tr><td>arguments</td><td>object</td><td>Không</td><td>Đối tượng tham số công cụ</td></tr>
        </tbody></table>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"data":{"result":"ok"}}</code></pre>

        <h3>6.3 Lấy danh sách công cụ của thiết bị</h3>
        <div class="api-line"><span class="method get">GET</span><code>/api/open/v1/devices/:id/mcp-tools</code></div>
        <h4>Tham số Path</h4>
        <table><thead><tr><th>Tham số</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>id</td><td>number</td><td>Có</td><td>ID thiết bị</td></tr>
        </tbody></table>
        <h4>Giải thích</h4>
        <ul>
          <li>Chỉ trả về công cụ IoT over MCP phía thiết bị tương ứng với transport đang trực tuyến hiện tại.</li>
          <li>Không lẫn công cụ lịch sử của transport khác, cũng không lẫn công cụ ws-endpoint của agent.</li>
        </ul>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"data":{"tools":[{"name":"device_tool","description":"..."}]}}</code></pre>

        <h3>6.4 Gọi công cụ của thiết bị</h3>
        <div class="api-line"><span class="method post">POST</span><code>/api/open/v1/devices/:id/mcp-call</code></div>
        <h4>Tham số Path</h4>
        <table><thead><tr><th>Tham số</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>id</td><td>number</td><td>Có</td><td>ID thiết bị</td></tr>
        </tbody></table>
        <h4>Tham số Body</h4>
        <table><thead><tr><th>Trường</th><th>Kiểu</th><th>Bắt buộc</th><th>Mô tả</th></tr></thead><tbody>
          <tr><td>tool_name</td><td>string</td><td>Có</td><td>Tên công cụ</td></tr>
          <tr><td>arguments</td><td>object</td><td>Không</td><td>Đối tượng tham số công cụ</td></tr>
        </tbody></table>
        <h4>Giải thích</h4>
        <ul>
          <li>Ưu tiên khớp và gọi theo danh sách công cụ của thiết bị hiện tại.</li>
          <li>Khi công cụ tạm thời chưa xuất hiện trong danh sách nhưng runtime hiện tại vẫn dùng được, máy chủ sẽ tự động thử gọi raw call dự phòng.</li>
        </ul>
        <h4>Ví dụ tham số đầu ra</h4>
        <pre><code>{"data":{"device_id":"bedroom","tool_name":"device_tool","result":"ok"}}</code></pre>
      </section>
    </main>
  </div>
</template>

<script setup>
const nav = [
  { id: 'auth', label: 'Phương thức xác thực' },
  { id: 'common', label: 'Giải thích chung' },
  { id: 'profile', label: '1. Thông tin người dùng' },
  { id: 'devices', label: '2. Giao diện thiết bị' },
  { id: 'agents', label: '3. Giao diện agent' },
  { id: 'history', label: '4. Lịch sử trò chuyện' },
  { id: 'inject', label: '5. Đẩy giọng nói' },
  { id: 'mcp', label: '6. Công cụ MCP' }
]
</script>

<style scoped>
.vp-docs { display: flex; gap: 24px; max-width: 1280px; margin: 0 auto; padding: 24px 16px 40px; color: #213547; }
.vp-sidebar { position: sticky; top: 20px; height: calc(100vh - 40px); min-width: 220px; border-right: 1px solid #e5e7eb; padding-right: 14px; display: flex; flex-direction: column; gap: 8px; }
.vp-sidebar-title { font-weight: 700; margin-bottom: 8px; }
.vp-nav-item { color: #4b5563; text-decoration: none; font-size: 14px; }
.vp-nav-item:hover { color: #3b82f6; }
.vp-content { flex: 1; min-width: 0; }
.vp-hero h1 { margin: 0; font-size: 32px; }
.lead { margin: 10px 0; color: #4b5563; }
.hero-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.vp-section { margin-top: 26px; padding-top: 6px; border-top: 1px solid #f0f2f5; }
.vp-section h2 { margin: 0 0 10px; }
.vp-section h3 { margin: 20px 0 8px; }
.vp-section h4 { margin: 14px 0 6px; font-size: 14px; color: #374151; }
.api-line { display: flex; align-items: center; gap: 10px; margin: 8px 0; }
.method { color: #fff; font-size: 12px; border-radius: 6px; padding: 2px 8px; font-weight: 600; }
.method.get { background: #10b981; }
.method.post { background: #3b82f6; }
.method.put { background: #f59e0b; }
.method.delete { background: #ef4444; }
pre { margin: 6px 0; background: #f6f8fb; color: #111827; border: 1px solid #d1d5db; border-radius: 8px; padding: 12px; overflow: auto; font-size: 12px; }
code { background: #f3f4f6; padding: 2px 6px; border-radius: 8px; }
table { width: 100%; border-collapse: collapse; font-size: 14px; }
th, td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; }
thead { background: #f8fafc; }
@media (max-width: 960px) {
  .vp-docs { display: block; }
  .vp-sidebar { position: static; height: auto; min-width: auto; border-right: none; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px; margin-bottom: 16px; }
}
</style>
