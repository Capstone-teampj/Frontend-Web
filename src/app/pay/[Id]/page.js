"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function PayPage() {
  const searchParams = useSearchParams();

  const items = searchParams.get("items")
    ? JSON.parse(searchParams.get("items"))
    : [];
  const totalAmount = searchParams.get("total")
    ? parseInt(searchParams.get("total"), 10)
    : 0;

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
        onClick={() => {
          alert("결제가 완료되었습니다!");
        }}
      >
        결제하기
      </button>
    </div>
  );
}
