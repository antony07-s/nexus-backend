// Reusable CRUD controller generator so Service, Project, Award and BlogPost
// don't need near-identical hand-written controllers.
export const makeCrudController = (Model) => ({
  getAll: async (req, res) => {
    try {
      const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
      const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 12));
      // Public collection endpoints deliberately do not accept arbitrary MongoDB
      // filters; exposing that input would permit expensive or unsafe queries.
      const filter = Model.modelName === "BlogPost" ? { published: true } : {};
      const [items, total] = await Promise.all([Model.find(filter).sort({
        order: 1,
        createdAt: -1,
      }).skip((page - 1) * limit).limit(limit).lean(), Model.countDocuments(filter)]);
      res.json({ success: true, count: items.length, total, page, pages: Math.ceil(total / limit), data: items });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const item = await Model.findOne({ slug: req.params.slug });
      if (!item) return res.status(404).json({ success: false, error: "Not found" });
      res.json({ success: true, data: item });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ success: false, error: "Not found" });
      res.json({ success: true, data: item });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ success: false, error: "Not found" });
      res.json({ success: true, data: {} });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
});
