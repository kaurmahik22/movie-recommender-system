import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

#movies dataset
data_path = "data.csv"
movie_df = pd.read_csv(data_path)

#drop movies with no description
movie_df = movie_df.dropna(subset=['overview'])

#vectorize movie descriptions 
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(movie_df['overview'])

cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

#recommend similar movies based on movie description
def recommend_movies(movie_descrp, df, tfidf, tfidf_matrix):
    query_vector = tfidf.transform([movie_descrp])
    similarity_scores = cosine_similarity(query_vector, tfidf_matrix).flatten()

    top_n = 5
    similar_indices = similarity_scores.argsort()[-top_n-1:][::-1]
    recommendations = df.iloc[similar_indices]['title'].values
    return recommendations[1:]

#console input
user_movie_descrp_input = input("Enter a movie's description: ")
recommends = recommend_movies(user_movie_descrp_input, movie_df, tfidf, tfidf_matrix)
print("Your top 5 Movie Recommendations: ")

counter = 0
for x in recommends:
    counter += 1
    print(f"{counter}. " + x)
