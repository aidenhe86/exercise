"""Flask app for Cupcakes"""

from flask import Flask, render_template, redirect, render_template, jsonify, request
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config["SECRET_KEY"] = "cupcake"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///flask_cupcakes"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

debug = DebugToolbarExtension(app)

connect_db(app)

# homepage
@app.route("/")
def homepage():
    """homepage"""
    return render_template("index.html")



# API Route

@app.route("/api/cupcakes")
def list_cupcakes():
    """Returns all cupcakes JSON info"""

    all_cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=all_cupcakes)

@app.route("/api/cupcakes/<int:cupcake_id>")
def get_cupcake(cupcake_id):
    """get single cupcake JSON info"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.serialize())


@app.route("/api/cupcakes",methods=["POST"])
def add_cupcake():
    """add a new cupcake JSON info"""
    new_cupcake = Cupcake(flavor = request.json["flavor"],
                          size = request.json["size"],
                          rating = request.json["rating"],
                          image = request.json["image"] or None
                        #   image = request.json.get("image", None)  not working
    )
    db.session.add(new_cupcake)
    db.session.commit()
    return (jsonify(cupcake=new_cupcake.serialize()), 201)


@app.route("/api/cupcakes/<int:cupcake_id>",methods=["PATCH"])
def update_cupcake(cupcake_id):
    """update exist cupcake info and return JSON"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = request.json["flavor"]
    cupcake.size = request.json["size"]
    cupcake.rating = request.json["rating"]
    cupcake.image = request.json["image"]
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize())

@app.route("/api/cupcakes/<int:cupcake_id>",methods=["DELETE"])
def delete_cupcake(cupcake_id):
    """delete exist cupcake"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message="Delete")