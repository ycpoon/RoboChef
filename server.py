from flask import Flask, render_template, request, jsonify
from model import send_IMG_request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit_form", methods=["POST"])
def submit_form():
    try:
        # Access the input value from the POST request
        url_input = request.form.get('url_input')

        # Do something with the input value (e.g., print it)
        ingredients = send_IMG_request(url_input)
        print("form submitted successfully")

        # Return a response (you can customize this)
        return jsonify({"ingredients": ingredients})

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500


if __name__ == "__main__":
    app.run(debug = True)