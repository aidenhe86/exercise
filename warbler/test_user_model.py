"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows
from sqlalchemy.exc import IntegrityError

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        # pass in 2 default user
        u1 = User.signup("test1","email1@test.com","password",None)
        uid1 = 1111
        u1.id = uid1

        u2 = User.signup("test2","email2@test.com","password",None)
        uid2 = 2222
        u2.id = uid2

        u1 = User.query.get(uid1)
        u2 = User.query.get(uid2)

        self.u1 = u1
        self.uid1 = uid1

        self.u2 = u2
        self.uid2 = uid2

        self.client = app.test_client()
    
    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)

# ************************************************************************************************************
    # repr test
    def test_repr_method(self):
        """test repr method that return descriptions"""
        self.assertEqual(repr(self.u1), f"<User #{self.u1.id}: {self.u1.username}, {self.u1.email}>")
        self.assertEqual(repr(self.u2), f"<User #{self.u2.id}: {self.u2.username}, {self.u2.email}>")
    
    # follow test
    def test_user_follow(self):
        """test if following method is working correctly"""

        # if u1 follow u2
        self.u1.following.append(self.u2)
        db.session.commit()

        self.assertEqual(len(self.u1.following),1)
        self.assertEqual(len(self.u1.followers),0)
        self.assertEqual(len(self.u2.following),0)
        self.assertEqual(len(self.u2.followers),1)

        self.assertEqual(self.u2.followers[0].id,self.u1.id)
        self.assertEqual(self.u1.following[0].id,self.u2.id)

        # if u1 unfollow u2
        self.u1.following.remove(self.u2)
        db.session.commit()

        self.assertEqual(len(self.u1.following),0)
        self.assertEqual(len(self.u1.followers),0)
        self.assertEqual(len(self.u2.following),0)
        self.assertEqual(len(self.u2.followers),0)

    def test_is_following_method(self):
        """test is following method"""

        # if u1 follow u2
        self.u1.following.append(self.u2)
        db.session.commit()
        self.assertTrue(self.u1.is_following(self.u2))

        # if u1 unfollow u2
        self.u1.following.remove(self.u2)
        db.session.commit()
        self.assertFalse(self.u1.is_following(self.u2))
    
    def test_if_followed_by_method(self):
        """test if followed by method"""

        # if u1 follow u2
        self.u1.following.append(self.u2)
        db.session.commit()
        self.assertTrue(self.u2.is_followed_by(self.u1))

        # if u1 unfollow u2
        self.u1.following.remove(self.u2)
        db.session.commit()
        self.assertFalse(self.u2.is_followed_by(self.u1))
    
    # sign up test
    def test_valid_signup(self):
        """test if the sign up works given the valid credentials"""

        valid = User.signup("example","example@test.com","password",None)
        valid_uid = 111111
        valid.id = valid_uid
        db.session.commit()

        u_valid = User.query.get(valid.id)
        self.assertIsNotNone(u_valid)
        self.assertEqual(u_valid.username,"example")
        self.assertEqual(u_valid.email,"example@test.com")
        self.assertNotEqual(u_valid.password,"password")
        # Bcrypt strings should start with $2b$
        self.assertTrue(u_valid.password.startswith("$2b$"))
    
    def test_invalid_username_signup1(self):
        """test if the sign up return error given invalid blank username"""

        invalid1 = User.signup(None,"example@test.com","password",None)
        invalid1_uid = 111111
        invalid1.id = invalid1_uid
        with self.assertRaises(IntegrityError):
            db.session.commit()
    
    def test_invalid_username_signup2(self):
        """test if the sign up return error given exist username"""
        
        invalid2 = User.signup("test1","example@test.com","password",None)
        invalid2_uid = 222222
        invalid2.id = invalid2_uid
        with self.assertRaises(IntegrityError):
            db.session.commit()
    
    def test_invalid_email_signup1(self):
        """test if the sign up return error given invalid blank email"""
        invalid1 = User.signup("example",None,"password",None)
        invalid1_uid = 111111
        invalid1.id = invalid1_uid
        with self.assertRaises(IntegrityError):
            db.session.commit()
    
    def test_invalid_email_signup2(self):
        """test if the sign up return error given exist email"""
        invalid1 = User.signup("example","email1@test.com","password",None)
        invalid1_uid = 111111
        invalid1.id = invalid1_uid
        with self.assertRaises(IntegrityError):
            db.session.commit()
    
    def test_invalid_passwordsignup(self):
        """test if the sign up return error given blank password"""
        with self.assertRaises(ValueError):
            User.signup("example","example@test.com",None,None)
        
        with self.assertRaises(ValueError):
            User.signup("example","example@test.com","",None)
    
    # authenticate test
    def test_valid_authenticate(self):
        """test if authenticate method works given valid credentials"""
        u = User.authenticate(self.u1.username,"password")
        self.assertIsNotNone(u)
        self.assertEqual(u.id,self.uid1)
    
    def test_invalid_authenticate1(self):
        """test if the sign up return False given wrong username"""
        self.assertFalse(User.authenticate("yahaha","password"))
    
    def test_invalid_authenticate2(self):
        """test if the sign up return False given wrong password"""
        self.assertFalse(User.authenticate(self.u1.username,"password1"))


    





