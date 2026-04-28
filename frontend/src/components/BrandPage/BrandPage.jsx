import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { useCart } from "../../CartContext";
import brandWatchData from "./brandWatchData";

const BRAND_LABELS = {
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

const DEFAULT_IMAGE = "/images/default-watch.jpg";

function formatPrice(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return "₹0";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function normalizeImageSource(image) {
  if (!image) return DEFAULT_IMAGE;

  return typeof image === "string" ? image : DEFAULT_IMAGE;
}

function buildWatchImage(image, name = "luxury watch") {
  if (image && typeof image === "string" && image.trim() !== "") {
    return image;
  }

  return `https://source.unsplash.com/600x400/?${encodeURIComponent(name)}`;
}

function getSafeImage(image) {
  if (!image || typeof image !== "string") {
    return "https://cdn.pixabay.com/photo/2016/11/29/09/32/watch-1869928_960_720.jpg";
  }

  return image;
}

function buildWatchItem(item, index) {
  const rawPrice =
    typeof item.price === "number"
      ? item.price
      : Number(String(item.price ?? "").replace(/[^0-9.-]+/g, "")) || 0;

  return {
    _id: String(item._id ?? item.id ?? `brand-${index}`),
    id: String(item._id ?? item.id ?? `brand-${index}`),
    name: item.name || item.title || "Luxury Watch",
    description:
      item.description || item.desc || item.summary || "Premium luxury watch",
    desc:
      item.description || item.desc || item.summary || "Premium luxury watch",
    price: rawPrice,
    image: normalizeImageSource(
      buildWatchImage(item.image || item.img || item.imageUrl, item.name)
    ),
  };
}

export default function BrandPage() {
  const { brandName } = useParams();
  const navigate = useNavigate();

  const { addItem, cart, increment, decrement } = useCart();

  const [brandWatches, setBrandWatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!brandName) return;

    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);

      try {
        const resp = await api.get(
          `/watches/brands/${encodeURIComponent(brandName)}`
        );

        const items =
          resp?.data?.items || resp?.data?.data || resp?.data || [];

        const mapped = items.map((it, index) => {
          const id = it._id ?? it.id ?? index;

          const rawPrice =
            typeof it.price === "number"
              ? it.price
              : Number(String(it.price ?? "").replace(/[^0-9.-]+/g, "")) || 0;

          return {
            id: String(id),
            image: buildWatchImage(
              it.image || it.img || it.imageUrl,
              it.name ?? it.title ?? ""
            ),
            name: it.name ?? it.title ?? "Unknown Watch",
            desc: it.description ?? it.desc ?? "",
            price: rawPrice,
          };
        });

        const fallback =
  brandWatchData[brandName]?.map((item, index) =>
    buildWatchItem(item, index)
  ) || [];

if (!cancelled) {
  if (mapped.length > 0) {
    const fixedMapped = mapped.map((watch, index) => ({
      ...watch,
      image:
        fallback[index]?.image ||
        watch.image,
    }));

    setBrandWatches(fixedMapped);
  } else {
    setBrandWatches(fallback);
  }
}
      } catch (err) {
        console.error("API error:", err);

        const fallback =
          brandWatchData[brandName]?.map((item, index) =>
            buildWatchItem(item, index)
          ) || [];

        if (!cancelled) {
          setBrandWatches(fallback);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [brandName]);

  const findInCart = (id) =>
    cart.find((p) => String(p.id) === String(id));

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1 style={{ marginTop: "20px" }}>
        {BRAND_LABELS[brandName] || brandName} Watches
      </h1>

      {brandWatches.length === 0 && !loading && (
        <p style={{ color: "red" }}>No watches found for this brand</p>
      )}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {brandWatches.map((watch) => {
          const inCart = findInCart(watch.id);
          const qty = inCart?.qty || 0;

          return (
            <div
              key={watch.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                width: "220px",
                borderRadius: "10px",
              }}
            >
              <img
                src={getSafeImage(watch.image)}
                alt={watch.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://cdn.pixabay.com/photo/2016/11/29/09/32/watch-1869928_960_720.jpg";
                }}
              />

              <h3>{watch.name}</h3>

              <p>{watch.desc}</p>

              <p>{formatPrice(watch.price)}</p>

              {qty > 0 ? (
                <div>
                  <button onClick={() => decrement(watch.id)}>-</button>

                  <span style={{ margin: "0 10px" }}>{qty}</span>

                  <button onClick={() => increment(watch.id)}>+</button>
                </div>
              ) : (
                <button
  onClick={() => {
    addItem({
      id: watch.id,
      name: watch.name,
      price: watch.price,
      img: watch.image,
      qty: 1,
    });

    navigate("/cart");
  }}
>
  Add to Cart
</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}