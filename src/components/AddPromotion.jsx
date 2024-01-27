import React, {useState} from "react";
import { statuses } from "../utils/style";
import { Spinner} from "../components";
import { FaCloudUploadAlt } from "../assets/icons";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllPromos, savePromo, } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";



const AddPromotion = () => {
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [progress, setProgress] = useState(null);
    const [imageDownloadURL, setImageDownloadURL] = useState(null);
    const [calories, setCalories] = useState("");
    const [fields, setFields] = useState(false);
    const [msg, setMsg] = useState(null);
    const [alertStatus, setAlertStatus] = useState("danger");
    const [{ bbtItems }, dispatch] = useStateValue();

    const uploadImage = (e) => {
        setisLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        setisLoading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setisLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          setisLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setisLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);
    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null);
      setisLoading(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setisLoading(true);
    try {
      if (!itemName || !imageDownloadURL) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setisLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: itemName,
          imageURL: imageDownloadURL,
        };
        savePromo(data);
        setisLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setisLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setItemName("");
    setImageDownloadURL(null);
  };

  const fetchData = async () => {
    await getAllPromos().then((data) => {
      dispatch({
        type: actionType.SET_PROMOS,
        promos: data,
      });
    });
  };



    return (
        <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
            <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
            {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        {/* Input for Promotion Name  */}
                <InputValueField
                    type="text"
                    placeHolder={"Promo name here"}
                    stateFunc={setItemName}
                    stateValue={itemName}
            />

            {/* Click To Upload An Image  */}
            <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
                    {isLoading ? (<div className="w-full h-full flex flex-col items-center justify-evenly px-24">
                        <Spinner />
                    </div>) : (<> {!imageDownloadURL ? (
                    <><label>
                        <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                            <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                                <p className="font-bold text-4xl">
                                    <FaCloudUploadAlt className="-rotate-0" />
                                </p>
                                <p className="text-lg text-textColor">
                                    Click to upload an image
                                </p>
                            </div>
                        </div>
                        <input
                            type="file"
                            name="upload-image"
                            accept="image/*"
                            onChange={uploadImage}
                            className="w-0 h-0" 
                        />
                        </label> 
                    </>
                    ) : (
                    <>                   
                    <div className="relative h-full w-full overflow-hidden rounded-md">
                    <img
                      src={imageDownloadURL}
                      alt="uploaded image"
                      className="w-full h-full object-contain"
                    />

                    {/* Delete Button For Image  */}
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >                   
                    <MdDelete className="text-white" />
                    </button>
                  </div>
                    </>
                    )}
                    </>
                    )}
                </div>
                <div className="flex items-center">
                <button type="button" className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                    // Save Button To Save The Details On To The Database
                    onClick={saveDetails}>
                    Save
              </button>
            </div>
          </div>
        </div>
  );   
};

export const InputValueField = ({type, placeHolder, stateValue, stateFunc}) => {
    return (
        <>
            <input 
            type={type}
            placeholder={placeHolder}
            className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-pink-400"
            value={stateValue}
            onChange={(e) => stateFunc(e.target.value)}
            />
        </>
    );
};

export default AddPromotion;