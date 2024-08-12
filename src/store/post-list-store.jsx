import { createContext, useReducer, useCallback, useEffect, useState } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => { },
  fetching: false,
  updatePost: () => { },
  deletePost: () => { },
});

const postListReducer = (currPostList, action) => {

  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_Initial_POSTS") {
    newPostList = action.payload.post;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    []
  );
  



  const addPost = (post) => {
    console.log('addPost', post);
    dispatchPostList({
      type: "ADD_POST",
      payload:
        post,
    });
  };
  const addInitialPost = (post) => {
    // console.log('addInitialPost', post);
    dispatchPostList({
      type: "ADD_Initial_POSTS",
      payload: {
        post,
      },
    });
  };

  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DELETE_POST",
        payload: {
          postId,
        },
      });
    },
    [dispatchPostList]
  );

  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPost(data.posts);
        setFetching(false);

      });
    return () => {
      console.log("");
      controller.abort();
    };
  }, []);
  return (
    <PostList.Provider value={{ postList, addPost, fetching, deletePost }}>
      {children}
    </PostList.Provider>
  );
};


export default PostListProvider;
