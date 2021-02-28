import { Grid } from "@material-ui/core";

import NewsCard from "./NewsCard";

const NewsList = ({ news }) => {
  return (
    <div className="news-list">
      <Grid container spacing={5}>
        {news.map((element:any) => (
          <NewsCard element={element} key={element.id} />
        ))}
      </Grid>
    </div>
  );
};

export default NewsList;
