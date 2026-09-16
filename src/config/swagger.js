import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevPulse API Documentation",
      version: "1.0.0",
      description:
        "Tài liệu API hoàn chỉnh theo chuẩn OpenAPI 3.0 cho hệ thống quản lý tài nguyên lập trình DevPulse.",
      contact: {
        name: "DevPulse Team",
      },
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Cơ chế xác thực JWT qua header Authorization (nếu có kích hoạt). Ví dụ: 'Bearer <token>'",
        },
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "Cơ chế xác thực qua API Key trên header x-api-key (nếu có kích hoạt).",
        },
      },
      schemas: {
        Resource: {
          type: "object",
          required: ["_id", "title", "url", "category", "tags", "upvotes", "createdAt", "updatedAt"],
          properties: {
            _id: {
              type: "string",
              description: "Mã định danh duy nhất của tài nguyên (MongoDB ObjectId)",
              example: "65f2d01a9b1c8e001f3e4a5b",
            },
            title: {
              type: "string",
              description: "Tiêu đề tài nguyên (tối thiểu 3 ký tự, tối đa 100 ký tự)",
              minLength: 3,
              maxLength: 100,
              example: "Lộ trình học ReactJS từ cơ bản đến nâng cao",
            },
            url: {
              type: "string",
              format: "uri",
              description: "Đường dẫn liên kết hợp lệ đến tài nguyên",
              example: "https://react.dev",
            },
            category: {
              type: "string",
              description: "Danh mục phân loại",
              enum: ["Frontend", "Backend", "DevOps", "AI", "Mobile", "UI/UX"],
              example: "Frontend",
            },
            tags: {
              type: "array",
              description: "Danh sách thẻ phân loại (từ 1 đến 5 thẻ, không chứa ký tự đặc biệt, viết thường)",
              items: {
                type: "string",
                maxLength: 20,
              },
              example: ["react", "javascript", "frontend"],
            },
            summary: {
              type: "string",
              maxLength: 300,
              description: "Tóm tắt ngắn gọn nội dung tài nguyên (tối đa 300 ký tự)",
              example: "Tài liệu chính thức và hướng dẫn thực hành React mới nhất.",
            },
            upvotes: {
              type: "integer",
              description: "Số lượt upvote của tài nguyên",
              default: 0,
              example: 15,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Thời điểm tạo tài nguyên",
              example: "2026-03-15T08:30:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Thời điểm cập nhật tài nguyên gần nhất",
              example: "2026-03-15T09:00:00.000Z",
            },
          },
        },
        ResourceInput: {
          type: "object",
          required: ["title", "url", "category", "tags"],
          properties: {
            title: {
              type: "string",
              minLength: 3,
              maxLength: 100,
              description: "Tiêu đề tài nguyên (3-100 ký tự)",
              example: "Lộ trình học ReactJS từ cơ bản đến nâng cao",
            },
            url: {
              type: "string",
              format: "uri",
              description: "URL hợp lệ của tài nguyên",
              example: "https://react.dev",
            },
            category: {
              type: "string",
              enum: ["Frontend", "Backend", "DevOps", "AI", "Mobile", "UI/UX"],
              description: "Danh mục của tài nguyên",
              example: "Frontend",
            },
            tags: {
              type: "array",
              minItems: 1,
              maxItems: 5,
              description: "Danh sách 1-5 tags, mỗi tag tối đa 20 ký tự, không ký tự đặc biệt",
              items: {
                type: "string",
                maxLength: 20,
              },
              example: ["react", "javascript", "frontend"],
            },
            summary: {
              type: "string",
              maxLength: 300,
              description: "Mô tả ngắn gọn về tài nguyên (tùy chọn, tối đa 300 ký tự)",
              example: "Tài liệu chính thức và hướng dẫn thực hành React mới nhất.",
            },
          },
        },
        UpvoteResponse: {
          type: "object",
          properties: {
            upvotes: {
              type: "integer",
              description: "Tổng số lượt upvote sau khi tăng",
              example: 16,
            },
          },
        },
        MessageResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Thông báo phản hồi",
              example: "Xóa thành công",
            },
          },
        },
        ValidationErrorResponse: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              description: "Danh sách chi tiết các lỗi kiểm tra dữ liệu đầu vào (Zod validation)",
              items: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                    example: "invalid_type",
                  },
                  expected: {
                    type: "string",
                    example: "string",
                  },
                  received: {
                    type: "string",
                    example: "undefined",
                  },
                  path: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    example: ["title"],
                  },
                  message: {
                    type: "string",
                    example: "Title tối thiểu 3 ký tự",
                  },
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Thông báo lỗi chi tiết",
              example: "Không tìm thấy tài nguyên",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js", "./src/routes/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

export default swaggerSpec;
