from fastapi import FastAPI
from fastapi.responses import JSONResponse
from options import (
    SortingParameters,
    BunFilesParameters,
    Base64Parameters,
    FilesParameters,
    SqliteParameters,
    ServerParameters,
)
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

from bun import (
    bun_js_perform_sorting_benchmark,
    bun_ts_perform_sorting_benchmark,
    bun_js_perform_base64_benchmark,
    bun_ts_perform_files_benchmark,
    bun_js_perform_files_benchmark,
    bun_js_perform_sqlite_benchmark,
    bun_ts_perform_base64_benchmark,
    bun_ts_perform_sqlite_benchmark,
)

from node import (
    node_js_perform_sorting_benchmark,
    node_ts_perform_sorting_benchmark,
    node_js_perform_base64_benchmark,
    node_ts_perform_files_benchmark,
    node_js_perform_files_benchmark,
    node_js_perform_sqlite_benchmark,
    node_ts_perform_base64_benchmark,
    node_ts_perform_sqlite_benchmark,
    node_js_perform_server_benchmark,
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
def perform_js_deno_files_benchmark(options: FilesParameters):
    result = deno_js_perform_files_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/deno/files")
def perform_ts_deno_files_benchmark(options: FilesParameters):
    result = deno_ts_perform_files_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/js/deno/base64")
def perform_js_deno_base64_benchmark(options: Base64Parameters):
    result = deno_js_perform_base64_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/deno/base64")
def perform_ts_deno_base64_benchmark(options: Base64Parameters):
    result = deno_ts_perform_base64_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/js/deno/sqlite")
def perform_js_deno_sqlite_benchmark(options: SqliteParameters):
    result = deno_js_perform_sqlite_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/deno/sqlite")
def perform_ts_deno_sqlite_benchmark(options: SqliteParameters):
    result = deno_ts_perform_sqlite_benchmark(options)
    return JSONResponse(content=result)


# bun


@app.post("/api/js/bun/sorting")
def perform_js_bun_sorting_benchmark(options: SortingParameters):
    result = bun_js_perform_sorting_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/bun/sorting")
def perform_ts_bun_sorting_benchmark(options: SortingParameters):
    result = bun_ts_perform_sorting_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/js/bun/files")
def perform_js_bun_files_benchmark(options: BunFilesParameters):
    result = bun_js_perform_files_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/bun/files")
def perform_ts_bun_files_benchmark(options: BunFilesParameters):
    result = bun_ts_perform_files_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/js/bun/base64")
def perform_js_bun_base64_benchmark(options: Base64Parameters):
    result = bun_js_perform_base64_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/bun/base64")
def perform_ts_bun_base64_benchmark(options: Base64Parameters):
    result = bun_ts_perform_base64_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/js/bun/sqlite")
def perform_js_bun_sqlite_benchmark(options: SqliteParameters):
    result = bun_js_perform_sqlite_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/bun/sqlite")
def perform_ts_bun_sqlite_benchmark(options: SqliteParameters):
    result = bun_ts_perform_sqlite_benchmark(options)
    return JSONResponse(content=result)


# Node
@app.post("/api/js/node/sorting")
def perform_js_node_sorting_benchmark(options: SortingParameters):
    result = node_js_perform_sorting_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/node/sorting")
def perform_ts_node_sorting_benchmark(options: SortingParameters):
    result = node_ts_perform_sorting_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/js/node/files")
def perform_js_node_files_benchmark(options: FilesParameters):
    result = node_js_perform_files_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/node/files")
def perform_ts_node_files_benchmark(options: FilesParameters):
    result = node_ts_perform_files_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/js/node/base64")
def perform_js_node_base64_benchmark(options: Base64Parameters):
    result = node_js_perform_base64_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/node/base64")
def perform_ts_node_base64_benchmark(options: Base64Parameters):
    result = node_ts_perform_base64_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/js/node/sqlite")
def perform_js_node_sqlite_benchmark(options: SqliteParameters):
    result = node_js_perform_sqlite_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/ts/node/sqlite")
def perform_ts_node_sqlite_benchmark(options: SqliteParameters):
    result = node_ts_perform_sqlite_benchmark(options)
    return JSONResponse(content=result)


@app.post("/api/js/node/server")
def perform_js_node_sqlite_benchmark(options: ServerParameters):
    result = node_js_perform_server_benchmark(options)
    return JSONResponse(content=result)
