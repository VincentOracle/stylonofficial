/* STYLON OFFICIAL - Seed Data (shared by storefront & admin) */
const STO_CATEGORIES = [
 {
  "name": "Fashion",
  "subcategories": [
   "Men's T-Shirts",
   "Polo Shirts",
   "Hoodies",
   "Cargo Trousers",
   "Women's Tops",
   "Dresses",
   "Sneakers",
   "Sandals"
  ]
 },
 {
  "name": "Perfumes & Fragrance",
  "subcategories": [
   "Men's Perfumes",
   "Women's Perfumes",
   "Unisex Perfumes",
   "Pocket Perfumes",
   "Body Mists",
   "Perfume Gift Sets",
   "Perfume Oils"
  ]
 },
 {
  "name": "Watches",
  "subcategories": [
   "Men's Watches",
   "Women's Watches",
   "Luxury-Style Watches",
   "Sports Watches",
   "Smart Watches",
   "Watch & Bracelet Sets",
   "Couple Watches"
  ]
 },
 {
  "name": "Jewellery",
  "subcategories": [
   "Men's Chains",
   "Women's Chains",
   "Bracelets",
   "Rings",
   "Earrings",
   "Anklets",
   "Jewellery Sets",
   "Stainless Steel Jewellery"
  ]
 },
 {
  "name": "Fashion Accessories",
  "subcategories": [
   "Sunglasses",
   "Wallets",
   "Belts",
   "Caps",
   "Handbags",
   "Crossbody Bags",
   "Key Holders"
  ]
 },
 {
  "name": "Phone & Tech Accessories",
  "subcategories": [
   "TWS Earbuds",
   "Bluetooth Speakers",
   "Power Banks",
   "Fast-Charging Cables",
   "Phone Chargers",
   "Phone Holders",
   "Smart Watches",
   "Phone Cases"
  ]
 }
];

