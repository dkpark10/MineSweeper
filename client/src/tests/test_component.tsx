import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
      setUserData(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <div>로딩중..</div>;

  if (!userData) return null;

  return (
    <div>
      <p>
        <b>Username: </b>
        {userData.username}
      </p>
      <p>
        <b>Email: </b>
        {userData.email}
      </p>
    </div>
  );
}
