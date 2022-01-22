from flask import Flask, request, render_template, session, jsonify
from boggle import Boggle

boggle_game = Boggle()
app = Flask(__name__)

app.config["SECRET_KEY"] = "flaskboggle"

@app.route("/")
def index():
    """ show board"""
    board = boggle_game.make_board()
    session["board"]=board

    return render_template("index.html", board = board)

@app.route("/check-guess")
def check_guess():
    """ check if guess in the dictionary"""
    guess = request.args["guess"]
    return render_template("index.html", guess=guess)