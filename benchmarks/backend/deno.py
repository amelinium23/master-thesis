import subprocess
import os
import json
from options import (
    ServerParameters,
    SortingParameters,
    FilesParameters,
    SqliteParameters,
    Base64Parameters,
)


def deno_js_perform_sorting_benchmark(options: SortingParameters):
    os.chdir("../js")
    subprocess.Popen(
        [
            "npm",
            "run",
            "deno:sorting",
            options.sorting_type,
            str(options.number_of_samples),
            str(options.number_of_iterations),
        ]
    )
    file = open("./deno/denoSortingResult.json").read()
    result = json.loads(file)
    return result


def deno_ts_perform_sorting_benchmark(options: SortingParameters):
    os.chdir("../ts")
    subprocess.Popen(
        [
            "npm",
            "run",
            "deno:sorting",
            options.sorting_type,
            str(options.number_of_samples),
            str(options.number_of_iterations),
        ]
    )
    file = open("./deno/denoSortingResult.json").read()
    result = json.loads(file)
    return result


def deno_js_perform_files_benchmark(options: FilesParameters):
    os.chdir("../js")
    subprocess.Popen(
        [
            "npm",
            "run",
            "deno:fileWrite",
            str(options.number_of_iterations),
            str(options.number_of_files),
            str(options.number_of_paragraphs),
        ]
    )
    file = open("./deno/denoFilesResult.json").read()
    result = json.loads(file)
    return result


def deno_ts_perform_files_benchmark(options: FilesParameters):
    os.chdir("../ts")
    subprocess.Popen(
        [
            "npm",
            "run",
            "deno:fileWrite",
            str(options.number_of_iterations),
            str(options.number_of_files),
            str(options.number_of_paragraphs),
        ]
    )
    file = open("./deno/denoFilesResult.json").read()
    result = json.loads(file)
    return result


def deno_js_perform_base64_benchmark(options: Base64Parameters):
    os.chdir("../js")
    subprocess.Popen(
        [
            "npm",
            "run",
            "deno:base64",
            str(options.number_of_iterations),
        ]
    )
    file = open("./deno/denoBase64Result.json").read()
    result = json.loads(file)
    return result


def deno_ts_perform_base64_benchmark(options: Base64Parameters):
    os.chdir("../ts")
    subprocess.Popen(
        [
            "npm",
            "run",
            "deno:base64",
            str(options.number_of_iterations),
        ]
    )
    file = open("./deno/denoBase64Result.json").read()
    result = json.loads(file)
    return result


def deno_js_perform_sqlite_benchmark(options: SqliteParameters):
    os.chdir("../js")
    subprocess.Popen(
        [
            "npm",
            "run",
            "deno:createData",
            str(options.number_of_iterations),
            str(options.number_of_records),
        ]
    )
    file = open("./deno/denoSqlite.json").read()
    result = json.loads(file)
    return result


def deno_ts_perform_sqlite_benchmark(options: SqliteParameters):
    os.chdir("../ts")
    subprocess.Popen(
        [
            "npm",
            "run",
            "deno:createData",
            str(options.number_of_iterations),
            str(options.number_of_records),
        ]
    )
    file = open("./deno/denoSqlite.json").read()
    result = json.loads(file)
    return result


def deno_js_perform_server_benchmark(options: ServerParameters):
    os.chdir("../js")
    subprocess.Popen(
        [
            f"oha http://localhost:3001/users -n {str(options.number_of_requests)} -c { str(options.number_of_connections)} -j > ./deno/denoServerResult.json",
        ],
        shell=True,
    )
    file = open("./deno/denoServerResult.json").read()
    result = json.loads(file)
    return result


def deno_ts_perform_server_benchmark(options: ServerParameters):
    os.chdir("../ts")
    subprocess.Popen(
        [
            f"oha http://localhost:3004/users -n {str(options.number_of_requests)} -c { str(options.number_of_connections)} -j > ./deno/denoServerResult.json",
        ],
        shell=True,
    )
    file = open("./deno/denoServerResult.json").read()
    result = json.loads(file)
    return result
