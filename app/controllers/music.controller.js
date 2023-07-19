const db = require("../models");
const Music = db.music;

// Create and Save a new Music
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Music
  const music = new Music({
    name: req.body.name,
    singer: req.body.singer,
    url: req.body.url,
    img: req.body.img,
    published: req.body.published ? req.body.published : false,
  });

  // Save Music in the database
  music
    .save(music)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Music.",
      });
    });
};

// Retrieve all Musics from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Music.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving musics.",
      });
    });
};

// Find a single Music with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Music.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Music with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Music with id=" + id });
    });
};

// Update a Music by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Music.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Music with id=${id}. Maybe Music was not found!`,
        });
      } else res.send({ message: "Music was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Music with id=" + id,
      });
    });
};

// Delete a Music with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Music.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Music with id=${id}. Maybe Music was not found!`,
        });
      } else {
        res.send({
          message: "Music was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Music with id=" + id,
      });
    });
};

// Delete all Musics from the database.
exports.deleteAll = (req, res) => {
  Music.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Musics were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all musics.",
      });
    });
};

// Find all published Music
exports.findAllPublished = (req, res) => {
  Music.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving musics.",
      });
    });
};
