from flask import Flask, request, render_template,flash,redirect,session
from surveys import satisfaction_survey as survey
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "flash"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

res_key = "responses"


@app.route("/")
def survey_page():
    """ show survey page to start"""
    return render_template("survey.html", survey=survey)

@app.route("/begin", methods=["POST"])
def begin_survey():
    """ redirect question page from GET to POST"""
    # clear saved responses before begin
    session[res_key] = []
    return redirect("/questions/0")


@app.route("/questions/<int:num>")
def questions_page(num):
    """show survey questions and save answers"""

    #read responses cookies from flask
    responses = session[res_key]

    # if user skip questions, redirect back to the questions
    if (num != len(responses)):
        flash("Invalid question! Please complete the survey in order")
        return redirect(f"/questions/{len(responses)}")
    
    # redirect to answer page if all question have answered
    if len(responses) == len(survey.questions):
        return redirect("/complete")

    question = survey.questions[num]
    return render_template("questions.html", question=question,num = num)


@app.route("/answer", methods=["POST"])
def answer():
    """ handle response and redirect to next question"""
    answer = request.form['answer']
    responses = session[res_key]
    responses.append(answer)
    session[res_key] = responses

    # redirect to answer page if all question have answered
    if len(responses) == len(survey.questions):
        session["responses"] = responses
        return redirect("/complete")

    return redirect(f"/questions/{len(responses)}")

@app.route("/complete")
def complete_survey():
    """ complete survey and print Thank You Page"""
    return render_template("complete.html")

