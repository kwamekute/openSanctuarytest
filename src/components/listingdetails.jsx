import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`http://localhost:3000/listing/${id}`);
        const data = await res.json();
        setListing(data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!listing) return <p className="text-center mt-10">Listing not found</p>;

  const images =
    typeof listing.images === "string"
      ? JSON.parse(listing.images)
      : listing.images;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-600 mb-4 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* 🖼️ Image slider */}
        {images?.length > 0 ? (
          <Slider {...sliderSettings}>
            {images.map((url, idx) => (
              <div key={idx} className="cursor-pointer" onClick={() => handleImageClick(idx)}>
                <img
                  src={url}
                  alt={`Listing image ${idx + 1}`}
                  className="w-full h-[450px] object-cover rounded-t-xl"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="h-[400px] flex items-center justify-center bg-gray-100 text-gray-400">
            No images available
          </div>
        )}

        {/* 🏠 Listing info */}
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-2">{listing.description}</h1>
          <p className="text-gray-600 mb-4">{listing.city}</p>

          <p className="text-lg font-medium text-[#DE846A] mb-4">
            ₵{listing.price} / hour
          </p>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="font-semibold mb-2">Amenities</h2>
            <ul className="flex flex-wrap gap-2">
              {listing.amenities?.map((a, idx) => (
                <li
                  key={idx}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <p className="text-sm text-gray-600">
              Capacity: {listing.capacity} guests
            </p>
            {listing.latitude && listing.longitude && (
              <p className="text-sm text-gray-600">
                Coordinates: {listing.latitude}, {listing.longitude}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 🔍 Fullscreen Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-8 text-white text-2xl font-bold hover:text-gray-400"
          >
            ✕
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-6 text-white text-4xl hover:text-gray-400"
          >
            ‹
          </button>

          <img
            src={images[currentImageIndex]}
            alt="Full view"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-lg"
          />

          <button
            onClick={handleNext}
            className="absolute right-6 text-white text-4xl hover:text-gray-400"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}


// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function ListingDetails() {
//   const { id } = useParams();
//   const [listing, setListing] = useState(null);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/listing/${id}`);
//         const data = await res.json();
//         setListing(data);
//       } catch (err) {
//         console.error("Error fetching listing:", err);
//       }
//     };
//     fetchListing();
//   }, [id]);

//   if (!listing) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">{listing.description}</h1>
//       <p className="text-gray-600 mb-2">{listing.city}</p>
//       <p className="text-xl font-semibold mb-6">₵{listing.price} / hr</p>

//       {/* 🖼️ Images gallery */}
//       <div className="flex flex-wrap gap-4">
//         {listing.images?.map((url, i) => (
//           <img
//             key={i}
//             src={url}
//             alt={`Listing ${i}`}
//             className="w-64 h-40 object-cover rounded-lg"
//           />
//         ))}
//       </div>

//       {/* 📝 Extra details */}
//       <div className="mt-6">
//         <h2 className="text-lg font-semibold mb-2">About this space</h2>
//         <p className="text-gray-700">{listing.title || "No description provided."}</p>
//       </div>
//     </div>
//   );
// }
