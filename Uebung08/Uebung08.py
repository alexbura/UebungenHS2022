import uvicorn
import sqlalchemy
import databases
from fastapi import FastAPI, Depends, status, Form, Request
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates/")

SECRET = "secret-key"

manager = LoginManager(SECRET, token_url="/auth/login", use_cookie=True)
manager.cookie_name = "nome_cookie"

BD = {"alexbello": {"name": "Alex Burà",
                            "birthdate": "06.06.2001",
                            "email": "alex.bura@students.fhnw.ch",
                            "password": "wela-wela1",
                            "username": "alexbello"},
             "matteuccio": {"name": "Matteo Ferrari",
                            "birthdate": "15.06.2000",
                            "email": "matteo.ferrari@students.fhnw.ch",
                            "password": "cioca123",
                            "username": "matteuccio"}}

BDPost = databases.Database('sqlite:///BDPost.db')
engine = sqlalchemy.create_engine('sqlite:///BDPost.db', connect_args={"check_same_thread": False})
metadata = sqlalchemy.MetaData()

posts = sqlalchemy.Table(
    "posts", metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key = True),
    sqlalchemy.Column("user", sqlalchemy.String),
    sqlalchemy.Column("text", sqlalchemy.String)
)

@manager.user_loader()
def load_user(username: str):
    user = BD[username]
    return user

@app.post("/auth/login")
def login(data: OAuth2PasswordRequestForm = Depends()):
    username = data.username
    password = data.password
    user = load_user(username)

    if not user:
        raise InvalidCredentialsException
    elif user['password'] != password:
        raise InvalidCredentialsException

    access_token = manager.create_access_token(
        data = {"sub": username}
    )

    resp = RedirectResponse(url="/new", status_code=status.HTTP_302_FOUND)
    manager.set_cookie(resp, access_token)
    return resp

@app.get("/login", response_class=HTMLResponse)
def login():
    file = open("templates/login.html", encoding="utf-8")
    data = file.read()
    file.close()
    return HTMLResponse(content=data)

@app.get("/new", response_class=HTMLResponse)
async def read_post(user = Depends(manager)):
    file = open("template/post.html", encoding="utf-8")
    data = file.read()
    file.close()
    return HTMLResponse(content=data)

@app.post("/new", response_class=HTMLResponse)
async def new_post(request: Request, username=Form(), text=Form()):
    query = posts.insert().values(user=username, text=text)
    myid = await BDPost.execute(query)
    return templates.TemplateResponse("new.html", context={"request": request})

@app.on_event("startup")
async def startup():
    await BDPost.connect()

@app.on_event("shutdown")
async def shutdown():
    await BDPost.disconnect()

@app.get(f"""/users/alexbello""")
async def read_notes():
    query = posts.select().where(posts.c.username == "alexbello")
    return await BDPost.fetch_all(query)

@app.get(f"""/users/matteuccio""")
async def read_notes():
    query = posts.select().where(posts.c.username == "matteuccio")
    return await BDPost.fetch_all(query)

uvicorn.run(app, host="127.0.0.1", port=8000)