from flask import Flask, render_template, flash, redirect, render_template
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from PetForm import AddPetForm, EditPetForm

app = Flask(__name__)
app.config["SECRET_KEY"] = "adoptionagency"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///adoption_agency"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SQLALCHEMY_ECHO'] = True
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route("/")
def homepage():
    """show homepage"""
    pets = Pet.query.all()

    return render_template('pets_list.html',pets=pets)

@app.route("/add", methods=["GET","POST"])
def add_pet():
    """add new pet"""
    form = AddPetForm()
    if form.validate_on_submit():
        new_pet = Pet(name = form.name.data,
                      species = form.species.data,
                      photo_url = form.photo_url.data,
                      age = form.age.data,
                      notes = form.notes.data
                      )
        db.session.add(new_pet)
        db.session.commit()
        return redirect('/')
    
    else:
        return render_template("add_pet.html",form=form)

@app.route("/<int:pet_id>",methods=["GET","POST"])
def edit_pet(pet_id):
    """edit the pet info"""
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)
    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data

        db.session.add(pet)
        db.session.commit()
        
        return redirect('/')
    else:
        return render_template("pet_page.html",form=form,pet=pet)
