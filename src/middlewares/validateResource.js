import { z } from "zod";
import mongoose from "mongoose";

const resourceSchema = z.object({
  title: z
    .string()
    .min(3, "Title tối thiểu 3 ký tự")
    .max(100, "Title tối đa 100 ký tự")
    .trim(),
  url: z.string().url("URL không hợp lệ"),
  category: z.enum(["Frontend", "Backend", "DevOps", "AI", "Mobile", "UI/UX"], {
    errorMap: () => ({ message: "Category không hợp lệ" }),
  }),
  tags: z
    .array(
      z
        .string()
        .max(20, "Tag tối đa 20 ký tự")
        .regex(
          /^[^!@#$%^&*()_+={}\[\]:;|<>,.?/"']+$/,
          "Tag không chứa ký tự đặc biệt",
        )
        .transform((val) => val.toLowerCase()),
    )
    .min(1, "Ít nhất 1 tag")
    .max(5, "Tối đa 5 tags"),
  summary: z.string().max(300, "Summary tối đa 300 ký tự").optional(),
});

export const validateBody = (req, res, next) => {
  try {
    req.body = resourceSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ errors: error.errors });
  }
};

export const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json({ message: "ID không đúng định dạng ObjectId" });
  }
  next();
};
