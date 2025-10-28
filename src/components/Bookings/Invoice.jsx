// components/Invoice.jsx
const Invoice = ({ data }) => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white border shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Car Rental Invoice</h2>
      <div className="text-sm">
        <p><strong>Booking ID:</strong> {data.bookingId}</p>
        <p><strong>User:</strong> {data.user.name} ({data.user.phone})</p>
        <p><strong>Car:</strong> {data.car.brand} {data.car.model} ({data.car.carNumber})</p>
        <p><strong>Pickup:</strong> {new Date(data.pickupAt).toLocaleString()}</p>
        <p><strong>Dropoff:</strong> {new Date(data.dropoffAt).toLocaleString()}</p>
        <p><strong>Duration:</strong> {data.durationHours} hrs</p>
        <p><strong>Total Amount:</strong> ₹{data.totalAmount}</p>
        <p><strong>Payment:</strong> {data.paymentStatus} via {data.paymentMode}</p>
      </div>
    </div>
  );
};

export default Invoice;
