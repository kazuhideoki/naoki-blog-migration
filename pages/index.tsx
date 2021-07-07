import { Button, Grid, Typography, CircularProgress } from "@material-ui/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";

import styles from "../styles/Home.module.css";

const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

export default function Home() {
  // const [posts, setPosts] = useState([]);

  const { data, error } = useSWR("/api/wordpress", fetcher);

  console.log({ data });

  // const handleFetchPosts = async () => {
  //   console.log("handleFetchPosts");

  //   const res = await fetch(`/api/wordpress`);
  //   console.log({ res });

  //   setPosts(res.body);
  // };
  if (error) return <>error : {error}</>;

  if (!data) return <CircularProgress />;

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h3">NAOKI Blog Migration </Typography>
      </Grid>
      <Grid item>
        {/* <Button onClick={() => handleFetchPosts()}>
          fetch blog post from website
        </Button> */}
      </Grid>
      <Grid item>
        {(data as any).map((post: any) => {
          console.log(post.title);

          return post.title.rendered;
        })}
      </Grid>
    </Grid>
  );
}

// export const getServerSideProps: GetServerSideProps =() => {

// }
