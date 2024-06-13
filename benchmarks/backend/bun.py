import subprocess
import os
import json
import psutil
from options import (
    ServerParameters,
    SortingParameters,
    FilesParameters,
    SqliteParameters,
    Base64Parameters,
)


def bun_js_perform_sorting_benchmark(options: SortingParameters):
    os.chdir("../js")
    process = subprocess.Popen(
        [
            "npm",
            "run",
            "bun:sorting",
            options.sorting_type,
            str(options.number_of_samples),
            str(options.number_of_iterations),
        ]
    )
    file = open("./bun/bunSortingResult.json").read()
    result = json.loads(file)
    p_info = psutil.Process(process.pid)
    used_memory = float(p_info.memory_full_info().rss)
    used_cpu = float(p_info.cpu_percent(interval=1))
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    return result


def bun_ts_perform_sorting_benchmark(options: SortingParameters):
    os.chdir("../ts")
    process = subprocess.Popen(
        [
            "npm",
            "run",
            "bun:sorting",
            options.sorting_type,
            str(options.number_of_samples),
            str(options.number_of_iterations),
        ]
    )
    file = open("./bun/bunSortingResult.json").read()
    result = json.loads(file)
    p_info = psutil.Process(process.pid)
    used_memory = float(p_info.memory_full_info().rss)
    used_cpu = float(p_info.cpu_percent(interval=1))
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory

    p_info.kill()
    return result


def bun_js_perform_files_benchmark(options: FilesParameters):
    os.chdir("../js")
    process = subprocess.Popen(
        [
            "npm",
            "run",
            "bun:fileWrite",
            str(options.number_of_iterations),
            str(options.number_of_files),
            str(options.number_of_paragraphs),
            str(options.should_be_bun_files),
        ]
    )
    file = open("./bun/bunFilesResult.json").read()
    result = json.loads(file)
    p_info = psutil.Process(process.pid)
    used_memory = float(p_info.memory_full_info().rss)
    used_cpu = float(p_info.cpu_percent(interval=1))
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory

    return result


def bun_ts_perform_files_benchmark(options: FilesParameters):
    os.chdir("../ts")
    subprocess.Popen(
        [
            "npm",
            "run",
            "bun:fileWrite",
            str(options.number_of_iterations),
            str(options.number_of_files),
            str(options.number_of_paragraphs),
            str(options.should_be_bun_files),
        ]
    )
    file = open("./bun/bunFilesResult.json").read()
    result = json.loads(file)
    return result


def bun_js_perform_base64_benchmark(options: Base64Parameters):
    os.chdir("../js")
    subprocess.Popen(
        [
            "npm",
            "run",
            "bun:base64",
            str(options.number_of_iterations),
        ]
    )
    file = open("./bun/bunBase64Result.json").read()
    result = json.loads(file)
    return result


def bun_ts_perform_base64_benchmark(options: Base64Parameters):
    os.chdir("../ts")
    subprocess.Popen(
        [
            "npm",
            "run",
            "bun:base64",
            str(options.number_of_iterations),
        ]
    )
    file = open("./bun/bunBase64Result.json").read()
    result = json.loads(file)
    return result


def bun_js_perform_sqlite_benchmark(options: SqliteParameters):
    os.chdir("../js")
    subprocess.Popen(
        [
            "npm",
            "run",
            "bun:createData",
            str(options.number_of_iterations),
            str(options.number_of_records),
        ]
    )
    file = open("./bun/bunSqlite.json").read()
    result = json.loads(file)
    return result


def bun_ts_perform_sqlite_benchmark(options: SqliteParameters):
    os.chdir("../ts")
    subprocess.Popen(
        [
            "npm",
            "run",
            "bun:createData",
            str(options.number_of_iterations),
            str(options.number_of_records),
        ]
    )
    file = open("./bun/bunSqlite.json").read()
    result = json.loads(file)
    return result


def bun_js_perform_server_benchmark(options: ServerParameters):
    os.chdir("../js")
    process_oha = subprocess.Popen(
        [
            f"oha http://localhost:3000/users -n {str(options.number_of_requests)} -c { str(options.number_of_connections)} -j > ./bun/bunServerResult.json",
        ],
        shell=True,
    )
    file = open("./bun/bunServerResult.json").read()
    result = json.loads(file)
    process_oha.kill()
    return result


def bun_ts_perform_server_benchmark(options: ServerParameters):
    os.chdir("../ts")
    process_oha = subprocess.Popen(
        [
            f"oha http://localhost:3003/users -n {str(options.number_of_requests)} -c {str(options.number_of_connections)} -j > ./bun/bunServerResult.json",
        ],
        shell=True,
    )
    file = open("./bun/bunServerResult.json").read()
    result = json.loads(file)
    process_oha.kill()
    return result
