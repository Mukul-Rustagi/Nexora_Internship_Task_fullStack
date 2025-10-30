const User = require("../models/User");

/**
 * Seed mock users into the database
 * This creates sample users for testing purposes
 */
const seedMockUsers = async () => {
  try {
    // Check if users already exist
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log("✓ Mock users already exist in database");
      return;
    }

    // Create mock users
    const mockUsers = [
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "password123", // In production, this should be hashed
        avatar:
          "https://ui-avatars.com/api/?name=Alice+Johnson&background=6366f1&color=fff",
        wishlist: [1, 5, 10, 15],
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: "password123",
        avatar:
          "https://ui-avatars.com/api/?name=Bob+Smith&background=8b5cf6&color=fff",
        wishlist: [2, 8, 12],
      },
      {
        name: "Carol Davis",
        email: "carol@example.com",
        password: "password123",
        avatar:
          "https://ui-avatars.com/api/?name=Carol+Davis&background=ec4899&color=fff",
        wishlist: [3, 7, 20, 25],
      },
      {
        name: "David Wilson",
        email: "david@example.com",
        password: "password123",
        avatar:
          "https://ui-avatars.com/api/?name=David+Wilson&background=f59e0b&color=fff",
        wishlist: [],
      },
      {
        name: "Emma Brown",
        email: "emma@example.com",
        password: "password123",
        avatar:
          "https://ui-avatars.com/api/?name=Emma+Brown&background=10b981&color=fff",
        wishlist: [4, 11, 18, 22, 28],
      },
    ];

    await User.insertMany(mockUsers);
    console.log(`✓ Successfully seeded ${mockUsers.length} mock users`);
    console.log("\n📝 Mock User Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    mockUsers.forEach((user) => {
      console.log(`  Email: ${user.email}`);
      console.log(`  Password: ${user.password}`);
      console.log(`  Wishlist: ${user.wishlist.length} items`);
      console.log("  ────────────────────────────────────────");
    });
    console.log("\n");
  } catch (error) {
    console.error("❌ Error seeding mock users:", error.message);
  }
};

/**
 * Get all users (for admin purposes)
 * @returns {Promise<Array>} Array of users
 */
const getAllUsers = async () => {
  try {
    const users = await User.find().select("-password");
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

/**
 * Delete all users (for testing purposes)
 * @returns {Promise<Object>} Deletion result
 */
const deleteAllUsers = async () => {
  try {
    const result = await User.deleteMany({});
    return result;
  } catch (error) {
    throw new Error("Failed to delete users");
  }
};

module.exports = {
  seedMockUsers,
  getAllUsers,
  deleteAllUsers,
};

