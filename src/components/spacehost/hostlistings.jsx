import { FaPlus } from "react-icons/fa6";
import property from "../../assets/property.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HostListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
  const fetchListings = async () => {
    try {
      const res = await fetch(`http://localhost:3000/listing/org`, {
        credentials: "include", 
      });

      if (!res.ok) {
        console.error("Failed to fetch listings:", res.status);
        setListings([]); 
        return;
      }

      const data = await res.json();

      // Ensure the result is an array before setting
      if (Array.isArray(data)) {
        setListings(data);
      } else if (Array.isArray(data.listings)) {
        setListings(data.listings);
      } else {
        setListings([]);
      }
    } catch (err) {
      console.error("Error fetching organization listings:", err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  fetchListings();
}, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading listings...</p>;
  }

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full h-20 py-5 px-16">
        <h1 className="text-xl font-semibold">Your Listings</h1>
        <div
          onClick={() => navigate("/host/listing/create")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
        >
          <FaPlus className="text-md text-gray-700" />
        </div>
      </div>

      {/*  No Listings */}
      {listings.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center gap-4 mt-12">
          <img src={property} alt="property" className="h-[200px] rounded-[5%]" />
          <p className="text-[16px] font-normal leading-[20px] text-[#222222] font-sans text-center">
            List your space on OpenSanctuary to start receiving reservation requests.
          </p>
          <button
            onClick={() => navigate("/host/listing/create")}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg font-medium"
          >
            Create Listing
          </button>
        </div>
      ) : (
        /* Existing Listings Grid */
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => {
            const images =
              typeof listing.images === "string"
                ? JSON.parse(listing.images)
                : listing.images;

            return (
              <div
                key={listing.listing_id}
                onClick={() => navigate(`/listing/${listing.listing_id}`)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                {images?.length > 0 ? (
                  <img
                    src={images[0]}
                    alt={listing.description}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center bg-gray-100 text-gray-400">
                    No image
                  </div>
                )}

                <div className="p-4">
                  <h2 className="text-lg font-semibold">{listing.description}</h2>
                  <p className="text-sm text-gray-600">{listing.city}</p>
                  <p className="mt-2 text-[#DE846A] font-medium">
                    ₵{listing.price} / hr
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
