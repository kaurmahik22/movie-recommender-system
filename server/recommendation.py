import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

#movies dataset
try:
    data_path = "data.csv"
    movie_df = pd.read_csv(data_path)
except FileNotFoundError:
    print ("Error File not found. Please check the data path.")
    exit()

#drop movies with no description
movie_df = movie_df.dropna(subset=['overview'])
movie_df = movie_df.drop_duplicates(subset=['id'], keep='first')

#vectorize movie descriptions 
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(movie_df['overview'])

cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

#recommend similar movies based on movie description
def recommend_movies(movie_descrp, df=movie_df, tfidf=tfidf, tfidf_matrix=tfidf_matrix):
    query_vector = tfidf.transform([movie_descrp])
    similarity_scores = cosine_similarity(query_vector, tfidf_matrix).flatten()

    top_n = 15
    similar_indices = similarity_scores.argsort()[-top_n-1:][::-1]
    recommendations = df.iloc[similar_indices]
    return recommendations[1:].to_json(orient='records')
