"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function PayPage() {
  // const token =
  //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNzMzMDUxMDE1LCJleHAiOjE3MzMxMzc0MTV9.ToEpEzsREZv20vW-NfY3Y-qs4B-OceL6o0LO1cOIRUQ";
  const searchParams = useSearchParams();
  const router = useRouter();
  const { Id, url, token } = useParams();
  const decodedToken = atob(decodeURIComponent(token));
  const decodedUrl = atob(decodeURIComponent(url));

  const items = searchParams.get("items")
    ? JSON.parse(searchParams.get("items"))
    : [];
  const totalAmount = searchParams.get("total")
    ? parseInt(searchParams.get("total"), 10)
    : 0;

  async function payHandler() {
    try {
      const response = await fetch(decodedUrl + `/api/orders/store/${Id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${decodedToken}`,
          accept: "*/*",
        },
      });
      const orders = await response.json();
      console.log(orders);
      const unexpired = orders.filter((order) => !order.expired);
      console.log(unexpired);

      if (unexpired.length > 0) {
        fetch(decodedUrl + `/api/orders/${unexpired[0].orderId}/expire`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${decodedToken}`,
            accept: "*/*",
            "Content-Type": "application/json",
          },
        });
      }
      router.push("/paymentSuccess");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col justify-between min-h-screen p-4">
      <header className="text-center font-bold text-2xl mb-4">
        결제 페이지
      </header>

      <div className="flex-1 overflow-y-auto space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between p-3 border-b border-gray-300"
          >
            <span>{item.name}</span>
            <span>{item.price.toLocaleString()}원</span>
          </div>
        ))}
      </div>

      <div className="text-right font-bold text-lg mt-4">
        총 결제 금액: {totalAmount.toLocaleString()}원
      </div>

      <button
        className="w-full py-3 mt-6 bg-teal-600 text-white text-lg font-bold rounded-lg hover:bg-teal-700"
        onClick={payHandler}
      >
        결제하기
      </button>
    </div>
  );
}
