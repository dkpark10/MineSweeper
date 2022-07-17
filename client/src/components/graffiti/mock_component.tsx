import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../common/atoms/loading';
import useFetch from '../custom_hooks/usefetch';

interface Data {
  id: string;
  record: string;
  ranking: number;
  totalItemCount: number;
}

function App() {
<<<<<<< HEAD
  const [rankData, load, error, setRankData] = useAxios<Data[]>('/api/game/easy?page=1');
=======
  const [rankData, load, error, setRankData] = useFetch<Data[]>('/rank');
>>>>>>> 2048
  // const [rankData, setUserData] = useState<Data[]>([]);
  // const [load, setLoading] = useState(false);

  // const getUser = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get('http://localhost:8080/rank');
  //     setUserData(response.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  if (load) {
    return <Loading />;
  }

  return (
    <div>
      {rankData.map((ele) => (
        <div key={ele.ranking}>
          RANK:
          {ele.ranking}
          ID:
          {ele.id}
        </div>
      ))}
    </div>
  );
}

export default function TestComponent() {
  return <App />;
}
