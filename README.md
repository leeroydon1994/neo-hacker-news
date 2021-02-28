# Neo Hacker News

This application extract news data from [Hacker News](https://news.ycombinator.com/news), and rearrange the posts by the comment count descendingly in each page.

## Setup Instructions

First clone this project repository to your local machine with:

```bash
git clone https://github.com/leeroydon1994/neo-hacker-news.git
```

Install all modules with:

```bash
npm i
# or
yarn
```

Then run the application with:

```bash
npm run dev
# or
yarn dev
```

## Data Structure

In this applicaiton, I decide to use array as the main data structure, since frequent insertion and deletion of data, which linked list are preferred, are not emphasised in this case. Rendering the news content can be accomplished with simplier logic by using array.

## Known Issues & Future Improvements Expected

One issue is found. For the next page button, it is still active in the last page if it has 30 posts inside. Users may click it and no further post data is shown in this case.

In the future, transition animation is planned to add into the application, so as to provide a better UI to users.
