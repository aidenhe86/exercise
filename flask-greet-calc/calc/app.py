# Put your app in here.
from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

operation = {
    "add" : add,
    "sub" : sub,
    "mult": mult,
    "div" : div,
}

@app.route("/add")
def do_add():
    """add a and b and return result"""
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = add(a,b)
    return str(result)

@app.route("/sub")
def do_sub():
    """sub a to b and return result"""
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = sub(a,b)
    return str(result)

@app.route("/mult")
def do_mult():
    """mult a and b and return result"""
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = mult(a,b)
    return str(result)

@app.route("/div")
def do_div():
    """div a and b and return result"""
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = div(a,b)
    return str(result)


@app.route("/math/<oper>")
def do_math(oper):
    """ do the math with corresponding operation"""
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = operation[oper](a,b)
    return str(result)

