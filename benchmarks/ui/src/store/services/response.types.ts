type SortingDetails = {
  time: number;
  rss: number;
  result: number[];
};

type FileContent = {
  content: string;
  time: number;
};

type ReadingResult = {
  results: FileContent[];
  times: number[];
  memory: number[];
  timeOfReading: number;
};

type WritingResult = {
  fileNames: string[];
  times: number[];
  memory: number[];
  timeOfCreating: number;
};

type FileBenchmarkResult = {
  resultOfReading: ReadingResult;
  resultOfWriting: WritingResult;
};

type FileResult = {
  results: FileBenchmarkResult[];
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
  users: User[];
  times: number[];
  memory: number[];
  time: number;
};

type DecodeResult = {
  timeDecoded: number;
  rss: number;
  decodedString: string;
};

type EncodeResult = {
  timeEncoding: number;
  rss: number;
  encodedString: string;
};

type Base64Result = {
  resultOfDecoding: DecodeResult[];
  resultOfEncoding: EncodeResult[];
};

type SortingResult = {
  result: SortingDetails[];
  time: number;
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

export type ServerResult = {
  summary: Summary;
  responseTimeHistogram: Record<string, number>;
  latencyPercentiles: Percentiles;
  rps: Rps;
  details: Details;
  statusCodeDistribution: StatusCodeDistribution;
  errorDistribution: Record<string, unknown>;
};

export type Details = {
  DNSDialup: DNS;
  DNSLookup: DNS;
};

export type DNS = {
  average: number;
  fastest: number;
  slowest: number;
};

export type Percentiles = {
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  p95: number;
  p99: number;
  "p99.9": number;
  "p99.99": number;
};

export type Rps = {
  mean: number;
  stddev: number;
  max: number;
  percentiles: Percentiles;
};

export type StatusCodeDistribution = {
  "200": number;
};

export type Summary = {
  successRate: number;
  total: number;
  slowest: number;
  fastest: number;
  average: number;
  requestsPerSec: number;
  totalData: number;
  sizePerRequest: number;
  sizePerSec: number;
};

export type Base64Results = Base64Result & Usage;
export type SqliteResults = SqliteResult & Usage;
export type FilesResults = FileResult & Usage;
export type ServerResults = ServerResult & Usage;
export type SortingResults = SortingResult & Usage;
