from flask import Flask, request, jsonify
from recommendation import recommend_movies

app = Flask(__name__)

@app.route('/selected-movie', methods=['POST']) 
def recommend():
    data = request.get_json()

    # call python function to get personalized content-based recommendations
    result = recommend_movies(data['description'])
    return result 

if __name__ == '__main__':
    app.run(port=5000)