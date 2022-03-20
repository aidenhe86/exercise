import os
from unittest import TestCase

from models import db, User, Message, Follows, Likes

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app

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
    
    def test_message_model(self):
        """check if the message model works"""

        message = Message(text="Test",user_id=self.u1.id)
        db.session.add(message)
        db.session.commit()

        # user1 should have 1 message
        self.assertEqual(len(self.u1.messages),1)
        self.assertEqual(self.u1.messages[0].text,"Test")

    # how to raise the not null constrain error
    
    # def test_invalid_message(self):
    #     """test if message method return error given empty text"""
    #     message = Message(text=None,user_id=self.u1.id)
    #     db.session.add(message)
    #     with self.assertRaises(not null constrain error):
    #         db.session.commit()

    def test_like_model(self):
        """test if the like model works"""
        message = Message(text="Test",user_id=self.u1.id)
        db.session.add(message)
        db.session.commit()

        self.u2.likes.append(message)

        # user 2 should liked user 1 message
        self.assertEqual(len(self.u2.likes),1)
        self.assertEqual(self.u2.likes[0].text,"Test")





