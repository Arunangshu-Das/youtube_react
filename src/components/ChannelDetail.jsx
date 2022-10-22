import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetails, setChannelDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetails(data?.items[0])
    );
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);
  return (
    <Box minHeight="95px">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,0.7959558823529411) 0%, rgba(39,35,43,0.6867121848739496) 9%, rgba(72,66,50,1) 17%, rgba(104,125,107,0.6587009803921569) 27%, rgba(140,121,121,1) 46%, rgba(138,155,154,1) 59%, rgba(172,164,164,0.5130427170868348) 71%, rgba(191,189,173,1) 83%, rgba(112,130,207,0.6026785714285714) 90%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        ></div>
        <ChannelCard channelDetail={channelDetails} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
