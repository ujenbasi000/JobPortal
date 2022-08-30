const handleInputs = (event, state, setState) => {
  setState({ ...state, [event.target.name]: event.target.value });
};

const handleImage = (
  event,
  state,
  setState,
  setPreivewImage,
  multiple = false
) => {
  if (multiple) {
    console.log("Multiple files detected");
    const files = event.target.files;

    [...files].map((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setPreivewImage((prev) => [...prev, reader.result]);
        setState({ ...state, [event.target.name]: files });
      };
      if (typeof file === "object") {
        reader.readAsDataURL(file);
      }
    });
  } else {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setPreivewImage(reader.result);
      setState({ ...state, [event.target.name]: file });
    };

    if (typeof file === "object") {
      reader.readAsDataURL(file);
    }
  }
};

const reduceText = (string) => {
  if (!string) return "";
  if (string.length > 75) {
    return string.substring(0, 75) + "...";
  } else {
    return string;
  }
};

const handleTagChange = (e, data, setData) => {
  if (e.key === "Tab") {
    e.preventDefault();

    const value = e.target.value.trim().split("");
    const result =
      value[0].toUpperCase() +
      value.toString().replaceAll(",", "").substring(1);
    setData({
      ...data,
      [e.target.name]: [...data[e.target.name], result.toString()],
    });
    e.target.value = "";
  }
};

module.exports = { handleInputs, handleImage, reduceText, handleTagChange };
