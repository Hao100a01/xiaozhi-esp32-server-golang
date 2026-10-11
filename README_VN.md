# 🚀 xiaozhi-esp32-server-golang — Bản dịch tiếng Việt

> **Backend AI cho thiết bị ESP32 chạy Xiaozhi**
> Repo gốc: https://github.com/hackers365/xiaozhi-esp32-server-golang

---

## 1. Tóm tắt repo (em tóm tắt cho sếp)

**Đây là cái gì?**
Đây là một **server backend AI viết bằng Go (Golang)**, chuyên làm "bộ não" cho các thiết bị loa thông minh chạy firmware **Xiaozhi trên ESP32** (dự án gốc: [78/xiaozhi-esp32](https://github.com/78/xiaozhi-esp32)). Thay vì dùng server Python gốc của Xiaozhi, repo này viết lại hoàn toàn bằng Go để đạt **hiệu năng cao, độ trễ thấp, chịu được nhiều thiết bị cùng lúc**.

**Luồng xử lý giọng nói (end-to-end, streaming):**

```
🎙️ Giọng nói từ ESP32
   → VAD (phát hiện có người đang nói)
   → ASR (chuyển giọng nói thành chữ)
   → LLM (mô hình ngôn ngữ trả lời)
   → TTS (chuyển chữ thành giọng nói)
   → 🔊 Phát lại trên loa ESP32
```

Toàn bộ chuỗi này chạy **streaming (luồng liên tục)**, không đợi xong từng bước mới làm bước tiếp theo → giảm độ trễ đáng kể.

**Các module chính:**

| Module | Chức năng | Công nghệ hỗ trợ |
|--------|-----------|------------------|
| VAD | Phát hiện giọng nói | Silero VAD / WebRTC VAD / ten_vad |
| ASR | Nhận dạng giọng nói | FunASR (chạy local), Doubao ASR, Alibaba Qwen3/FunASR |
| LLM | Mô hình ngôn ngữ | Tương thích OpenAI API, **Ollama**, Eino framework, Coze, Dify |
| TTS | Tổng hợp giọng nói | Doubao, EdgeTTS (miễn phí), CosyVoice, MiniMax, Qwen TTS, Xunfei |
| MCP | Giao thức gọi công cụ (Model Context Protocol) | MCP Server, MCP Market, gọi tool từ xa |
| OpenClaw | Tích hợp AI agent OpenClaw | Endpoint riêng theo agent, chuyển chế độ bằng từ khóa |
| Vision | Xử lý hình ảnh | Doubao / Alibaba vision |
| Speaker ID | Nhận diện người nói (vân giọng nói) | sherpa-onnx + vector DB, tự đổi giọng TTS theo người nói |
| Voice Clone | Nhân bản giọng nói | MiniMax / CosyVoice / Qwen |
| Knowledge (RAG) | Kho tri thức, tìm kiếm tài liệu | Dify / RAGFlow / WeKnora |
| Transport | Kết nối thiết bị | **WebSocket**, **MQTT + UDP** |

**Điểm đáng chú ý với sếp:**

- **LLM hỗ trợ Ollama / OpenAI-compatible API** → có thể trỏ thẳng vào backend `http://113.164.79.140:11434` với model `xiaozhi-qwen:1.5b` mà sếp đang test. Cấu hình trong `config/config.yaml` mục `llm` hoặc qua Web console.
- Có **Web console quản trị** (port 8080): cấu hình trực quan từng module, test VAD/ASR/LLM/TTS, quản lý thiết bị, xem độ trễ realtime, OTA.
- Có **MCP Audio Server**: phát nhạc / điều khiển âm lượng qua MCP — liên quan trực tiếp đến ý tưởng "MCP phát nhạc YouTube" của sếp.
- Hỗ trợ **OTA**: thiết bị ESP32 tự lấy cấu hình kết nối (WebSocket/MQTT) từ server qua HTTP POST `http://<server>:8989/xiaozhi/ota/`.
- Có bản **AIO (all-in-one) build sẵn** cho Windows/Linux/macOS: tải về chạy ngay, không cần build.
- License: **MIT** (dùng tự do, kể cả thương mại).

**Cấu trúc thư mục chính:**

```
cmd/server/          → chương trình server chính
cmd/mqtt/            → server MQTT
cmd/mock_ai_server/  → server giả để test
internal/app/server/ → logic xử lý chat, websocket, mqtt/udp
internal/domain/     → các domain: asr, llm, tts, vad, mcp, memory, rag...
manager/backend/     → backend web console (Go)
manager/frontend/    → frontend web console (Vue)
config/config.yaml   → file cấu hình chính
doc/                 → tài liệu (~30 file)
docker/              → Dockerfile, docker-compose
```

---

## 2. Bản dịch README gốc sang tiếng Việt

### Giới thiệu dự án

xiaozhi-esp32-server-golang là một **dịch vụ backend AI hiệu năng cao, streaming toàn phần**, được thiết kế cho IoT và các kịch bản giọng nói thông minh. Dự án phát triển bằng **ngôn ngữ Go**, tích hợp các năng lực cốt lõi ASR (nhận dạng giọng nói tự động), LLM (mô hình ngôn ngữ lớn), TTS (tổng hợp giọng nói), hỗ trợ **đồng thời lượng lớn kết nối đa giao thức**, giúp các thiết bị đầu cuối thông minh và thiết bị biên (edge) tương tác giọng nói với AI.

### ✨ Tính năng chính

- ⚡ **Chuỗi giọng nói AI streaming toàn phần, end-to-end**: ASR → LLM → TTS xử lý streaming toàn bộ quy trình, độ trễ thấp, tương tác realtime
- 🎙️ **Nhận diện vân giọng nói & chuyển đổi TTS động**: tự động đổi giọng TTS theo danh tính người nói, trải nghiệm giọng nói cá nhân hoá
- 🔌 **Trừu tượng hoá tầng Transport**: WebSocket / MQTT UDP được trừu tượng hoá thống nhất, linh hoạt gắn vào logic chính, dễ mở rộng giao thức
- 📬 **Xử lý theo hàng đợi message**: LLM và TTS xử lý bất đồng bộ qua message queue, dễ gắn logic nghiệp vụ
- 🌐 **Đa giao thức, chịu tải đồng thời cao**: hỗ trợ lượng lớn thiết bị truy cập đồng thời và push message
- ♻️ **Connection pool & tái sử dụng kết nối hiệu quả**: giảm thời gian phản hồi, tăng throughput hệ thống
- 🤖 **Tích hợp đa engine AI**: dựa trên framework Eino, hỗ trợ FunASR, OpenAI-compatible, Ollama, Doubao, EdgeTTS, CosyVoice...
- 🧩 **Kiến trúc module hoá, dễ mở rộng**: các module cốt lõi VAD/ASR/LLM/TTS/MCP/Vision độc lập, cắm/rút được
- 🎵 **MCP Audio Server**: lấy tài nguyên audio phân trang & xử lý streaming, phát nhạc & điều khiển âm lượng
- 🦞 **Tích hợp agent OpenClaw**: tạo OpenClaw Endpoint riêng theo agent, xem trạng thái kết nối, test hội thoại, định tuyến vào/ra bằng từ khóa (mặc định "mở tôm hùm / vào tôm hùm" và "đóng tôm hùm / thoát tôm hùm")
- 🖥️ **Web console quản trị đầy đủ**: trình hướng dẫn cấu hình trực quan, test khả dụng toàn chuỗi VAD/ASR/LLM/TTS, quản lý thiết bị & inject message, giám sát độ trễ realtime & kiểm tra OTA
- 🧠 **Tính năng nghiệp vụ nâng cao**: tổng hợp & import MCP Market, nhân bản giọng nói, knowledge base (Dify/RAGFlow/WeKnora), debug gọi MCP từ xa theo thiết bị/agent
- 📦 **Triển khai 1-click dễ dùng**: gói aio build sẵn dùng ngay (chương trình chính + console + dịch vụ vân giọng nói), Docker 1-click, hỗ trợ build local trên Linux/Windows/macOS

### 🚀 Bắt đầu nhanh

#### Cách 1: Gói chạy 1-click (khuyên dùng)

Tải gói nén đúng nền tảng, giải nén rồi chạy:

- **Trang Release**: https://github.com/hackers365/xiaozhi-esp32-server-golang/releases
- **Hướng dẫn sử dụng**: doc/quickstart_bundle_tutorial.md

Sau khi khởi động, truy cập **http://\<IP-hoặc-domain\>:8080** để vào Web console cấu hình.

#### Cách 2: Triển khai bằng Docker

- [Docker Compose (có console)](doc/docker_compose.md)
- [Docker (không console)](doc/docker.md)

#### Cách 3: Build local

Phù hợp môi trường dev hoặc cần tuỳ chỉnh build.

**Cài dependency** (ví dụ Ubuntu):

```bash
# Go 1.20+
# Codec Opus
sudo apt-get install -y pkg-config libopus0 libopusfile-dev

# ONNX Runtime (1.21.0)
wget https://github.com/microsoft/onnxruntime/releases/download/v1.21.0/onnxruntime-linux-x64-1.21.0.tgz
tar -xzf onnxruntime-linux-x64-1.21.0.tgz
sudo cp -r onnxruntime-linux-x64-1.21.0/include/* /usr/local/include/onnxruntime/
sudo cp -r onnxruntime-linux-x64-1.21.0/lib/* /usr/local/lib/
sudo ldconfig

# Dependency runtime của ten_vad
sudo apt install -y libc++1 libc++abi1
```

> 📖 Chi tiết dependency đầy đủ và cấu hình Windows/macOS xem [config.md](doc/config.md)

Quy trình build tách rời (chương trình chính, console trước/sau, dịch vụ vân giọng nói) và đóng gói AIO xem [doc/compile_deploy.md](doc/compile_deploy.md)

Triển khai FunASR tham khảo [tài liệu chính thức FunASR](https://github.com/modelscope/FunASR/blob/main/runtime/docs/SDK_advanced_guide_online_zh.md).

**Build & chạy:**

```bash
# Build
go build -o xiaozhi_server ./cmd/server/

# Chạy (chi tiết file cấu hình xem config/config.yaml)
./xiaozhi_server -c config/config.yaml
```

### 📚 Điều hướng tài liệu

**Triển khai:**
- Hướng dẫn gói 1-click (doc/quickstart_bundle_tutorial.md)
- Triển khai Docker Compose (doc/docker_compose.md)
- Triển khai Docker (doc/docker.md)
- Hướng dẫn build & triển khai (doc/compile_deploy.md)
- Giải thích cấu hình (doc/config.md)

**Hướng dẫn sử dụng:**
- Hướng dẫn dùng console quản trị (doc/manager_console_guide.md)
- WebSocket & cấu hình OTA (doc/websocket_server.md)
- Cấu hình MQTT + UDP (doc/mqtt_udp.md)
- Giao thức MQTT UDP (doc/mqtt_udp_protocol.md)

**Module chức năng:**
- Năng lực Vision (doc/vision.md)
- Nhận diện vân giọng nói (doc/speaker_identification.md)
- Kiến trúc MCP (doc/mcp.md)
- Tài nguyên audio MCP (doc/mcp_resource.md)
- MCP Market (doc/mcp_market.md)
- Tích hợp agent OpenClaw (doc/openclaw_integration.md)
- Nhân bản giọng nói (doc/voice_clone.md)
- Knowledge base (doc/knowledge_base.md)
- Gọi MCP từ xa theo thiết bị/agent (doc/mcp_remote_call_agent_device.md)

**Kết nối thiết bị:**
- Hướng dẫn kết nối ESP32 (doc/esp32_xiaozhi_backend_guide.md)
- Giải thích xác thực OTA MQTT (doc/ota_mqtt_auth.md)

### 🧩 Tổng quan module

| Module | Giới thiệu chức năng | Công nghệ |
|--------|---------------------|-----------|
| VAD | Phát hiện hoạt động giọng nói | Silero VAD / WebRTC VAD / ten_vad |
| ASR | Nhận dạng giọng nói | FunASR / Doubao ASR |
| LLM | Suy luận mô hình lớn | Tương thích framework Eino, OpenAI, Ollama... |
| TTS | Tổng hợp giọng nói | Doubao / EdgeTTS / CosyVoice |
| MCP | Đa giao thức接入, phát hiện/import MCP Market, debug gọi từ xa theo thiết bị/agent | MCP Server / endpoint / MCP Market / SSE / StreamableHTTP / WebSocket Controller / MCP Tool Call |
| OpenClaw | Endpoint theo agent, chuyển mode bằng từ khóa vào/ra, forward & test message hội thoại | OpenClaw WebSocket / Agent Endpoint / Chat Router |
| Vision | Xử lý hình ảnh | Doubao / Alibaba vision |
| Nhận diện vân giọng nói | Nhận diện người nói | sherpa-onnx + vector DB |
| Nhân bản giọng nói | Tạo & nghe thử giọng clone phía user | MiniMax / CosyVoice / Qwen |
| Knowledge base (RAG) | Đồng bộ tài liệu, test recall & retrieval khi hội thoại | Dify / RAGFlow / WeKnora |

### 📈 Hiệu năng & kiểm thử

- Báo cáo test độ trễ (doc/delay_test.md)
- Console quản trị có cổng test khả dụng & độ trễ VAD/ASR/LLM/TTS

### 🛠️ Đang lên kế hoạch (Roadmap)

- AI chủ động (proactive AI)

### 🤝 Đóng góp

Hoan nghênh gửi Issue, PR hoặc góp ý!

### 📄 License

MIT License

---

## 3. Dịch tài liệu cấu hình quan trọng (doc/config.md — rút gọn)

File cấu hình chính: **`config/config.yaml`** — bao trùm mọi tham số cốt lõi: khởi động service,接入 giao thức, năng lực AI, log, MCP.

**Các mục cấu hình chính:**

- **server/pprof**: cấu hình profiling hiệu năng, nên bật khi dev/debug.
- **chat**: tham số chat — thời gian idle tối đa, thời gian im lặng tối đa của hội thoại.
- **auth**: công tắc xác thực user, sau này mở rộng hệ thống phân quyền.
- **system_prompt**: system prompt toàn cục, ảnh hưởng phong cách chat của LLM.
- **log**: đường dẫn log, level, xoay vòng log.
- **redis**: nếu dùng Redis để lưu trữ thì cấu hình mục này (không bắt buộc).
- **websocket**: IP và port mà WebSocket service lắng nghe (mặc định `0.0.0.0:8989`).
- **mqtt**: tham số kết nối MQTT server bên ngoài.
- **mqtt_server**: tham số MQTT server tích hợp sẵn (tuỳ chọn TLS).
- **udp**: tham số UDP server.
- **vad**: cấu hình phát hiện giọng nói, hỗ trợ `webrtc_vad` / `silero_vad` / `ten_vad`.
- **asr**: cấu hình nhận dạng giọng nói, hỗ trợ `funasr` / `aliyun_funasr` / `doubao`.
- **tts**: cấu hình tổng hợp giọng nói, hỗ trợ nhiều engine (doubao, edge, xiaozhi...).
- **llm**: cấu hình mô hình ngôn ngữ, hỗ trợ nhiều model tương thích OpenAI — **bao gồm Ollama**.
- **vision**: cấu hình model vision.
- **ota**: thông tin OTA trả về, thích ứng môi trường khác nhau.
- **wakeup_words**: danh sách từ đánh thức (wake word).
- **mcp**: cấu hình MCP đa giao thức, hỗ trợ global và theo thiết bị.
- **enable_greeting**: có bật lời chào khi khởi động không.

**Gợi ý chỉnh sửa:** chỉ cần điều chỉnh IP, port, key, API Key theo môi trường triển khai thực tế. Muốn mở rộng năng lực AI thì bổ sung provider & tham số ở các module llm/tts/vad/asr/vision.

**Ví dụ cấu hình LLM trỏ về Ollama (trường hợp của sếp):**

```yaml
llm:
  provider: "ollama"   # hoặc openai-compatible
  # base_url trỏ về http://113.164.79.140:11434/v1
  # model: xiaozhi-qwen:1.5b
```

*(Tên field chính xác xem trong Web console mục LLMConfig hoặc file config.yaml mẫu của repo.)*

---

## 4. Dịch hướng dẫn kết nối ESP32 (doc/esp32_xiaozhi_backend_guide.md — rút gọn)

**1. Triển khai server** — 2 cách: chạy local (theo README) hoặc Docker:
- Cách 1 (khuyên dùng, có console): Docker Compose
- Cách 2 (chỉ service, không console): Docker

Port mặc định khi chạy Docker:
- **8989:8989** — port WebSocket
- **2883:2883** — port MQTT
- **8888:8888/udp** — port UDP

**2. Cấu hình địa chỉ OTA cho ESP32** — 2 cách:

*Cách A: qua WiFi配网 (khi thiết bị đã triển khai):*
1. Cho ESP32 vào chế độ配网 WiFi (mở AP hotspot).
2. Kết nối vào hotspot, mở trang cấu hình (thường là `192.168.4.1`).
3. Tìm mục OTA, sửa địa chỉ OTA server thành: `http://<IP-server-của-bạn>:8989/xiaozhi/ota/` (ví dụ `http://192.168.1.12:8989/xiaozhi/ota/`).
4. Lưu &配网.

*Cách B: sửa trong config khi build firmware:*
Sửa `CONFIG_OTA_URL` trong `config.json` của project ESP32 thành `http://<IP-server>/xiaozhi/ota/`, rồi build lại firmware.

**3. Cấu hình trên console:**

- **OTA**: sửa "khoá ký" (signature key) cho trùng với trang MQTT Server; có thể bật/tắt MQTT (endpoint = serverIP:2883).
- **MQTT**: nếu dùng MQTT tích hợp sẵn → broker `127.0.0.1`, port `2883`; auth = tài khoản admin của MQTT Server.
- **MQTT Server**: listen port `2883`, đặt user/pass admin, khoá ký trùng với trang OTA.
- **UDP**: listen port `8888`, external host = IP server của bạn.
- **MCP**: Global MCP server là MCP server bên ngoài; nếu chưa có thì tạm bỏ trống.
- **VAD**: dùng WebRTC VAD, không cần cấu hình thêm.
- **ASR**: điền cấu hình ASR (kể cả chạy Docker cũng không có ASR local sẵn — cần tự deploy; xem hướng dẫn FunASR).
- **LLM**: điền API Key / endpoint của bạn.
- **TTS**: lưu ý TTS mặc định của Xiaozhi đã không dùng được nữa, nên dùng **EdgeTTS** (miễn phí).

**Luồng AI:** Giọng nói vào → VAD (phát hiện giọng nói) → ASR (nhận dạng) → LLM (mô hình lớn) → TTS (tổng hợp giọng) → giọng nói ra.

---

## 5. Dịch cấu hình WebSocket & OTA (doc/websocket_server.md — rút gọn)

**File cấu hình:** mọi cấu hình chính nằm ở `config/config.yaml`.

**WebSocket server** (giao tiếp realtime giữa thiết bị và server):

```yaml
websocket:
  host: "0.0.0.0"   # địa chỉ lắng nghe, thường giữ nguyên
  port: 8989        # port lắng nghe, mặc định 8989
```

**OTA** (thiết bị tự lấy tham số kết nối WebSocket/MQTT và thông tin nâng cấp firmware):

```yaml
ota:
  test:        # môi trường nội bộ (IP bắt đầu bằng 192.168 hoặc 127.0)
    websocket:
      url: "ws://192.168.1.100:8989/xiaozhi/v1/"
    mqtt:
      enable: false
      endpoint: "192.168.1.100"
  external:    # môi trường internet
    websocket:
      url: "wss://yourdomain.com:55555/go_ws/xiaozhi/v1/"
    mqtt:
      enable: false
      endpoint: "www.youdomain.com"
```

- `mqtt.enable: true` → OTA sẽ trả về địa chỉ MQTT, thiết bị ưu tiên dùng MQTT+UDP.
- Thiết bị gọi HTTP POST tới `http://<server>:<port>/xiaozhi/ota/` kèm header `Device-Id` và `Client-Id`; server căn cứ IP thiết bị để chọn config `test` hay `external`, rồi trả về tham số kết nối.

---

## 6. Dịch tổng quan MCP (doc/mcp.md — rút gọn)

**MCP (Model Context Protocol)** là giao thức quản lý & gọi công cụ (tool) chung, implement trên framework Eino, hỗ trợ đăng ký/phát hiện/gọi tool ở cả cấp global và cấp thiết bị. Dùng nhiều trong hội thoại AI, IoT.

**Tính năng:**
- 🌐 **Quản lý MCP tool global**: kết nối nhiều MCP server qua SSE, tự phát hiện & đăng ký tool, proxy gọi tool thống nhất, giám sát trạng thái & tự reconnect.
- 📱 **Quản lý MCP theo thiết bị**: mỗi thiết bị có kết nối MCP riêng qua WebSocket, đăng ký tool riêng theo thiết bị, giới hạn số kết nối & tự dọn dẹp.
- 🔧 **Tích hợp Eino**: implement interface `tool.InvokableTool`, type-safe, xử lý streaming.

**Kiến trúc:** GlobalMCPManager (SSE tới các MCP Server) ↔ WebSocket Server `/xiaozhi/mcp/{deviceId}` ↔ thiết bị/IoT client (kênh WebSocket) ↔ MCP Server phía thiết bị.

**Cấu hình mẫu (config.yaml):**

```yaml
mcp:
  global:
    enabled: true
    servers:
      - name: "filesystem"
        sse_url: "http://localhost:3001/sse"
        enabled: true
    reconnect_interval: 5
    max_reconnect_attempts: 10
  device:
    enabled: true
    websocket_path: "/xiaozhi/mcp/"
    max_connections_per_device: 5
```

---

## 7. Các tài liệu khác trong repo (liệt kê để sếp tra cứu)

- **Triển khai Docker**: doc/docker.md, doc/docker_compose.md, doc/docker_deployment.md
- **MQTT + UDP**: doc/mqtt_udp.md, doc/mqtt_udp_protocol.md, doc/mqtt_bridge.md, doc/ota_mqtt_auth.md
- **MCP nâng cao**: doc/mcp_resource.md (audio), doc/mcp_market.md, doc/mcp_audio_example.md, doc/mcp_remote_call_agent_device.md
- **AI nâng cao**: doc/vision.md, doc/speaker_identification.md (vân giọng nói), doc/voice_clone.md (nhân bản giọng), doc/knowledge_base.md (RAG), doc/openclaw_integration.md
- **Test & hiệu năng**: doc/delay_test.md, doc/websocket_connection_flow.md, doc/websocket_meter.md, doc/mock_external_ai_server.md, doc/fullchain_mock_pressure_test_plan.md
- **Build**: doc/compile_deploy.md, doc/aio/README_linux.md, README_macos.md, README_windows.md
- **ASR local**: doc/asr_server_merge_plan.md, doc/speaker_identification.md

---

*Dịch từ repo gốc (tiếng Trung/Anh) sang tiếng Việt bởi Ly ly — 11/10/2026.*
*Lưu ý: một số thuật ngữ kỹ thuật (VAD/ASR/LLM/TTS/MCP/OTA...) được giữ nguyên theo chuẩn ngành.*
