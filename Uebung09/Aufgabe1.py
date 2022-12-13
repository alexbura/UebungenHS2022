import uvicorn
from fastapi import FastAPI
from pyproj import Transformer

app = FastAPI()

t_WGS84toLV95 = Transformer.from_crs("epsg:4326", "epsg:2056")
t_LV95toWGS84 = Transformer.from_crs("epsg:2056", "epsg:4326")

@app.get("/transformWGS84toLV95")
async def root(lon : float , lat: float):
    return {"lv95:" + str(t_WGS84toLV95.transform(lon, lat))}

@app.get("/transformLV95toWGS84")
async def root(E : float , N: float):
    return {"WGS84:" + str(t_LV95toWGS84.transform(E, N))}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)