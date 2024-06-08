import matplotlib.pyplot as plt
import numpy as np


def save_sorting_results(
    options,
    result_bun,
    result_deno,
    result_node,
    result_ts_bun,
    result_ts_deno,
    result_ts_node,
) -> None:
    x = [i for i in range(0, options.number_of_iterations)]
    _, ax = plt.subplots(1, 2)
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
    ax[0].figure.set_size_inches(10, 7)

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
    ax[1].figure.set_size_inches(10, 7)
    plt.savefig(
        f"../backend/sorting_{options.sorting_type}_{options.number_of_iterations}_js.png",
        dpi=300,
    )

    __, ax_2 = plt.subplots(1, 2)
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
    ax_2[0].figure.set_size_inches(10, 7)

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
    ax_2[1].figure.set_size_inches(10, 7)
    plt.savefig(
        f"../backend/sorting_{options.sorting_type}_{options.number_of_iterations}_ts.png",
        dpi=300,
    )
