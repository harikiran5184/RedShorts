import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Array() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/video/')
      .then((res) => {
        const videoData = res.data.map(element => element.video);
        const uniqueVideos = [...new Set(videoData)];
        setData(uniqueVideos);
        console.log(uniqueVideos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <input type='hidden' id='ar' value={data} ></input>
    </div>
  );
}

export default Array;
