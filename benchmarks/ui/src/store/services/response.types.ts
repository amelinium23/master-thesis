type SortingDetails = {
  time: number;
  result: number[];
};

type FileResult = {
  results: {
    results: string[];
    timeOfReading: number;
    timeOfCreating: number;
  };
  timeOfExecution: number;
};

type User = {
  firstName: string;
  lastName: string;
  gender: string;
  bio: string;
  jobArea: string;
  jobTitle: string;
  jobType: string;
};

type SqliteResult = {
  result: User;
  time: number;
};

type DecodeResult = {
  timeDecoded: number;
  decodedString: string;
};

type EncodeResult = {
  timeEncoding: number;
  encodedString: string;
};

type Base64Result = {
  resultOfDecoding: DecodeResult[];
  resultOfEncoding: EncodeResult[];
};

export type Response<T> = {
  ts: Results<T>;
  js: Results<T>;
};

export type Results<T> = {
  result_bun: T;
  result_node: T;
  result_deno: T;
};

export type Usage = {
  used_cpu: number;
  used_memory: number;
};

export type SortingResult = {
  result: SortingDetails[];
  time: number;
} & Usage;

export type Base64Results = Base64Result & Usage;

export type SqliteResults = SqliteResult & Usage;

export type FilesResult = FileResult & Usage;
