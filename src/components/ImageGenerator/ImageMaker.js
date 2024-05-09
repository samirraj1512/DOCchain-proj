import React, { useState } from "react";
import "./ImageMaker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ImageMakerModal({ setImage, setOpenModal }) {
  const [formData, setFormData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log("form" + formData);

    var raw = JSON.stringify({
      key: "ALtsCF312qEbst7OitUhG7Kda6eLq7ndLMps87XeerdnSBhUaOCTUwb98n7R",
      prompt: formData, // take this from the user
      negative_prompt: null,
      width: "512",
      height: "512",
      samples: "1",
      num_inference_steps: "20",
      safety_checker: "yes",
      enhance_prompt: "yes",
      seed: null,
      guidance_scale: 7.5,
      multi_lingual: "no",
      panorama: "no",
      self_attention: "no",
      upscale: "no",
      embeddings_model: null,
      webhook: null,
      track_id: null,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://stablediffusionapi.com/api/v3/text2img", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("data" + data);
        console.log("data.output" + data.output);
        setImage(data.output);
        localStorage.setItem("image-url", data.output);
        setOpenModal(false);
        toast.success("Image Generated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Image Generation Failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });

    setFormData("");
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer2">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>GenAI profile</h1>
        </div>
        <form className="form-field">
          <label>
            Prompt <i>(Describe your Profile)</i>
            <input
              type="text"
              name="Value" // Match name attribute with formData key
              value={formData}
              onChange={(e) => {
                setFormData(e.target.value);
              }}
            />
          </label>
          <br />
        </form>
        <div className="footer">
          <button onClick={handleSubmit} id="submitBtn">
            Generate
          </button>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageMakerModal;
