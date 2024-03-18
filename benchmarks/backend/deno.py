import signal
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


def deno_js_perform_sorting_benchmark(options: SortingParameters):
    os.chdir("../js")
    process = subprocess.Popen(
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
    p_info = psutil.Process(process.pid)
    used_memory = float(p_info.memory_full_info().rss)
    used_cpu = float(p_info.cpu_percent(interval=1))
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    process.kill()
    return result


def deno_ts_perform_sorting_benchmark(options: SortingParameters):
    os.chdir("../ts")
    process = subprocess.Popen(
        [
            "npm",
            "run",
            "deno:sorting",
            options.sorting_type,
            str(options.number_of_samples),
            str(options.number_of_iterations),
        ]
    )
    p_info = psutil.Process(process.pid)
    used_memory = p_info.memory_full_info().rss
    used_cpu = p_info.cpu_percent(interval=1)
    file = open("./deno/denoSortingResult.json").read()
    result = json.loads(file)
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    process.kill()
    return result


def deno_js_perform_files_benchmark(options: FilesParameters):
    os.chdir("../js")
    process = subprocess.Popen(
        [
            "npm",
            "run",
            "deno:fileWrite",
            str(options.number_of_iterations),
            str(options.number_of_files),
            str(options.number_of_paragraphs),
        ]
    )
    p_info = psutil.Process(process.pid)
    used_memory = p_info.memory_full_info().rss
    used_cpu = p_info.cpu_percent(interval=1)
    file = open("./deno/denoFilesResult.json").read()
    result = json.loads(file)
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    return result


def deno_ts_perform_files_benchmark(options: FilesParameters):
    os.chdir("../ts")
    process = subprocess.Popen(
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
    p_info = psutil.Process(process.pid)
    used_memory = p_info.memory_full_info().rss
    used_cpu = p_info.cpu_percent(interval=0.001)
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    process.kill()
    return result


def deno_js_perform_base64_benchmark(options: Base64Parameters):
    os.chdir("../js")
    process = subprocess.Popen(
        [
            "npm",
            "run",
            "deno:base64",
            str(options.number_of_iterations),
        ]
    )
    p_info = psutil.Process(process.pid)
    used_memory = p_info.memory_full_info().rss
    used_cpu = p_info.cpu_percent(interval=1)
    process.kill()
    file = open("./deno/denoBase64Result.json").read()
    result = json.loads(file)
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    return result


def deno_ts_perform_base64_benchmark(options: Base64Parameters):
    os.chdir("../ts")
    process = subprocess.Popen(
        [
            "npm",
            "run",
            "deno:base64",
            str(options.number_of_iterations),
        ]
    )
    p_info = psutil.Process(process.pid)
    used_memory = p_info.memory_full_info().rss
    used_cpu = p_info.cpu_percent(interval=1)
    process.kill()
    file = open("./deno/denoBase64Result.json").read()
    result = json.loads(file)
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    return result


def deno_js_perform_sqlite_benchmark(options: SqliteParameters):
    os.chdir("../js")
    process = subprocess.Popen(
        [
            "npm",
            "run",
            "deno:createData",
            str(options.number_of_iterations),
            str(options.number_of_records),
            str(options.number_of_benchmarks),
        ]
    )
    p_info = psutil.Process(process.pid)
    used_memory = p_info.memory_full_info().rss
    used_cpu = p_info.cpu_percent(interval=1)
    file = open("./deno/denoSqlite.json").read()
    result = json.loads(file)
    process.kill()
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    return result


def deno_ts_perform_sqlite_benchmark(options: SqliteParameters):
    os.chdir("../ts")
    process = subprocess.Popen(
        [
            "npm",
            "run",
            "deno:createData",
            str(options.number_of_iterations),
            str(options.number_of_records),
            str(options.number_of_benchmarks),
        ]
    )
    p_info = psutil.Process(process.pid)
    used_memory = p_info.memory_full_info().rss
    used_cpu = p_info.cpu_percent(interval=1)
    file = open("./deno/denoSqlite.json").read()
    result = json.loads(file)
    process.kill()
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    return result


def deno_js_perform_server_benchmark(options: ServerParameters):
    os.chdir("../js")
    process_server = subprocess.Popen(["npm", "run", "deno:server"])
    subprocess.run(["touch", "./deno/denoServerResult.json"])
    process_oha = subprocess.Popen(
        [
            f"oha http://localhost:3000 -n {str(options.number_of_requests)} -c { str(options.number_of_connections)} -j > ./deno/denoServerResult.json",
        ],
        shell=True,
    )
    p_info = psutil.Process(process_server.pid)
    file = open("./deno/denoServerResult.json").read()
    result = json.loads(file)
    used_memory = float(p_info.memory_full_info().rss)
    used_cpu = float(p_info.cpu_percent(interval=1))
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    os.kill(process_server.pid, signal.SIGKILL)
    process_oha.kill()
    return result


def deno_ts_perform_server_benchmark(options: ServerParameters):
    os.chdir("../ts")
    process_server = subprocess.Popen(["npm", "run", "deno:server"])
    subprocess.run(["touch", "./deno/denoServerResult.json"])
    process_oha = subprocess.Popen(
        [
            f"oha http://localhost:3000 -n {str(options.number_of_requests)} -c { str(options.number_of_connections)} -j > ./deno/denoServerResult.json",
        ],
        shell=True,
    )
    p_info = psutil.Process(process_server.pid)
    file = open("./node/nodeServerResult.json").read()
    result = json.loads(file)
    used_memory = float(p_info.memory_full_info().rss)
    used_cpu = float(p_info.cpu_percent(interval=1))
    result["used_cpu"] = used_cpu
    result["used_memory"] = used_memory
    os.kill(process_server.pid)
    os.kill(
        process_oha.pid,
    )
    return result
