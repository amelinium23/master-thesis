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


def node_js_perform_sorting_benchmark(options: SortingParameters):
    os.chdir("../js")
    subprocess.Popen(
        [
            "npm",
            "run",
            "node:sorting",
            options.sorting_type,
            str(options.number_of_samples),
            str(options.number_of_iterations),
        ]
    )
    file = open("./node/nodeSortingResult.json").read()
    result = json.loads(file)
    return result


def node_ts_perform_sorting_benchmark(options: SortingParameters):
    os.chdir("../ts")
    subprocess.Popen(
        [
            "npm",
            "run",
            "node:sorting",
            options.sorting_type,
            str(options.number_of_samples),
            str(options.number_of_iterations),
        ]
    )
    file = open("./node/nodeSortingResult.json").read()
    result = json.loads(file)
    return result


def node_js_perform_files_benchmark(options: FilesParameters):
    os.chdir("../js")
    subprocess.Popen(
        [
            "npm",
            "run",
            "node:fileWrite",
            str(options.number_of_iterations),
            str(options.number_of_files),
            str(options.number_of_paragraphs),
        ]
    )
    file = open("./node/nodeFilesResult.json").read()
    result = json.loads(file)
    return result


def node_ts_perform_files_benchmark(options: FilesParameters):
    os.chdir("../ts")
    subprocess.Popen(
        [
            "npm",
            "run",
            "node:fileWrite",
            str(options.number_of_iterations),
            str(options.number_of_files),
            str(options.number_of_paragraphs),
        ]
    )
    file = open("./node/nodeFilesResult.json").read()
    result = json.loads(file)
    return result


def node_js_perform_base64_benchmark(options: Base64Parameters):
    os.chdir("../js")
    subprocess.Popen(
        [
            "npm",
            "run",
            "node:base64",
            str(options.number_of_iterations),
        ]
    )
    file = open("./node/nodeBase64Result.json").read()
    result = json.loads(file)
    return result


def node_ts_perform_base64_benchmark(options: Base64Parameters):
    os.chdir("../ts")
    process = subprocess.Popen(
        [
            "npm",
            "run",
            "node:base64",
            str(options.number_of_iterations),
        ]
    )
    file = open("./node/nodeBase64Result.json").read()
    result = json.loads(file)
    p_info = psutil.Process(process.pid)
    used_memory = float(p_info.memory_full_info().rss)
    used_cpu = float(p_info.cpu_percent(interval=1))
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    process.kill()
    return result


def node_js_perform_sqlite_benchmark(options: SqliteParameters):
    os.chdir("../js")
    process = subprocess.Popen(
        [
            "npm",
            "run",
            "node:createData",
            str(options.number_of_iterations),
            str(options.number_of_records),
        ]
    )
    file = open("./node/nodeSqlite.json").read()
    result = json.loads(file)
    p_info = psutil.Process(process.pid)
    used_memory = float(p_info.memory_full_info().rss)
    used_cpu = float(p_info.cpu_percent(interval=1))
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    process.kill()
    return result


def node_ts_perform_sqlite_benchmark(options: SqliteParameters):
    os.chdir("../ts")
    process = subprocess.Popen(
        [
            "npm",
            "run",
            "node:createData",
            str(options.number_of_iterations),
            str(options.number_of_records),
        ]
    )
    file = open("./node/nodeSqlite.json").read()
    result = json.loads(file)
    p_info = psutil.Process(process.pid)
    used_memory = float(p_info.memory_full_info().rss)
    used_cpu = float(p_info.cpu_percent(interval=1))
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    process.kill()
    return result


def node_js_perform_server_benchmark(options: ServerParameters):
    os.chdir("../js")
    process_oha = subprocess.Popen(
        [
            f"oha http://localhost:3002/users -n {str(options.number_of_requests)} -c { str(options.number_of_connections)} -j > ./node/nodeServerResult.json",
        ],
        shell=True,
    )
    file = open("./node/nodeServerResult.json").read()
    result = json.loads(file)
    process_oha.kill()
    return result


def node_ts_perform_server_benchmark(options: ServerParameters):
    os.chdir("../ts")
    process_oha = subprocess.Popen(
        [
            f"oha http://localhost:3005/users -n {str(options.number_of_requests)} -c { str(options.number_of_connections)} -j > ./node/nodeServerResult.json",
        ],
        shell=True,
    )
    file = open("./node/nodeServerResult.json").read()
    result = json.loads(file)
    process_oha.kill()
    return result
