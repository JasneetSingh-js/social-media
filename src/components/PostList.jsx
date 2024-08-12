import { useContext, useEffect,useState} from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";

import Loadingspinner from "./Loadingspinner";
const PostList = () => {
  const { postList, fetching} = useContext(PostListData);
  //const[fetching,setFetching]=useState(false);
  
  // console.log(postList);

  
  return (
    <>
    {fetching&&<Loadingspinner/>}
    {
      !fetching&& postList.length === 0 && <WelcomeMessage  />
    }
      {!fetching&& postList.map((post)=> 
        <Post key={post.id} post={post} />
      )}
    </>
  );
};

export default PostList;
