import subprocess
import os
import json
from options import (
    SortingParameters,
    FilesParameters,
    SqliteParameters,
    Base64Parameters,
)


def deno_js_perform_sorting_benchmark(options: SortingParameters):
    os.chdir("../js")
    subprocess.run(
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
    subprocess.run(
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
    subprocess.run(
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
    subprocess.run(
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
    subprocess.run(
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
    subprocess.run(
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
    subprocess.run(
        [
            "npm",
            "run",
            "deno:createData",
            str(options.number_of_iterations),
            str(options.number_of_records),
            str(options.number_of_benchmarks),
        ]
    )
    file = open("./deno/denoSqlite.json").read()
    result = json.loads(file)
    return result


def deno_ts_perform_sqlite_benchmark(options: SqliteParameters):
    os.chdir("../ts")
    subprocess.run(
        [
            "npm",
            "run",
            "deno:createData",
            str(options.number_of_iterations),
            str(options.number_of_records),
            str(options.number_of_benchmarks),
        ]
    )
    file = open("./deno/denoSqlite.json").read()
    result = json.loads(file)
    return result
