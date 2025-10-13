import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HostRequests() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/request", { credentials: "include" }) 
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRequests(data.requests);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Booking Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No booking requests yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {requests.map((req) => (
            <div
              key={req.request_id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-bold">{req.listing_title}</h2>
              <p className="text-sm text-gray-600">
                {req.location} — ${req.price}/hr
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <p><strong>Guest:</strong> {req.name}</p>
                <p><strong>Email:</strong> {req.email}</p>
                <p><strong>Phone:</strong> {req.phone}</p>
                <p>
                  <strong>Check-in:</strong> {new Date(req.check_in).toLocaleString()}
                  <br />
                  <strong>Check-out:</strong> {new Date(req.check_out).toLocaleString()}
                </p>
              </div>
              <a
                onClick={() => navigate(`/host/listing/${req.listing_id}`)} 
                className="inline-block mt-3 text-[#DE846A] hover:underline"
              >
                View Listing →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
