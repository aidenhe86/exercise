"""Word Finder: finds random words from a dictionary."""

from random import choice

class WordFinder:
    """Machine for finding random words from dictionary.
    
    >>> wf = WordFinder("simple.txt")
    3 words read

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True
    """

    def __init__(self,path):
        """ read dictionary and reports how many items has been read."""
        dict_file = open(path)

        self.words = self.parse(dict_file)

        print(f"{len(self.words)} words has been read")
        print(f"{self.words}")
    
    def parse(self, dict_file):
        """Parse files to list of words"""
        # strip() to to read line without a newline
        return [w.strip() for w in dict_file]
    
    def random(self):
        """return a random words"""
        return choice(self.words)

class SpecialWordFinder(WordFinder):
    """ Special Word Finder to ignore comments and blank line"""
    def parse(self,dict_file):
        return [w.strip() for w in dict_file if w != "\n" and not w.startswith('#')]