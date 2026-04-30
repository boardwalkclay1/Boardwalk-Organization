import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_DIR = "./data";

// SECURITY KEYS
const BOARD_KEY = "board-123";
const ADMIN_KEY = "admin-999";

// SIMPLE PROTECT
function protect(req, level) {
  const key = req.headers["x-api-key"];
  if (level === "board" && key !== BOARD_KEY) return false;
  if (level === "admin" && key !== ADMIN_KEY) return false;
  return true;
}

// JSON HELPERS
function readJSON(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file)));
}

function writeJSON(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

// -----------------------------------------------------
// PUBLIC: EVENTS
// -----------------------------------------------------
app.get("/api/events", (req, res) => {
  res.json(readJSON("events.json"));
});

// -----------------------------------------------------
// BOARD: TASKS
// -----------------------------------------------------
app.get("/api/board/tasks", (req, res) => {
  if (!protect(req, "board")) return res.status(401).json({ error: "nope" });
  res.json(readJSON("tasks.json"));
});

app.post("/api/board/tasks", (req, res) => {
  if (!protect(req, "board")) return res.status(401).json({ error: "nope" });

  const tasks = readJSON("tasks.json");
  const task = {
    id: Date.now().toString(),
    ...req.body
  };
  tasks.push(task);
  writeJSON("tasks.json", tasks);

  res.json({ ok: true, task });
});

// -----------------------------------------------------
// ADMIN: EVENTS
// -----------------------------------------------------
app.post("/api/admin/events", (req, res) => {
  if (!protect(req, "admin")) return res.status(401).json({ error: "nope" });

  const events = readJSON("events.json");
  const event = {
    id: Date.now().toString(),
    ...req.body
  };
  events.push(event);
  writeJSON("events.json", events);

  res.json({ ok: true, event });
});

// -----------------------------------------------------
// DONATIONS + SPONSORSHIP (QR + SOURCE TRACKING)
// -----------------------------------------------------
// This is the record AFTER PayPal returns to you.
// You’ll hit this from your success page logic.

app.post("/api/donations", (req, res) => {
  // body: { amount, currency, donorName, donorEmail, source, type, meta }
  const donations = readJSON("donations.json");

  const donation = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    amount: req.body.amount,
    currency: req.body.currency || "USD",
    donorName: req.body.donorName || null,
    donorEmail: req.body.donorEmail || null,
    source: req.body.source || "unknown", // e.g. "qr_paypal_general", "qr_event_2025", "site_sponsor_form"
    type: req.body.type || "donation",    // "donation" | "sponsorship"
    meta: req.body.meta || {}
  };

  donations.push(donation);
  writeJSON("donations.json", donations);

  // TODO: send branded email receipt here
  // sendReceiptEmail(donation).catch(console.error);

  res.json({ ok: true, donation });
});

// SPONSOR RECORDS (if you want a separate list)
app.post("/api/sponsors", (req, res) => {
  if (!protect(req, "admin")) return res.status(401).json({ error: "nope" });

  const sponsors = readJSON("sponsors.json");
  const sponsor = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...req.body
  };
  sponsors.push(sponsor);
  writeJSON("sponsors.json", sponsors);

  res.json({ ok: true, sponsor });
});

// -----------------------------------------------------
// SUCCESS REDIRECT HOOK (FOR QR / PAYPAL)
// -----------------------------------------------------
// PayPal button / QR sends user to:
// https://your-site.com/donate-success?source=qr_paypal_general
// On that success page, your frontend calls /api/donations with that source.

app.get("/api/donate-success-meta", (req, res) => {
  // optional helper if you want to show custom success copy per source
  const source = req.query.source || "unknown";
  res.json({
    ok: true,
    source,
    message: `Thank you for supporting Boardwalk Clay via ${source}.`
  });
});

// -----------------------------------------------------
// EMAIL RECEIPT (HOOK ONLY – FILL CREDENTIALS LATER)
// -----------------------------------------------------
async function sendReceiptEmail(donation) {
  // Configure with real SMTP later
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: "user@example.com",
      pass: "password"
    }
  });

  const html = `
    <div style="font-family: system-ui; padding: 24px; background:#0b0b10; color:#f5f5f5;">
      <h1 style="margin-bottom:8px;">Boardwalk Clay Receipt</h1>
      <p style="opacity:0.8;">Thank you for your support.</p>
      <div style="margin-top:16px; padding:16px; background:#151520; border-radius:8px;">
        <p><strong>Amount:</strong> ${donation.amount} ${donation.currency}</p>
        <p><strong>Type:</strong> ${donation.type}</p>
        <p><strong>Source:</strong> ${donation.source}</p>
        <p><strong>Date:</strong> ${donation.createdAt}</p>
      </div>
      <p style="margin-top:24px; font-size:12px; opacity:0.6;">
        Boardwalk Clay Organization
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: '"Boardwalk Clay" <no-reply@boardwalkclay.org>',
    to: donation.donorEmail,
    subject: "Your Boardwalk Clay Receipt",
    html
  });
}

// -----------------------------------------------------
// START SERVER
// -----------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Boardwalk backend running on port " + PORT));
