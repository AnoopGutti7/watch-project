import mongoose from "mongoose";
import Watch from "../models/watchModel.js";
import path from "path";
import fs from "fs";

const API_BASE = process.env.API_BASE_URL || "http://localhost:4000";

const BRAND_NAMES = {
  rolex: "Rolex",
  omega: "Omega",
  "patek-philippe": "Patek Philippe",
  "audemars-piguet": "Audemars Piguet",
  cartier: "Cartier",
  breitling: "Breitling",
  iwc: "IWC",
  hublot: "Hublot",
  "tag-heuer": "Tag Heuer",
  "jaeger-lecoultre": "Jaeger-LeCoultre",
};

const SAMPLE_MODELS = {
  rolex: ["Submariner Date", "Cosmograph Daytona", "GMT-Master II"],
  omega: ["Seamaster Diver 300M", "Speedmaster Moonwatch", "Aqua Terra"],
  "patek-philippe": ["Nautilus", "Aquanaut", "Calatrava"],
  "audemars-piguet": ["Royal Oak", "Royal Oak Offshore", "Code 11.59"],
  cartier: ["Santos de Cartier", "Tank Louis Cartier", "Ballon Bleu"],
  breitling: ["Navitimer B01", "Superocean Heritage", "Chronomat B01"],
  iwc: ["Big Pilot's Watch", "Portugieser Automatic", "Pilot's Chronograph"],
  hublot: ["Classic Fusion", "Big Bang Unico", "Spirit of Big Bang"],
  "tag-heuer": ["Carrera Chronograph", "Monaco Calibre 11", "Aquaracer"],
  "jaeger-lecoultre": ["Reverso Tribute", "Master Control", "Polaris"],
};

const SAMPLE_PRICES = [9500, 12800, 7200];

