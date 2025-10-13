import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom marker showing price
const createPriceIcon = (price) =>
  L.divIcon({
    className:
      "bg-white text-black font-semibold text-sm border border-gray-300 rounded-lg shadow-md px-2 py-1 flex items-center justify-center",
    html: `$${price}`,
    iconSize: [40, 20],
    iconAnchor: [20, 10],
  });

// Fit map to listings
function FitMapToBounds({ listings }) {
  const map = useMap();

  useEffect(() => {
    if (listings.length > 0) {
      const validListings = listings.filter(
        (l) => l.latitude && l.longitude
      );
      if (validListings.length > 0) {
        const bounds = L.latLngBounds(
          validListings.map((l) => [l.latitude, l.longitude])
        );
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [40, 40] });
        }
      }
    }
  }, [listings, map]);

  return null;
}

export default function FilteredListings() {

  const location = useLocation();
  const navigate = useNavigate();
  const [listings, setListings] = useState(location.state?.listings || []);
  const [mapHeight, setMapHeight] = useState(400);
  const listingsRef = useRef(null);

  // Fetch if user visits directly
  useEffect(() => {
    if (!location.state?.listings) {
      const fetchListings = async () => {
        const res = await fetch("http://localhost:3000/listing");
        const data = await res.json();
        setListings(data);
      };
      fetchListings();
    }
  }, [location.state]);

  // Match map height to listings section dynamically
  useEffect(() => {
    if (listingsRef.current) {
      setMapHeight(listingsRef.current.offsetHeight / 2);
    }
  }, [listings]);

  return (
<>

      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-600 mb-4 hover:underline"
      >
        ← Back
      </button>

    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left side: Listings (2 columns) */}
      <div ref={listingsRef} className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.listing_id}
            onClick={() => navigate(`/host/listing/${listing.listing_id}`)}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer transition duration-200"
          >
            {/* Image */}
            {listing.images?.length > 0 ? (
              <img
                src={listing.images[0]}
                alt={listing.description}
                className="h-60 w-full object-cover"
              />
            ) : (
              <div className="h-60 bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Details */}
            <div className="p-4 flex flex-col justify-between h-[150px]">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {listing.description || "Untitled Listing"}
                </h2>
                <p className="text-gray-600 text-sm">{listing.city}</p>
              </div>

              <div className="flex items-center justify-between mt-3">
                <span className="text-xl font-bold text-gray-800">
                  ${listing.price}
                </span>
                <span className="text-sm text-gray-500">per hour</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right side: Map */}
      <div
        className="rounded-2xl overflow-hidden shadow-md sticky top-6"
        style={{ height: mapHeight }}
      >
        <MapContainer
          center={[5.6037, -0.1870]} // Default to Accra
          zoom={12}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          />
          <FitMapToBounds listings={listings} />
          {listings.map(
            (listing) =>
              listing.latitude &&
              listing.longitude && (
                <Marker
                  key={listing.listing_id}
                  position={[listing.latitude, listing.longitude]}
                  icon={createPriceIcon(listing.price)}
                  eventHandlers={{
                    click: () =>
                      navigate(`/host/listing/${listing.listing_id}`),
                  }}
                />
              )
          )}
        </MapContainer>
      </div>
    </div>
    </>
  );
}

