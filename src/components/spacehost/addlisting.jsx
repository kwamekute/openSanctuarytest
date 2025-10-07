import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// fix default Leaflet marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const steps = [
  { id: 1, title: "Description" },
  { id: 2, title: "City" },
  { id: 3, title: "Map Location" },
  { id: 4, title: "Amenities(comma-separated)" },
  { id: 5, title: "Photos" },
{ id: 6, title: "Capacity" },
  { id: 7, title: "Pricing" },
  { id: 8, title: "Publish" },
];

// small child component to handle map clicks
function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position ? <Marker position={position} /> : null;
}

export default function AddNewListing(Props) {
     const navigate = useNavigate();   
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    description: "",
    city: "",
    coordinates: null,
    amenities: [],
    capacity:"",
    price: "",
    orgId : Props?.user?.organization?.organization_id || null

  });
  console.log(formData);
  const [localFiles, setLocalFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]); // track % for each file
  const [loading, setLoading] = useState(false);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  const progress = (currentStep / steps.length) * 100;

  const handleSubmit = async () => {
  if (!formData.description || !formData.city || !formData.price) {
    alert("Please fill all required fields");
    return;
  }

  setLoading(true);
  try {
    // 1️⃣ Upload all images first
    // 2️⃣ Upload images to Cloudinary, track progress
const uploadedUrls = [];
setUploadProgress(localFiles.map(() => 0)); // reset

for (let i = 0; i < localFiles.length; i++) {
  const file = localFiles[i];
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "open_sanctuary"); // ⚠️ replace with your unsigned preset
  data.append("folder", `listings/`);

  const xhr = new XMLHttpRequest();

  const promise = new Promise((resolve, reject) => {
    xhr.open("POST", "https://api.cloudinary.com/v1_1/dvmtodnht/image/upload");

    // Track upload progress
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setUploadProgress((prev) => {
          const updated = [...prev];
          updated[i] = percent;
          return updated;
        });
      }
    });

    // Handle success/error
    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.secure_url);
      } else {
        try {
          const errorResponse = JSON.parse(xhr.responseText);
          console.error("Cloudinary upload error:", errorResponse);
          reject(errorResponse);
        } catch (e) {
          console.error(
            "Cloudinary upload failed:",
            xhr.status,
            xhr.responseText
          );
          reject(xhr.statusText);
        }
      }
    };

    xhr.onerror = () => {
      console.error("Network error during Cloudinary upload:", xhr.statusText);
      reject(xhr.statusText);
    };

    xhr.send(data);
  });

  const url = await promise;
  uploadedUrls.push(url);
}


    // 2️⃣ Only after uploads succeed, call backend once
    const res = await fetch("http://localhost:3000/listing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: formData.description,
        city: formData.city,
        latitude: formData.coordinates ? formData.coordinates[0] : null,
        longitude: formData.coordinates ? formData.coordinates[1] : null,
        amenities: formData.amenities,
        price: formData.price,
        photos: uploadedUrls, // send with listing
        orgId: formData.orgId,
        capacity: formData.capacity
      }),
    });

    if (!res.ok) throw new Error("Listing insert failed");
    const result = await res.json();

    alert("Listing created successfully!");

    Props.setActiveTab('Listings');
     navigate("/host");
    // reset
    // setFormData({
    //   description: "",
    //   city: "",
    //   coordinates: null,
    //   amenities: [],
    //   price: "",
    // });
    // setLocalFiles([]);
    // setUploadProgress([]);
    // setCurrentStep(1);



  } catch (err) {
    console.error(err);
    alert("Error creating listing");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">
            Step {currentStep}: {steps[currentStep - 1].title}
          </h2>

          {/* Step 1 */}
          {currentStep === 1 && (
            <input
              type="text"
              placeholder="Shortly Describe Your Listing..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border rounded-lg p-2 w-full"
            />
          )}

          {/* Step 2: City */}
          {currentStep === 2 && (
            <input
              type="text"
              placeholder="Enter City..."
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="border rounded-lg p-2 w-full"
            />
          )}

          {/* Step 3: Map Location */}
          {currentStep === 3 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Click on the map to set the listing’s location.
              </p>
              <MapContainer
                center={[43.6532, -79.3832]} // Toronto
                zoom={10}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                />
                <LocationPicker
                  position={formData.coordinates}
                  setPosition={(pos) =>
                    setFormData({ ...formData, coordinates: pos })
                  }
                />
              </MapContainer>
              {formData.coordinates && (
                <div className="text-sm text-gray-700">
                  Selected: Lat {formData.coordinates[0].toFixed(5)} | Lng{" "}
                  {formData.coordinates[1].toFixed(5)}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Amenities */}
          {currentStep === 4 && (
            <input
              type="text"
              placeholder="Wi-Fi, Parking, Kitchen..."
              value={formData.amenities.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amenities: e.target.value.split(",").map((a) => a.trim()),
                })
              }
              className="border rounded-lg p-2 w-full"
            />
          )}

          {/* Step 5: Photos */}
          {currentStep === 5 && (
            <>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const selected = Array.from(e.target.files).slice(0, 5);
                  const combined = [...localFiles, ...selected].slice(0, 5);
                  setLocalFiles(combined);
                }}
                className="border rounded-lg p-2 w-full mb-4"
              />
              {localFiles.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {localFiles.map((file, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${idx}`}
                        className="h-20 w-20 object-cover rounded"
                      />
                      {uploadProgress[idx] > 0 && (
                        <div className="w-full bg-gray-200 h-1 mt-1">
                          <div
                            className="h-1 bg-green-500"
                            style={{ width: `${uploadProgress[idx]}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

           {currentStep === 6 && (
            <input
              type="number"
              placeholder="e.g: '50'"
              value={formData.capacity || ""}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
              className="border rounded-lg p-2 w-full mb-4"
              min="0"
              step="0.01"
            />
          )}


          {/* Step 6: Pricing */}
          {currentStep === 7 && (
            <input
              type="number"
              placeholder="Price per hour (CAD)"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="border rounded-lg p-2 w-full mb-4"
              min="0"
              step="0.01"
            />
          )}

          {/* Step 7: Publish */}
          {currentStep === 8 && (
            <div>
              <p className="mb-4">
                Click Finish to publish your listing. Photos will upload next.
              </p>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                {loading ? "Uploading..." : "Publish Listing"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full">
        <div className="w-full bg-gray-200 h-2">
          <div
            className="h-2 bg-[#DE846A] transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="bg-white border-t p-4 flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Back
          </button>
          {currentStep < steps.length && (
            <button
              onClick={nextStep}
              className="px-4 py-2 rounded-lg bg-[#E19179] text-white hover:bg-[#DE846A]"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
