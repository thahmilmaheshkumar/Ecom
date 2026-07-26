const steps = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export default function OrderTimeline({ currentStep }) {
  return (
    <div className="relative ml-8">
      {steps.map((step, index) => (
        <div key={index} className="relative flex items-center mb-10">
          {/* Vertical Line */}
          {index !== steps.length - 1 && (
            <div
              className={`absolute left-[8px] top-5 w-1 h-10 ${
                index < currentStep ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          )}

          {/* Circle */}
          <div
            className={`w-5 h-5 rounded-full z-10 ${
              index <= currentStep ? "bg-green-500" : "bg-gray-300"
            }`}
          />

          {/* Text */}
          <span className="ml-4">{step}</span>
        </div>
      ))}
    </div>
  );
}
