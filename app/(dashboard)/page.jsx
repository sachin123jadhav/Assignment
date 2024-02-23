"use client";
import BranchListTable from "@/components/partials/table/BranchListTable";
import ExamapleOne from "@/components/partials/table/ExampleOne";
import CompanyTable from "@/components/partials/table/company-table";
import React from "react";
import { dummy_data } from "./data";
import Rating from "@/components/partials/Rating";

console.log("dummy_data",dummy_data)


const TABLE_ROWS = dummy_data.flatMap((entry) => {
  const mainDate = entry.date;
  let isFirstMovie = true; // Flag to track if it's the first movie in the group
  return entry.movies.map((movie, movieIndex) => {
    const date = isFirstMovie ? mainDate : ""; // Show date only for the first movie
    isFirstMovie = false; // Set flag to false after the first movie
    return {
      date,
      id: `${date}-${movieIndex}`,
      title: movie.title,
      poster: movie.poster,
      genres: movie.genre ? movie.genre.join(", ") : "",
      rating: movie.imdb_rating,
      yearRelease: movie.released,
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
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Poster",
    accessor: "poster",
    Cell: ({ cell: { value } }) => (
      <img src={value} alt="Poster" style={{ width: "50px", height: "auto" }} />
    ),
  },
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
      <BranchListTable
        TABLE_COLUMNS={TABLE_COLUMNS}
        TABLE_ROWS={TABLE_ROWS}
        pageSize="5"
      ></BranchListTable>

      <Rating></Rating>
    </>
  );


};

export default StarterPage;
