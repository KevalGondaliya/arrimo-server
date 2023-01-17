const { events } = require("../models/");
module.exports = {
  createEvent: async (req, res) => {
    try {
      req.body.userId = req.user.data.id;
      await events
        .create(req.body)
        .then(() =>
          res.status(200).json({ status: 200, message: "Event created..." })
        );
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  getEvents: async (req, res) => {
    try {
      await events
        .findAll()
        .then((data) => res.status(200).json({ status: 200, data: data }));
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  getLoginUserEvents: async (req, res) => {
    try {
      await events
        .findAll({ where: { userId: req.user.data.id } })
        .then((data) => res.status(200).json({ status: 200, data: data }));
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  editEvent: async (req, res) => {
    try {
      req.body.userId = req.user.data.id;
      await events
        .update(req.body, { where: { id: req.params.id } })
        .then(() =>
          res
            .status(200)
            .json({ status: 200, message: "Event updated successfully..." })
        );
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  deleteEvent: async (req, res) => {
    try {
      await events
        .destroy({ where: { id: req.params.id } })
        .then(() =>
          res
            .status(200)
            .json({ status: 200, message: "Event deleted successfully..." })
        );
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};
