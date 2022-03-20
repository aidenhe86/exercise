"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


import os
from unittest import TestCase

from models import db, connect_db, Message, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class MessageViewTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()

        self.client = app.test_client()

        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)
        self.testuser_id = 9999
        self.testuser.id = self.testuser_id

        db.session.commit()

    def tearDown(self):
        """Clean up any fouled transaction."""
        db.session.rollback()


# not sure why return status code is 200 in vscode, test in python works OK
    def test_add_message(self):
        """Can use add a message?"""

        # Since we need to change the session to mimic logging in,
        # we need to use the changing-session trick:

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            # Now, that session setting is saved, so we can have
            # the rest of ours test

            resp = c.post("/messages/new", data={"text": "Hello"})

            # Make sure it redirects
            self.assertEqual(resp.status_code, 302)

            msg = Message.query.one()
            self.assertEqual(msg.text, "Hello")
    
    def test_add_message_no_session(self):
        """test without inserting a session"""

        with self.client as c:
            resp = c.post("/messages/new", data={"text": "Hello"}, follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))
    
    def test_add_message_wrong_session(self):
        """test with a wrong session id"""
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = 58741230

            resp = c.post("/messages/new", data={"text": "Hello"}, follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))
    
    def test_show_message(self):
        """test to show message correctly"""
        m = Message(id=1234, text="test message", user_id=self.testuser.id)
        db.session.add(m)
        db.session.commit()

        with self.client as c:
            resp = c.get(f"/messages/{m.id}")

            self.assertEqual(resp.status_code,200)
            self.assertIn(m.text,str(resp.data))
    
    def test_show_invalid_message(self):
        """test to if show 404 page"""
        with self.client as c:
            resp = c.get("/messages/999687489")
            self.assertEqual(resp.status_code, 404)
    
    def test_delete_message(self):
        """test to delete message"""
        m = Message(id=1234, text="test message", user_id=self.testuser.id)
        db.session.add(m)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id
            
            resp = c.post("/messages/1234/delete", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)

            m = Message.query.get(1234)
            self.assertIsNone(m)
    
    def test_delete_message_wrong_session(self):
        """test if user can delete another user's message"""
        # create another user

        u2 = User.signup("test2","email2@test.com","password",None)
        u2.id = 2222

        m = Message(id=1234, text="test message", user_id=self.testuser.id)
        db.session.add_all([u2,m])
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = u2.id
            
            resp = c.post("/messages/1234/delete", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized.", str(resp.data))

            m = Message.query.get(1234)
            self.assertIsNotNone(m)
    
    def test_delete_message_no_session(self):
        "test if user can delete message without login"
        
        m = Message(id=1234, text="test message", user_id=self.testuser.id)
        db.session.add(m)
        db.session.commit()

        with self.client as c:
            resp = c.post("/messages/1234/delete", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized.", str(resp.data))

            m = Message.query.get(1234)
            self.assertIsNotNone(m)
