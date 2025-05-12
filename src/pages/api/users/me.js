export default async function handler(req, res) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
  const targetUrl = `${backendUrl}/api/users/me`;


  const response = await fetch(targetUrl, {
    method: req.method,
    headers: {
      ...req.headers,
      host: undefined, // Loại bỏ header host để tránh xung đột
    },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.json();
  res.status(response.status).json(data);
  // res.status(200).json({
  //   id: "e2929e6d-b599-498f-95a3-d07b9a45d6d2",
  //   username: "hegolplay",
  //   firstName: "Phạm",
  //   lastName: "Hải",
  //   email: "test@gmail.com"
  // });
}