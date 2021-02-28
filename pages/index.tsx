import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

import queryGraphql from "../shared/query-graphql";

import NewsList from "../components/NewsList";
import Header from "../components/Header";
import Meta from "../components/Meta";

import styles from "../styles/Home.module.css";

export default function NewsListing({ news }) {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState(news);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [previousDisabled, setpreviousDisabled] = useState(true);

  // Change page content
  const handleContentChange = async (input: number) => {
    
    let pageNumber = input === 1 ? page + 1 : page - 1;
    
    interface FetchQuery {
      method: string;
      body: BodyInit;
    }

    let fetchQuery: FetchQuery ={
      method: "POST", body: JSON.stringify(pageNumber)
    }

    
    let results = await fetch(`/api/page`, fetchQuery);
    let { news } = await results.json();
    console.log(news);
    setContent(news);
    setPage(pageNumber);
    window.scrollTo(0, 0);

    if (pageNumber !== 1) {
      setpreviousDisabled(false);
    } else {
      setpreviousDisabled(true);
    }
    if (news.length === 30) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  };

  /*  

Logic: 
1) Page 1 => No previous page button
2) If content count is not 30, then no next page button

 */
  return (
    <>
      <Meta />
      <div className={styles.wrapper}>
        <div className={styles.newsContainer}>
          <Header />
          <NewsList news={content} />

          <div className={styles.pageContainer}>
            <div className={styles.previousButton}>
              <IconButton disabled={previousDisabled} onClick={() => handleContentChange(0)}>
                <NavigateBeforeIcon />
              </IconButton>
            </div>
            <div className={styles.pageNumber}>
              <p>{page}</p>
            </div>
            <div className={styles.nextButton}>
              <IconButton disabled={nextDisabled} onClick={() => handleContentChange(1)}>
                <NavigateNextIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Pre-render the posts, then inject the data into NewsList component
export const getStaticProps: GetStaticProps = async () => {
  const { news } = await queryGraphql(
    `
    query {
      news(page:1) {
        id
        title
        points
        author
        time
        comments
        link
      }
    }
  `,
  );
  return { props: { news } };
};
