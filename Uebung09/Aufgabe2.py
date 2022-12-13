import pyproj
import uvicorn
from fastapi import FastAPI, Response

app = FastAPI()

g = pyproj.Geod(ellps="WGS84")

@app.get("/geodetic")
async def root(slon : float , slat: float , elon: float , elat: float, npt: int):
    lonlats = g.npts(slon, slat, elon, elat, npt)
    lonlats = [[slon, slat]]+ [list(i) for i in lonlats]+ [[elon,elat]]
    
    geojson = f"""{{
        "type": "Feature","geometry": {{"type": "MultiPoint","coordinates": {lonlats}}},"properties": {{"about": "Geodätische Linie"}}}}"""
    return Response(content=geojson)

if __name__=="__main__":   
    uvicorn.run(app, host="127.0.0.1", port=8002, root_path="/geodetic")