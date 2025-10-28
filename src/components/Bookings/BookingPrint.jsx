import React, { useEffect, useRef, useState } from "react";
import Invoice from "../Bookings/Invoice";
import { useReactToPrint } from "react-to-print";

const PrintInvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice",
  });

  useEffect(() => {
    const fetchInvoice = async () => {
      const res = await fetch("http://localhost:3000/api/bookings/invoices/6862e27aac5816d7b7a991df");
      const data = await res.json();
      setInvoiceData(data);
    };

    fetchInvoice();
  }, []);


  useEffect(() => {
  if (componentRef.current) {
    console.log("✅ componentRef.current exists:", componentRef.current);
  } else {
    console.warn("❌ componentRef is still null");
  }
}, [invoiceData]);

  if (!invoiceData) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {/* ✅ Wrap your invoice inside a ref container */}
      <div ref={componentRef}>
        <Invoice data={invoiceData} />
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={handlePrint}
          disabled={!invoiceData}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🖨️ Print Invoice 
        </button>
      </div>
    </div>
  );
};

export default PrintInvoicePage;
