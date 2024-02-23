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
import { getMovieSelector, getMoviesData } from "@/store/moviesstore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";

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
  const dispatch = useDispatch();
  // const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [movieData, setMovieData] = useState([]);
  const getMovieDataSelector = useSelector(getMovieSelector);

  useEffect(() => {
    dispatch(getMoviesData(setLoader));
  }, []);

  useEffect(() => {
    if (getMovieDataSelector) {
      setMovieData(getMovieDataSelector);
    }
  }, [getMovieDataSelector]);

  // console.log("movieData", movieData)


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
        genres: movie.genre ? movie.genre.map(genre => genre.name).join(", ") : "",
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
  const onSubmit = (data) => {
    console.log("data",data)

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
            <label htmlFor=" hh" className="form-label ">
              Company Type
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={companyType?.[0]}
              //options={companyType?.map((item)=>item.company_type)}
              // options={companyType?.map((item) => ({
              //   value: item.id, // Assuming item.id is the ID of the company type
              //   label: item.company_type,
              //   // You can include other attributes as needed
              // }))}
              // value={companyType.map((item)=>item.company_type)}
              styles={styles}
              register={register}
              name="compnaytype"
              id="compnaytype"
            />
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
