import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true }
  },
  { _id: false }
);

const featureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }
  },
  { _id: false }
);

const statSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: "" },
    description: { type: String, required: true },
    icon: { type: String, required: true }
  },
  { _id: false }
);

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    alt: { type: String, required: true }
  },
  { _id: false }
);

const reasonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }
  },
  { _id: false }
);

const aboutPageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    hero: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      badge: { type: String, required: true },
      backgroundImage: { type: String, required: true },
      highlights: [{ type: String, required: true }]
    },
    about: {
      eyebrow: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      imageAlt: { type: String, required: true },
      caption: { type: String, required: true },
      highlights: [highlightSchema]
    },
    features: {
      eyebrow: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      items: [featureSchema]
    },
    stats: {
      eyebrow: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      items: [statSchema]
    },
    gallery: {
      eyebrow: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      items: [gallerySchema]
    },
    whyVisit: {
      eyebrow: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      items: [reasonSchema]
    }
  },
  { timestamps: true }
);

export default mongoose.model("AboutPage", aboutPageSchema);
