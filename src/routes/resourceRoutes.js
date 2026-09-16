import express from "express";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  upvoteResource,
} from "../controllers/resourceController.js";
import { validateBody, validateId } from "../middlewares/validateResource.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Các API quản lý tài nguyên lập trình
 */

/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Lấy danh sách tài nguyên (Hỗ trợ Search & Filter)
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: Trả về danh sách tài nguyên thành công
 *   post:
 *     summary: Thêm mới một tài nguyên
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: "React Official Documentation"
 *               url:
 *                 type: string
 *                 example: "https://react.dev"
 *               category:
 *                 type: string
 *                 example: "Frontend"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["react", "javascript", "library"]
 *               summary:
 *                 type: string
 *                 example: "Tài liệu học React chính thức, cập nhật các hooks mới nhất."
 *     responses:
 *       201:
 *         description: Tạo tài nguyên thành công
 *       400:
 *         description: Lỗi Validation dữ liệu đầu vào
 */
router.route("/").get(getResources).post(validateBody, createResource);

/**
 * @swagger
 * /api/resources/{id}:
 *   put:
 *     summary: Cập nhật thông tin tài nguyên
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của tài nguyên cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "React Official Documentation (Updated)"
 *               url:
 *                 type: string
 *                 example: "https://react.dev"
 *               category:
 *                 type: string
 *                 example: "Frontend"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["react", "frontend"]
 *               summary:
 *                 type: string
 *                 example: "Đã cập nhật lại nội dung tóm tắt."
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Lỗi Validation dữ liệu đầu vào
 *   delete:
 *     summary: Xóa tài nguyên
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của tài nguyên cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router
  .route("/:id")
  .put(validateId, validateBody, updateResource)
  .delete(validateId, deleteResource);

/**
 * @swagger
 * /api/resources/{id}/upvote:
 *   patch:
 *     summary: Tăng điểm Upvote cho tài nguyên
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Upvote thành công
 */
router.route("/:id/upvote").patch(validateId, upvoteResource);

export default router;
