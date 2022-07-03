import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../common/atoms/loading';
import useAxios from '../custom_hooks/useaxios';

interface Data {
  rank: number;
  id: string;
}

function App() {
  const [rankData, load, error, setRankData] = useAxios<Data[]>('/rank');
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

  if (load) return <div>로딩중...</div>;

  return (
    <div>
      {rankData.map((ele) => (
        <div key={ele.rank}>
          RANK:
          {ele.rank}
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
