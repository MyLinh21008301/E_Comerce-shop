export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { userId, page, size } = req.query;
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/vendors/${userId}`);
  
  
  // Add query parameters to URL
  url.searchParams.append('page', page || 0);
  url.searchParams.append('size', size || 10);
  console.log('URL:', url.toString());
  console.log('Authorization:', req.headers.authorization);
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${req.headers.authorization}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}