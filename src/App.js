import React, { useState, useEffect } from 'react';
import RankingList from './components/RankingList';
import Data from './data.json';

function App() {
  const [posts, setPosts] = useState([])
  // const GET_URL = 'https://webcdn.17app.co/campaign/pretest/data.json'

  useEffect(() => {
    // fetch(GET_URL, {method: 'GET'})
    // .then(res => res.json())
    //   .then(data => {
    //     const damiPosts = data
    //     for (let i = 0; i < data.length; i++) {
    //         damiPosts[i].rank = i
    //     }
    //     setPosts(damiPosts)
    //   })
    for (let i = 0; i < Data.length; i++) {
        Data[i].rank = i
    }
    setPosts(Data)
  }, [])

  if (posts.length === 0) {
    return false;
  }

  return (
    <RankingList posts={posts} setPosts={setPosts} />
  );
}

export default App;
