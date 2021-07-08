import {
  AccordionSummary,
  Button,
  CircularProgress,
  Grid,
  AccordionDetails,
  Typography,
  OutlinedInput,
  Accordion,
} from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { OriginalPost } from "../types/post.type";

//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const TAG_ID_EN = 109;

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState("1");
  const [page, setPage] = useState(1);
  let { data, error } = useSWR<OriginalPost[]>(
    `/api/wordpress?page=${page}`,
    fetcher
  );

  console.log({ data });

  useEffect(() => {
    const query = {} as any;
    query.page = page;
    router.replace({ query });
  }, [page]);

  if (error) return <>error : {error}</>;

  if (!data) return <CircularProgress />;

  const filtered = data.filter((e) => e.tags.includes(TAG_ID_EN));

  console.log({ filtered });

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
        <Button onClick={() => router.reload()}>更新</Button>
      </Grid>
      <Grid item>
        <OutlinedInput
          id="page"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") setPage(Number(value));
          }}
        />
        <Button
          onClick={() => {
            setPage(Number(value));
            router.reload();
          }}
        >
          ページ移動
        </Button>
      </Grid>
      <Grid item container>
        {filtered.length &&
          filtered.map((post, i) => {
            return (
              <Grid key={i} item container>
                <Accordion>
                  <AccordionSummary>{post.title.rendered}</AccordionSummary>
                  <AccordionDetails>
                    <Accordion>
                      <AccordionSummary>
                        <img
                          src={post.jetpack_featured_media_url}
                          width={100}
                          height={100}
                        />
                        {post.excerpt.rendered}
                      </AccordionSummary>
                      <AccordionDetails>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.content.rendered,
                          }}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
}
