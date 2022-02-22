"""Blogly application."""

from flask import Flask, request, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post

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
    users = User.query.all()
    return render_template('user/index.html', users=users)

@app.route('/users/new')
def newform():
    """show a form to submit new user"""
    return render_template('user/userform.html')

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
    return render_template('user/show.html',user=user)

@app.route('/users/<int:user_id>/edit')
def edit_profile(user_id):
    """edit user's information"""
    user = User.query.get_or_404(user_id)
    return render_template('user/profile.html',user=user)

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

@app.route('/users/<int:user_id>/posts/new')
def users_post(user_id):
    """show create post page"""
    user = User.query.get_or_404(user_id)
    return render_template('post/newpost.html',user=user)


@app.route('/users/<int:user_id>/posts/new',methods=["POST"])
def upload_post(user_id):
    """upload user's post"""
    user = User.query.get_or_404(user_id)
    new_post = Post(title = request.form["title"],
                    content = request.form["content"],
                    user_id = user.id
    )
    db.session.add(new_post)
    db.session.commit()
    return redirect(f'/users/{user.id}')

@app.route('/posts/<int:post_id>')
def user_posts(post_id):
    """Show user posts"""
    post = Post.query.get_or_404(post_id)

    return render_template("post/post.html",post=post)

@app.route('/posts/<int:post_id>/edit')
def edit_post(post_id):
    """show post edit page"""
    post = Post.query.get_or_404(post_id)

    return render_template("post/edit_post.html",post = post)


@app.route('/posts/<int:post_id>/edit',methods=["POST"])
def update_post(post_id):
    """update user's post"""
    post = Post.query.get_or_404(post_id)
    post.title = request.form["title"]
    post.content = request.form["content"]

    db.session.add(post)
    db.session.commit()
    return redirect(f'/users/{post.user_id}')

@app.route('/posts/<int:post_id>/delete',methods = ["POST"])
def delete_post(post_id):
    """delete user's post"""
    post = Post.query.get_or_404(post_id)

    db.session.delete(post)
    db.session.commit()

    return redirect('/users')