function slugify(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getWatchImageQuery(name) {
  if (!name || typeof name !== "string") {
    return "luxury watch";
  }

  const normalized = name.trim();
  const patterns = [
    { regex: /rolex.*submariner/i, query: "Rolex Submariner diver watch" },
    { regex: /rolex.*daytona/i, query: "Rolex Daytona racing chronograph watch" },
    { regex: /rolex.*gmt[-\s]?master/i, query: "Rolex GMT-Master II travel watch" },
    { regex: /rolex.*datejust/i, query: "Rolex Datejust dress watch" },
    { regex: /omega.*seamaster/i, query: "Omega Seamaster diving watch" },
    { regex: /omega.*speedmaster/i, query: "Omega Speedmaster chronograph watch" },
    { regex: /omega.*de ville/i, query: "Omega De Ville dress watch" },
    { regex: /tag[-\s]?heuer.*carrera/i, query: "Tag Heuer Carrera racing chronograph watch" },
    { regex: /tag[-\s]?heuer.*monaco/i, query: "Tag Heuer Monaco square racing watch" },
    { regex: /tag[-\s]?heuer.*formula 1/i, query: "Tag Heuer Formula 1 sports watch" },
    { regex: /patek.*nautilus/i, query: "Patek Philippe Nautilus luxury sports watch" },
    { regex: /patek.*aquanaut/i, query: "Patek Philippe Aquanaut sports watch" },
    { regex: /patek.*calatrava/i, query: "Patek Philippe Calatrava dress watch" },
    { regex: /cartier.*santos/i, query: "Cartier Santos square luxury watch" },
    { regex: /cartier.*tank/i, query: "Cartier Tank rectangular dress watch" },
    { regex: /cartier.*ballon bleu/i, query: "Cartier Ballon Bleu elegant watch" },
    { regex: /breitling.*navitimer/i, query: "Breitling Navitimer pilot chronograph watch" },
    { regex: /breitling.*superocean/i, query: "Breitling Superocean diver watch" },
    { regex: /breitling.*avenger/i, query: "Breitling Avenger tool watch" },
    { regex: /iwc.*pilot/i, query: "IWC Pilot watch" },
    { regex: /iwc.*portugieser/i, query: "IWC Portugieser dress watch" },
    { regex: /hublot.*big bang/i, query: "Hublot Big Bang modern watch" },
    { regex: /hublot.*classic fusion/i, query: "Hublot Classic Fusion luxury watch" },
  ];

  for (const item of patterns) {
    if (item.regex.test(normalized)) {
      return item.query;
    }
  }

  return `${normalized},watch`;
}

function getWatchImage(name) {
  const n = String(name || "").toLowerCase();

  if (n.includes("submariner")) return "/uploads/rolex-submariner.jpg";
  if (n.includes("daytona")) return "/uploads/rolex-daytona.jpg";
  if (n.includes("gmt")) return "/uploads/rolex-gmt.jpg";

  if (n.includes("royal oak")) return "/uploads/ap-royal-oak.jpg";
  if (n.includes("offshore")) return "/uploads/ap-offshore.jpg";
  if (n.includes("code")) return "/uploads/ap-code.jpg";

  if (n.includes("nautilus")) return "/uploads/patek-nautilus.jpg";
  if (n.includes("aquanaut")) return "/uploads/patek-aquanaut.jpg";
  if (n.includes("calatrava")) return "/uploads/patek-calatrava.jpg";

  if (n.includes("seamaster")) return "/uploads/omega-seamaster.jpg";
  if (n.includes("speedmaster")) return "/uploads/omega-speedmaster.jpg";

  if (n.includes("carrera")) return "/uploads/tag-carrera.jpg";
  if (n.includes("monaco")) return "/uploads/tag-monaco.jpg";

  return "/uploads/default.jpg";
}

function buildSampleWatches(rawBrandName) {
  const slug = slugify(rawBrandName);
  const brand = BRAND_NAMES[slug] || String(rawBrandName).trim();
  const models = SAMPLE_MODELS[slug] || [
    "Signature Automatic",
    "Classic Chronograph",
    "Heritage Edition",
  ];

  return models.map((model, index) => ({
    _id: `fallback-${slug || "brand"}-${index + 1}`,
    id: `fallback-${slug || "brand"}-${index + 1}`,
    productId: `fallback-${slug || "brand"}-${index + 1}`,
    name: `${brand} ${model}`,
    description: `Sample ${brand} watch shown while this brand collection is being updated.`,
    price: SAMPLE_PRICES[index] ?? SAMPLE_PRICES[0],
    category: "brand",
    brandName: brand,
    image: getWatchImage(`${brand} ${model}`),
    isFallback: true,
  }));
}

export async function createWatch(req, res) {
  try {
    const { name, description, price, category, brandName } = req.body;
    let image = req.body.image?.trim();

    if (req.file?.filename) {
      image = `/uploads/${req.file.filename}`;
    }

    if (!image && name) {
      image = getWatchImage(name);
    }

    if (!name || !description || !price || !image) {
      return res.status(400).json({
        success: false,
        message: "name, description, price and image are required",
      });
    }

    const doc = new Watch({
      _id: new mongoose.Types.ObjectId(),
      name,
      description,
      price,
      category,
      brandName,
      image,
    });

    const saved = await doc.save();

    return res.status(201).json({
      success: true,
      message: "Watch created",
      data: saved,
    });
  } catch (err) {
    console.error("createWatch error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getWatches(req, res) {
  try {
    const { category, sort = "-createdAt", page = 1, limit = 12 } = req.query;
    const filter = {};

    if (typeof category === "string") {
      const cat = category.trim().toLowerCase();
      if (cat === "men" || cat === "women" || cat === "brand") {
        filter.category = cat;
      }
    }

    const pg = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(200, parseInt(limit, 10) || 12);
    const skip = (pg - 1) * lim;

    const total = await Watch.countDocuments(filter);
    const items = await Watch.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(lim)
      .lean();

    return res.json({ success: true, total, page: pg, limit: lim, items });
  } catch (err) {
    console.error("getWatches error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function deleteWatch(req, res) {
  try {
    const { id } = req.params;

    const watch = await Watch.findById(id);
    if (!watch) {
      return res.status(404).json({ success: false, message: "Watch not found" });
    }

    if (watch.image && typeof watch.image === "string") {
      const filename = watch.image.split("/uploads/")[1];
      if (filename) {
        const filepath = path.join(process.cwd(), "uploads", filename);
        fs.unlink(filepath, (err) => {
          if (err) console.warn("Image delete failed:", err.message);
        });
      }
    }

    await Watch.findByIdAndDelete(id);

    return res.json({ success: true, message: "Watch deleted" });
  } catch (err) {
    console.error("deleteWatch error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}



export async function getWatchesByBrand(req, res) {
  try {
    const brandName = String(req.params.brandName || "").trim();

    if (!brandName) {
      return res.status(400).json({
        success: false,
        message: "Brand name is required",
      });
    }

    const escapedBrand = escapeRegExp(brandName);

    const items = await Watch.find({
      brandName: { $regex: new RegExp(`^${escapedBrand}$`, "i") },
    })
      .sort({ createdAt: -1 })
      .lean();

    console.log("Requested brand:", brandName);
    console.log("Found items:", items);

    return res.json({
      success: true,
      source: "database",
      brand: BRAND_NAMES[slugify(brandName)] || brandName,
      items,
    });
  } catch (err) {
    console.error("getWatchesByBrand error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load watches",
    });
  }
}
