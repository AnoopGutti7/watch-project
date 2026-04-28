// src/pages/WatchPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Grid, User, Users, ShoppingCart, Minus, Plus } from "lucide-react";
import { normalizeImageUrl } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../../CartContext.jsx";

const FALLBACK_IMAGE =
  "https://cdn.pixabay.com/photo/2016/11/29/09/32/watch-1869928_960_720.jpg";

import {
  WATCHES as DUMMY_WATCHES,
  FILTERS as RAW_FILTERS,
} from "./dummydata";

import { watchPageStyles } from "../../assets/dummyStyles";

const ICON_MAP = { Grid, User, Users };

const FILTERS = RAW_FILTERS?.length
  ? RAW_FILTERS.map((f) => ({
      ...f,
      icon: ICON_MAP[f.iconName] ?? Grid,
    }))
  : [
      { key: "all", label: "All", icon: Grid },
      { key: "men", label: "Men", icon: User },
      { key: "women", label: "Women", icon: Users },
    ];

export default function WatchPage() {
  const [filter, setFilter] = useState("all");

  const { cart, addItem, increment, decrement, removeItem } = useCart();

  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapServerToUI = (item) => {
    let img =
      item.image ||
      item.img ||
      item.imageUrl ||
      FALLBACK_IMAGE;

   img = img || FALLBACK_IMAGE;

    const rawGender =
      (item.gender && String(item.gender).toLowerCase()) ||
      (item.category && String(item.category).toLowerCase()) ||
      "";

    const gender =
      rawGender === "men" || rawGender === "male"
        ? "men"
        : rawGender === "women" || rawGender === "female"
        ? "women"
        : "unisex";

    return {
      id:
        item._id ??
        item.id ??
        String(item.sku ?? item.name ?? Math.random()).slice(2, 12),

      name: item.name ?? "",
      price: item.price ?? 0,
      category: item.category ?? "",
      brand: item.brandName ?? "",
      desc: item.description ?? item.desc ?? "",
      img,
      gender,
      raw: item,
    };
  };

  useEffect(() => {
    setLoading(true);

    try {
      setWatches(DUMMY_WATCHES.map(mapServerToUI));
    } catch (err) {
      console.error("Failed to load watches:", err);
      setWatches([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getQty = (id) => {
    const items = Array.isArray(cart)
      ? cart
      : cart?.items ?? [];

    const match = items.find((c) => {
      const candidates = [c.productId, c.id, c._id];

      return candidates.some(
        (field) => String(field ?? "") === String(id)
      );
    });

    if (!match) return 0;

    const qty = match.qty ?? match.quantity ?? 0;

    return Number(qty) || 0;
  };

  const filtered = useMemo(
    () =>
      watches.filter((w) =>
        filter === "all"
          ? true
          : filter === "men"
          ? w.gender === "men"
          : filter === "women"
          ? w.gender === "women"
          : true
      ),
    [filter, watches]
  );

  return (
    <div className={watchPageStyles.container}>
      <ToastContainer />

      <div className={watchPageStyles.headerContainer}>
        <div>
          <h1 className={watchPageStyles.headerTitle}>
            Timepieces{" "}
            <span className={watchPageStyles.titleAccent}>
              Curated
            </span>
          </h1>

          <p className={watchPageStyles.headerDescription}>
            A handpicked selection — clean presentation, zero borders.
            Choose a filter to refine.
          </p>
        </div>

        <div className={watchPageStyles.filterContainer}>
          {FILTERS.map((f) => {
            const Icon = f.icon;

            const active = filter === f.key;

            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`${watchPageStyles.filterButtonBase} ${
                  active
                    ? watchPageStyles.filterButtonActive
                    : watchPageStyles.filterButtonInactive
                }`}
              >
                <Icon className={watchPageStyles.filterIcon} />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className={watchPageStyles.loadingText}>
          Loading watches…
        </div>
      ) : filtered.length === 0 ? (
        <div className={watchPageStyles.noWatchesText}>
          No watches found.
        </div>
      ) : (
        <div className={watchPageStyles.grid}>
          {filtered.map((w) => {
            const sid = String(
              w.id ?? w._id ?? w.sku ?? w.name
            );

            const qty = getQty(sid);

            return (
              <div key={sid} className={watchPageStyles.card}>
                <div className={watchPageStyles.imageContainer}>
                  <img
                    src={w.img}
                    alt={w.name}
                    className={watchPageStyles.image}
                    draggable={false}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />

                  <div
                    className={
                      watchPageStyles.cartControlsContainer
                    }
                  >
                    {qty > 0 ? (
                      <div
                        className={
                          watchPageStyles.cartQuantityControls
                        }
                      >
                        <button
                          aria-label={`decrease ${w.name}`}
                          onClick={() => {
                            if (qty > 1) decrement(sid);
                            else removeItem(sid);
                          }}
                          className={
                            watchPageStyles.quantityButton
                          }
                        >
                          <Minus
                            className={
                              watchPageStyles.quantityIcon
                            }
                          />
                        </button>

                        <div
                          className={
                            watchPageStyles.cartQuantity
                          }
                        >
                          {qty}
                        </div>

                        <button
                          aria-label={`increase ${w.name}`}
                          onClick={() => increment(sid)}
                          className={
                            watchPageStyles.quantityButton
                          }
                        >
                          <Plus
                            className={
                              watchPageStyles.quantityIcon
                            }
                          />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          addItem({
                            id: sid,
                            name: w.name,
                            price: w.price,
                            img: normalizeImageUrl(w.img),
                          })
                        }
                        className={
                          watchPageStyles.addToCartButton
                        }
                      >
                        <ShoppingCart
                          className={
                            watchPageStyles.addToCartIcon
                          }
                        />
                        Add
                      </button>
                    )}
                  </div>
                </div>

                <div className={watchPageStyles.productInfo}>
                  <h3 className={watchPageStyles.productName}>
                    {w.name}
                  </h3>

                  <p
                    className={
                      watchPageStyles.productDescription
                    }
                  >
                    {w.desc}
                  </p>

                  <div className={watchPageStyles.productPrice}>
                    ₹{w.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}