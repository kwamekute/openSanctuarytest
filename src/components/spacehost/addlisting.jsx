import React, { useState } from "react";

const steps = [
    { id: 1, title: "Property Type" },
    { id: 2, title: "Location" },
    { id: 3, title: "Amenities" },
    { id: 4, title: "Photos" },
    { id: 5, title: "Pricing" },
    { id: 6, title: "Publish" },
];

export default function AddNewListing() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        propertyType: "",
        location: "",
        amenities: [],
        photos: [],
        price: "",
    });

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const progress = (currentStep / steps.length) * 100;

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
                        <select
                            value={formData.propertyType}
                            onChange={(e) =>
                                setFormData({ ...formData, propertyType: e.target.value })
                            }
                            className="border rounded-lg p-2 w-full"
                        >
                            <option value="">Select type...</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="guesthouse">Guesthouse</option>
                        </select>
                    )}

                    {currentStep === 2 && (
                        <input
                            type="text"
                            placeholder="Enter location..."
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({ ...formData, location: e.target.value })
                            }
                            className="border rounded-lg p-2 w-full"
                        />
                    )}

                    {/* Add other steps here */}
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
