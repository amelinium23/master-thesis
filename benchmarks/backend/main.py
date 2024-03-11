from fastapi import FastAPI
from deno import deno_perform_sorting_benchmark

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/deno")
def perform_deno_benchmark():
    deno_perform_sorting_benchmark()
    return {"deno": "done"}

