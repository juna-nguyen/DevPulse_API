# 📚 Tài Liệu API DevPulse (Dành Cho Frontend)

Tài liệu chi tiết hướng dẫn Frontend kết nối với backend API của **DevPulse API**, bao gồm Base URL, danh sách endpoint, phương thức HTTP, headers, body payload, query parameters, mã trạng thái (status code) và cấu trúc response chi tiết (thành công & lỗi).

---

## 🌐 Thông Tin Chung

- **Base URL (Local)**: `http://localhost:3000` (hoặc cấu hình qua biến `PORT` / `API_URL` trong `.env`)
- **Prefix Route**: `/api/resources`
- **Content-Type**: `application/json`
- **Cơ chế xác thực (Auth)**: Hiện tại tất cả các endpoints đều là **Public API** (không bắt buộc Bearer JWT Token / API Key).
- **Interactive Swagger Docs UI**: `http://localhost:3000/api-docs`
- **Swagger JSON Spec**: `http://localhost:3000/api-docs.json`

---

## 📋 Data Model (Resource Schema)

Mỗi đối tượng **Resource** có cấu trúc như sau:

| Trường (Field) | Kiểu dữ liệu | Bắt buộc | Ràng buộc / Mô tả |
| :--- | :--- | :---: | :--- |
| `_id` | `String` | Tự sinh | MongoDB ObjectId (24 ký tự hex) |
| `title` | `String` | Có | Độ dài từ 3 đến 100 ký tự |
| `url` | `String` | Có | Định dạng URL hợp lệ (`http://` hoặc `https://`) |
| `category` | `String` | Có | 1 trong các giá trị enum: `"Frontend"`, `"Backend"`, `"DevOps"`, `"AI"`, `"Mobile"`, `"UI/UX"` |
| `tags` | `Array[String]` | Có | Mảng từ 1 - 5 tag; mỗi tag tối đa 20 ký tự, không chứa ký tự đặc biệt, tự động chuyển về chữ thường |
| `summary` | `String` | Không | Tối đa 300 ký tự |
| `upvotes` | `Number` | Mặc định 0 | Số lượt upvote |
| `createdAt` | `String` (ISO) | Tự sinh | Ngày tạo (VD: `2026-03-15T08:30:00.000Z`) |
| `updatedAt` | `String` (ISO) | Tự sinh | Ngày cập nhật gần nhất |

---

## 🚀 Danh Sách Chi Tiết Các Endpoints

### 1. Lấy danh sách tài nguyên (Search, Filter, Sort)

- **Endpoint**: `GET /api/resources`
- **Mô tả**: Lấy danh sách tài nguyên học tập, hỗ trợ tìm kiếm theo từ khóa, lọc theo danh mục, lọc theo tags và sắp xếp.

#### 🔍 Query Parameters (Tùy chọn)

| Tham số | Kiểu | Ví dụ | Ý nghĩa |
| :--- | :--- | :--- | :--- |
| `search` | `string` | `react` | Tìm kiếm không phân biệt hoa thường trong `title` hoặc `summary` |
| `category` | `string` | `Frontend` | Lọc chính xác theo danh mục (`Frontend`, `Backend`, `DevOps`, `AI`, `Mobile`, `UI/UX`) |
| `tags` | `string` | `react,javascript` | Danh sách tag phân tách bằng dấu phẩy `,` (trả về tài nguyên chứa ít nhất 1 trong các tag này) |
| `sort` | `string` | `Most Upvoted` | `Most Upvoted` (sắp xếp giảm dần theo lượt upvote, sau đó theo `createdAt`), mặc định: sắp xếp theo `createdAt` mới nhất |

#### 📥 Request Example
```http
GET /api/resources?search=react&category=Frontend&sort=Most Upvoted HTTP/1.1
Host: localhost:3000
```

#### 📤 Response Thành Công (`200 OK`)
```json
[
  {
    "_id": "65f2d01a9b1c8e001f3e4a5b",
    "title": "Lộ trình học ReactJS từ cơ bản đến nâng cao",
    "url": "https://react.dev",
    "category": "Frontend",
    "tags": ["react", "javascript", "frontend"],
    "summary": "Tài liệu chính thức và hướng dẫn thực hành React mới nhất.",
    "upvotes": 25,
    "createdAt": "2026-03-15T08:30:00.000Z",
    "updatedAt": "2026-03-15T09:00:00.000Z"
  }
]
```

#### ❌ Response Thất Bại (`500 Internal Server Error`)
```json
{
  "message": "Lỗi kết nối cơ sở dữ liệu"
}
```

---

### 2. Tạo mới một tài nguyên

- **Endpoint**: `POST /api/resources`
- **Mô tả**: Tạo một tài nguyên mới. Dữ liệu gửi lên sẽ được kiểm tra qua Zod Validation Middleware.

#### 📥 Request Headers
```http
Content-Type: application/json
```

#### 📦 Request Payload (Body)
```json
{
  "title": "Lộ trình học ReactJS từ cơ bản đến nâng cao",
  "url": "https://react.dev",
  "category": "Frontend",
  "tags": ["react", "javascript", "frontend"],
  "summary": "Tài liệu chính thức và hướng dẫn thực hành React mới nhất."
}
```

#### 📤 Response Thành Công (`201 Created`)
```json
{
  "_id": "65f2d01a9b1c8e001f3e4a5b",
  "title": "Lộ trình học ReactJS từ cơ bản đến nâng cao",
  "url": "https://react.dev",
  "category": "Frontend",
  "tags": ["react", "javascript", "frontend"],
  "summary": "Tài liệu chính thức và hướng dẫn thực hành React mới nhất.",
  "upvotes": 0,
  "createdAt": "2026-03-15T08:30:00.000Z",
  "updatedAt": "2026-03-15T08:30:00.000Z"
}
```

