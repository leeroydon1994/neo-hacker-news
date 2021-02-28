import { Grid, Card, CardContent } from "@material-ui/core";

import styles from "../styles/NewsCard.module.css";

const NewsCard = ({ element }) => {
  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <a className={styles.newsCard} href={element.link} target="_blank" rel="noopener noreferrer" >
          <Card
            variant="outlined"
            style={{ height: "100%", backgroundColor: "#f4f4f4", boxShadow: "0 0.5rem 1rem -0.75rem rgba(0,0,0,0.3)" }}
          >
            <CardContent>
              <h2 className={styles.newsTitle}>{element.title}</h2>
              <p className={styles.newsInfo1}>
                <span>{element.author}</span>・{element.time}
              </p>
              <p className={styles.newsInfo2}>
                {element.comments} comments・{element.points} points
              </p>
              <p className={styles.newsInfo3}>{element.link}</p>
            </CardContent>
          </Card>
        </a>
      </Grid>
    </>
  );
};

export default NewsCard;