const STO_PRODUCTS = [
 {
  "id": "STO-001",
  "name": "Premium Cotton Crew-Neck Tee",
  "slug": "mens_tshirt-1",
  "sku": "STO-FAS-001",
  "category": "Fashion",
  "subcategory": "Men's T-Shirts",
  "description": "Premium-quality piece designed for everyday style and lasting comfort.",
  "price": 12499,
  "originalPrice": 14998,
  "currency": "KES",
  "rating": 3.9,
  "reviewCount": 148,
  "views": 4312,
  "likes": 248,
  "stock": 8,
  "images": [
   "assets/img/products/mens_tshirt_2.jpg"
  ],
  "variants": {
   "sizes": [
    "S",
    "M",
    "L",
    "XL"
   ],
   "colors": [
    "Black",
    "White",
    "Gold"
   ]
  },
  "tags": [
   "Trending"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Men",
  "sold": 609
 },
 {
  "id": "STO-002",
  "name": "Classic Fit Polo Shirt",
  "slug": "polo_shirt-2",
  "sku": "STO-FAS-002",
  "category": "Fashion",
  "subcategory": "Polo Shirts",
  "description": "Premium-quality piece designed for everyday style and lasting comfort.",
  "price": 4499,
  "originalPrice": 5398,
  "currency": "KES",
  "rating": 3.9,
  "reviewCount": 119,
  "views": 4111,
  "likes": 537,
  "stock": 38,
  "images": [
   "assets/img/products/polo_shirt_3.jpg"
  ],
  "variants": {
   "sizes": [
    "S",
    "M",
    "L",
    "XL"
   ],
   "colors": [
    "Black",
    "White",
    "Gold"
   ]
  },
  "tags": [
   "Best Seller"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Men",
  "sold": 738
 },
 {
  "id": "STO-003",
  "name": "Urban Oversized Hoodie",
  "slug": "hoodie-3",
  "sku": "STO-FAS-003",
  "category": "Fashion",
  "subcategory": "Hoodies",
  "description": "Premium-quality piece designed for everyday style and lasting comfort.",
  "price": 12499,
  "originalPrice": 18748,
  "currency": "KES",
  "rating": 4.1,
  "reviewCount": 309,
  "views": 4857,
  "likes": 848,
  "stock": 55,
  "images": [
   "assets/img/products/hoodie_1.jpg"
  ],
  "variants": {
   "sizes": [
    "S",
    "M",
    "L",
    "XL"
   ],
   "colors": [
    "Black",
    "White",
    "Gold"
   ]
  },
  "tags": [
   "Best Seller"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Men",
  "sold": 719
 },
 {
  "id": "STO-004",
  "name": "Slim-Fit Cargo Trousers",
  "slug": "cargo_trouser-4",
  "sku": "STO-FAS-004",
  "category": "Fashion",
  "subcategory": "Cargo Trousers",
  "description": "Premium-quality piece designed for everyday style and lasting comfort.",
  "price": 4499,
  "originalPrice": 6298,
  "currency": "KES",
  "rating": 4.2,
  "reviewCount": 118,
  "views": 5814,
  "likes": 124,
  "stock": 5,
  "images": [
   "assets/img/products/cargo_trouser_2.jpg"
  ],
  "variants": {
   "sizes": [
    "S",
    "M",
    "L",
    "XL"
   ],
   "colors": [
    "Black",
    "White",
    "Gold"
   ]
  },
  "tags": [
   "Trending",
   "Best Seller"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": true,
  "status": "active",
  "gender": "Men",
  "sold": 357
 },
 {
  "id": "STO-005",
  "name": "Ribbed Knit Women's Top",
  "slug": "womens_top-5",
  "sku": "STO-FAS-005",
  "category": "Fashion",
  "subcategory": "Women's Tops",
  "description": "Premium-quality piece designed for everyday style and lasting comfort.",
  "price": 9999,
  "originalPrice": 13998,
  "currency": "KES",
  "rating": 4.8,
  "reviewCount": 381,
  "views": 7827,
  "likes": 569,
  "stock": 7,
  "images": [
   "assets/img/products/womens_top_3.jpg"
  ],
  "variants": {
   "sizes": [
    "S",
    "M",
    "L",
    "XL"
   ],
   "colors": [
    "Black",
    "White",
    "Gold"
   ]
  },
  "tags": [
   "Trending",
   "New"
  ],
  "isFeatured": true,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Women",
  "sold": 305
 },
 {
  "id": "STO-006",
  "name": "Elegant Summer Midi Dress",
  "slug": "dress-6",
  "sku": "STO-FAS-006",
  "category": "Fashion",
  "subcategory": "Dresses",
  "description": "Premium-quality piece designed for everyday style and lasting comfort.",
  "price": 12499,
  "originalPrice": 17498,
  "currency": "KES",
  "rating": 4.5,
  "reviewCount": 368,
  "views": 1439,
  "likes": 66,
  "stock": 42,
  "images": [
   "assets/img/products/dress_1.jpg"
  ],
  "variants": {
   "sizes": [
    "S",
    "M",
    "L",
    "XL"
   ],
   "colors": [
    "Black",
    "White",
    "Gold"
   ]
  },
  "tags": [
   "New"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Women",
  "sold": 86
 },
 {
  "id": "STO-007",
  "name": "Street Classic Sneakers",
  "slug": "sneakers-7",
  "sku": "STO-FAS-007",
  "category": "Fashion",
  "subcategory": "Sneakers",
  "description": "Premium-quality piece designed for everyday style and lasting comfort.",
  "price": 2499,
  "originalPrice": 2998,
  "currency": "KES",
  "rating": 4.3,
  "reviewCount": 240,
  "views": 6277,
  "likes": 186,
  "stock": 23,
  "images": [
   "assets/img/products/sneakers_2.jpg"
  ],
  "variants": {
   "sizes": [
    "S",
    "M",
    "L",
    "XL"
   ],
   "colors": [
    "Black",
    "White",
    "Gold"
   ]
  },
  "tags": [
   "Best Seller",
   "New"
  ],
  "isFeatured": false,
  "isNewArrival": true,
  "isBestSeller": false,
  "status": "active",
  "gender": "Women",
  "sold": 278
 },
 {
  "id": "STO-008",
  "name": "Comfort Strap Sandals",
  "slug": "sandals-8",
  "sku": "STO-FAS-008",
  "category": "Fashion",
  "subcategory": "Sandals",
  "description": "Premium-quality piece designed for everyday style and lasting comfort.",
  "price": 12499,
  "originalPrice": 14998,
  "currency": "KES",
  "rating": 4.6,
  "reviewCount": 95,
  "views": 9051,
  "likes": 766,
  "stock": 15,
  "images": [
   "assets/img/products/sandals_3.jpg"
  ],
  "variants": {
   "sizes": [
    "S",
    "M",
    "L",
    "XL"
   ],
   "colors": [
    "Black",
    "White",
    "Gold"
   ]
  },
  "tags": [
   "Hot"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": true,
  "status": "active",
  "gender": "Women",
  "sold": 393
 },
 {
  "id": "STO-009",
  "name": "Bold Noir Eau de Parfum",
  "slug": "perfume_mens-9",
  "sku": "STO-PER-009",
  "category": "Perfumes & Fragrance",
  "subcategory": "Men's Perfumes",
  "description": "A long-lasting, sophisticated scent crafted for the modern lifestyle.",
  "price": 2999,
  "originalPrice": 3898,
  "currency": "KES",
  "rating": 4.7,
  "reviewCount": 401,
  "views": 1216,
  "likes": 254,
  "stock": 52,
  "images": [
   "assets/img/products/perfume_mens_1.jpg"
  ],
  "variants": {},
  "tags": [
   "New"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 415
 },
 {
  "id": "STO-010",
  "name": "Fleur de Lune Eau de Parfum",
  "slug": "perfume_womens-10",
  "sku": "STO-PER-010",
  "category": "Perfumes & Fragrance",
  "subcategory": "Women's Perfumes",
  "description": "A long-lasting, sophisticated scent crafted for the modern lifestyle.",
  "price": 2999,
  "originalPrice": 3598,
  "currency": "KES",
  "rating": 4.1,
  "reviewCount": 298,
  "views": 5455,
  "likes": 237,
  "stock": 41,
  "images": [
   "assets/img/products/perfume_womens_2.jpg"
  ],
  "variants": {},
  "tags": [
   "Hot",
   "New"
  ],
  "isFeatured": true,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 474
 },
 {
  "id": "STO-011",
  "name": "Amber Oud Unisex Perfume",
  "slug": "perfume_unisex-11",
  "sku": "STO-PER-011",
  "category": "Perfumes & Fragrance",
  "subcategory": "Unisex Perfumes",
  "description": "A long-lasting, sophisticated scent crafted for the modern lifestyle.",
  "price": 1799,
  "originalPrice": 2518,
  "currency": "KES",
  "rating": 4.1,
  "reviewCount": 389,
  "views": 9497,
  "likes": 571,
  "stock": 16,
  "images": [
   "assets/img/products/perfume_unisex_3.jpg"
  ],
  "variants": {},
  "tags": [
   "Hot",
   "Best Seller"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 229
 },
 {
  "id": "STO-012",
  "name": "Mini Traveller Pocket Perfume",
  "slug": "perfume_pocket-12",
  "sku": "STO-PER-012",
  "category": "Perfumes & Fragrance",
  "subcategory": "Pocket Perfumes",
  "description": "A long-lasting, sophisticated scent crafted for the modern lifestyle.",
  "price": 1799,
  "originalPrice": 2698,
  "currency": "KES",
  "rating": 4.0,
  "reviewCount": 32,
  "views": 2096,
  "likes": 176,
  "stock": 40,
  "images": [
   "assets/img/products/perfume_pocket_1.jpg"
  ],
  "variants": {},
  "tags": [
   "Hot"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": true,
  "status": "active",
  "gender": "Unisex",
  "sold": 615
 },
 {
  "id": "STO-013",
  "name": "Rose Garden Body Mist",
  "slug": "body_mist-13",
  "sku": "STO-PER-013",
  "category": "Perfumes & Fragrance",
  "subcategory": "Body Mists",
  "description": "A long-lasting, sophisticated scent crafted for the modern lifestyle.",
  "price": 1299,
  "originalPrice": 1948,
  "currency": "KES",
  "rating": 4.3,
  "reviewCount": 247,
  "views": 8969,
  "likes": 277,
  "stock": 35,
  "images": [
   "assets/img/products/body_mist_2.jpg"
  ],
  "variants": {},
  "tags": [
   "Trending"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 703
 },
 {
  "id": "STO-014",
  "name": "Royal Collection Perfume Gift Set",
  "slug": "perfume_giftset-14",
  "sku": "STO-PER-014",
  "category": "Perfumes & Fragrance",
  "subcategory": "Perfume Gift Sets",
  "description": "A long-lasting, sophisticated scent crafted for the modern lifestyle.",
  "price": 7999,
  "originalPrice": 11198,
  "currency": "KES",
  "rating": 4.7,
  "reviewCount": 182,
  "views": 2127,
  "likes": 320,
  "stock": 27,
  "images": [
   "assets/img/products/perfume_giftset_3.jpg"
  ],
  "variants": {},
  "tags": [
   "Hot"
  ],
  "isFeatured": false,
  "isNewArrival": true,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 8
 },
 {
  "id": "STO-015",
  "name": "Pure Oud Attar Oil",
  "slug": "perfume_oil-15",
  "sku": "STO-PER-015",
  "category": "Perfumes & Fragrance",
  "subcategory": "Perfume Oils",
  "description": "A long-lasting, sophisticated scent crafted for the modern lifestyle.",
  "price": 2999,
  "originalPrice": 3898,
  "currency": "KES",
  "rating": 4.5,
  "reviewCount": 62,
  "views": 5189,
  "likes": 881,
  "stock": 40,
  "images": [
   "assets/img/products/perfume_oil_1.jpg"
  ],
  "variants": {},
  "tags": [
   "Best Seller"
  ],
  "isFeatured": true,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 387
 },
 {
  "id": "STO-016",
  "name": "Executive Steel Men's Watch",
  "slug": "watch_mens-16",
  "sku": "STO-WAT-016",
  "category": "Watches",
  "subcategory": "Men's Watches",
  "description": "Precision-crafted timepiece that blends elegance with everyday function.",
  "price": 1799,
  "originalPrice": 2158,
  "currency": "KES",
  "rating": 4.6,
  "reviewCount": 258,
  "views": 619,
  "likes": 134,
  "stock": 59,
  "images": [
   "assets/img/products/watch_mens_2.jpg"
  ],
  "variants": {},
  "tags": [
   "New",
   "Trending"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": true,
  "status": "active",
  "gender": "Unisex",
  "sold": 64
 },
 {
  "id": "STO-017",
  "name": "Rose Gold Women's Watch",
  "slug": "watch_womens-17",
  "sku": "STO-WAT-017",
  "category": "Watches",
  "subcategory": "Women's Watches",
  "description": "Precision-crafted timepiece that blends elegance with everyday function.",
  "price": 2499,
  "originalPrice": 2998,
  "currency": "KES",
  "rating": 4.0,
  "reviewCount": 256,
  "views": 1433,
  "likes": 798,
  "stock": 34,
  "images": [
   "assets/img/products/watch_womens_3.jpg"
  ],
  "variants": {},
  "tags": [
   "Best Seller"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 680
 },
 {
  "id": "STO-018",
  "name": "Chronograph Luxury-Style Watch",
  "slug": "watch_luxury-18",
  "sku": "STO-WAT-018",
  "category": "Watches",
  "subcategory": "Luxury-Style Watches",
  "description": "Precision-crafted timepiece that blends elegance with everyday function.",
  "price": 5999,
  "originalPrice": 7798,
  "currency": "KES",
  "rating": 4.2,
  "reviewCount": 318,
  "views": 7232,
  "likes": 236,
  "stock": 59,
  "images": [
   "assets/img/products/watch_luxury_1.jpg"
  ],
  "variants": {},
  "tags": [
   "New"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 413
 },
 {
  "id": "STO-019",
  "name": "Tough Sports Digital Watch",
  "slug": "watch_sports-19",
  "sku": "STO-WAT-019",
  "category": "Watches",
  "subcategory": "Sports Watches",
  "description": "Precision-crafted timepiece that blends elegance with everyday function.",
  "price": 12499,
  "originalPrice": 17498,
  "currency": "KES",
  "rating": 4.4,
  "reviewCount": 272,
  "views": 7697,
  "likes": 143,
  "stock": 15,
  "images": [
   "assets/img/products/watch_sports_2.jpg"
  ],
  "variants": {},
  "tags": [
   "Trending"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 351
 },
 {
  "id": "STO-020",
  "name": "FitPro Smart Band",
  "slug": "smartwatch_tech-20",
  "sku": "STO-WAT-020",
  "category": "Watches",
  "subcategory": "Smart Watches",
  "description": "Precision-crafted timepiece that blends elegance with everyday function.",
  "price": 899,
  "originalPrice": 1168,
  "currency": "KES",
  "rating": 4.5,
  "reviewCount": 11,
  "views": 1463,
  "likes": 744,
  "stock": 40,
  "images": [
   "assets/img/products/smartwatch_tech_3.jpg"
  ],
  "variants": {},
  "tags": [
   "Best Seller"
  ],
  "isFeatured": true,
  "isNewArrival": false,
  "isBestSeller": true,
  "status": "active",
  "gender": "Unisex",
  "sold": 74
 },
 {
  "id": "STO-021",
  "name": "Watch & Bracelet Gift Set",
  "slug": "watch_bracelet_set-21",
  "sku": "STO-WAT-021",
  "category": "Watches",
  "subcategory": "Watch & Bracelet Sets",
  "description": "Precision-crafted timepiece that blends elegance with everyday function.",
  "price": 899,
  "originalPrice": 1258,
  "currency": "KES",
  "rating": 4.0,
  "reviewCount": 129,
  "views": 4862,
  "likes": 705,
  "stock": 31,
  "images": [
   "assets/img/products/watch_bracelet_set_1.jpg"
  ],
  "variants": {},
  "tags": [
   "Best Seller"
  ],
  "isFeatured": false,
  "isNewArrival": true,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 745
 },
 {
  "id": "STO-022",
  "name": "Matching Couple Watch Pair",
  "slug": "watch_couple-22",
  "sku": "STO-WAT-022",
  "category": "Watches",
  "subcategory": "Couple Watches",
  "description": "Precision-crafted timepiece that blends elegance with everyday function.",
  "price": 9999,
  "originalPrice": 14998,
  "currency": "KES",
  "rating": 4.2,
  "reviewCount": 250,
  "views": 6969,
  "likes": 214,
  "stock": 6,
  "images": [
   "assets/img/products/watch_couple_2.jpg"
  ],
  "variants": {},
  "tags": [
   "Hot"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 367
 },
 {
  "id": "STO-023",
  "name": "Cuban Link Men's Chain",
  "slug": "chain_mens-23",
  "sku": "STO-JEW-023",
  "category": "Jewellery",
  "subcategory": "Men's Chains",
  "description": "Finely finished accessory that adds a touch of luxury to any look.",
  "price": 4499,
  "originalPrice": 6748,
  "currency": "KES",
  "rating": 4.4,
  "reviewCount": 381,
  "views": 1187,
  "likes": 709,
  "stock": 41,
  "images": [
   "assets/img/products/chain_mens_3.jpg"
  ],
  "variants": {},
  "tags": [
   "Trending"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 417
 },
 {
  "id": "STO-024",
  "name": "Delicate Gold Women's Chain",
  "slug": "chain_womens-24",
  "sku": "STO-JEW-024",
  "category": "Jewellery",
  "subcategory": "Women's Chains",
  "description": "Finely finished accessory that adds a touch of luxury to any look.",
  "price": 3499,
  "originalPrice": 4198,
  "currency": "KES",
  "rating": 4.2,
  "reviewCount": 105,
  "views": 9086,
  "likes": 479,
  "stock": 8,
  "images": [
   "assets/img/products/chain_womens_1.jpg"
  ],
  "variants": {},
  "tags": [
   "Best Seller",
   "Hot"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": true,
  "status": "active",
  "gender": "Unisex",
  "sold": 478
 },
 {
  "id": "STO-025",
  "name": "Minimalist Cuff Bracelet",
  "slug": "bracelet-25",
  "sku": "STO-JEW-025",
  "category": "Jewellery",
  "subcategory": "Bracelets",
  "description": "Finely finished accessory that adds a touch of luxury to any look.",
  "price": 2499,
  "originalPrice": 2998,
  "currency": "KES",
  "rating": 4.4,
  "reviewCount": 289,
  "views": 1904,
  "likes": 71,
  "stock": 41,
  "images": [
   "assets/img/products/bracelet_2.jpg"
  ],
  "variants": {},
  "tags": [
   "Trending"
  ],
  "isFeatured": true,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 776
 },
 {
  "id": "STO-026",
  "name": "Classic Signet Ring",
  "slug": "ring-26",
  "sku": "STO-JEW-026",
  "category": "Jewellery",
  "subcategory": "Rings",
  "description": "Finely finished accessory that adds a touch of luxury to any look.",
  "price": 2499,
  "originalPrice": 3248,
  "currency": "KES",
  "rating": 4.3,
  "reviewCount": 254,
  "views": 3802,
  "likes": 430,
  "stock": 57,
  "images": [
   "assets/img/products/ring_3.jpg"
  ],
  "variants": {},
  "tags": [
   "Best Seller"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 393
 },
 {
  "id": "STO-027",
  "name": "Sparkle Stud Earrings",
  "slug": "earrings-27",
  "sku": "STO-JEW-027",
  "category": "Jewellery",
  "subcategory": "Earrings",
  "description": "Finely finished accessory that adds a touch of luxury to any look.",
  "price": 899,
  "originalPrice": 1348,
  "currency": "KES",
  "rating": 4.2,
  "reviewCount": 409,
  "views": 7754,
  "likes": 312,
  "stock": 27,
  "images": [
   "assets/img/products/earrings_1.jpg"
  ],
  "variants": {},
  "tags": [
   "Best Seller",
   "Trending"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 308
 },
 {
  "id": "STO-028",
  "name": "Beaded Charm Anklet",
  "slug": "anklet-28",
  "sku": "STO-JEW-028",
  "category": "Jewellery",
  "subcategory": "Anklets",
  "description": "Finely finished accessory that adds a touch of luxury to any look.",
  "price": 2499,
  "originalPrice": 2998,
  "currency": "KES",
  "rating": 4.5,
  "reviewCount": 285,
  "views": 1298,
  "likes": 785,
  "stock": 20,
  "images": [
   "assets/img/products/anklet_2.jpg"
  ],
  "variants": {},
  "tags": [
   "Trending"
  ],
  "isFeatured": false,
  "isNewArrival": true,
  "isBestSeller": true,
  "status": "active",
  "gender": "Unisex",
  "sold": 603
 },
 {
  "id": "STO-029",
  "name": "Bridal Jewellery Set",
  "slug": "jewellery_set-29",
  "sku": "STO-JEW-029",
  "category": "Jewellery",
  "subcategory": "Jewellery Sets",
  "description": "Finely finished accessory that adds a touch of luxury to any look.",
  "price": 5999,
  "originalPrice": 7798,
  "currency": "KES",
  "rating": 4.0,
  "reviewCount": 268,
  "views": 1612,
  "likes": 891,
  "stock": 11,
  "images": [
   "assets/img/products/jewellery_set_3.jpg"
  ],
  "variants": {},
  "tags": [
   "Trending"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 696
 },
 {
  "id": "STO-030",
  "name": "Stainless Steel Chain Bracelet",
  "slug": "jewellery_steel-30",
  "sku": "STO-JEW-030",
  "category": "Jewellery",
  "subcategory": "Stainless Steel Jewellery",
  "description": "Finely finished accessory that adds a touch of luxury to any look.",
  "price": 2499,
  "originalPrice": 3748,
  "currency": "KES",
  "rating": 4.0,
  "reviewCount": 299,
  "views": 4333,
  "likes": 612,
  "stock": 38,
  "images": [
   "assets/img/products/jewellery_steel_1.jpg"
  ],
  "variants": {},
  "tags": [
   "Trending"
  ],
  "isFeatured": true,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 434
 },
 {
  "id": "STO-031",
  "name": "Polarized Aviator Sunglasses",
  "slug": "sunglasses-31",
  "sku": "STO-FAS-031",
  "category": "Fashion Accessories",
  "subcategory": "Sunglasses",
  "description": "Stylish everyday essential with premium materials and attention to detail.",
  "price": 12499,
  "originalPrice": 17498,
  "currency": "KES",
  "rating": 4.9,
  "reviewCount": 112,
  "views": 5447,
  "likes": 264,
  "stock": 16,
  "images": [
   "assets/img/products/sunglasses_2.jpg"
  ],
  "variants": {},
  "tags": [
   "Best Seller",
   "New"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 665
 },
 {
  "id": "STO-032",
  "name": "Genuine Leather Bifold Wallet",
  "slug": "wallet-32",
  "sku": "STO-FAS-032",
  "category": "Fashion Accessories",
  "subcategory": "Wallets",
  "description": "Stylish everyday essential with premium materials and attention to detail.",
  "price": 2999,
  "originalPrice": 4498,
  "currency": "KES",
  "rating": 4.2,
  "reviewCount": 392,
  "views": 1488,
  "likes": 29,
  "stock": 29,
  "images": [
   "assets/img/products/wallet_3.jpg"
  ],
  "variants": {},
  "tags": [
   "Trending"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": true,
  "status": "active",
  "gender": "Unisex",
  "sold": 555
 },
 {
  "id": "STO-033",
  "name": "Reversible Leather Belt",
  "slug": "belt-33",
  "sku": "STO-FAS-033",
  "category": "Fashion Accessories",
  "subcategory": "Belts",
  "description": "Stylish everyday essential with premium materials and attention to detail.",
  "price": 2499,
  "originalPrice": 3498,
  "currency": "KES",
  "rating": 4.0,
  "reviewCount": 186,
  "views": 1427,
  "likes": 270,
  "stock": 23,
  "images": [
   "assets/img/products/belt_1.jpg"
  ],
  "variants": {},
  "tags": [
   "Best Seller",
   "Hot"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 561
 },
 {
  "id": "STO-034",
  "name": "Embroidered Snapback Cap",
  "slug": "cap-34",
  "sku": "STO-FAS-034",
  "category": "Fashion Accessories",
  "subcategory": "Caps",
  "description": "Stylish everyday essential with premium materials and attention to detail.",
  "price": 2999,
  "originalPrice": 3598,
  "currency": "KES",
  "rating": 4.6,
  "reviewCount": 291,
  "views": 5205,
  "likes": 699,
  "stock": 6,
  "images": [
   "assets/img/products/cap_2.jpg"
  ],
  "variants": {},
  "tags": [
   "New"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 123
 },
 {
  "id": "STO-035",
  "name": "Quilted Women's Handbag",
  "slug": "handbag-35",
  "sku": "STO-FAS-035",
  "category": "Fashion Accessories",
  "subcategory": "Handbags",
  "description": "Stylish everyday essential with premium materials and attention to detail.",
  "price": 1299,
  "originalPrice": 1688,
  "currency": "KES",
  "rating": 4.2,
  "reviewCount": 317,
  "views": 3750,
  "likes": 754,
  "stock": 21,
  "images": [
   "assets/img/products/handbag_3.jpg"
  ],
  "variants": {},
  "tags": [
   "New"
  ],
  "isFeatured": true,
  "isNewArrival": true,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 522
 },
 {
  "id": "STO-036",
  "name": "Sleek Crossbody Bag",
  "slug": "crossbody_bag-36",
  "sku": "STO-FAS-036",
  "category": "Fashion Accessories",
  "subcategory": "Crossbody Bags",
  "description": "Stylish everyday essential with premium materials and attention to detail.",
  "price": 5999,
  "originalPrice": 8398,
  "currency": "KES",
  "rating": 4.9,
  "reviewCount": 34,
  "views": 1812,
  "likes": 669,
  "stock": 27,
  "images": [
   "assets/img/products/crossbody_bag_1.jpg"
  ],
  "variants": {},
  "tags": [
   "Trending",
   "Hot"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": true,
  "status": "active",
  "gender": "Unisex",
  "sold": 346
 },
 {
  "id": "STO-037",
  "name": "Leather Key Holder Wallet",
  "slug": "keyholder-37",
  "sku": "STO-FAS-037",
  "category": "Fashion Accessories",
  "subcategory": "Key Holders",
  "description": "Stylish everyday essential with premium materials and attention to detail.",
  "price": 1799,
  "originalPrice": 2518,
  "currency": "KES",
  "rating": 4.1,
  "reviewCount": 234,
  "views": 9338,
  "likes": 742,
  "stock": 27,
  "images": [
   "assets/img/products/keyholder_2.jpg"
  ],
  "variants": {},
  "tags": [
   "Trending"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 82
 },
 {
  "id": "STO-038",
  "name": "True Wireless Pro Earbuds",
  "slug": "tws_earbuds-38",
  "sku": "STO-PHO-038",
  "category": "Phone & Tech Accessories",
  "subcategory": "TWS Earbuds",
  "description": "High-performance gadget engineered for reliability and modern convenience.",
  "price": 1799,
  "originalPrice": 2158,
  "currency": "KES",
  "rating": 4.8,
  "reviewCount": 306,
  "views": 9352,
  "likes": 171,
  "stock": 27,
  "images": [
   "assets/img/products/tws_earbuds_3.jpg"
  ],
  "variants": {},
  "tags": [
   "Trending"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 320
 },
 {
  "id": "STO-039",
  "name": "Boom Portable Bluetooth Speaker",
  "slug": "bluetooth_speaker-39",
  "sku": "STO-PHO-039",
  "category": "Phone & Tech Accessories",
  "subcategory": "Bluetooth Speakers",
  "description": "High-performance gadget engineered for reliability and modern convenience.",
  "price": 3499,
  "originalPrice": 4198,
  "currency": "KES",
  "rating": 4.9,
  "reviewCount": 115,
  "views": 4388,
  "likes": 702,
  "stock": 6,
  "images": [
   "assets/img/products/bluetooth_speaker_1.jpg"
  ],
  "variants": {},
  "tags": [
   "Hot",
   "New"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 772
 },
 {
  "id": "STO-040",
  "name": "20000mAh Fast Power Bank",
  "slug": "power_bank-40",
  "sku": "STO-PHO-040",
  "category": "Phone & Tech Accessories",
  "subcategory": "Power Banks",
  "description": "High-performance gadget engineered for reliability and modern convenience.",
  "price": 1799,
  "originalPrice": 2338,
  "currency": "KES",
  "rating": 4.9,
  "reviewCount": 417,
  "views": 3200,
  "likes": 442,
  "stock": 1,
  "images": [
   "assets/img/products/power_bank_2.jpg"
  ],
  "variants": {},
  "tags": [
   "New"
  ],
  "isFeatured": true,
  "isNewArrival": false,
  "isBestSeller": true,
  "status": "active",
  "gender": "Unisex",
  "sold": 426
 },
 {
  "id": "STO-041",
  "name": "100W USB-C Fast Cable",
  "slug": "fast_cable-41",
  "sku": "STO-PHO-041",
  "category": "Phone & Tech Accessories",
  "subcategory": "Fast-Charging Cables",
  "description": "High-performance gadget engineered for reliability and modern convenience.",
  "price": 12499,
  "originalPrice": 16248,
  "currency": "KES",
  "rating": 4.2,
  "reviewCount": 411,
  "views": 2071,
  "likes": 411,
  "stock": 55,
  "images": [
   "assets/img/products/fast_cable_3.jpg"
  ],
  "variants": {},
  "tags": [
   "Hot"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 232
 },
 {
  "id": "STO-042",
  "name": "65W GaN Fast Charger",
  "slug": "phone_charger-42",
  "sku": "STO-PHO-042",
  "category": "Phone & Tech Accessories",
  "subcategory": "Phone Chargers",
  "description": "High-performance gadget engineered for reliability and modern convenience.",
  "price": 2499,
  "originalPrice": 3748,
  "currency": "KES",
  "rating": 4.3,
  "reviewCount": 415,
  "views": 4028,
  "likes": 248,
  "stock": 1,
  "images": [
   "assets/img/products/phone_charger_1.jpg"
  ],
  "variants": {},
  "tags": [
   "Hot"
  ],
  "isFeatured": false,
  "isNewArrival": true,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 341
 },
 {
  "id": "STO-043",
  "name": "Magnetic Car Phone Holder",
  "slug": "phone_holder-43",
  "sku": "STO-PHO-043",
  "category": "Phone & Tech Accessories",
  "subcategory": "Phone Holders",
  "description": "High-performance gadget engineered for reliability and modern convenience.",
  "price": 2999,
  "originalPrice": 3598,
  "currency": "KES",
  "rating": 5.0,
  "reviewCount": 150,
  "views": 6053,
  "likes": 676,
  "stock": 32,
  "images": [
   "assets/img/products/phone_holder_2.jpg"
  ],
  "variants": {},
  "tags": [
   "New",
   "Trending"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 123
 },
 {
  "id": "STO-044",
  "name": "FitPro Smart Band",
  "slug": "smartwatch_tech-44",
  "sku": "STO-PHO-044",
  "category": "Phone & Tech Accessories",
  "subcategory": "Smart Watches",
  "description": "High-performance gadget engineered for reliability and modern convenience.",
  "price": 2999,
  "originalPrice": 3898,
  "currency": "KES",
  "rating": 4.5,
  "reviewCount": 143,
  "views": 926,
  "likes": 131,
  "stock": 38,
  "images": [
   "assets/img/products/smartwatch_tech_3.jpg"
  ],
  "variants": {},
  "tags": [
   "New",
   "Hot"
  ],
  "isFeatured": false,
  "isNewArrival": false,
  "isBestSeller": true,
  "status": "active",
  "gender": "Unisex",
  "sold": 326
 },
 {
  "id": "STO-045",
  "name": "Armor Shockproof Phone Case",
  "slug": "phone_case-45",
  "sku": "STO-PHO-045",
  "category": "Phone & Tech Accessories",
  "subcategory": "Phone Cases",
  "description": "High-performance gadget engineered for reliability and modern convenience.",
  "price": 4499,
  "originalPrice": 5398,
  "currency": "KES",
  "rating": 4.3,
  "reviewCount": 303,
  "views": 3414,
  "likes": 280,
  "stock": 2,
  "images": [
   "assets/img/products/phone_case_1.jpg"
  ],
  "variants": {},
  "tags": [
   "Trending",
   "New"
  ],
  "isFeatured": true,
  "isNewArrival": false,
  "isBestSeller": false,
  "status": "active",
  "gender": "Unisex",
  "sold": 556
 }
];

const STO_COUPONS = [
  {code:"STYLON10", type:"percent", value:10, minOrder:1000, maxDiscount:2000, active:true, usageLimit:1000, used:42, startDate:"2025-01-01", expiryDate:"2026-12-31"},
  {code:"WELCOME15", type:"percent", value:15, minOrder:2000, maxDiscount:3000, active:true, usageLimit:500, used:18, startDate:"2025-01-01", expiryDate:"2026-12-31"},
  {code:"STO20", type:"percent", value:20, minOrder:5000, maxDiscount:5000, active:true, usageLimit:200, used:7, startDate:"2025-01-01", expiryDate:"2026-12-31"},
  {code:"FLAT200", type:"fixed", value:200, minOrder:1500, maxDiscount:200, active:true, usageLimit:100, used:3, startDate:"2025-01-01", expiryDate:"2026-12-31"}
];

const STO_HERO_SLIDES = [
  {badge:"STYLON OFFICIAL", title:"Shop Smart. Live Stylish.", text:"Fashion • Beauty • Tech • Lifestyle & More", cta:"Shop Now →", img:"assets/img/banners/hero_fashion.jpg", theme:"dark"},
  {badge:"NEW COLLECTION", title:"Elevate Your Everyday.", text:"Premium fashion essentials curated for you.", cta:"Explore Fashion", img:"assets/img/banners/hero_fashion2.jpg", theme:"dark"},
  {badge:"FRAGRANCES", title:"Discover Your Signature Scent.", text:"Perfumes, body mists & gift sets from KSh 899.", cta:"Shop Fragrances", img:"assets/img/banners/hero_perfume.jpg", theme:"dark"},
  {badge:"LUXURY", title:"Timeless Style. Everyday Luxury.", text:"Watches & jewellery that make a statement.", cta:"Shop Watches", img:"assets/img/banners/hero_watch.jpg", theme:"dark"}
];

const STO_SETTINGS = {
  storeName:"STYLON OFFICIAL", tagline:"Shop Smart. Live Stylish.",
  phone:"+254 743166763", whatsapp:"+254743166763", email:"stylonofficial@co.ke",
  address:"Moi Avenue, 3rd Floor, Nairobi, Kenya",
  social:{facebook:"https://www.facebook.com/stylonofficial_ke", tiktok:"https://www.tiktok.com/@stylonofficial_ke", instagram:"https://www.instagram.com/stylonofficial_ke", telegram:"https://t.me/stylonofficial_ke", x:"https://x.com/stylonofficial_ke"},
  shippingFee:150, freeShippingThreshold:5000,
  openingHours:"Mon - Sat: 9:00 AM - 8:00 PM | Sun: 11:00 AM - 6:00 PM"
};

const STO_TESTIMONIALS = [
  {name:"Kevin M.", text:"Quality is top-tier and delivery within Nairobi was super fast. My go-to store now!", rating:5, role:"Verified Buyer"},
  {name:"Achieng O.", text:"The perfumes smell amazing and last all day. Packaging felt very premium.", rating:5, role:"Verified Buyer"},
  {name:"Brian K.", text:"Ordered a smart watch and TWS earbuds. Great prices, genuine products.", rating:4, role:"Verified Buyer"}
];
