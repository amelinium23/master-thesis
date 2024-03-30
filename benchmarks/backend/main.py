from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from os import wait
from options import (
    SortingParameters,
    Base64Parameters,
    FilesParameters,
    SqliteParameters,
    ServerParameters,
)
from deno import (
    deno_js_perform_server_benchmark,
    deno_js_perform_sorting_benchmark,
    deno_ts_perform_server_benchmark,
    deno_ts_perform_sorting_benchmark,
    deno_js_perform_base64_benchmark,
    deno_ts_perform_files_benchmark,
    deno_js_perform_files_benchmark,
    deno_js_perform_sqlite_benchmark,
    deno_ts_perform_base64_benchmark,
    deno_ts_perform_sqlite_benchmark,
)

from bun import (
    bun_js_perform_server_benchmark,
    bun_js_perform_sorting_benchmark,
    bun_ts_perform_server_benchmark,
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
    node_ts_perform_server_benchmark,
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/api/sorting")
def perform_sorting_all(options: SortingParameters):
    result = {"ts": {}, "js": {}}
    result_bun = bun_js_perform_sorting_benchmark(options)
    result_deno = deno_js_perform_sorting_benchmark(options)
    result_node = node_js_perform_sorting_benchmark(options)
    result["js"]["result_bun"] = result_bun
    result["js"]["result_deno"] = result_deno
    result["js"]["result_node"] = result_node
    result_ts_bun = bun_ts_perform_sorting_benchmark(options)
    result_ts_deno = deno_ts_perform_sorting_benchmark(options)
    result_ts_node = node_ts_perform_sorting_benchmark(options)
    result["ts"]["result_bun"] = result_ts_bun
    result["ts"]["result_deno"] = result_ts_deno
    result["ts"]["result_node"] = result_ts_node
    return JSONResponse(content=result)


@app.post("/api/files")
def perform_files_all(options: FilesParameters):
    result = {"ts": {}, "js": {}}
    result_bun = bun_js_perform_files_benchmark(options)
    result_deno = deno_js_perform_files_benchmark(options)
    result_node = node_js_perform_files_benchmark(options)
    result["js"]["result_bun"] = result_bun
    result["js"]["result_deno"] = result_deno
    result["js"]["result_node"] = result_node
    result_ts_bun = bun_ts_perform_files_benchmark(options)
    result_ts_deno = deno_ts_perform_files_benchmark(options)
    result_ts_node = node_ts_perform_files_benchmark(options)
    result["ts"]["result_bun"] = result_ts_bun
    result["ts"]["result_deno"] = result_ts_deno
    result["ts"]["result_node"] = result_ts_node
    return JSONResponse(content=result)


@app.post("/api/sqlite")
def perform_sqlite_all(options: SqliteParameters):
    result = {"ts": {}, "js": {}}
    result_bun = bun_js_perform_sqlite_benchmark(options)
    result_deno = deno_js_perform_sqlite_benchmark(options)
    result_node = node_js_perform_sqlite_benchmark(options)
    result["js"]["result_bun"] = result_bun
    result["js"]["result_deno"] = result_deno
    result["js"]["result_node"] = result_node
    result_ts_bun = bun_ts_perform_sqlite_benchmark(options)
    result_ts_deno = deno_ts_perform_sqlite_benchmark(options)
    result_ts_node = node_ts_perform_sqlite_benchmark(options)
    result["ts"]["result_bun"] = result_ts_bun
    result["ts"]["result_deno"] = result_ts_deno
    result["ts"]["result_node"] = result_ts_node
    return JSONResponse(content=result)


@app.post("/api/server")
def perform_server_all(options: ServerParameters):
    result = {"ts": {}, "js": {}}
    result_bun = bun_js_perform_server_benchmark(options)
    result_deno = deno_js_perform_server_benchmark(options)
    result_node = node_js_perform_server_benchmark(options)
    result["js"]["result_bun"] = result_bun
    result["js"]["result_deno"] = result_deno
    result["js"]["result_node"] = result_node
    result_ts_bun = bun_ts_perform_server_benchmark(options)
    result_ts_deno = deno_ts_perform_server_benchmark(options)
    result_ts_node = node_ts_perform_server_benchmark(options)
    result["ts"]["result_bun"] = result_ts_bun
    result["ts"]["result_deno"] = result_ts_deno
    result["ts"]["result_node"] = result_ts_node
    return JSONResponse(content=result)


@app.post("/api/base64")
def perform_base64_all(options: Base64Parameters):
    result = {"ts": {}, "js": {}}
    result_bun = bun_js_perform_base64_benchmark(options)
    wait()
    result_deno = deno_js_perform_base64_benchmark(options)
    wait()
    result_node = node_js_perform_base64_benchmark(options)
    wait()
    result["js"]["result_bun"] = result_bun
    result["js"]["result_deno"] = result_deno
    result["js"]["result_node"] = result_node
    result_ts_bun = bun_ts_perform_base64_benchmark(options)
    wait()
    result_ts_deno = deno_ts_perform_base64_benchmark(options)
    wait()
    result_ts_node = node_ts_perform_base64_benchmark(options)
    wait()
    result["ts"]["result_bun"] = result_ts_bun
    result["ts"]["result_deno"] = result_ts_deno
    result["ts"]["result_node"] = result_ts_node
    return JSONResponse(content=result)
