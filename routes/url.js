import express from "express"
const router = express.Router();

import { handleGenarateNewShortUrl, handleRedirectToOriginalUrl, handleUrlClickAnalytics } from "../controllers/urlController.js"

router.get("/test", (req, res) => {
    res.json({ msg: "Success" });
});

router.post("/url", handleGenarateNewShortUrl);

router.get("/url/:id",handleRedirectToOriginalUrl)

router.get("/url/analytics/:id",handleUrlClickAnalytics);



export default router;