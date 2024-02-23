"use client";
import DataListTable from "@/components/partials/table/DataListTable";
import ExamapleOne from "@/components/partials/table/ExampleOne";
import CompanyTable from "@/components/partials/table/company-table";
import React, { useState } from "react";
import { dummy_data } from "./data";
import Rating from "@/components/partials/Rating";
import StarRatingComponent from "react-star-rating-component";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";

console.log("dummy_data", dummy_data);

const TABLE_ROWS = dummy_data.flatMap((entry) => {
  // const mainDate = entry.date;
  const mainDate = moment(entry.date).format("YYYY MMM DD");
  let isFirstMovie = true; // Flag to track if it's the first movie in the group
  return entry.movies.map((movie, movieIndex) => {
    const date = isFirstMovie ? mainDate : "";
    isFirstMovie = false; // Set flag to false after the first movie
    return {
      date,
      id: `${date}-${movieIndex}`,
      title: movie.title,
      poster: movie.poster,
      genres: movie.genre ? movie.genre.join(", ") : "",
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

const StarterPage = () => {
  return (
    <>
      {/* <ExamapleOne></ExamapleOne>; */}
      <Card>
        <div className=" grid xl:grid-cols-2 grid-cols-1 gap-5">
          <Card title="React Select"></Card>
        </div>

        <DataListTable
          TABLE_COLUMNS={TABLE_COLUMNS}
          TABLE_ROWS={TABLE_ROWS}
          pageSize="5"
        ></DataListTable>
      </Card>
    </>
  );
};

export default StarterPage;
