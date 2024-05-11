const EditPost = ({
  initialCaption,
  initialImageUrl,
  postId,
  onSubmit,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState(initialCaption);
  const [image, setImage] = useState(null);

  const S3_BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME;
  const S3_BUCKET_REGION = process.env.REACT_APP_S3_BUCKET_REGION;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      let updatedImageUrl = initialImageUrl; // Default to initial image URL
      if (image) {
        const fileName =
          "paf_sfa_" + uuidv4() + "." + image.name.split(".").pop();
        await uploadToS3(image, fileName);
        updatedImageUrl = `https://${S3_BUCKET_NAME}.s3.${S3_BUCKET_REGION}.amazonaws.com/${fileName}`;
      }

      // Dispatch the updatePost action with the postId and edited post data
      await dispatch(
        updatePost(postId, { caption, imageUrl: updatedImageUrl })
      );

      // Call the onSubmit callback to close the edit form
      onSubmit();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}
    >
      <TextField
        label="Caption"
        variant="outlined"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        style={{ marginBottom: "20px", width: "100%" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "20px" }}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        style={{ marginRight: "10px" }}
      >
        Save
      </Button>
      <Button onClick={onCancel} variant="outlined">
        Cancel
      </Button>
    </div>
  );
};

export default EditPost;
