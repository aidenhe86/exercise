"""Blogly application."""

from flask import Flask, request, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "BloglyExercise"
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def index():
    """redirect to users page"""
    return redirect('/users')

@app.route('/users')
def homepage():
    """show a list of users"""
    # users = User.query.order_by(User.last_name,User.first_name).all()
    users = User.query.all()
    return render_template('index.html', users=users)

@app.route('/users/new')
def newform():
    """show a form to submit new user"""
    return render_template('userform.html')

@app.route('/users/new',methods=["POST"])
def adduser():
    """add new user into database"""
    new_user = User(first_name = request.form['first_name'],
                    last_name = request.form['last_name'],
                    image_url = request.form['image_url' or None]
                    )
    db.session.add(new_user)
    db.session.commit()

    return redirect('/users')

@app.route('/users/<int:user_id>')
def users_profire(user_id):
    """show user's profile"""
    user = User.query.get_or_404(user_id)
    return render_template('show.html',user=user)

@app.route('/users/<int:user_id>/edit')
def edit_profile(user_id):
    """edit user's information"""
    user = User.query.get_or_404(user_id)
    return render_template('profile.html',user=user)

@app.route('/users/<int:user_id>/edit', methods=["POST"])
def update_profile(user_id):
    """update user profile"""
    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url' or None]

    db.session.add(user)
    db.session.commit()

    return redirect('/users')

@app.route('/users/<int:user_id>/delete',methods=["POST"])
def delete_profile(user_id):
    """Delete user profile"""
    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    return redirect('/users')

