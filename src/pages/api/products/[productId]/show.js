export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { productId } = req.query;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productId}/show`;
  console.log("SHOW")
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${req.headers.authorization}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return 'success';
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}