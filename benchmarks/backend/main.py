from fastapi import FastAPI
from fastapi.responses import JSONResponse
from options import SortingParameters
from deno import (
    deno_js_perform_sorting_benchmark,
    deno_ts_perform_sorting_benchmark,
    deno_js_perform_base64_benchmark,
    deno_ts_perform_files_benchmark,
    deno_js_perform_files_benchmark,
    deno_js_perform_sqlite_benchmark,
    deno_ts_perform_base64_benchmark,
    deno_ts_perform_sqlite_benchmark,
)

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/api/js/deno/sorting")
def perform_js_deno_sorting_benchmark(options: SortingParameters):
    result = deno_js_perform_sorting_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/deno/sorting")
def perform_ts_deno_sorting_benchmark(options: SortingParameters):
    result = deno_ts_perform_sorting_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/js/deno/files")
def perform_js_deno_files_benchmark(options: SortingParameters):
    result = deno_js_perform_files_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/deno/files")
def perform_ts_deno_files_benchmark(options: SortingParameters):
    result = deno_ts_perform_files_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/js/deno/base64")
def perform_js_deno_base64_benchmark(options: SortingParameters):
    result = deno_js_perform_base64_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/deno/base64")
def perform_ts_deno_base64_benchmark(options: SortingParameters):
    result = deno_ts_perform_base64_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/js/deno/sqlite")
def perform_js_deno_sqlite_benchmark(options: SortingParameters):
    result = deno_js_perform_sqlite_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/deno/sqlite")
def perform_ts_deno_sqlite_benchmark(options: SortingParameters):
    result = deno_ts_perform_sqlite_benchmark(options)
    return JSONResponse(content=result)
