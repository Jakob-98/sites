import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineEye } from 'react-icons/ai';

const ViewButton = ({ url, addViewOnMount }) => {
    const [views, setViews] = useState(null);
    const [viewed, setViewed] = useState(false);

    useEffect(() => {
        // If addViewOnMount is true, add a view when the component mounts
        if (addViewOnMount) {
            addView();
        } else {
            // Otherwise, just get the current view count
            getView();
        }
    }, [url, addViewOnMount]);

    const getView = () => {
        const getViewUrl = `https://jsites.azurewebsites.net/get_views`;

        axios.get(getViewUrl, { params: { url } })
            .then(response => {
                setViews(response.data.views);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setViews(0); // If 404, then set views to 0
                } else {
                    console.error("Error fetching views:", error);
                }
            });
    };

    const addView = () => {
        const addViewUrl = `https://jsites.azurewebsites.net/add_view`;

        axios.post(addViewUrl, { url })
            .then(response => {
                setViews(response.data.views);
                setViewed(true);
            })
            .catch(error => {
                console.error("Error adding view:", error);
            });
    };

    // Only render the button if views have been fetched (views is not null)
    return views !== null && (
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 0}}>
            <AiOutlineEye size="1.5em" />
            <span style={{ marginLeft: '8px' }}>{views}</span>
        </div>
    );
};

export default ViewButton;