"use client";
import nextConfig from "../../../../next.config.js";
import "../../../../styles/globals.css";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const url = "http://192.168.161.24:8080";
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNkIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTczMjc3MDY3MywiZXhwIjoxNzMyODU3MDczfQ.cfAsAod1XFjffFEdVxgkAO8oqDtMw5CkoC5GyzAb0rA";
  const [menu, setMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const { Id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8080/api/menus/store/${Id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    })
      // fetch(`/api/order/${Id}`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      .then((response) => response.json())
      .then((data) => setMenu(data))
      .catch((error) => console.log(error));
  }, []);
  // const menu = [
  //   { id: 1, name: "Americano", price: 3000, promotion: false },
  //   { id: 2, name: "Latte", price: 4000, promotion: true },
  //   { id: 3, name: "Cappuccino", price: 4500, promotion: false },
  //   { id: 4, name: "Mocha", price: 5000, promotion: true },
  // ];

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setSelectedItems((updatedSelectedItems) => {
      setOrders(
        updatedSelectedItems.map((id) => ({
          menuId: id,
          quantity: 1,
        }))
      );
      return updatedSelectedItems;
    });
    // setOrders(
    //   (prev) =>
    //     selectedItems.map((id) => {
    //       return { menuId: id, quantity: 1 };
    //     })
    //   // prev.menuId === id ? prev.filter((item) => item !== id) : [...prev, { menuId: id, quantity: 1 }]
    // );
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

    // selectedItems.map((id) =>
    //   setOrders((prev) => [...prev, { menuId: id, quantity: 1 }])
    // );
    console.log(orders);
    //  주문 전송
    fetch(url + "/api/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuOrders: orders,
      }),
    }).catch((error) => console.log(error));

    router.push(`/pay/${Id}?${queryString}`);
  };

  return menu ? (
    <div className="flex flex-col justify-between min-h-screen">
      <header className="text-center font-bold text-2xl p-4">
        주문 페이지
      </header>

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
              {item.price.toLocaleString()}원{/* 프로모션 유무 */}
              {false && (
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
  ) : null;
}
