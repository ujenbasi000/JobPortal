/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { UPDATE_PROJECT } from "../../pages/gql";
import {
  handleImage,
  handleInputs,
  handleTagChange,
} from "../../pages/utils/handlers";
import { useMutation } from "@apollo/client";
import { getCookies } from "cookies-next";
import { useRouter } from "next/router";

const EditProject = ({ details }) => {
  const router = useRouter();

  const [data, setData] = useState(details);
  const [cover_preview, setCoverPreview] = useState("");
  const [pictures_preview, setPicturesPreview] = useState([]);
  const [updateProjectMutation] = useMutation(UPDATE_PROJECT);

  const editProjectSubmit = async (e) => {
    e.preventDefault();
    const { __typename, ...others } = data;
    const { data: response } = await updateProjectMutation({
      variables: {
        input: { ...others, images: [...others.images] },
      },
      context: {
        headers: {
          authorization: `Bearer ${getCookies("token").token}`,
        },
      },
    });
    if (response?.updateProject?.success) {
      toast.success("Project updated successfully");
      router.push("/dashboard/projects");
    }
  };

  const removeTag = (index) => {
    setData({
      ...data,
      technologies: data.technologies.filter((_, idx) => index !== idx),
    });
  };

  const removeImage = (index) => {
    console.log(data, index);
    setData((prev) => ({
      ...data,
      pictures: [...prev.pictures].filter((_, idx) => index !== idx),
    }));
    setPicturesPreview(pictures_preview.filter((_, idx) => idx !== index));
  };

  return (
    <section className="min-h-screen w-full">
      <div className="py-6 bg-whiteColor">
        <div className="container mx-auto px-32 py-10">
          <h1 className="text-center text-2xl font-semibold">
            Editing{" "}
            <span className="px-2 py-1 rounded-md bg-white border border-border">
              {details.name || "..."}
            </span>{" "}
            Project
          </h1>
        </div>
      </div>
      <div className="container mx-auto py-16  px-32">
        <form onSubmit={editProjectSubmit} className="w-full">
          <div className="mb-8">
            <label
              htmlFor="name"
              className="text-2xl font-semibold text-black mb-1 block"
            >
              Project Name
            </label>
            <p className="text-[#747474] text-md font-semibold mb-3">
              WHAT ARE YOU CALLING IT?
            </p>
            <input
              name="name"
              onChange={(e) => handleInputs(e, data, setData)}
              value={data.name}
              type="text"
              className="secondary-input w-full"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="name"
              className="text-2xl font-semibold text-black mb-1 block"
            >
              Short Description
            </label>
            <p className="text-[#747474] text-md font-semibold mb-3">
              WRITE A SHORT, SHARP AND ON POINT DESCRIPTION OF YOUR PROJECT
            </p>
            <textarea
              name="tagline"
              onChange={(e) => handleInputs(e, data, setData)}
              value={data.tagline}
              className="secondary-input w-full"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="name"
              className="text-2xl font-semibold text-black mb-1 block"
            >
              The problem it solves
            </label>
            <p className="text-[#747474] text-md font-semibold mb-3">
              DESCRIBE WHAT CAN PEOPLE USE IT FOR, OR HOW IT MAKES EXISTING
              TASKS EASIER/SAFER E.T.C (MARKDOWN SUPPORTED)
            </p>
            <textarea
              name="problem"
              onChange={(e) => handleInputs(e, data, setData)}
              value={data.problem}
              className="secondary-input w-full"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="name"
              className="text-2xl font-semibold text-black mb-1 block"
            >
              Challenges You ran into
            </label>
            <p className="text-[#747474] text-md font-semibold mb-3">
              TELL US ABOUT ANY SPECIFIC BUG OR HURDLE YOU RAN INTO WHILE
              BUILDING THIS PROJECT. HOW DID YOU GET OVER IT? (MARKDOWN
              SUPPORTED)
            </p>
            <textarea
              name="challenges"
              onChange={(e) => handleInputs(e, data, setData)}
              value={data.challenges}
              className="secondary-input w-full"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="name"
              className="text-2xl font-semibold text-black mb-1 block"
            >
              Technologies used
            </label>
            <p className="text-[#747474] text-md font-semibold mb-3">
              WRITE A COMMA SEPARATED LIST OF TECHNOLOGIES YOU USED IN BUILDING
              THE PROJECT.
            </p>
            <div className="flex gap-3 secondary-input w-full">
              <div className="flex flex-wrap items-center gap-2 w-fit">
                {data?.technologies?.map((tech, index) => {
                  return (
                    <button
                      key={tech}
                      onClick={() => removeTag(index)}
                      className="btn-secondary hover:bg-blue text-sm w-fit"
                    >
                      {tech}
                    </button>
                  );
                })}
                <input
                  autoComplete="off"
                  type="text"
                  name="technologies"
                  onKeyDown={(e) => handleTagChange(e, data, setData)}
                  className="outline-none bg-transparent w-fit min-w-[250px]"
                />
              </div>
            </div>
          </div>
          <div className="mb-8">
            <label
              htmlFor="name"
              className="text-2xl font-semibold text-black mb-1 block"
            >
              Cover Image
            </label>
            <p className="text-[#747474] text-md font-semibold mb-3">
              UPLOAD A COVER IMAGE TO SHOWCASE A GLIMPSE OF YOUR PROJECT TO THE
              WORLD (SIZE: MAX 1MB, RECOMMENDED DIMENSIONS: 1200X630).
            </p>
            <input
              type="file"
              name="cover_image"
              onChange={(e) =>
                handleImage(e, data, setData, setCoverPreview, false)
              }
              hidden
              id="cover_image"
              accept="image/*"
            />
            {cover_preview ? (
              <ImagePreview
                // key={Date.now() + Math.random()}
                url={cover_preview}
              />
            ) : (
              <label
                htmlFor="cover_image"
                className="hover:border-blue cursor-pointer border border-transparent flex items-center justify-center w-32 h-32 bg-gray-200 rounded-md"
              >
                <i className="uil uil-plus text-3xl text-white"></i>
              </label>
            )}
          </div>
          <div className="mb-8">
            <label
              htmlFor="images"
              className="text-2xl font-semibold text-black mb-1 block"
            >
              Pictures
            </label>
            <p className="text-[#747474] text-md font-semibold mb-3">
              UPLOAD A MAXIMUM OF 5 PICTURES (SIZE: MAX 1MB EACH) SHOWCASING
              YOUR PROJECT.
            </p>
            <input
              type="file"
              name="images"
              multiple
              hidden
              id="images"
              accept="image/*"
              onChange={(e) => {
                if ([...e.target.files].length > 5) {
                  toast.error(
                    `Please upload upto 5 images. ${
                      [...e.target.files].length
                    } images detected.`
                  );
                  return false;
                }
                handleImage(e, data, setData, setPicturesPreview, true);
              }}
            />
            <div className="flex gap-4">
              {pictures_preview.length > 0
                ? pictures_preview.map((preview, index) => (
                    <ImagePreview
                      key={index}
                      removeImage={removeImage}
                      index={index}
                      htmlFor={"pictures"}
                      url={preview}
                    />
                  ))
                : Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <label
                        key={index}
                        htmlFor="pictures"
                        className="hover:border-blue cursor-pointer border border-transparent flex items-center justify-center w-32 h-32 bg-gray-200 rounded-md"
                      >
                        <i className="uil uil-plus text-3xl text-white"></i>
                      </label>
                    ))}
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button type="button" className="btn-primary w-fit text-base">
              Finish Later
            </button>
            <button type="submit" className="btn-secondary w-fit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProject;

const ImagePreview = ({ url, htmlFor = "cover_image", index, removeImage }) => {
  return (
    <div className="relative">
      <div
        onClick={() => removeImage(index)}
        className="absolute -top-2 -right-2 px-1 cursor-pointer rounded-full bg-whiteColor border border-border"
      >
        <i className="uil uil-times"></i>
      </div>
      <label
        htmlFor={htmlFor}
        className="hover:border-blue border border-transparent flex items-center justify-center w-32 h-32 bg-gray-200 rounded-md"
      >
        <img
          src={url}
          alt=""
          className="rounded-md w-full h-full object-cover"
        />
      </label>
    </div>
  );
};
