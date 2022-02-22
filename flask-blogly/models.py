"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    """ table User"""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text)

    posts = db.relationship('Post',backref='user')

class Post(db.Model):
    """ table Post"""
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime,nullable = False, default = datetime.datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable = False)
