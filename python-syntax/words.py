# Question 1 and 2
# def print_upper_words(words):
#     """
#         Turn all input words into upper case
#     """
#     for word in words:
#         print(f"{word.upper()}")

#Question 3
# def print_upper_words(words):
#     """
#         Only prints words if the word starts with e, and turn into upper case
#     """
#     for word in words:
#         if word.startswith("e") or word.startswith("E"):
#             print(f"{word.upper()}")

# Question 4

def print_upper_words(words,must_start_with):
    """
        Only prints words if the word starts with e, and turn into upper case
    """
    for word in words:
        for letter in must_start_with:
            if word.startswith(letter):
                print(f"{word.upper()}")