import { Clipboard, CheckCircle2, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const TransactionCard = ({ txn }) => {
  const [copied, setCopied] = useState(false);
  const [showFullCard, setShowFullCard] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(txn.transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isCredit = txn?.type === "credit";

  // Card styles
  let cardGradient = "";
  let textColor = "";
  let statusBadge = "";
  let borderColor  = "";

  if (txn?.paymentStatus === "success") {
    // Success depends on credit/debit
    if (isCredit) {
      cardGradient = "from-green-100 to-green-300";
      textColor = "text-green-800";
      statusBadge = "bg-green-400 text-green-800";
      borderColor = "border-green-500";
    } else {
      cardGradient = "from-green-100 to-green-300";
      textColor = "text-gren-800";
      statusBadge = "bg-green-400 text-red-800";
      borderColor = "border-green-500";
    }
  } else if (txn?.paymentStatus === "failed") {
    cardGradient = "from-red-200 to-red-400";
    textColor = "text-red-800";
    statusBadge = "bg-red-500 text-white";
    borderColor = "border-red-500";
  } else if (txn?.paymentStatus === "pending") {
    cardGradient = "from-yellow-100 to-yellow-300";
    textColor = "text-yellow-800";
    statusBadge = "bg-yellow-400 text-yellow-800";
      borderColor = "border-yellow-500";
  } else if (txn?.paymentStatus === "refunded") {
    cardGradient = "from-blue-100 to-blue-300";
    textColor = "text-blue-800";
    statusBadge = "bg-blue-400 text-blue-800";
      borderColor = "border-blue-500";
  } else {
    cardGradient = "from-gray-100 to-gray-200";
    textColor = "text-gray-700";
    statusBadge = "bg-gray-300 text-gray-700";
    borderColor = "border-gray-500";
  }

  return (
    <div
      className={`relative p-5 rounded-xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer bg-gradient-to-r ${cardGradient} ${textColor}`}
      onClick={() => setShowFullCard((prev) => !prev)}
    >
      <div className="flex-1 text-xs space-y-2">
        {/* Date */}
        <p className="flex justify-between">
          Date:
          <span className="flex items-center gap-1 font-semibold">
            {new Date(txn.createdAt)?.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "numeric",}) || ""}
          </span>
        </p>

        {/* Type with icon and Pending/Refunded */}
        <p className="flex justify-between">
          Type:
          <span className="flex items-center gap-1 font-semibold">
            {isCredit ? (
              <ArrowDownLeft className={`w-4 h-4 ${txn?.paymentStatus === "success" ? "text-green-600" : ""}`} />
            ) : (
              <ArrowUpRight className={`w-4 h-4 ${txn?.paymentStatus === "success" ? "text-red-600" : ""}`} />
            )}
            {txn?.type?.charAt(0)?.toUpperCase() + txn?.type?.slice(1) || ""}
            {txn.paymentStatus === "pending" && " [Pending]"}
            {txn.paymentStatus === "refunded" && " [Refunded]"}
          </span>
        </p>

        {/* Payment Method */}
        <p className="flex justify-between">
          Payment Method: <span className="font-bold">{txn?.mode?.toUpperCase() || ""}</span>
        </p>

        {/* Amount */}
        <p className="flex justify-between">
          Amount: <span className="font-bold">₹ {txn.amount?.toLocaleString("en-IN") || ""}</span>
        </p>

        {/* Wallet balances */}
        {txn.mode === "wallet" && (
          <>
            <p className={`flex justify-between ${showFullCard ? "" : "hidden"}`}>
              Old Balance: <span className="font-bold">₹ {txn.oldBalance?.toLocaleString("en-IN") || ""}</span>
            </p>
            <p className={`flex justify-between border-t-2 ${borderColor} pt-1 ${showFullCard ? "" : "hidden"}`}>
              Current Balance: <span className="font-bold">₹ {txn.currentBalance?.toLocaleString("en-IN") || ""}</span>
            </p>
          </>
        )}

        {/* Expanded details */}
        {showFullCard && (
          <>
            <p className="flex justify-between">
              Details: <span className="font-bold">{txn?.details || ""}</span>
            </p>

            <p className="flex justify-between items-center">
              Transaction ID:
              <span className="flex items-center gap-2">
                <span className="truncate max-w-[140px] font-bold">{txn?.transactionId || ""}</span>
                <button onClick={handleCopy} className="p-1 rounded-full hover:bg-white/40 transition">
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-700" /> : <Clipboard className="w-4 h-4" />}
                </button>
              </span>
            </p>

            <p className="flex justify-between">
              Transaction Status:{" "}
              <span className={`font-bold py-0.5 rounded-md px-2 ${statusBadge}`}>
                {txn.paymentStatus?.charAt(0).toUpperCase() + txn.paymentStatus?.slice(1).toLowerCase() || ""}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
