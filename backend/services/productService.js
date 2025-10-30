const Product = require("../models/Product");

/**
 * Get all products from database
 * @returns {Promise<Array>} Array of products
 */
const getAllProducts = async () => {
  const products = await Product.find().select(
    "-_id -__v -createdAt -updatedAt"
  );
  return products;
};

/**
 * Get single product by ID
 * @param {Number} productId - Product ID
 * @returns {Promise<Object>} Product object
 */
const getProductById = async (productId) => {
  const product = await Product.findOne({ id: productId });
  return product;
};

/**
 * Seed initial products to database
 * @returns {Promise<void>}
 */
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const products = [
        {
          id: 1,
          name: "Premium Wireless Headphones",
          price: 299.99,
          description:
            "High-quality wireless headphones with active noise cancellation and 30-hour battery life.",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
          category: "Electronics",
          rating: { rate: 4.8, count: 342 },
        },
        {
          id: 2,
          name: "Smart Fitness Watch",
          price: 249.99,
          description:
            "Track your fitness goals with this sleek smartwatch featuring heart rate monitoring and GPS.",
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
          category: "Wearables",
          rating: { rate: 4.6, count: 289 },
        },
        {
          id: 3,
          name: "Designer Backpack",
          price: 89.99,
          description:
            "Stylish and functional backpack perfect for work, travel, or everyday use.",
          image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
          category: "Fashion",
          rating: { rate: 4.7, count: 156 },
        },
        {
          id: 4,
          name: "Mechanical Gaming Keyboard",
          price: 159.99,
          description:
            "RGB mechanical keyboard with customizable keys and ultra-responsive switches.",
          image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
          category: "Electronics",
          rating: { rate: 4.9, count: 423 },
        },
        {
          id: 5,
          name: "Professional Camera Lens",
          price: 799.99,
          description:
            "High-performance 50mm f/1.8 lens for stunning portrait and low-light photography.",
          image:
            "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&q=80",
          category: "Photography",
          rating: { rate: 4.9, count: 201 },
        },
        {
          id: 6,
          name: "Ergonomic Office Chair",
          price: 399.99,
          description:
            "Premium ergonomic chair with lumbar support and adjustable armrests for all-day comfort.",
          image:
            "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80",
          category: "Furniture",
          rating: { rate: 4.5, count: 178 },
        },
        {
          id: 7,
          name: "Portable Bluetooth Speaker",
          price: 129.99,
          description:
            "Waterproof speaker with 360° sound and 24-hour battery life for any adventure.",
          image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
          category: "Electronics",
          rating: { rate: 4.7, count: 512 },
        },
        {
          id: 8,
          name: "Premium Coffee Maker",
          price: 199.99,
          description:
            "Programmable coffee maker with built-in grinder and thermal carafe.",
          image:
            "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80",
          category: "Home & Kitchen",
          rating: { rate: 4.6, count: 267 },
        },
        {
          id: 9,
          name: "Minimalist Desk Lamp",
          price: 79.99,
          description:
            "LED desk lamp with adjustable brightness and color temperature for optimal lighting.",
          image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
          category: "Home & Office",
          rating: { rate: 4.4, count: 145 },
        },
        {
          id: 10,
          name: "Yoga Mat Pro",
          price: 59.99,
          description:
            "Extra-thick, non-slip yoga mat with carrying strap for comfortable workouts.",
          image:
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80",
          category: "Fitness",
          rating: { rate: 4.8, count: 389 },
        },
        {
          id: 11,
          name: "Wireless Gaming Mouse",
          price: 79.99,
          description:
            "Ultra-responsive wireless gaming mouse with 16000 DPI and customizable RGB lighting.",
          image:
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
          category: "Electronics",
          rating: { rate: 4.7, count: 298 },
        },
        {
          id: 12,
          name: "Leather Messenger Bag",
          price: 149.99,
          description:
            "Handcrafted genuine leather messenger bag with laptop compartment and adjustable strap.",
          image:
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
          category: "Fashion",
          rating: { rate: 4.8, count: 187 },
        },
        {
          id: 13,
          name: "4K Action Camera",
          price: 349.99,
          description:
            "Waterproof 4K action camera with image stabilization and voice control.",
          image:
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
          category: "Photography",
          rating: { rate: 4.6, count: 412 },
        },
        {
          id: 14,
          name: "Smart LED Bulbs (4-Pack)",
          price: 49.99,
          description:
            "WiFi-enabled smart LED bulbs with 16 million colors and voice assistant compatibility.",
          image:
            "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&q=80",
          category: "Smart Home",
          rating: { rate: 4.5, count: 523 },
        },
        {
          id: 15,
          name: "Stainless Steel Water Bottle",
          price: 34.99,
          description:
            "Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours.",
          image:
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
          category: "Fitness",
          rating: { rate: 4.9, count: 678 },
        },
        {
          id: 16,
          name: "Wireless Charging Pad",
          price: 29.99,
          description:
            "Fast wireless charging pad compatible with all Qi-enabled devices with LED indicator.",
          image:
            "https://images.unsplash.com/photo-1591290619762-37ddf8fbce2a?w=500&q=80",
          category: "Electronics",
          rating: { rate: 4.4, count: 234 },
        },
        {
          id: 17,
          name: "Running Shoes Pro",
          price: 129.99,
          description:
            "Lightweight running shoes with responsive cushioning and breathable mesh upper.",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
          category: "Fashion",
          rating: { rate: 4.7, count: 567 },
        },
        {
          id: 18,
          name: "Laptop Stand Adjustable",
          price: 59.99,
          description:
            "Ergonomic aluminum laptop stand with adjustable height and angle for better posture.",
          image:
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
          category: "Home & Office",
          rating: { rate: 4.6, count: 312 },
        },
        {
          id: 19,
          name: "Smart Thermostat",
          price: 199.99,
          description:
            "Energy-saving smart thermostat with WiFi connectivity and learning capabilities.",
          image:
            "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
          category: "Smart Home",
          rating: { rate: 4.8, count: 445 },
        },
        {
          id: 20,
          name: "Air Purifier HEPA",
          price: 179.99,
          description:
            "HEPA air purifier removes 99.97% of airborne particles with smart air quality monitoring.",
          image:
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
          category: "Home & Kitchen",
          rating: { rate: 4.7, count: 389 },
        },
        {
          id: 21,
          name: "Noise-Canceling Earbuds",
          price: 199.99,
          description:
            "True wireless earbuds with active noise cancellation and 8-hour battery life.",
          image:
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
          category: "Electronics",
          rating: { rate: 4.8, count: 789 },
        },
        {
          id: 22,
          name: "Digital Drawing Tablet",
          price: 299.99,
          description:
            "Professional drawing tablet with 8192 pressure levels and tilt recognition.",
          image:
            "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&q=80",
          category: "Electronics",
          rating: { rate: 4.9, count: 234 },
        },
        {
          id: 23,
          name: "Resistance Bands Set",
          price: 24.99,
          description:
            "Complete resistance bands set with 5 bands, door anchor, and carrying bag.",
          image:
            "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&q=80",
          category: "Fitness",
          rating: { rate: 4.6, count: 456 },
        },
        {
          id: 24,
          name: "Electric Kettle",
          price: 49.99,
          description:
            "Stainless steel electric kettle with temperature control and keep-warm function.",
          image:
            "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80",
          category: "Home & Kitchen",
          rating: { rate: 4.5, count: 298 },
        },
        {
          id: 25,
          name: "Sunglasses Polarized",
          price: 89.99,
          description:
            "Polarized sunglasses with UV400 protection and lightweight titanium frame.",
          image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",
          category: "Fashion",
          rating: { rate: 4.7, count: 412 },
        },
        {
          id: 26,
          name: "Smart Doorbell Camera",
          price: 149.99,
          description:
            "Video doorbell with 1080p HD camera, two-way audio, and motion detection.",
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
          category: "Smart Home",
          rating: { rate: 4.6, count: 567 },
        },
        {
          id: 27,
          name: "Professional Tripod",
          price: 129.99,
          description:
            "Aluminum tripod with fluid head for smooth panning and tilting movements.",
          image:
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80",
          category: "Photography",
          rating: { rate: 4.8, count: 234 },
        },
        {
          id: 28,
          name: "Adjustable Dumbbells",
          price: 249.99,
          description:
            "Space-saving adjustable dumbbells from 5 to 52.5 lbs with easy-turn dial system.",
          image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80",
          category: "Fitness",
          rating: { rate: 4.9, count: 678 },
        },
        {
          id: 29,
          name: "Monitor Stand with Drawers",
          price: 79.99,
          description:
            "Wooden monitor stand with storage drawers for office organization.",
          image:
            "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&q=80",
          category: "Home & Office",
          rating: { rate: 4.5, count: 189 },
        },
        {
          id: 30,
          name: "Portable SSD 1TB",
          price: 149.99,
          description:
            "Ultra-fast portable SSD with USB-C 3.2 Gen 2 and 1050MB/s read speeds.",
          image:
            "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&q=80",
          category: "Electronics",
          rating: { rate: 4.8, count: 445 },
        },
      ];

      await Product.insertMany(products);
      console.log("✅ Products seeded successfully");
    }
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  seedProducts,
};

