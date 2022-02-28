"""Forms for our demo Flask app."""

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, BooleanField
from wtforms.validators import InputRequired, Optional, URL, NumberRange

class AddPetForm(FlaskForm):
    name = StringField("Name",validators=[InputRequired(message="Name cannot be blank")])
    species = SelectField("Species",choices=[('cat','Cat'),('dog','Dog'),('porcupine','Porcupine')])
    photo_url = StringField("Photo_url",validators=[Optional(),URL()])
    age = IntegerField("Age",validators=[Optional(), NumberRange(min=0, max=30)])
    notes = StringField("Notes",validators=[Optional()])

    validators=[InputRequired(message="Species cannot be blank")]


class EditPetForm(FlaskForm):
    photo_url = StringField("Photo_url",validators=[Optional(),URL()])
    notes = StringField("Notes",validators=[Optional()])
    available = BooleanField('Available?')

