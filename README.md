# Movie Recommender 🎬

## Overview
This project implements a Movie Recommender System that suggests similar movies based on their descriptions. Built using the TMDB API for movie data, it leverages powerful Natural Language Processing (NLP) techniques to provide accurate recommendations.

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
- Output: Top 5 recommended movie titles with similar content
Note: Currently, the input (movie description) and the output (recommended movie titles) are displayed in the console.

## Methodology  
The recommender system is powered by:
1. TF-IDF (Term Frequency-Inverse Document Frequency): Converts movie descriptions into numerical vectors, capturing their significance.
2. Cosine Similarity: Efficiently measures the similarity between the vectors to identify movies with the most relevant descriptions.

## Future Enhancements
This project is actively evolving. Planned improvements include:
1. Interactive Frontend: Develop a clean, intuitive UI that allows users to select movies and view recommendations directly on a dashboard. This will also help mitigate the cold-start problem by providing initial suggestions.
2. Hybrid Recommendation Model: Integrate collaborative filtering to enhance recommendations using both content-based analysis and user preferences.


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
    ```
        cd server 
        python3 recommendation.py
    ```

Here is the directory structure:
```
movie_recommender/
├── server/
│   ├── data.csv
│   ├── recommendation.py
│   ├── api-movie-data.js
├── README.md
```