from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///flask_feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "flask_feedback"

connect_db(app)
db.create_all()

toolbar = DebugToolbarExtension(app)

@app.route("/")
def root():
    """redirect to register route"""

    return redirect("/register")

@app.route("/register", methods=["GET","POST"])
def register():
    """register page"""
    form = RegisterForm()

    if "username" in session:
        flash("You already Login!", "warning")
        username = session["username"]
        return redirect(f"/users/{username}")

    if form.validate_on_submit():
        new_user = User.register( 
            username = form.username.data,
            password = form.password.data,
            first_name = form.first_name.data,
            last_name = form.last_name.data,
            email = form.email.data
        )

        db.session.add(new_user)
        db.session.commit()

        session["username"] = new_user.username

        # on successful login, redirect to secret page
        flash('Welcome! Successfully Created Your Account!', "success")
        return redirect(f"/users/{new_user.username}")

    else:
        return render_template("register.html", form=form)

@app.route("/login", methods=["GET","POST"])
def login():
    """login page"""
    form = LoginForm()

    if "username" in session:
        flash("You already Login!", "warning")
        username = session["username"]
        return redirect(f"/users/{username}")

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username,password)
        if user:
            flash(f"Welcome Back, {user.username}!", "primary")
            session["username"] = user.username
            return redirect(f"/users/{user.username}")
        else:
            form.username.errors = ['Invalid username/password.']

    return render_template('login.html', form=form)


@app.route('/logout')
def logout_user():
    session.pop('username')
    flash("Goodbye!", "info")
    return redirect('/')


@app.route("/users/<username>")
def userpage(username):


    if not checkLogin(session):
        return redirect("/")
    # cur_user = session["username"]
    # if username != cur_user:
    #     flash(f"Please login the correct account!", "warning")
    #     return redirect("/")
    
    # else:
    user = User.query.get_or_404(username)
    return render_template("show.html",user=user)

@app.route("/users/<username>/delete", methods=["POST"])
def deleteAccount(username):
    """delete current login user accont"""
    cur_user = session["username"]
    if username != cur_user:
        flash(f"You are {cur_user}! Please login the correct account!", "danger")
        return redirect(f"/users/{cur_user}")
    else:
        user = User.query.get_or_404(username)
        db.session.delete(user)
        db.session.commit()
        session.pop('username')
        return redirect("/")


@app.route("/users/<username>/feedback/add", methods=["GET", "POST"])
def addFeedback(username):
    if not checkLogin(session):
        return redirect("/")
    # cur_user = session["username"]
    # if username != cur_user:
    #     flash(f"You are {cur_user}! Please login the correct account!", "danger")
    #     return redirect(f"/users/{cur_user}")

    user = User.query.get_or_404(username)
    form = FeedbackForm()

    if form.validate_on_submit():
        new_feedback = Feedback( 
            title = form.title.data,
            content = form.content.data,
            username = user.username
        )

        db.session.add(new_feedback)
        db.session.commit()

        flash('Thank you for you Feedback!', "success")
        return redirect(f"/users/{user.username}")

    else:
        return render_template("feedback.html",form=form)

@app.route("/feedback/<int:feedback_id>/update", methods=["GET", "POST"])
def updateFeedback(feedback_id):
    """update feedback"""
    cur_user = session["username"]
    feedback = Feedback.query.get_or_404(feedback_id)
    if feedback.username != cur_user:
        flash(f"You are {cur_user}! Please login the correct account!", "danger")
        return redirect(f"/users/{cur_user}")
        
    form = FeedbackForm(obj=feedback)
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()

        flash('Feedback has been updated!', "success")
        return redirect(f"/users/{cur_user}")
    
    return render_template("feedback.html",form=form)


@app.route("/feedback/<int:feedback_id>/delete", methods=["POST"])
def deleteFeedback(feedback_id):
    """delete feedback"""

    cur_user = session["username"]
    feedback = Feedback.query.get_or_404(feedback_id)
    if feedback.username != cur_user:
        flash(f"You are {cur_user}! Please login the correct account!", "danger")
        return redirect(f"/users/{cur_user}")
    
    db.session.delete(feedback)
    db.session.commit()
    flash('Feedback has been deleted!', "success")
    return redirect(f"/users/{cur_user}")

# cannot separate the function
def checkLogin(session):
    """check if user already login"""
    if "username" not in session:
        flash("Please login first!", "danger")
        return False
    return True