from pydantic import BaseModel


class SortingParameters(BaseModel):
    sorting_type: str
    number_of_samples: int
    number_of_iterations: int


class FilesParameters(BaseModel):
    number_of_files: int
    number_of_iterations: int
    number_of_paragraphs: int


class BunFilesParameters(FilesParameters):
    should_be_bun_files: bool


class SqliteParameters(BaseModel):
    number_of_benchmarks: int
    number_of_iterations: int
    number_of_records: int


class Base64Parameters(BaseModel):
    number_of_iterations: int


class ServerParameters(BaseModel):
    number_of_requests: int
    number_of_connections: int
