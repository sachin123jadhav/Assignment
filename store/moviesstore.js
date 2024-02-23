import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST, defaultHeaders } from "@/configs/https";


const initialState = {
    moviesdata: null,
};

export const moviesstore = createSlice({
    name: "moviesstore",
    initialState,
    reducers: {
        getMovies: (state, action) => {
            state.moviesdata = action.payload;
        }
    }
})


export const getMoviesData = (setLoader) => async (dispatch) => {
    const localHeader = {
    //   Authorization: `Token ${token}`,
    };
    try {
        setLoader(true)
        const res = await axios({
            method: "GET",
            url: API_HOST + `/movie/movie_dashboard/`,
            headers: localHeader,
        });
        console.log("response",res?.data?.data)
        dispatch(getMovies(res?.data?.data));
        setLoader(false)
    } catch (error) {
        console.log("Not getting Response From api", error);
    }
};



export const {
   getMovies,
  } = moviesstore.actions;
  
export const getMovieSelector = (state) => state.moviesstore.moviesdata;

export default moviesstore.reducer;
