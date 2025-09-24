import React, { useState } from "react";

const steps = [
    { id: 1, title: "Description" },
    { id: 2, title: "City" },
    { id: 3, title: "Province" },
    { id: 4, title: "Amenities(comma-separated)" },
    { id: 5, title: "Photos" },
    { id: 6, title: "Pricing" },
    { id: 7, title: "Publish" },
];

// id
// orgID
// images
// location
// capacityID
// amenities
// Price


export default function AddNewListing() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        description: "",
        city: "",
        province: "",
        amenities: [],
        photos: [],
        price: "",
    });

const [localFiles, setLocalFiles] = useState([]);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const progress = (currentStep / steps.length) * 100;

    console.log('Number of images:', localFiles.length);
console.log('Image names:', localFiles.map(file => file.name));
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Step Container */}
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
                    <h2 className="text-xl font-semibold mb-4">
                        Step {currentStep}: {steps[currentStep - 1].title}
                    </h2>

                    {/* Example step UI */}
                    {currentStep === 1 && (
                        // <select
                        //     value={formData.propertyType}
                        //     onChange={(e) =>
                        //         setFormData({ ...formData, propertyType: e.target.value })
                        //     }
                        //     className="border rounded-lg p-2 w-full"
                        // >
                        //     <option value="">Select type...</option>
                        //     <option value="apartment">Apartment</option>
                        //     <option value="house">House</option>
                        //     <option value="guesthouse">Guesthouse</option>
                        // </select>
                         <input
                            type="text"
                            placeholder="Shortly Describe Your Listing(e.g. Comfortable Church Space in Toronto)..."
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className="border rounded-lg p-2 w-full"
                        />
                    )}

                    {currentStep === 2 && (
                        <input
                            type="text"
                            placeholder="Enter City..."
                            value={formData.city}
                            onChange={(e) =>
                                setFormData({ ...formData, city: e.target.value })
                            }
                            className="border rounded-lg p-2 w-full"
                        />
                    )}

                     {currentStep === 3 && (
                        <input
                            type="text"
                            placeholder="Enter Province..."
                            value={formData.province}
                            onChange={(e) =>
                                setFormData({ ...formData, province: e.target.value })
                            }
                            className="border rounded-lg p-2 w-full"
                        />
                    )}

                     {currentStep === 4 && (
                        <input
                            type="text"
                            placeholder="Wi-Fi, Parking, Kitchen..."
                            value={formData.province}
                            onChange={(e) =>
                                setFormData({ ...formData, province: e.target.value })
                            }
                            className="border rounded-lg p-2 w-full"
                        />
                    )}

                {currentStep === 5 && (
  <>
    {/* File input */}
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => {
        const selected = Array.from(e.target.files).slice(0, 5);
        // combine old + new, max 5
        const combined = [...localFiles, ...selected].slice(0, 5);
        setLocalFiles(combined);
        setFormData({ ...formData, photos: combined });
      }}
      className="border rounded-lg p-2 w-full mb-4"
    />

    {/* Previews from state, not from input */}
    {localFiles.length > 0 && (
      <div className="grid grid-cols-5 gap-2">
        {localFiles.map((file, idx) => (
          <img
            key={idx}
            src={URL.createObjectURL(file)}
            alt={`preview-${idx}`}
            className="h-20 w-20 object-cover rounded"
          />
        ))}
      </div>
    )}
  </>
)}



                    {currentStep === 6 && (
  <>
    {/* Price input */}
    <input
      type="number"
      placeholder="Price per hour (CAD)"
      value={formData.price || ''}
      onChange={(e) =>
        setFormData({ ...formData, price: e.target.value })
      }
      className="border rounded-lg p-2 w-full mb-4"
      min="0"
      step="0.01" // allows decimals like 49.99
    />

    {/* (optional) Currency selector if you want multi-currency */}
    {/* 
    <select
      value={formData.currency || 'USD'}
      onChange={(e) =>
        setFormData({ ...formData, currency: e.target.value })
      }
      className="border rounded-lg p-2 w-full mb-4"
    >
      <option value="USD">USD</option>
      <option value="GHS">GHS</option>
      <option value="EUR">EUR</option>
    </select>
    */}
  </>
)}

                </div>
            </div>

            {/* Fixed Progress + Footer */}
            <div className="fixed bottom-0 left-0 w-full">
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-2">
                    <div
                        className="h-2 bg-[#DE846A] transition-all"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Footer Navigation */}
                <div className="bg-white border-t p-4 flex justify-between">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Back
                    </button>
                    <button
                        onClick={nextStep}
                        className="px-4 py-2 rounded-lg bg-[#E19179] text-white hover:bg-[#DE846A]"
                    >
                        {currentStep === steps.length ? "Finish" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
}
