module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      singer: String,
      url: String,
      img: String,
      published: Boolean,
    },
    { timestamps: true }
  );

  // Trả về object, bỏ đi các trường __v và _id thay thế bằng trường id.
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Music = mongoose.model("music", schema);
  return Music;
};
