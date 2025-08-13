import mongoose from "mongoose";
import slugify from "slugify";

const listingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    location: { type: String, required: true },
    area: { type: String, required: true },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    garage: { type: Number, default: 0 },
    description: { type: String, required: true },
    amenities: { type: [String] },
    mapLocation: { type: String },
    images: [{ type: String }], // Store file paths instead of Buffer
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook to auto-generate slug
listingSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

export default mongoose.model("Listing", listingSchema);
