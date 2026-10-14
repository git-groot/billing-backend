// src/Utils/idPlugin.js
// Self-contained: generateId.js thani file thevai illa.
// _id (ObjectId) appadiye irukkum. "id" column la USER0001 / PRO0001 / SHOP0001 save aagum.
import counters from "../Models/counters.js";

const generateId = async (prefix, pad = 4) => {
  const counter = await counters.findByIdAndUpdate(
    prefix,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return `${prefix}${String(counter.seq).padStart(pad, "0")}`;
};

export default function idPlugin(schema, prefix) {
  schema.pre("validate", async function () {
    if (this.isNew && !this.id) this.id = await generateId(prefix);
  });
}