#### ❌ Response Thất Bại (`400 Bad Request` - Lỗi Validation Zod)
```json
{
  "errors": [
    {
      "code": "too_small",
      "minimum": 3,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "Title tối thiểu 3 ký tự",
      "path": ["title"]
    },
    {
      "code": "invalid_string",
      "validation": "url",
      "message": "URL không hợp lệ",
      "path": ["url"]
    }
  ]
}
```

---

### 3. Cập nhật tài nguyên theo ID

- **Endpoint**: `PUT /api/resources/:id`
- **Mô tả**: Cập nhật toàn bộ thông tin của tài nguyên dựa theo `id` (MongoDB ObjectId).

#### 🔍 Path Parameters

| Tham số | Kiểu | Bắt buộc | Ví dụ | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | Có | `65f2d01a9b1c8e001f3e4a5b` | ID của tài nguyên (24 ký tự hex) |

#### 📦 Request Payload (Body)
```json
{
  "title": "Lộ trình học ReactJS & Next.js chuyên sâu",
  "url": "https://nextjs.org/docs",
  "category": "Frontend",
  "tags": ["react", "nextjs", "frontend"],
  "summary": "Tài liệu cập nhật mới nhất cho Next.js App Router."
}
```

#### 📤 Response Thành Công (`200 OK`)
```json
{
  "_id": "65f2d01a9b1c8e001f3e4a5b",
  "title": "Lộ trình học ReactJS & Next.js chuyên sâu",
  "url": "https://nextjs.org/docs",
  "category": "Frontend",
  "tags": ["react", "nextjs", "frontend"],
  "summary": "Tài liệu cập nhật mới nhất cho Next.js App Router.",
  "upvotes": 25,
  "createdAt": "2026-03-15T08:30:00.000Z",
  "updatedAt": "2026-03-15T09:30:00.000Z"
}
```

#### ❌ Response Thất Bại

- **`400 Bad Request`** (Khi ID không hợp lệ hoặc dữ liệu body sai):
```json
{
  "message": "ID không đúng định dạng ObjectId"
}
```
*hoặc:*
```json
{
  "errors": [
    {
      "code": "invalid_enum_value",
      "options": ["Frontend", "Backend", "DevOps", "AI", "Mobile", "UI/UX"],
      "path": ["category"],
      "message": "Category không hợp lệ"
    }
  ]
}
```

- **`404 Not Found`** (Không tìm thấy tài nguyên theo ID):
```json
{
  "message": "Không tìm thấy tài nguyên"
}
```

---

### 4. Xóa tài nguyên theo ID

- **Endpoint**: `DELETE /api/resources/:id`
- **Mô tả**: Xóa vĩnh viễn tài nguyên khỏi cơ sở dữ liệu theo `id`.

#### 🔍 Path Parameters

| Tham số | Kiểu | Bắt buộc | Ví dụ | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | Có | `65f2d01a9b1c8e001f3e4a5b` | ID của tài nguyên cần xóa |

#### 📤 Response Thành Công (`200 OK`)
```json
{
  "message": "Xóa thành công"
}
```

#### ❌ Response Thất Bại

- **`400 Bad Request`** (ID sai định dạng):
```json
{
  "message": "ID không đúng định dạng ObjectId"
}
```

- **`404 Not Found`** (ID không tồn tại):
```json
{
  "message": "Không tìm thấy tài nguyên"
}
```

---

### 5. Upvote tài nguyên

- **Endpoint**: `PATCH /api/resources/:id/upvote`
- **Mô tả**: Tăng số lượng `upvotes` của tài nguyên lên 1. Không cần gửi body.

#### 🔍 Path Parameters

| Tham số | Kiểu | Bắt buộc | Ví dụ | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `string` | Có | `65f2d01a9b1c8e001f3e4a5b` | ID của tài nguyên cần upvote |

#### 📥 Request Example
```http
PATCH /api/resources/65f2d01a9b1c8e001f3e4a5b/upvote HTTP/1.1
Host: localhost:3000
```

#### 📤 Response Thành Công (`200 OK`)
```json
{
  "upvotes": 26
}
```

#### ❌ Response Thất Bại

- **`400 Bad Request`**:
```json
{
  "message": "ID không đúng định dạng ObjectId"
}
```

- **`404 Not Found`**:
```json
{
  "message": "Không tìm thấy tài nguyên"
}
```

---

## 🛠️ Ví Dụ Tích Hợp Frontend (Axios / Fetch)

### Sử dụng `Axios`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Lấy danh sách tài nguyên
export const getResources = async (params) => {
  // params: { search, category, tags, sort }
  const response = await api.get('/resources', { params });
  return response.data;
};

// 2. Tạo tài nguyên mới
export const createResource = async (payload) => {
  const response = await api.post('/resources', payload);
  return response.data;
};

// 3. Cập nhật tài nguyên
export const updateResource = async (id, payload) => {
  const response = await api.put(`/resources/${id}`, payload);
  return response.data;
};

// 4. Xóa tài nguyên
export const deleteResource = async (id) => {
  const response = await api.delete(`/resources/${id}`);
  return response.data;
};

// 5. Upvote tài nguyên
export const upvoteResource = async (id) => {
  const response = await api.patch(`/resources/${id}/upvote`);
  return response.data;
};
```
