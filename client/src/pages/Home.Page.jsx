import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { urlApi } from '../apis/url.apis'
import { Typography } from '@material-ui/core';

const Home = () => {
    const [url, setUrl] = useState("");
    const [shortUrl, setshortUrl] = useState();

    const onChangeHandle = (e) => {
        setUrl(e.target.value)
    }
    const postUrl = () => {
        urlApi({ originalUrl: url }).then((res) => {
            console.log(res)
            const { data: { createUrl: { shortUrl } } } = res;
            setshortUrl(shortUrl)
        }).catch((err) => {
            const message = (err.response.data && err.response.data.message) ? err.response.data.message : err.message;
            alert(message);
        })
    }
    const CustomeButton = () => {
        return (
            <Button
                variant='contained'
                color="secondary"
                disableElevation
                onClick={postUrl}
            >
                Shorten
            </Button>)
    }
    return (
        <div className="container">
            <div className="row">
                <div className="mt-5">

                    <TextField
                        id="standard-name"
                        label="Enter URL"
                        variant="outlined"
                        value={url}
                        placeholder="Enter the URL ......"
                        fullWidth
                        InputProps={{
                            endAdornment: < CustomeButton />
                        }}
                        onChange={onChangeHandle}
                    />
                    <div className="mt-5 text-center">
                        <Typography>
                            <a href={`http://localhost:5000/api/url/${shortUrl}`} target="_blank" >{shortUrl}</a>
                        </Typography>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;
