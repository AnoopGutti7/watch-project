# Fix Connection Issues Plan

## Issues
- Vite WebSocket HMR failing on `ws://localhost:5173`
- Backend API connection refused on port 4000
- Hardcoded `localhost:4000` across 7+ frontend files

## Steps
- [x] Step 1: Fix `frontend/vite.config.js` — add proxy + HMR config
- [x] Step 2: Create `frontend/src/utils/api.js` — centralized axios instance
- [x] Step 3: Update `frontend/src/components/BrandPage/BrandPage.jsx`
- [x] Step 4: Update `frontend/src/components/WatchPage/WatchPage.jsx`
- [x] Step 5: Update `frontend/src/components/CartPage/CartPage.jsx`
- [x] Step 6: Update `frontend/src/components/LoginPage/LoginPage.jsx`
- [x] Step 7: Update `frontend/src/components/SignUpPage/SignUpPage.jsx`
- [x] Step 8: Update `frontend/src/components/OrdersPage/OrdersPage.jsx`
- [x] Step 9: Update `frontend/src/CartContext.jsx`
- [x] Step 10: Update `backend/index.js` — improve startup resilience
- [x] Step 11: Create `frontend/.env.example`

