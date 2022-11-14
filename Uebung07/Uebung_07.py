import uvicorn
from fastapi import FastAPI

app = FastAPI()

d = {}
file = open("PLZO_CSV_LV95.csv", encoding="utf-8")
next(file)
for line in file:
        daten = line.strip().split(";")
        gem = daten[3]
        d[gem]=daten

file.close()

@app.get("/gemeinde")
async def gemeinde(gemeinde:str):
        if gemeinde in d:
            return d[gemeinde]

        return {"ERROR": "GEMEINDE NICHT GEFUNDEN"}

uvicorn.run(app, host="127.0.0.1", port=8000)