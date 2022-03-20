# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_user_views.py

import os
from unittest import TestCase

from models import db, connect_db, Message, User, Follows, Likes

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app, CURR_USER_KEY

db.create_all()

app.config['WTF_CSRF_ENABLED'] = False


class MessageViewTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()

        self.client = app.test_client()

        # pass in test user
        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)
        self.testuser_id = 9999
        self.testuser.id = self.testuser_id


        # pass in 2 default user
        self.u1 = User.signup("test1","email1@test.com","password",None)
        self.uid1 = 1111
        self.u1.id = self.uid1

        self.u2 = User.signup("test2","email2@test.com","password",None)
        self.uid2 = 2222
        self.u2.id = self.uid2

        db.session.commit()

    def tearDown(self):
        """Clean up any fouled transaction."""
        db.session.rollback()
    
    def test_lists_user(self):
        """test if show all existing user in index"""
        with self.client as c:
            resp = c.get('/users')

            self.assertIn("testuser", str(resp.data))
            self.assertIn("test1", str(resp.data))
            self.assertIn("test2", str(resp.data))
    
    def test_search_user(self):
        """test if search user will show testuser"""
        with self.client as c:
            resp = c.get("/users?q=user")
            self.assertIn("testuser", str(resp.data))

            # should not show test1 and test2
            self.assertNotIn("test1", str(resp.data))
            self.assertNotIn("test2", str(resp.data))
    
    # error occur in vscode, not in python
    def test_user_show(self):
        """test user profile page"""
        with self.client as c:
            resp = c.get(f"/users/{self.testuser_id}")
            self.assertEqual(resp.status_code, 200)
            self.assertIn(self.testuser.username, str(resp.data))
    
    def test_user_show_no_exist_user(self):
        """test user profile that should not show no exist user"""
        with self.client as c:
            resp = c.get("/users/8761237561")
            self.assertEqual(resp.status_code, 404)

            resp = c.get("/users/")
            self.assertEqual(resp.status_code, 404)

    # following

    def setup_followers(self):
        # u1,u2 follow testuser, testuser follow u1
        f1 = Follows(user_being_followed_id = self.testuser_id, user_following_id = self.uid1)
        f2 = Follows(user_being_followed_id = self.testuser_id, user_following_id = self.uid2)
        f3 = Follows(user_being_followed_id = self.uid1, user_following_id = self.testuser_id)
        db.session.add_all([f1,f2,f3])
        db.session.commit()

    def test_show_following(self):
        """test show following page"""
        self.setup_followers()
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            resp = c.get(f"users/{self.testuser_id}/following")
            self.assertEqual(resp.status_code,200)
            self.assertIn("test1",str(resp.data))

            # return 404 page if user not exist
            resp = c.get("users/78954213/following")
            self.assertEqual(resp.status_code,404)
    
    def test_show_following_no_session(self):
        """test show following page will redirect to login page if not login"""
        with self.client as c:
            resp = c.get(f"users/{self.testuser_id}/following", follow_redirects=True)
            self.assertEqual(resp.status_code,200)
            self.assertIn("Access unauthorized.", str(resp.data))
    
    def test_show_follower(self):
        """test show follower page"""
        self.setup_followers()
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id
            resp = c.get(f"users/{self.testuser_id}/followers")
            self.assertEqual(resp.status_code,200)
            self.assertIn("test1",str(resp.data))
            self.assertIn("test2",str(resp.data))

            # return 404 page if user not exist
            resp = c.get("users/78954213/followers")
            self.assertEqual(resp.status_code,404)

    def test_show_follower_no_session(self):
        """test show following page will redirect to login page if not login"""
        with self.client as c:
            resp = c.get(f"users/{self.testuser_id}/followers", follow_redirects=True)
            self.assertEqual(resp.status_code,200)
            self.assertIn("Access unauthorized.", str(resp.data))

# error in vscode
    def test_add_follow(self):
        """test user to follow another user"""
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            resp = c.post("/users/follow/2222", follow_redirects=True)
            self.assertEqual(resp.status_code,200)
            self.assertIn("test2",str(resp.data))

            # return 404 page if user not exist
            resp = c.post("/users/follow/4561285", follow_redirects=True)
            self.assertEqual(resp.status_code,404)
    
    def test_stop_follow(self):
        """test user to stop follow another user"""
        self.setup_followers()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            resp = c.post("/users/stop-following/1111", follow_redirects=True)
            self.assertEqual(resp.status_code,200)
            self.assertNotIn("test1",str(resp.data))

    def setup_likes(self):
        m1 = Message(text="trending warble", user_id=self.testuser_id)
        m2 = Message(text="Eating some lunch", user_id=self.testuser_id)
        m3 = Message(id=9876, text="likable warble", user_id=self.uid1)
        db.session.add_all([m1, m2, m3])
        db.session.commit()

        l1 = Likes(user_id=self.testuser_id, message_id=9876)

        db.session.add(l1)
        db.session.commit()

    def test_show_likes(self):
        """test to show list of likes of this user."""
        self.setup_likes()
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser_id
            resp = c.get(f"users/{self.testuser_id}/likes")
            self.assertEqual(resp.status_code,200)
            self.assertIn("likable warble",str(resp.data))

            # return 404 page if user not exist
            resp = c.get("users/78954213/followers")
            self.assertEqual(resp.status_code,404)
    
    def test_add_like(self):
        """test like message method"""
        m = Message(id=1234, text="testing", user_id=self.uid1)
        db.session.add(m)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser_id

            resp = c.post("/users/1234/like", follow_redirects=True)
            self.assertEqual(resp.status_code,200)
            likes = Likes.query.filter(Likes.message_id==1234).all()
            self.assertEqual(len(likes), 1)
            self.assertEqual(likes[0].user_id, self.testuser_id)
    
    def test_delete_like(self):
        self.setup_likes()
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser_id
            resp = c.post("/users/9876/like", follow_redirects=True)
            self.assertEqual(resp.status_code,200)
            likes = Likes.query.filter(Likes.message_id==9876).all()
            self.assertEqual(len(likes), 0)
    
    def test_like_no_session(self):
        self.setup_likes()
        with self.client as c:
            resp = c.post("/users/9876/like", follow_redirects=True)
            self.assertEqual(resp.status_code,200)
            self.assertIn("Access unauthorized.", str(resp.data))








    






