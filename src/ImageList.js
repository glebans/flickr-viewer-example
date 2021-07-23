import React, { Fragment, useState, useEffect } from 'react';
import Flickr from 'flickr-sdk';
import store from 'store';
import MediaCard from './MediaCard';
import TextField from '@material-ui/core/TextField';
import {  makeStyles, Box } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    padding: theme.spacing(1.2)
  },
  avatar: { marginRight: theme.spacing(5) },
  paginator: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "10px"
  }
}));

export default function ImageList(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(props.phrase);
  const [search, setSearch] = useState({
    search: '',
    page: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmark] = useState([]);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    var flickr = new Flickr('1d46b87ab0b528fc412e9d4b426bd4f5');
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await flickr.photos.search({
          text: query,
          per_page: 30,
          page: search.page,
          sort: 'relevance',
          extras: 'url_s, tags, description'
        });
        let images = result.body.photos.photo.map(item => {
          item.bookmarked = false;
          return item
        });
        setTotalPages(result.body.photos.pages);
        setData(images);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [search]);

  const handlePageChange = (event, value) => {
    setSearch({
      search: search.search,
      page: value
    });
  }

  return (
    <Fragment>
      <form onSubmit={event => {
        props.setQuery(query);
        setSearch({
          search: query,
          page: search.page
        });
        event.preventDefault()
      }}>
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Type smth and press enter"
          fullWidth
          value={query}
          margin="normal"
          onChange={event => {
            setQuery(event.target.value)
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
         <Box component="span">
           <Pagination
             count={totalPages}
             page={search.page}
             onChange={handlePageChange}
             defaultPage={1}
             color="primary"
             size="large"
             showFirstButton
             showLastButton
             classes={{ ul: classes.paginator }}
           />
         </Box>

      {isError && <div>Something went wrong...</div>}

      {isLoading ? (<div>Loading...</div>) : (

        <ul className='list-container'>
          {data.map(item => {
            return (
              <li className='list-item' key={item.id}>
                <MediaCard data={item}
                  bookmarkItem={bookData => {
                    item.bookmarked = true;
                    setBookmark([...bookmarks, item]);
                    store.set(bookData.id, bookData);
                  }}
                  removeBookmark={bookData => {
                    store.remove(bookData.id);
                    item.bookmarked = false;
                    let newBookmarks = bookmarks.filter(function (el) {
                      return el.id !== bookData.id
                    })
                    setBookmark(newBookmarks);
                  }}
                ></MediaCard>
              </li>)
          })}
        </ul>
         
      )}
    </Fragment>
  );
}
