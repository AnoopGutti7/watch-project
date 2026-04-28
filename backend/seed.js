import mongoose from "mongoose";
import dotenv from "dotenv";
import Watch from "./models/watchModel.js";

dotenv.config();

const MONGO_URL =
  process.env.MONGO_URL || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/watch";

const watches = [
  {
    name: "Rolex Submariner",
    description: "Iconic luxury diver watch with deep-sea precision.",
    price: 9500,
    category: "men",
    brandName: "rolex",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600",
  },
  {
    name: "Rolex Daytona",
    description: "Legendary chronograph built for racing performance.",
    price: 12800,
    category: "men",
    brandName: "rolex",
    image:
      "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=600",
  },
  {
    name: "Rolex GMT-Master II",
    description: "Travel watch with dual time zones and iconic bezel.",
    price: 11200,
    category: "men",
    brandName: "rolex",
    image:
      "https://images.unsplash.com/photo-1524682821946-139790375c0b?w=600",
  },
  {
    name: "Omega Seamaster",
    description: "Diving watch",
    price: 11000,
    category: "men",
    brandName: "omega",
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600",
  },
  {
    name: "Omega Speedmaster",
    description: "Moon watch",
    price: 13000,
    category: "men",
    brandName: "omega",
    image:
      "https://images.unsplash.com/photo-1511389026070-a14ae610a1be?w=600",
  },
  {
    name: "Patek Philippe Nautilus",
    description: "Luxury sports watch with distinctive rounded octagon.",
    price: 25000,
    category: "men",
    brandName: "patek philippe",
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600",
  },
  {
    name: "Patek Philippe Aquanaut",
    description: "Sporty high-end watch with modern tropical strap.",
    price: 22000,
    category: "men",
    brandName: "patek philippe",
    image:
      "https://images.unsplash.com/photo-1580910051077-a6562f7c9e40?w=600",
  },
  {
    name: "Patek Philippe Calatrava",
    description: "Classic dress watch with elegant simplicity.",
    price: 24000,
    category: "men",
    brandName: "patek philippe",
    image:
      "https://images.unsplash.com/photo-1529253355930-66b2bdab1f30?w=600",
  },
  {
    name: "Audemars Piguet Royal Oak",
    description: "Iconic luxury watch with octagonal bezel.",
    price: 30000,
    category: "men",
    brandName: "audemars piguet",
    image:
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=600",
  },
  {
    name: "Audemars Piguet Offshore",
    description: "Robust luxury sports watch built for action.",
    price: 28000,
    category: "men",
    brandName: "audemars piguet",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
  {
    name: "Audemars Piguet Code 11.59",
    description: "Modern haute horlogerie watch with refined case.",
    price: 32000,
    category: "men",
    brandName: "audemars piguet",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e8b?w=600",
  },
  {
    name: "Tag Heuer Carrera",
    description: "Racing chronograph with sporty heritage.",
    price: 9000,
    category: "men",
    brandName: "tag heuer",
    image:
      "https://images.unsplash.com/photo-1519741497638-3a39faf9f6ff?w=600",
  },
  {
    name: "Tag Heuer Monaco",
    description: "Square chronograph inspired by motorsport.",
    price: 10000,
    category: "men",
    brandName: "tag heuer",
    image:
      "https://images.unsplash.com/photo-1524590970074-0393597d3641?w=600",
  },
  {
    name: "Tag Heuer Aquaracer",
    description: "Durable dive watch with bold sporty style.",
    price: 8600,
    category: "men",
    brandName: "tag heuer",
    image:
      "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=600",
  },
  {
    name: "Cartier Santos",
    description: "Elegant square luxury watch with timeless design.",
    price: 14000,
    category: "men",
    brandName: "cartier",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600",
  },
  {
    name: "Cartier Tank",
    description: "Classic rectangular dress watch by Cartier.",
    price: 13000,
    category: "men",
    brandName: "cartier",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600",
  },
  {
    name: "Breitling Navitimer",
    description: "Pilot chronograph with aviation heritage.",
    price: 11500,
    category: "men",
    brandName: "breitling",
    image:
      "https://images.unsplash.com/photo-1517130038641-43f01fd64d0d?w=600",
  },
  {
    name: "IWC Pilot's Watch",
    description: "Aviation-inspired watch with bold legibility.",
    price: 9900,
    category: "men",
    brandName: "iwc",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  },
  {
    name: "Hublot Big Bang",
    description: "Modern luxury watch with bold case design.",
    price: 19000,
    category: "men",
    brandName: "hublot",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=600",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB for seeding.");

    await Watch.deleteMany({});
    console.log("Deleted existing watches.");

    await Watch.insertMany(watches);
    console.log(`Inserted ${watches.length} watch records.`);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seed();
