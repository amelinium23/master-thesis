### Instruction for performing benchmarks

This project is separated into three tested frameworks:

-   bun
-   deno
-   node

All of the project have script that can run with prefix of tested runtime
List of scripts:

-   `<runtime>:base64` - script run benchmark run test for encoding and decoding of base64
-   `<runtime>:sorting` - script run benchmark for test each of sorting algorithm: radix, quick and bubble sort
-   `<runtime>:createData` - script run benchmark for creating and inserting data to sqlite database
-   `<runtime>:fileWrite` - script run benchmark for creating and reading file for each
-   `<runtime>:server` - script for running local server to test RPS (Request per second)
