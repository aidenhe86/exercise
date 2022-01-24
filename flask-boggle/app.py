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
    highscore=session.get("highscore",0)
    highplay=session.get("highplay",0)

    return render_template("index.html", board = board, highscore=highscore,highplay=highplay)

@app.route("/check-guess")
def check_guess():
    """ check if guess in the dictionary"""
    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)
    return jsonify({'result': response})

@app.route("/score-game", methods =["POST"])
def score_game():
    """ score game and post on page"""
    score = request.json["score"]
    highscore=session.get("highscore",0)
    highplay=session.get("highplay",0)

    session["highplay"] = highplay + 1
    session["highscore"] = max(highscore,score)

    return jsonify(brokeRecord=score > highscore)