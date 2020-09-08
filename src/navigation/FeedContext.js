import React, {createContext, useState} from 'react';

export const FeedContext = createContext({});

export const FeedProvider = ({children}) => {
  const [posts, setPosts] = useState([]);

  return (
    <FeedContext.Provider
      value={{
        posts,
        setPosts,
      }}>
      {children}
    </FeedContext.Provider>
  );
};
