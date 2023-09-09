import {
  faFile,
  faFileImage,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Navbar from "../landingPage/navBar";
import Footer from "../landingPage/footer";
import { toast } from "react-toastify";
import adminAxios from "../../../Axios/adminAxios";
import { Login } from "@mui/icons-material";
import { useEffect } from "react";
import userAxios from "../../../Axios/userAxios";

const handleCertificationFileChange = (e) => {
  const files = Array.from(e.target.files);
  // Handle selected files
};

export default function JoinAsTrainer() {
  const [about, setAbout] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);
  const [experienceMonths, setExperienceMonths] = useState(0);
  const [experienceDays, setExperienceDays] = useState(0);
  const [experienceDetails, setExperienceDetails] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [paymentAmounts, setPaymentAmounts] = useState({
    "One Month": "",
    "6 Months": "",
    "1 Year": "",
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const durationNames = Object.keys(paymentAmounts);

  const handlePaymentAmountChange = (duration, amount) => {
    setPaymentAmounts({
      ...paymentAmounts,
      [duration]: amount,
    });
  };

  const handleAddPayment = () => {
    console.log(paymentAmounts);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageUpload = async (event, imageType) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const base64 = await convertBase64(file);
      setLoading(true);
      const response = await adminAxios.post("uploadImage", { image: base64 });
      setImageUrl(response.data);

      if (imageType === "profilePhoto") {
        setProfilePhoto(response.data);
      } else if (imageType === "coverPhoto") {
        setCoverPhoto(response.data);
      } else if (imageType === "certification") {
        setCertifications([...certifications, response.data]);
      }

      toast.success(`Image uploaded successfully ${certifications}`);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(coverPhoto);
  }, [coverPhoto]);

  const handleProfilePhotoUploader = (event) => {
    handleImageUpload(event, "profilePhoto");
  };

  const handleCoverUploader = (event) => {
    handleImageUpload(event, "coverPhoto");
  };

  const handleCertificationUploader = (event) => {
    handleImageUpload(event, "certification");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        about,
        experienceYears,
        experienceMonths,
        experienceDays,
        experienceDetails,
        certifications,
        profilePhoto,
        coverPhoto,
        paymentAmounts,
        imageUrl,
      };

      const response = await userAxios.post("/joinAsTrainer", payload);

      if (response.status === 200) {
        console.log("Data submitted successfully:", response.data);
      } else {
        console.error("Failed to submit data:", response.data);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  return (
    <>
      <Navbar />

      <form className=" pt-20 px-14 bg-gray-900 text-white">
        <div className="space-y-8 md:space-y-12">
          <div className="border-b border-gray-900/10 pb-8 md:pb-12">
            <div className="col-span-full mt-8 relative">
              <div>
                <label
                  htmlFor="cover-photo"
                  className="block text-sm sm:text-base md:text-lg font-medium leading-6 text-white"
                >
                  Cover Photo
                </label>
                <div className="mt-8 rounded-lg border h-96 w-full border-dashed border-gray-200 px-6 py-10 flex flex-col items-center justify-center relative overflow-hidden">
                  {coverPhoto ? (
                    <img
                      src={coverPhoto}
                      alt="Cover"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <>
                      <div className="mx-auto h-12 w-12 text-gray-300">
                        <PhotoIcon aria-hidden="true" />
                      </div>

                      <div className="mt-4 flex text-sm sm:text-base md:text-lg leading-6 text-gray-300">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-amber-600 font-semibold text-white px-4 py-2 hover:bg-indigo-500 transition-colors duration-300 ease-in-out"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleCoverUploader}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* Profile Photo (Half inside, Half outside) */}
              <div className="absolute left-10 bottom-[-3rem]">
                {loading ? (
                  <div className="flex item-center justify-center w-20 h-20">
                    <img src="/Images/Pulse-1s-200px.gif" alt="" />
                  </div>
                ) : (
                  <div className="mt-2 flex items-center ">
                    {profilePhoto ? (
                      <img
                        src={`${profilePhoto}`}
                        alt="Profile"
                        className="h-32 w-32 rounded-full"
                      />
                    ) : (
                      <UserCircleIcon
                        className="h-32 w-32 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <label
                      htmlFor="photo"
                      className="relative cursor-pointer hover:text-amber-600 text-lg"
                    >
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="text-amber-500 text-2xl mt-3" // Adjust the size as needed
                      />
                      <input
                        id="photo"
                        name="photo"
                        type="file"
                        className="sr-only"
                        onChange={handleProfilePhotoUploader}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-4 mt-12">
              <label
                htmlFor="gender"
                className="block text-sm sm:text-base md:text-lg font-medium leading-6 text-white"
              >
                Gender
              </label>
              <div className="mt-2">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="text-amber-600 form-radio"
                    />
                    <span className="ml-2 text-white">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="text-amber-600 form-radio"
                    />
                    <span className="ml-2 text-white">Female</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      className="text-amber-600 form-radio"
                    />
                    <span className="ml-2 text-white">Other</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="sm:col-span-4 mt-8">
              <label
                htmlFor="about"
                className="block text-sm sm:text-base md:text-lg font-medium leading-6 text-white"
              >
                About Me
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows="4"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus-ring-inset focus-ring-amber-600 md:text- sm:leading-6"
                  placeholder="Write a brief introduction about your training expertise."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>
              <p className="mt-3 text-sm md:text-base leading-6 text-gray-300">
                Write a brief introduction about your training expertise.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 ">
              <div className="sm:col-span-4"></div>
              <div className="col-span-full mt-8">
                <label
                  htmlFor="experience"
                  className="block text-sm sm:text-base md:text-lg font-medium leading-6 text-white"
                >
                  Experience
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <label
                    htmlFor="experience-years"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Years
                  </label>
                  <input
                    type="number"
                    name="experience-years"
                    id="experience-years"
                    className="block w-1/12 rounded-md border-0 py-1.5 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Years"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                  />
                  <label
                    htmlFor="experience-months"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Months
                  </label>
                  <input
                    type="number"
                    name="experience-months"
                    id="experience-months"
                    className="block w-1/12 rounded-md border-0 py-1.5  text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Months"
                    value={experienceMonths}
                    onChange={(e) => setExperienceMonths(e.target.value)}
                  />
                  <label
                    htmlFor="experience-days"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Days
                  </label>
                  <input
                    type="number"
                    name="experience-days"
                    id="experience-days"
                    className="block w-1/12 rounded-md border-0 py-1.5  text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Days"
                    value={experienceDays}
                    onChange={(e) => setExperienceDays(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-4 mt-8 ms-2">
                <label
                  htmlFor="certifications"
                  className="block text-sm sm:text-base md:text-lg font-medium leading-6 text-white"
                >
                  Certifications
                </label>
                <div className="mt-2">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-amber-600 font-semibold text-white px-4 py-2 hover:bg-indigo-500 transition-colors duration-300 ease-in-out"
                  >
                    <span>Upload Certifications</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleCertificationUploader}
                    />
                  </label>
                </div>
                {certifications.length > 0 && (
                  <div className="mt-4 text-left">
                    {" "}
                    {/* Added text-left class */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold leading-6 text-white">
                      file: {certifications.length}
                    </h3>
                  </div>
                )}
              </div>

              <div className="sm:col-span-4 mt-8">
                <label
                  htmlFor="payment-duration"
                  className="block text-sm sm:text-base md:text-lg font-medium leading-6 text-white"
                >
                  Payment Duration
                </label>
                <div className="mt-2 flex items-center">
                  {durationNames.map((duration) => (
                    <div key={duration} className="mr-4">
                      <span className="text-white">{duration}</span>
                      <input
                        type="number"
                        placeholder="Payment Amount"
                        value={paymentAmounts[duration]}
                        onChange={(e) =>
                          handlePaymentAmountChange(duration, e.target.value)
                        }
                        className="border rounded-md ml-2 px-2 py-1 text-black placeholder-gray-400 focus:ring-2 focus-ring-inset focus-ring-amber-600 text-sm sm:text-base w-32"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-4 mt-8">
                <label
                  htmlFor="experienceDetails"
                  className="block text-sm sm:text-base md:text-lg font-medium leading-6 text-white"
                >
                  Experience Details
                </label>
                <div className="mt-2">
                  <textarea
                    id="experienceDetails"
                    name="experienceDetails"
                    rows="4"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus-ring-inset focus-ring-amber-600 md:text-base sm:leading-6"
                    placeholder="Provide details about your training experience."
                    value={experienceDetails}
                    onChange={(e) => setExperienceDetails(e.target.value)}
                    style={{
                      "::placeholder": {
                        paddingLeft: "8px",
                      },
                    }} // Added placeholder style
                  ></textarea>
                </div>
                <p className="mt-3 text-sm md:text-base leading-6 text-gray-300">
                  Provide details about your training experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-end gap-y-4 md:gap-x-6">
          <button
            type="button"
            className="text-base sm:text-lg md:text-xl font-semibold leading-6 text-gray-500 hover:text-amber-600 focus:outline-none focus:ring focus:ring-amber-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-amber-600 px-4 py-2 text-base sm:text-lg md:text-xl font-semibold text-white shadow-sm hover:bg-amber-500 focus:ring focus:ring-amber-600 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Save
          </button>
        </div>
      </form>
      <Footer />
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
