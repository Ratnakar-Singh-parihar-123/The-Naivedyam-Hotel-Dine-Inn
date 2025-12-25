import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const BookTable = () => {
  const { axios, navigate, user } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    date: "",
    time: "",
    note: "",
  });

  // 🔐 Redirect if not logged in
  if (!user) {
    toast.error("Please login to book a table");
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/booking/create",
        formData,
        { withCredentials: true } // 🔑 IMPORTANT
      );

      if (data?.success) {
        toast.success(data.message || "Table booked successfully");
        navigate("/my-bookings");
      } else {
        toast.error(data?.message || "Booking failed");
      }
    } catch (error) {
      console.error(error);

      if (error?.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(
          error?.response?.data?.message || "Something went wrong!"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Book a Table
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500"
          />

          <input
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            placeholder="Number of Guests"
            min="1"
            required
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500"
          />
        </div>

        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Special Requests (optional)"
          rows="3"
          className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookTable;
