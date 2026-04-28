import R1 from "../../assets/R1.png";
import R2 from "../../assets/R2.png";
import R3 from "../../assets/R3.png";
import R4 from "../../assets/R4.png";
import R5 from "../../assets/R5.png";
import O1 from "../../assets/O1.png";
import O2 from "../../assets/O2.png";
import O3 from "../../assets/O3.png";
import O4 from "../../assets/O4.png";
import O5 from "../../assets/O5.png";
import P1 from "../../assets/P1.png";
import P2 from "../../assets/P2.png";
import P4 from "../../assets/P4.png";
import P5 from "../../assets/P5.png";
import P7 from "../../assets/P7.png";
import AP1 from "../../assets/AP1.png";
import AP2 from "../../assets/AP2.png";
import AP3 from "../../assets/AP3.png";
import AP4 from "../../assets/AP4.png";
import AP6 from "../../assets/AP6.png";
import TH1 from "../../assets/TH1.png";
import TH2 from "../../assets/TH2.png";
import TH3 from "../../assets/TH3.png";
import TH4 from "../../assets/TH4.png";
import TH5 from "../../assets/TH5.png";
import B1 from "../../assets/B1.png";
import B2 from "../../assets/B2.png";
import B3 from "../../assets/B3.png";
import B4 from "../../assets/B4.png";
import B5 from "../../assets/B5.png";
import C1 from "../../assets/C1.png";
import C2 from "../../assets/C2.png";
import C3 from "../../assets/C3.png";
import C4 from "../../assets/C4.png";
import C5 from "../../assets/C5.png";
import C8 from "../../assets/C8.png";

const brandWatchData = {
  cartier: [
    {
      _id: "cartier-1",
      id: "cartier-1",
      name: "Cartier Santos de Cartier Large",
      description: "A square-cased luxury watch with iconic Cartier style and brushed steel finish.",
      price: 7500,
      image: C1,
    },
    {
      _id: "cartier-2",
      id: "cartier-2",
      name: "Cartier Tank Louis Cartier",
      description: "A timeless rectangular dress watch with elegant Roman numerals and leather strap.",
      price: 6200,
      image: C2,
    },
    {
      _id: "cartier-3",
      id: "cartier-3",
      name: "Cartier Ballon Bleu 42mm",
      description: "A rounded luxury watch with smooth case lines and blue cabochon crown.",
      price: 8200,
      image: C3,
    },
    {
      _id: "cartier-4",
      id: "cartier-4",
      name: "Cartier Pasha de Cartier",
      description: "A bold Cartier sports-luxury watch with strong lines and signature crown guard.",
      price: 9000,
      image: C4,
    },
    {
      _id: "cartier-5",
      id: "cartier-5",
      name: "Cartier Panthère de Cartier",
      description: "A fashion-forward bracelet watch with iconic square case and polished finish.",
      price: 14000,
      image: C8,
    },
  ],

  rolex: [
    {
      _id: "rolex-1",
      id: "rolex-1",
      name: "Rolex Submariner Date",
      description: "The legendary diver with a Cerachrom bezel and waterproof Oyster case.",
      price: 9500,
      image: R1,
    },
    {
      _id: "rolex-2",
      id: "rolex-2",
      name: "Rolex Cosmograph Daytona",
      description: "A racing chronograph built for speed and precision with polished finishes.",
      price: 13000,
      image: R2,
    },
    {
      _id: "rolex-3",
      id: "rolex-3",
      name: "Rolex GMT-Master II Pepsi",
      description: "A travel-ready dual time watch with the iconic red and blue bezel.",
      price: 11500,
      image: R4,
    },
    {
      _id: "rolex-4",
      id: "rolex-4",
      name: "Rolex Datejust 36",
      description: "A polished dress watch with classic Oyster bracelet and timeless silhouette.",
      price: 7200,
      image: R3,
    },
    {
      _id: "rolex-5",
      id: "rolex-5",
      name: "Rolex Yacht-Master 40",
      description: "A nautical luxury sports watch with a luxury bezel and refined finish.",
      price: 12000,
      image: R5,
    },
  ],

  omega: [
    {
      _id: "omega-1",
      id: "omega-1",
      name: "Omega Seamaster Diver 300M",
      description: "A professional diver with ceramic bezel and signature wave dial.",
      price: 5200,
      image: O1,
    },
    {
      _id: "omega-2",
      id: "omega-2",
      name: "Omega Speedmaster Moonwatch",
      description: "The legendary Moonwatch chronograph with classic black dial heritage.",
      price: 6800,
      image: O2,
    },
    {
      _id: "omega-3",
      id: "omega-3",
      name: "Omega Planet Ocean 600M",
      description: "A bold dive watch engineered for deep water and precision timing.",
      price: 7500,
      image: O3,
    },
    {
      _id: "omega-4",
      id: "omega-4",
      name: "Omega Aqua Terra",
      description: "A versatile sport-luxury watch with clean lines and fine finishing.",
      price: 5000,
      image: O4,
    },
    {
      _id: "omega-5",
      id: "omega-5",
      name: "Omega De Ville Prestige",
      description: "An elegant dress watch with refined case and polished dial details.",
      price: 4300,
      image: O5,
    },
  ],

  "patek-philippe": [
    {
      _id: "patek-philippe-1",
      id: "patek-philippe-1",
      name: "Patek Philippe Nautilus 5711",
      description: "An iconic luxury sports watch with integrated bracelet and bold dial.",
      price: 120000,
      image: P1,
    },
    {
      _id: "patek-philippe-2",
      id: "patek-philippe-2",
      name: "Patek Philippe Aquanaut 5167",
      description: "A modern sports watch with textured dial and durable rubber strap.",
      price: 30000,
      image: P2,
    },
    {
      _id: "patek-philippe-3",
      id: "patek-philippe-3",
      name: "Patek Philippe Calatrava 5227",
      description: "A refined dress watch with polished case and understated elegance.",
      price: 35000,
      image: P4,
    },
    {
      _id: "patek-philippe-4",
      id: "patek-philippe-4",
      name: "Patek Philippe Grand Complication",
      description: "A high-horology masterpiece built for collectors and serious connoisseurs.",
      price: 180000,
      image: P5,
    },
    {
      _id: "patek-philippe-5",
      id: "patek-philippe-5",
      name: "Patek Philippe Golden Ellipse",
      description: "A distinctive elliptical case with polished luxury design.",
      price: 25000,
      image: P7,
    },
  ],

  "audemars-piguet": [
    {
      _id: "audemars-piguet-1",
      id: "audemars-piguet-1",
      name: "Audemars Piguet Royal Oak Jumbo",
      description: "The most iconic luxury sports watch with signature octagonal bezel.",
      price: 85000,
      image: AP1,
    },
    {
      _id: "audemars-piguet-2",
      id: "audemars-piguet-2",
      name: "Audemars Piguet Royal Oak Offshore",
      description: "A robust chronograph with bold presence and layered finish.",
      price: 28000,
      image: AP2,
    },
    {
      _id: "audemars-piguet-3",
      id: "audemars-piguet-3",
      name: "Audemars Piguet Royal Oak Selfwinding",
      description: "A polished sports watch with elegant geometry and refined detail.",
      price: 30000,
      image: AP3,
    },
    {
      _id: "audemars-piguet-4",
      id: "audemars-piguet-4",
      name: "Audemars Piguet Code 11.59 Chronograph",
      description: "A modern haute horlogerie chronograph with dramatic styling.",
      price: 40000,
      image: AP4,
    },
    {
      _id: "audemars-piguet-5",
      id: "audemars-piguet-5",
      name: "Audemars Piguet Millenary",
      description: "A curved luxury watch with distinctive oval case and open design.",
      price: 36000,
      image: AP6,
    },
  ],

  "tag-heuer": [
    {
      _id: "tag-heuer-1",
      id: "tag-heuer-1",
      name: "Tag Heuer Carrera Chronograph",
      description: "A racing-inspired chronograph with clean dial and sharp finish.",
      price: 4200,
      image: TH1,
    },
    {
      _id: "tag-heuer-2",
      id: "tag-heuer-2",
      name: "Tag Heuer Monaco Calibre 11",
      description: "A square-profile motorsport icon with bold style.",
      price: 6500,
      image: TH2,
    },
    {
      _id: "tag-heuer-3",
      id: "tag-heuer-3",
      name: "Tag Heuer Aquaracer Professional 300",
      description: "A rugged diver with modern finishing and strong legibility.",
      price: 3200,
      image: TH3,
    },
    {
      _id: "tag-heuer-4",
      id: "tag-heuer-4",
      name: "Tag Heuer Autavia Isograph",
      description: "A heritage pilot's watch with contemporary performance.",
      price: 3800,
      image: TH4,
    },
    {
      _id: "tag-heuer-5",
      id: "tag-heuer-5",
      name: "Tag Heuer Formula 1 Quartz",
      description: "A sporty, affordable motorsport-inspired luxury watch.",
      price: 1200,
      image: TH5,
    },
  ],

  breitling: [
    {
      _id: "breitling-1",
      id: "breitling-1",
      name: "Breitling Navitimer B01 Chronograph",
      description: "A pilot's chronograph with signature slide rule bezel.",
      price: 8500,
      image: B1,
    },
    {
      _id: "breitling-2",
      id: "breitling-2",
      name: "Breitling Superocean Heritage",
      description: "A classic diver with vintage-inspired luxury design.",
      price: 4400,
      image: B2,
    },
    {
      _id: "breitling-3",
      id: "breitling-3",
      name: "Breitling Avenger Automatic",
      description: "A rugged tool watch built for precision and durability.",
      price: 3700,
      image: B3,
    },
    {
      _id: "breitling-4",
      id: "breitling-4",
      name: "Breitling Chronomat B01 42",
      description: "A versatile pilot's chronograph with polished details.",
      price: 7800,
      image: B4,
    },
    {
      _id: "breitling-5",
      id: "breitling-5",
      name: "Breitling Emergency",
      description: "A purpose-built instrument watch with emergency transmitter.",
      price: 16000,
      image: B5,
    },
  ],
};

export default brandWatchData;
