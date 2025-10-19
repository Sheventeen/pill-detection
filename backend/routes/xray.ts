// routes/xray.ts
import express from "express";
import axios from "axios";
import FormData from "form-data";
import multer from "multer";

const router = express.Router();
const upload = multer();

// set trycloudflare URL in .env
const BASE = process.env.INFERENCE_BASE_URL;
if (!BASE) {
  throw new Error("Missing INFERENCE_BASE_URL env var (e.g. https://abc123.trycloudflare.com)");
}
// res: express.Response
function sendAxiosError(res: any, err: any) {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status ?? 502;
    const data = err.response?.data ?? err.message;
    return res.status(status).json({ error: "inference_upstream_error", details: data });
  }
  return res.status(500).json({ error: "unknown_error", details: String(err) });
}

// quick sanity check
router.get("/xray/health", async (_req, res) => {
  try {
    const r = await axios.get(`${BASE}/health`, { timeout: 10_000 });
    res.json(r.data);
  } catch (err) {
    sendAxiosError(res, err);
  }
});

// URL-based (server-to-server fetch on the Colab side)
router.post("/xray/url", async (req, res) => {
  try {
    const { url } = req.body as { url?: string };
    if (!url) return res.status(400).json({ error: "url required" });

    const r = await axios.post(
      `${BASE}/analyze_url`,
      null,
      { params: { url }, timeout: 60_000 }
    );

    res.json(r.data);
  } catch (err) {
    sendAxiosError(res, err);
  }
});

// File upload -> forwarded as multipart/form-data
router.post("/xray/file", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "file required" });

    const form = new FormData();
    form.append("file", req.file.buffer, req.file.originalname || "upload");

    const r = await axios.post(
      `${BASE}/analyze`,
      form,
      {
        headers: form.getHeaders(),
        // allow large medical images
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        timeout: 90_000,
      }
    );

    res.json(r.data);
  } catch (err) {
    sendAxiosError(res, err);
  }
});

export default router;
