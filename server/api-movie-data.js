const converter = require('json-2-csv');
const fs = require('fs');

require('dotenv').config();
const apiToken = process.env.API_TOKEN;

const fetchData = async () => {
  //array of numbers from 1 to 50 to call api
  const params = Array.from({ length: 50 }, (_, i) => i + 1);

  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiToken}`
      }
    };
  
    //store json movie results in list
    let json_movie_lst = [];
    for (const param of params) {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${param}`, options);
      const data = await res.json();

      //results field of json contains movies
      json_movie_lst.push(data.results);
    }

    //flatten json list to put in csv file
    const csv = await converter.json2csv(json_movie_lst.flat());
    createCSV("data.csv", csv);
  } catch (error) {
    console.error("There was a problem fetching data: ", error);
  }
}

//create csv file 
const createCSV = (file_path, data) => {
   fs.writeFile(file_path, data, (err) => {
     if (err) {
       console.error("Error creating csv file: ", err);
     } else {
       console.log("CSV file generated");
     }
   });
}

//call api
fetchData();

