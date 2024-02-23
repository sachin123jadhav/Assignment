"use client";
import DataListTable from "@/components/partials/table/DataListTable";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { dummy_data } from "@/app/(dashboard)/data";
import Rating from "@/components/partials/Rating";
import StarRatingComponent from "react-star-rating-component";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import { getMovieSelector, getMoviesData, getGenerSelector, getGenerData, getFilterData, getFilterSelector } from "@/store/moviesstore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import { Controller } from 'react-hook-form';
import Badge from "../ui/Badge";


console.log("dummy_data", dummy_data);


const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

// const TABLE_ROWS = dummy_data.flatMap((entry) => {
//   // const mainDate = entry.date;
//   const mainDate = moment(entry.date).format("YYYY MMM DD");
//   let isFirstMovie = true; // Flag to track if it's the first movie in the group
//   return entry.movies.map((movie, movieIndex) => {
//     const date = isFirstMovie ? mainDate : "";
//     isFirstMovie = false; // Set flag to false after the first movie
//     return {
//       date,
//       id: `${date}-${movieIndex}`,
//       title: movie.title,
//       poster: movie.poster,
//       genres: movie.genre ? movie.genre.join(", ") : "",
//       rating: (
//         <div className="text-start" style={{ minWidth: "190px" }}>
//           <StarRatingComponent
//             name="rate2"
//             editing={false}
//             renderStarIcon={() => <FaStar />}
//             starCount={10}
//             value={movie.imdb_rating}
//           />
//         </div>
//       ),
//       yearRelease: movie.year,
//       metacriticRating: movie.meta_score,
//       runtime: movie.runtime,
//     };
//   });
// });



const TABLE_COLUMNS = [
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Poster",
    accessor: "poster",
    Cell: ({ cell: { value } }) => (
      <img src={value} alt="Poster" style={{ width: "50px", height: "auto" }} />
    ),
  },
  {
    Header: "Movie Title",
    accessor: "title",
  },

  // {
  //   Header: "Movie Details",
  //   accessor: "details",
  //   Cell: ({ row: { original } }) => (
  //     <div style={{ display: "flex", alignItems: "center" }}>
  //       <div style={{ marginRight: "10px" }}>
  //         <img src={original.poster} alt="Poster" style={{ width: "50px", height: "auto" }} />
  //       </div>
  //       <div style={{flex:"1"}}>{original.title}</div>
  //     </div>
  //   ),
  // },
  {
    Header: "Genre(s)",
    accessor: "genres",
  },
  {
    Header: "Rating",
    accessor: "rating",
  },
  {
    Header: "Year Release",
    accessor: "yearRelease",
  },
  {
    Header: "Metacritic Rating",
    accessor: "metacriticRating",
  },
  {
    Header: "Runtime",
    accessor: "runtime",
  },
];

const All = () => {
  const { control } = useForm();
  const dispatch = useDispatch();
  // const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(true);
  const [movieData, setMovieData] = useState([]);
  const [generData, setGenerData] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const getGenerDataSelector = useSelector(getGenerSelector);
  const getMovieDataSelector = useSelector(getMovieSelector);
  const getFilterDataSelector = useSelector(getFilterSelector);



  useEffect(() => {
    dispatch(getMoviesData(setLoader));
    dispatch(getGenerData(setLoader1));

  }, []);
  useEffect(() => {
    if (getGenerDataSelector) {
      setGenerData(getGenerDataSelector);
    }
  }, [getGenerDataSelector]);

  useEffect(() => {
    if (getMovieDataSelector) {
      setMovieData(getMovieDataSelector);
    }
  }, [getMovieDataSelector]);

  // console.log("movieData", generData)


  const TABLE_ROWS = movieData.flatMap((entry) => {

    const mainDate = moment(entry.date).format("YYYY MMM DD");
    // const mainDate = entry.date
    let isFirstMovie = true;
    return entry.movies.map((movie, movieIndex) => {
      const date = isFirstMovie ? mainDate : "";
      isFirstMovie = false;
      return {
        date,
        id: `${date}-${movieIndex}`,
        title: movie.title,
        poster: movie.poster,
        // genres: movie.genre ? movie.genre.map(genre => genre.name).join(", ") : "",
        genres: (
          <div>
            {movie.genre && movie.genre.map((genre, index) => (
              <Badge
                key={index} // Make sure to provide a unique key for each Badge
                label={genre.name}
                className="bg-primary-500 text-white mr-2 mb-2" // Add your custom class here
              />
            ))}
          </div>
        ),

        rating: (
          <div className="text-start" style={{ minWidth: "190px" }}>
            <StarRatingComponent
              name="rate2"
              editing={false}
              renderStarIcon={() => <FaStar />}
              starCount={10}
              value={movie.imdb_rating}
            />
          </div>
        ),
        yearRelease: movie.year,
        metacriticRating: movie.meta_score,
        runtime: movie.runtime,
      };
    });
  });


  const FormValidationSchema = yup.object({

  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),

  });


  const onSubmit = async (data) => {
    console.log("data", data.title, data.geners, data)
    dispatch(getFilterData(setLoader, data.title, data.geners));

    const filteredData = await getFilterDataSelector;
    console.log("getFilterDataSelector", filteredData)
    setMovieData(filteredData)

  };


  // console.log(TABLE_ROWS, TABLE_COLUMNS)
  return (
    <>
      {/* <ExamapleOne></ExamapleOne>; */}
      <div className="lg:col-span-3 col-span-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textinput
            name="title"
            label="Movie title"
            type="text"
            register={register}
            error={errors.companyname}
            placeholder="Mission: Impossible – Fallout (2018)"
            msgTooltip
          />

          <div>
            <div>
              <label className="form-label" htmlFor="mul_1">
                Geners
              </label>
              <Select
                name="geners"
                isClearable={false}
                defaultValue={[generData[2], generData[3]]}
                styles={styles}
                isMulti

                options={generData?.map((item) => ({
                  value: item.id, // Assuming item.id is the ID of the company type
                  label: item.name,
                  // You can include other attributes as needed
                }))}

                register={register}
                className="react-select"
                classNamePrefix="select"
                id="mul_1"
              />
            </div>
          </div>

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Submit</button>
          </div>

        </form>
      </div>
      <Card>
        <div className=" grid xl:grid-cols-2 grid-cols-1 gap-5">

        </div>
        {loader ? "loading......" : TABLE_ROWS && TABLE_COLUMNS && (

          <DataListTable
            TABLE_COLUMNS={TABLE_COLUMNS}
            TABLE_ROWS={TABLE_ROWS}
            pageSize="5"
          ></DataListTable>

        )}
      </Card>
    </>
  );
};

export default All;
