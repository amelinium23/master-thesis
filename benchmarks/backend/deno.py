from typing import Dict
import subprocess
import os

def deno_perform_sorting_benchmark(options: Dict[str, str]):
  os.chdir("../js")
  algortim = options.get("")
  
  subprocess.run(["npm", "run", "deno:sorting", "bubble", "10", "1", "10"])

def deno_perform_files_benchmark():
  ...

def deno_perform_base64_benchmark():
  ...

def deno_perform_sqlite_benchmark():
  ...