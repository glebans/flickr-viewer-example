import React, { Fragment, useState, useEffect } from 'react';
import store from 'store';
import MediaCard from './MediaCard';

export default function BookmarksList() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            setIsError(false);
            setIsLoading(true);
            try {
                let localData = [];
                store.each(function (value, key) {
                    localData = [...localData, value];
                })
                setData(localData);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <Fragment>
            <ul className='list-container'>
                {data.map(item => {
                    return (
                        <li className='list-item' key={item.id}>
                            <MediaCard data={item}
                                bookmarkItem={bookData => {
                                    console.log('yay');
                                }}
                                removeBookmark={bookData => {
                                    store.remove(bookData.id);
                                    item.bookmarked = false;
                                    let newBookmarks = data.filter(function (el) {
                                        return el.id !== bookData.id
                                    })
                                    setData(newBookmarks);
                                }}></MediaCard>
                        </li>)
                })}
            </ul>
        </Fragment>
    )
}