from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()
    
    def test_homepage(self):
        """Make sure information is in the session and HTML is displayed"""

        with self.client:
            res = self.client.get("/")
            html = res.get_data(as_text=True)

            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('highplays'))
            self.assertIn('Highest Score:', html)
            self.assertIn('Score:', html)
            self.assertIn('Played:', html)
            self.assertIn('Time:', html)
    
    def test_valid_word(self):
        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"]]
        response = self.client.get('/check-guess?word=cat')
        self.assertEqual(response.json['result'], 'ok')
    
    def test_non_english_word(self):
        """Test if word is on the board"""
        
        self.client.get('/')
        response = self.client.get(
            '/check-guess?word=fsjdakfkldsfjdslkfjdlksf')
        self.assertEqual(response.json['result'], 'not-word')

    def test_invalid_word(self):
        """Test if word is in the dictionary"""

        self.client.get('/')
        response = self.client.get('/check-guess?word=impossible')
        self.assertEqual(response.json['result'], 'not-on-board')
