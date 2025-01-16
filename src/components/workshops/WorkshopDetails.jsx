import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment";

const WorkshopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const workshopDoc = await getDoc(doc(db, "workshops", id));
        if (workshopDoc.exists()) {
          setWorkshop({ id: workshopDoc.id, ...workshopDoc.data() });
        } else {
          setError("Workshop not found");
        }
      } catch (err) {
        setError("Error fetching workshop details");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !workshop) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error || "Workshop not found"}
        </div>
      </div>
    );
  }

  const isRegistrationClosed = workshop.availableSpots <= 0;
  const isWorkshopPast = moment(workshop.date).isBefore(moment());

  return (
    <div className="container mx-auto py-8 px-4 text-white pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Workshop Image */}
        {workshop.imageUrl && !imageError ? (
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
            <img
              src={workshop.imageUrl}
              alt={workshop.title}
              className="w-full h-64 object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-gray-700 h-64 flex items-center justify-center">
            <div className="text-gray-400 text-center p-4">
              <svg
                className="mx-auto h-12 w-12 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p>No workshop image available</p>
            </div>
          </div>
        )}

        {/* Workshop Header */}
        <div className="border border-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{workshop.title}</h1>
              <span
                className={`px-4 py-1 rounded-full ${
                  workshop.isFree
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {workshop.isFree ? "Free" : `₹${workshop.price}`}
              </span>
            </div>
            <p className="mb-4">{workshop.description}</p>
            <p className="text-lg font-medium">by {workshop.instructor}</p>
          </div>
        </div>

        {/* Workshop Details */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="border border-white rounded-lg shadow-md p-6">
            <h2 className="font-semibold mb-4">Date & Time</h2>
            <p className="">
              {new Date(workshop.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="">
              {new Date(workshop.date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="">Duration: {workshop.duration}</p>
          </div>

          <div className="border border-white rounded-lg shadow-md p-6">
            <h2 className="font-semibold mb-4">Location</h2>
            <p className="">{workshop.location}</p>
          </div>

          <div className="border border-white rounded-lg shadow-md p-6">
            <h2 className="font-semibold mb-4">Availability</h2>
            <p className="">
              {workshop.availableSpots} spots available out of{" "}
              {workshop.totalSpots}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-red-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    (workshop.availableSpots / workshop.totalSpots) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Workshop Content */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border border-white rounded-lg shadow-md p-6">
            <h2 className="font-semibold mb-4">Requirements</h2>
            <p className="whitespace-pre-line">{workshop.requirements}</p>
          </div>

          <div className="border border-white rounded-lg shadow-md p-6">
            <h2 className="font-semibold mb-4">Learning Outcomes</h2>
            <p className="whitespace-pre-line">{workshop.learningOutcomes}</p>
          </div>
        </div>

        <div className="border border-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="font-semibold mb-4">Target Audience</h2>
          <p className="whitespace-pre-line">{workshop.targetAudience}</p>
        </div>

        {/* Registration Button */}
        <div className="border border-white rounded-lg shadow-md p-6">
          {isWorkshopPast ? (
            <div className="text-center">
              <p className="text-gray-600 mb-2">Workshop Has Ended</p>
              <p className="">This workshop is no longer available.</p>
            </div>
          ) : isRegistrationClosed ? (
            <div className="text-center">
              <p className="text-red-600 mb-2">Registration Closed</p>
              <p className="">This workshop is fully booked.</p>
            </div>
          ) : (
            <div className="text-center">
              <Link
                to={`/workshops/${id}/register`}
                className="inline-block bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600"
              >
                {workshop.isFree ? "Register Now" : "Book Your Spot"}
              </Link>
              <p className="text-sm mt-2">
                {workshop.availableSpots} spots remaining
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetails;