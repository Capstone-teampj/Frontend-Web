"use client";
import "../../../../styles/globals.css";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState([]);
  const router = useRouter();
  const { Id } = useParams();

  const menu = [
    { id: 1, name: "Americano", price: 3000, promotion: false },
    { id: 2, name: "Latte", price: 4000, promotion: true },
    { id: 3, name: "Cappuccino", price: 4500, promotion: false },
    { id: 4, name: "Mocha", price: 5000, promotion: true },
  ];

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOrder = () => {
    const selectedMenu = selectedItems.map((id) =>
      menu.find((item) => item.id === id)
    );
    const totalAmount = selectedMenu.reduce((sum, item) => sum + item.price, 0);

    // 쿼리 문자열로 데이터 전달
    const queryString = new URLSearchParams({
      items: JSON.stringify(selectedMenu),
      total: totalAmount.toString(),
    }).toString();

    router.push(`/pay/${Id}?${queryString}`);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <header className="text-center font-bold text-2xl p-4">매장 이름</header>

      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        {menu.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer 
              ${
                selectedItems.includes(item.id)
                  ? "bg-teal-100 border-teal-500"
                  : "bg-white border-gray-300"
              }`}
            onClick={() => toggleSelect(item.id)}
          >
            <div className="text-lg font-medium">{item.name}</div>
            <div className="text-sm font-semibold">
              {item.price.toLocaleString()}원
              {item.promotion && (
                <span className="ml-2 text-orange-500 text-xs font-bold">
                  프로모션
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        className="w-full py-3 bg-teal-600 text-white text-lg font-bold rounded-none hover:bg-teal-700"
        onClick={handleOrder}
      >
        주문하기
      </button>
    </div>
  );
}
