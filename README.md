# Movie Recommender 🎬

## Demo
Here is a demo of the project: [Movie Recommender System Demo](https://drive.google.com/file/d/197zO0z-mUt50IhaOWhSMHDgx47RZvU2i/view?usp=sharing)

## Overview
This project implements a Movie Recommender System that suggests similar movies based on user's perfered movie's description. Built using the TMDB API for movie data, it leverages powerful Natural Language Processing (NLP) techniques to provide accurate recommendations.

## Dataset
The movie dataset is sourced using the [TMDB API](https://www.themoviedb.org/?language=en-US)

Key features used from dataset: 
- **Title**: Movie title
- **Description**: Movie synopsis 

The data is stored locally in data.csv file. 

## Objective
The project's goal is to answer the question:
> Given a movie's description, what other movies are similar to it?
- Input: Movie's description
- Output: Content-based movie recommendations

## Methodology  
The recommender system is powered by:
1. TF-IDF (Term Frequency-Inverse Document Frequency): Converts movie descriptions into numerical vectors, capturing their significance.
2. Cosine Similarity: Efficiently measures the similarity between the vectors to identify movies with the most relevant descriptions.

## Future Enhancements
This project has room for improvement. Some potential enhancements include:
1. Expanded Input Options: Currently, the recommender uses a single movie to suggest similar titles. To mitigate the cold start problem, additional user inputs or preferences could be incorporated for more personalized recommendations.
2, Hybrid Recommendation Model: Integrate collaborative filtering to complement the content-based approach. By leveraging both user preferences and movie characteristics, the system could provide more accurate and diverse recommendations.


## Installation & Setup
1. Ensure you have Python installed.
2. Install the required packages using (if not already installed):
    - ```pip install pandas sklearn```
3. Clone this repository 
    -  Ensure all files are in correct directory! Check the directory structure below
    ``` git clone <this-repo-url>
        cd movie_recommender
    ```
4. Run the app locally! 
    To start the client use 
    ```
        cd client 
        npm run dev
    ```
    To start the server
    ```
        cd server 
        node server.js
    ```
    To start flask use
    ```
        cd server 
        python3 ml_api.py
    ```

Here is the directory structure:
```
movie_recommender/
├── client/
│   ├──src/
│      ├──App.tsx
│      ├──ChooseMovie.tsx
│      ├──MovieRecsDisplay.tsx
├── server/
│   ├── data.csv
│   ├── recommendation.py
│   ├── ml_api.py
│   ├── api-movie-data.js
├── README.md
```