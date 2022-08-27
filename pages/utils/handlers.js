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
    // const file = event.target.files;
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

module.exports = { handleInputs, handleImage };
