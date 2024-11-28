import axios from "axios";

export default async function handler(req, res) {
  // 동적 경로에서 ID를 받아옵니다.
  const { id } = req.query;
  const url = "http://192.168.161.24:8080";
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNkIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTczMjc3MDY3MywiZXhwIjoxNzMyODU3MDczfQ.cfAsAod1XFjffFEdVxgkAO8oqDtMw5CkoC5GyzAb0rA";
  try {
    const response = await axios(url + `/api/menus/store/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
