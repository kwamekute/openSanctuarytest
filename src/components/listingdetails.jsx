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

  // 📥 Booking form state
  const [formData, setFormData] = useState({
    listing_id :id,
    name: "",
    email: "",
    phone: "",
    organization: "",
    check_in: "",
    check_out: "",
  });

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

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    // 👉 Send booking request (You can adjust backend endpoint)
    const res = await fetch("http://localhost:3000/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, listing_id: id }),
    });

    if (res.ok) {
      alert("Booking request sent!");
      setFormData({ name: "", email: "",phone:"", organization:"", check_in: "", check_out: "" });
    } else {
      alert("Failed to send booking request");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-600 mb-4 hover:underline"
      >
        ← Back
      </button>

      {/* 🖼️ Image slider */}
      {images?.length > 0 ? (
        <Slider {...sliderSettings}>
          {images.map((url, idx) => (
            <div
              key={idx}
              className="cursor-pointer"
              onClick={() => handleImageClick(idx)}
            >
              <img
                src={url}
                alt={`Listing image ${idx + 1}`}
                className="w-full h-[500px] object-cover rounded-xl"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="h-[400px] flex items-center justify-center bg-gray-100 text-gray-400">
          No images available
        </div>
      )}

      {/* 🧭 Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Description */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-semibold mb-2">{listing.description}</h1>
          <p className="text-gray-600 mb-4">{listing.city}</p>

          <p className="text-2xl font-bold text-[#DE846A] mb-4">
            ₵{listing.price} / hour
          </p>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="font-semibold mb-2 text-lg">Amenities</h2>
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

          <div className="border-t border-gray-200 mt-4 pt-4 space-y-1">
            <p className="text-sm text-gray-600">
              Capacity: <b>{listing.capacity}</b> guests
            </p>
            {/* {listing.latitude && listing.longitude && (
              <p className="text-sm text-gray-600">
                Coordinates: {listing.latitude}, {listing.longitude}
              </p>
            )} */}
          </div>
        </div>

        {/* RIGHT: Booking form */}
        <div className="bg-white rounded-xl shadow-md p-6 sticky top-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Request to Book</h2>
          <form onSubmit={handleBookingSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-[#DE846A] outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-[#DE846A] outline-none"
              required
            />
            <input
            type="tel"
            placeholder="Tel:"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            pattern="^\+?[0-9\s\-]{7,15}$"
            required
            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-[#DE846A] outline-none"
            />

            <input
              type="text"
              placeholder="Name of organization"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-[#DE846A] outline-none"
              required
            />
            <label>check-in</label>
            <input
            type="datetime-local"
            placeholder="check-in"
            value={formData.check_in}
            onChange={(e) => setFormData({ ...formData, check_in: e.target.value })}
            required
            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-[#DE846A] outline-none"
            />
            <label>check-out</label>
            <input
            type="datetime-local"
            placeholder="check-out"
            value={formData.check_out}
            onChange={(e) => setFormData({ ...formData, check_out: e.target.value })}
            required
            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-[#DE846A] outline-none"
            />

            <button
              type="submit"
              className="w-full bg-[#DE846A] text-white py-2 rounded-lg font-semibold hover:bg-[#c76e58] transition"
            >
              Send Request
            </button>
          </form>
        </div>
      </div>

      {/* 🖼️ Fullscreen modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-8 text-white text-2xl font-bold hover:text-gray-400"
          >
            ✕
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
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
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-6 text-white text-4xl hover:text-gray-400"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}


// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function ListingDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/listing/${id}`);
//         const data = await res.json();
//         setListing(data);
//       } catch (err) {
//         console.error("Error fetching listing:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!listing) return <p className="text-center mt-10">Listing not found</p>;

//   const images =
//     typeof listing.images === "string"
//       ? JSON.parse(listing.images)
//       : listing.images;

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 400,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     adaptiveHeight: true,
//   };

//   const handleImageClick = (index) => {
//     setCurrentImageIndex(index);
//     setIsModalOpen(true);
//   };

//   const handleNext = () => {
//     setCurrentImageIndex((prev) =>
//       prev === images.length - 1 ? 0 : prev + 1
//     );
//   };

//   const handlePrev = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? images.length - 1 : prev - 1
//     );
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="text-sm text-gray-600 mb-4 hover:underline"
//       >
//         ← Back
//       </button>

//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         {/* 🖼️ Image slider */}
//         {images?.length > 0 ? (
//           <Slider {...sliderSettings}>
//             {images.map((url, idx) => (
//               <div key={idx} className="cursor-pointer" onClick={() => handleImageClick(idx)}>
//                 <img
//                   src={url}
//                   alt={`Listing image ${idx + 1}`}
//                   className="w-full h-[450px] object-cover rounded-t-xl"
//                 />
//               </div>
//             ))}
//           </Slider>
//         ) : (
//           <div className="h-[400px] flex items-center justify-center bg-gray-100 text-gray-400">
//             No images available
//           </div>
//         )}

//         {/* 🏠 Listing info */}
//         <div className="p-6">
//           <h1 className="text-2xl font-semibold mb-2">{listing.description}</h1>
//           <p className="text-gray-600 mb-4">{listing.city}</p>

//           <p className="text-lg font-medium text-[#DE846A] mb-4">
//             ₵{listing.price} / hour
//           </p>

//           <div className="border-t border-gray-200 pt-4">
//             <h2 className="font-semibold mb-2">Amenities</h2>
//             <ul className="flex flex-wrap gap-2">
//               {listing.amenities?.map((a, idx) => (
//                 <li
//                   key={idx}
//                   className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
//                 >
//                   {a}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="border-t border-gray-200 mt-4 pt-4">
//             <p className="text-sm text-gray-600">
//               Capacity: {listing.capacity} guests
//             </p>
//             {listing.latitude && listing.longitude && (
//               <p className="text-sm text-gray-600">
//                 Coordinates: {listing.latitude}, {listing.longitude}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 🔍 Fullscreen Image Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
//           <button
//             onClick={() => setIsModalOpen(false)}
//             className="absolute top-6 right-8 text-white text-2xl font-bold hover:text-gray-400"
//           >
//             ✕
//           </button>

//           <button
//             onClick={handlePrev}
//             className="absolute left-6 text-white text-4xl hover:text-gray-400"
//           >
//             ‹
//           </button>

//           <img
//             src={images[currentImageIndex]}
//             alt="Full view"
//             className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-lg"
//           />

//           <button
//             onClick={handleNext}
//             className="absolute right-6 text-white text-4xl hover:text-gray-400"
//           >
//             ›
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";

// // export default function ListingDetails() {
// //   const { id } = useParams();
// //   const [listing, setListing] = useState(null);

// //   useEffect(() => {
// //     const fetchListing = async () => {
// //       try {
// //         const res = await fetch(`http://localhost:3000/listing/${id}`);
// //         const data = await res.json();
// //         setListing(data);
// //       } catch (err) {
// //         console.error("Error fetching listing:", err);
// //       }
// //     };
// //     fetchListing();
// //   }, [id]);

// //   if (!listing) return <p className="text-center mt-10">Loading...</p>;

// //   return (
// //     <div className="max-w-5xl mx-auto p-6">
// //       <h1 className="text-3xl font-bold mb-4">{listing.description}</h1>
// //       <p className="text-gray-600 mb-2">{listing.city}</p>
// //       <p className="text-xl font-semibold mb-6">₵{listing.price} / hr</p>

// //       {/* 🖼️ Images gallery */}
// //       <div className="flex flex-wrap gap-4">
// //         {listing.images?.map((url, i) => (
// //           <img
// //             key={i}
// //             src={url}
// //             alt={`Listing ${i}`}
// //             className="w-64 h-40 object-cover rounded-lg"
// //           />
// //         ))}
// //       </div>

// //       {/* 📝 Extra details */}
// //       <div className="mt-6">
// //         <h2 className="text-lg font-semibold mb-2">About this space</h2>
// //         <p className="text-gray-700">{listing.title || "No description provided."}</p>
// //       </div>
// //     </div>
// //   );
// // }
