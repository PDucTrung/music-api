module.exports = app => {
    const musics = require("../controllers/music.controller");
  
    var router = require("express").Router();
  
    // Create a new Music
    router.post("/", musics.create);
  
    // Retrieve all Musics
    router.get("/", musics.findAll);
  
    // Retrieve all published Musics
    router.get("/published", musics.findAllPublished);
  
    // Retrieve a single Music with id
    router.get("/:id", musics.findOne);
  
    // Update a Music with id
    router.put("/:id", musics.update);
  
    // Delete a Music with id
    router.delete("/:id", musics.delete);
  
    // Create a new Music
    router.delete("/", musics.deleteAll);
  
    app.use("/musics", router);
  };