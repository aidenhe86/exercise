"""Blogly application."""

from flask import Flask, request, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post, Tag, PostTag

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
    tags = Tag.query.all()
    return render_template('post/newpost.html',user=user,tags=tags)


@app.route('/users/<int:user_id>/posts/new',methods=["POST"])
def upload_post(user_id):
    """upload user's post"""
    user = User.query.get_or_404(user_id)
    tags_id = [int(num) for num in request.form.getlist("tags")]
    tags = Tag.query.filter(Tag.id.in_(tags_id)).all()

    new_post = Post(title = request.form["title"],
                    content = request.form["content"],
                    user_id = user.id,
                    tags=tags
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
    tags = Tag.query.all()

    return render_template("post/edit_post.html",post = post, tags=tags)


@app.route('/posts/<int:post_id>/edit',methods=["POST"])
def update_post(post_id):
    """update user's post"""
    post = Post.query.get_or_404(post_id)

    post.title = request.form["title"]
    post.content = request.form["content"]

    tags_id = [int(num) for num in request.form.getlist("tags")]
    post.tags = Tag.query.filter(Tag.id.in_(tags_id)).all()

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


@app.route('/tags')
def taglist():
    """show all tags"""
    tags = Tag.query.all()
    return render_template('tags/index.html', tags=tags)

@app.route('/tags/<int:tag_id>')
def showtag(tag_id):
    """show tag page"""
    tag = Tag.query.get_or_404(tag_id)

    return render_template("tags/tag.html",tag=tag)


@app.route('/tags/new')
def newtag():
    """show add new tag page"""
    return render_template('tags/newtags.html')

@app.route('/tags/new',methods=["POST"])
def addnewtag():
    """add new tags"""
    new_tag = Tag(name = request.form['name'])
    db.session.add(new_tag)
    db.session.commit()

    return redirect('/tags')


@app.route('/tags/<int:tag_id>/edit')
def edittag(tag_id):
    """show edit tag page"""
    tag = Tag.query.get_or_404(tag_id)
    return render_template('tags/edittags.html',tag=tag)


@app.route('/tags/<int:tag_id>/edit',methods=["POST"])
def updateedittag(tag_id):
    """submit the update tag"""
    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form["name"]

    db.session.add(tag)
    db.session.commit()

    return redirect(f'/tags/{tag.id}')

@app.route('/tags/<int:tag_id>/delete',methods=["POST"])
def deletetag(tag_id):
    """delete current tag"""
    tag = Tag.query.get_or_404(tag_id)

    db.session.delete(tag)
    db.session.commit()

    return redirect('/tags')