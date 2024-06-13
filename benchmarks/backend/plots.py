import matplotlib.pyplot as plt
import numpy as np

from options import (
    SortingParameters,
    Base64Parameters,
    FilesParameters,
    ServerParameters,
    SqliteParameters,
)


def save_sorting_results(
    options: SortingParameters,
    result_bun,
    result_deno,
    result_node,
    result_ts_bun,
    result_ts_deno,
    result_ts_node,
) -> None:
    x = [i for i in range(0, options.number_of_iterations)]
    f, ax = plt.subplots(1, 2, figsize=(12, 6))
    ax[0].plot(
        x,
        [np.float64(result.get("time")) for result in result_bun["result"]],
        label="Bun - JS",
    )
    ax[0].plot(
        x,
        [np.float64(result.get("time")) for result in result_deno["result"]],
        label="Deno - JS",
    )
    ax[0].plot(
        x,
        [np.float64(result.get("time")) for result in result_node["result"]],
        label="Node - JS",
    )
    ax[0].set_xlabel("Number of Iterations")
    ax[0].set_ylabel("Execution Time (ms)")
    ax[0].set_title("Sorting Execution Time - JS")
    ax[0].legend()
    ax[0].figure.set_size_inches(8, 6)
    f.subplots_adjust(wspace=0.4)

    ax[1].plot(
        x,
        [np.int64(result.get("rss")) for result in result_bun["result"]],
        label="Bun Memory - JS",
    )
    ax[1].plot(
        x,
        [np.int64(result.get("rss")) for result in result_deno["result"]],
        label="Deno Memory - JS",
    )
    ax[1].plot(
        x,
        [np.int64(result.get("rss")) for result in result_node["result"]],
        label="Node Memory - JS",
    )
    ax[1].set_xlabel("Number of Iterations")
    ax[1].set_ylabel("RSS (kB)")
    ax[1].set_title("Memory usage - JS")
    ax[1].legend()
    ax[1].figure.set_size_inches(8, 6)
    plt.savefig(
        f"../backend/sorting_{options.sorting_type}_{options.number_of_iterations}_{options.number_of_samples}_js.png",
        dpi=300,
    )

    f_2, ax_2 = plt.subplots(1, 2, figsize=(12, 6))
    ax_2[0].plot(
        x,
        [np.float64(result.get("time")) for result in result_ts_bun["result"]],
        label="Bun - TS",
    )
    ax_2[0].plot(
        x,
        [np.float64(result.get("time")) for result in result_ts_deno["result"]],
        label="Deno - TS",
    )
    ax_2[0].plot(
        x,
        [np.float64(result.get("time")) for result in result_ts_node["result"]],
        label="Node - TS",
    )
    ax_2[0].set_xlabel("Number of Iterations")
    ax_2[0].set_ylabel("Execution Time (ms)")
    ax_2[0].set_title("Sorting Execution Time - TS")
    ax_2[0].legend()
    ax_2[0].figure.set_size_inches(8, 6)

    ax_2[1].plot(
        x,
        [np.int64(result.get("rss")) for result in result_ts_bun["result"]],
        label="Bun Memory - TS",
    )
    ax_2[1].plot(
        x,
        [np.int64(result.get("rss")) for result in result_ts_deno["result"]],
        label="Deno Memory - TS",
    )
    ax_2[1].plot(
        x,
        [np.int64(result.get("rss")) for result in result_ts_node["result"]],
        label="Node Memory - TS",
    )
    ax_2[1].set_xlabel("Number of Iterations")
    ax_2[1].set_ylabel("RSS (kB)")
    ax_2[1].set_title("Memory usage - TS")
    ax_2[1].legend()
    ax_2[1].figure.set_size_inches(8, 6)
    f_2.subplots_adjust(wspace=0.4)

    plt.savefig(
        f"../backend/sorting_{options.sorting_type}_{options.number_of_iterations}_{options.number_of_samples}_ts.png",
        dpi=300,
    )


def save_coding_results(
    options: Base64Parameters,
    result_bun,
    result_deno,
    result_node,
    result_ts_bun,
    result_ts_deno,
    result_ts_node,
) -> None:
    x = [i for i in range(0, options.number_of_iterations)]
    f_3, ax = plt.subplots(1, 2, figsize=(12, 6))
    ax[0].plot(
        x,
        [result["timeDecoded"] for result in result_bun["resultOfDecoding"]],
        label="Bun - JS",
    )
    ax[0].plot(
        x,
        [result["timeDecoded"] for result in result_node["resultOfDecoding"]],
        label="NodeJS - JS",
    )
    ax[0].plot(
        x,
        [result["timeDecoded"] for result in result_deno["resultOfDecoding"]],
        label="Deno - JS",
    )
    ax[0].set_xlabel("Number of Iterations")
    ax[0].set_ylabel("Execution Time (ms)")
    ax[0].set_title("Decoding Execution Time - JS")
    ax[0].legend()
    ax[1].plot(
        x,
        [result["rss"] for result in result_bun["resultOfDecoding"]],
        label="Bun - JS",
    )
    ax[1].plot(
        x,
        [result["rss"] for result in result_node["resultOfDecoding"]],
        label="NodeJS - JS",
    )
    ax[1].plot(
        x,
        [result["rss"] for result in result_deno["resultOfDecoding"]],
        label="Deno - JS",
    )
    ax[1].set_xlabel("Number of Iterations")
    ax[1].set_ylabel("RSS (kB)")
    ax[1].set_title("Decoding memory usage - TS")
    ax[1].legend()

    ax[0].figure.set_size_inches(8, 6)
    ax[1].figure.set_size_inches(8, 6)
    f_3.subplots_adjust(wspace=0.4)
    plt.savefig(
        f"../backend/base64_{options.number_of_iterations}_decoding_js.png",
        dpi=300,
    )

    f_4, ax_2 = plt.subplots(1, 2, figsize=(12, 6))
    ax_2[0].plot(
        x,
        [result["timeDecoded"] for result in result_ts_bun["resultOfDecoding"]],
        label="Bun - TS",
    )
    ax_2[0].plot(
        x,
        [result["timeDecoded"] for result in result_ts_node["resultOfDecoding"]],
        label="NodeJS - TS",
    )
    ax_2[0].plot(
        x,
        [result["timeDecoded"] for result in result_ts_deno["resultOfDecoding"]],
        label="Deno - TS",
    )
    ax_2[0].set_xlabel("Number of Iterations")
    ax_2[0].set_ylabel("Execution Time (ms)")
    ax_2[0].set_title("Decoding Execution Time - TS")
    ax_2[0].legend()

    ax_2[1].plot(
        x,
        [result["rss"] for result in result_ts_bun["resultOfDecoding"]],
        label="Bun - TS",
    )
    ax_2[1].plot(
        x,
        [result["rss"] for result in result_ts_node["resultOfDecoding"]],
        label="NodeJS - TS",
    )
    ax_2[1].plot(
        x,
        [result["rss"] for result in result_ts_deno["resultOfDecoding"]],
        label="Deno - TS",
    )
    ax_2[1].set_xlabel("Number of Iterations")
    ax_2[1].set_ylabel("RSS (kB)")
    ax_2[1].set_title("Decoding memory usage - TS")
    ax_2[1].legend()

    ax_2[0].figure.set_size_inches(8, 6)
    ax_2[1].figure.set_size_inches(8, 6)
    f_4.subplots_adjust(wspace=0.4)
    plt.savefig(
        f"../backend/base64_{options.number_of_iterations}_decoding_ts.png",
        dpi=300,
    )

    # Encoding

    f_3, ax_3 = plt.subplots(1, 2, figsize=(12, 6))
    ax_3[0].plot(
        x,
        [result["timeEncoding"] for result in result_bun["resultOfEncoding"]],
        label="Bun - JS",
    )
    ax_3[0].plot(
        x,
        [result["timeEncoding"] for result in result_node["resultOfEncoding"]],
        label="NodeJS - JS",
    )
    ax_3[0].plot(
        x,
        [result["timeEncoding"] for result in result_deno["resultOfEncoding"]],
        label="Deno - JS",
    )
    ax_3[0].set_xlabel("Number of Iterations")
    ax_3[0].set_ylabel("Execution Time (ms)")
    ax_3[0].set_title("Encoding Execution Time - JS")
    ax_3[0].legend()
    ax_3[1].plot(
        x,
        [result["rss"] for result in result_bun["resultOfEncoding"]],
        label="Bun - JS",
    )
    ax_3[1].plot(
        x,
        [result["rss"] for result in result_node["resultOfEncoding"]],
        label="NodeJS - JS",
    )
    ax_3[1].plot(
        x,
        [result["rss"] for result in result_deno["resultOfEncoding"]],
        label="Deno - JS",
    )
    ax_3[1].set_xlabel("Number of Iterations")
    ax_3[1].set_ylabel("RSS (kB)")
    ax_3[1].set_title("Encoding memory usage - TS")
    ax_3[1].legend()

    ax_3[0].figure.set_size_inches(8, 6)
    ax_3[1].figure.set_size_inches(8, 6)
    f_3.subplots_adjust(wspace=0.4)
    plt.savefig(
        f"../backend/base64_{options.number_of_iterations}_encoding_js.png",
        dpi=300,
    )

    f_4, ax_4 = plt.subplots(1, 2, figsize=(12, 6))
    ax_4[0].plot(
        x,
        [result["timeEncoding"] for result in result_ts_bun["resultOfEncoding"]],
        label="Bun - TS",
    )
    ax_4[0].plot(
        x,
        [result["timeEncoding"] for result in result_ts_node["resultOfEncoding"]],
        label="NodeJS - TS",
    )
    ax_4[0].plot(
        x,
        [result["timeEncoding"] for result in result_ts_deno["resultOfEncoding"]],
        label="Deno - TS",
    )
    ax_4[0].set_xlabel("Number of Iterations")
    ax_4[0].set_ylabel("Execution Time (ms)")
    ax_4[0].set_title("Encoding Execution Time - TS")
    ax_4[0].legend()

    ax_4[1].plot(
        x,
        [result["rss"] for result in result_ts_bun["resultOfEncoding"]],
        label="Bun - TS",
    )
    ax_4[1].plot(
        x,
        [result["rss"] for result in result_ts_node["resultOfEncoding"]],
        label="NodeJS - TS",
    )
    ax_4[1].plot(
        x,
        [result["rss"] for result in result_ts_deno["resultOfEncoding"]],
        label="Deno - TS",
    )
    ax_4[1].set_xlabel("Number of Iterations")
    ax_4[1].set_ylabel("RSS (kB)")
    ax_4[1].set_title("Encoding memory usage - TS")
    ax_4[1].legend()

    ax_4[0].figure.set_size_inches(8, 6)
    ax_4[1].figure.set_size_inches(8, 6)
    f_4.subplots_adjust(wspace=0.4)
    plt.savefig(
        f"../backend/base64_{options.number_of_iterations}_encoding_ts.png",
        dpi=300,
    )


def save_files_results(
    options: FilesParameters,
    result_bun,
    result_deno,
    result_node,
    result_ts_bun,
    result_ts_deno,
    result_ts_node,
) -> None:
    x = [i for i in range(0, options.number_of_iterations)]

    f, ax = plt.subplots(1, 2, figsize=(12, 6))
    ax[0].plot(
        x,
        [
            np.mean(result["resultOfReading"]["times"])
            for result in result_bun["results"]
        ],
        label="Bun - JS",
    )
    ax[0].plot(
        x,
        [
            np.mean(result["resultOfReading"]["times"])
            for result in result_node["results"]
        ],
        label="NodeJS - JS",
    )
    ax[0].plot(
        x,
        [
            np.mean(result["resultOfReading"]["times"])
            for result in result_deno["results"]
        ],
        label="Deno - JS",
    )
    ax[0].set_xlabel("Number of Iterations")
    ax[0].set_ylabel("Execution Time (ms)")
    ax[0].set_title("Reading Execution Time - JS")
    ax[0].legend()

    ax[1].plot(
        x,
        [
            np.mean(result["resultOfReading"]["memory"])
            for result in result_bun["results"]
        ],
        label="Bun - JS",
    )
    ax[1].plot(
        x,
        [
            np.mean(result["resultOfReading"]["memory"])
            for result in result_node["results"]
        ],
        label="NodeJS - JS",
    )
    ax[1].plot(
        x,
        [
            np.mean(result["resultOfReading"]["memory"])
            for result in result_deno["results"]
        ],
        label="Deno - JS",
    )
    ax[1].set_xlabel("Number of Iterations")
    ax[1].set_ylabel("RSS (kB)")
    ax[1].set_title("Reading Memory Usage - JS")
    ax[1].legend()
    f.subplots_adjust(wspace=0.4)

    plt.savefig(
        f"../backend/files_reading_{options.number_of_iterations}_{options.number_of_files}_js.png",
        dpi=300,
    )

    f_2, ax_2 = plt.subplots(1, 2, figsize=(12, 6))
    ax_2[0].plot(
        x,
        [
            np.mean(result["resultOfWriting"]["times"])
            for result in result_bun["results"]
        ],
        label="Bun - JS",
    )
    ax_2[0].plot(
        x,
        [
            np.mean(result["resultOfWriting"]["times"])
            for result in result_node["results"]
        ],
        label="NodeJS - JS",
    )
    ax_2[0].plot(
        x,
        [
            np.mean(result["resultOfWriting"]["times"])
            for result in result_deno["results"]
        ],
        label="Deno - JS",
    )
    ax_2[0].set_xlabel("Number of Iterations")
    ax_2[0].set_ylabel("Execution Time (ms)")
    ax_2[0].set_title("Reading Execution Time - JS")
    ax_2[0].legend()

    ax_2[1].plot(
        x,
        [
            np.mean(result["resultOfWriting"]["memory"])
            for result in result_bun["results"]
        ],
        label="Bun - JS",
    )
    ax_2[1].plot(
        x,
        [
            np.mean(result["resultOfWriting"]["memory"])
            for result in result_node["results"]
        ],
        label="NodeJS - JS",
    )
    ax_2[1].plot(
        x,
        [
            np.mean(result["resultOfWriting"]["memory"])
            for result in result_deno["results"]
        ],
        label="Deno - JS",
    )
    ax_2[1].set_xlabel("Number of Iterations")
    ax_2[1].set_ylabel("RSS (kB)")
    ax_2[1].set_title("Reading Memory Usage - JS")
    ax_2[1].legend()
    f_2.subplots_adjust(wspace=0.4)

    plt.savefig(
        f"../backend/files_writing_{options.number_of_iterations}_{options.number_of_files}_js.png",
        dpi=300,
    )

    f_3, ax_3 = plt.subplots(1, 2, figsize=(12, 6))
    ax_3[0].plot(
        x,
        [
            np.mean(result["resultOfReading"]["times"])
            for result in result_ts_bun["results"]
        ],
        label="Bun - TS",
    )
    ax_3[0].plot(
        x,
        [
            np.mean(result["resultOfReading"]["times"])
            for result in result_ts_node["results"]
        ],
        label="NodeJS - TS",
    )
    ax_3[0].plot(
        x,
        [
            np.mean(result["resultOfReading"]["times"])
            for result in result_ts_deno["results"]
        ],
        label="Deno - TS",
    )
    ax_3[0].set_xlabel("Number of Iterations")
    ax_3[0].set_ylabel("Execution Time (ms)")
    ax_3[0].set_title("Reading Execution Time - TS")
    ax_3[0].legend()

    ax_3[1].plot(
        x,
        [
            np.mean(result["resultOfReading"]["memory"])
            for result in result_ts_bun["results"]
        ],
        label="Bun - TS",
    )
    ax_3[1].plot(
        x,
        [
            np.mean(result["resultOfReading"]["memory"])
            for result in result_ts_node["results"]
        ],
        label="NodeJS - TS",
    )
    ax_3[1].plot(
        x,
        [
            np.mean(result["resultOfReading"]["memory"])
            for result in result_ts_deno["results"]
        ],
        label="Deno - TS",
    )
    ax_3[1].set_xlabel("Number of Iterations")
    ax_3[1].set_ylabel("RSS (kB)")
    ax_3[1].set_title("Writing Memory Usage - TS")
    ax_3[1].legend()
    f_3.subplots_adjust(wspace=0.4)

    plt.savefig(
        f"../backend/files_reading_{options.number_of_iterations}_{options.number_of_files}_ts.png",
        dpi=300,
    )

    f_4, ax_4 = plt.subplots(1, 2, figsize=(12, 6))
    ax_4[0].plot(
        x,
        [
            np.mean(result["resultOfWriting"]["times"])
            for result in result_ts_bun["results"]
        ],
        label="Bun - TS",
    )
    ax_4[0].plot(
        x,
        [
            np.mean(result["resultOfWriting"]["times"])
            for result in result_ts_node["results"]
        ],
        label="NodeJS - TS",
    )
    ax_4[0].plot(
        x,
        [
            np.mean(result["resultOfWriting"]["times"])
            for result in result_ts_deno["results"]
        ],
        label="Deno - TS",
    )
    ax_4[0].set_xlabel("Number of Iterations")
    ax_4[0].set_ylabel("Execution Time (ms)")
    ax_4[0].set_title("Reading Execution Time - JS")
    ax_4[0].legend()

    ax_4[1].plot(
        x,
        [
            np.mean(result["resultOfWriting"]["memory"])
            for result in result_ts_bun["results"]
        ],
        label="Bun - TS",
    )
    ax_4[1].plot(
        x,
        [
            np.mean(result["resultOfWriting"]["memory"])
            for result in result_ts_node["results"]
        ],
        label="NodeJS - TS",
    )
    ax_4[1].plot(
        x,
        [
            np.mean(result["resultOfWriting"]["memory"])
            for result in result_ts_deno["results"]
        ],
        label="Deno - TS",
    )
    ax_4[1].set_xlabel("Number of Iterations")
    ax_4[1].set_ylabel("RSS (kB)")
    ax_4[1].set_title("Writing Memory Usage - TS")
    ax_4[1].legend()
    f_4.subplots_adjust(wspace=0.4)

    plt.savefig(
        f"../backend/files_writing_{options.number_of_iterations}_{options.number_of_files}_ts.png",
        dpi=300,
    )


def save_sqlite_results(
    options: SqliteParameters,
    result_bun,
    result_deno,
    result_node,
    result_ts_bun,
    result_ts_deno,
    result_ts_node,
) -> None:
    x = [i for i in range(0, options.number_of_iterations)]

    f, ax = plt.subplots(1, 2, figsize=(12, 6))
    ax[0].plot(
        x,
        result_bun["times"],
        label="Bun - JS",
    )
    ax[0].plot(
        x,
        result_node["times"],
        label="NodeJS - JS",
    )
    ax[0].plot(
        x,
        result_deno["times"],
        label="Deno - JS",
    )
    ax[0].set_xlabel("Number of Iterations")
    ax[0].set_ylabel("Execution Time (ms)")
    ax[0].set_title("SQLite Execution Time - JS")
    ax[0].legend()

    ax[1].plot(
        x,
        result_bun["memory"],
        label="Bun - JS",
    )
    ax[1].plot(
        x,
        result_node["memory"],
        label="NodeJS - JS",
    )
    ax[1].plot(
        x,
        result_deno["memory"],
        label="Deno - JS",
    )
    ax[1].set_xlabel("Number of Iterations")
    ax[1].set_ylabel("RSS (kB)")
    ax[1].set_title("SQLite Memory Usage - JS")
    ax[1].legend()
    f.subplots_adjust(wspace=0.4)

    plt.savefig(
        f"../backend/sqlite_{options.number_of_iterations}_{options.number_of_records}_js.png",
        dpi=300,
    )

    f_2, ax_2 = plt.subplots(1, 2, figsize=(12, 6))
    ax_2[0].plot(
        x,
        result_ts_bun["times"],
        label="Bun - TS",
    )
    ax_2[0].plot(
        x,
        result_ts_node["times"],
        label="NodeJS - TS",
    )
    ax_2[0].plot(
        x,
        result_ts_deno["times"],
        label="Deno - TS",
    )
    ax_2[0].set_xlabel("Number of Iterations")
    ax_2[0].set_ylabel("Execution Time (ms)")
    ax_2[0].set_title("SQLite Execution Time - TS")
    ax_2[0].legend()

    ax_2[1].plot(
        x,
        result_ts_bun["memory"],
        label="Bun - TS",
    )
    ax_2[1].plot(
        x,
        result_ts_node["memory"],
        label="NodeJS - TS",
    )
    ax_2[1].plot(
        x,
        result_ts_deno["memory"],
        label="Deno - TS",
    )
    ax_2[1].set_xlabel("Number of Iterations")
    ax_2[1].set_ylabel("RSS (kB)")
    ax_2[1].set_title("SQLite Memory Usage - TS")
    ax_2[1].legend()
    f_2.subplots_adjust(wspace=0.4)

    plt.savefig(
        f"../backend/sqlite_{options.number_of_iterations}_{options.number_of_records}_ts.png",
        dpi=300,
    )


def save_server_results(
    options: ServerParameters,
    result_bun,
    result_deno,
    result_node,
    result_ts_bun,
    result_ts_deno,
    result_ts_node,
) -> None:
    data = {
        "deno": result_deno["rps"]["mean"],
        "node": result_node["rps"]["mean"],
        "bun": result_bun["rps"]["mean"],
    }
    data_ts = {
        "deno": result_ts_deno["rps"]["mean"],
        "node": result_ts_node["rps"]["mean"],
        "bun": result_ts_bun["rps"]["mean"],
    }

    color = ["blue", "green", "brown"]

    _, ax = plt.subplots(1, 2, figsize=(12, 6))

    ax[0].bar(data.keys(), data.values(), color=color)
    ax[0].set_ylabel("Requests per second")
    ax[0].set_title("Requests per second - JS")

    ax[1].bar(data_ts.keys(), data_ts.values(), color=color)
    ax[1].set_ylabel("Requests per second")
    ax[1].set_title("Requests per second - TS")

    plt.savefig(
        f"../backend/server_{options.number_of_connections}_{options.number_of_requests}.png",
        dpi=300,
    )
