export type SortingRequest = {
  sorting_type: string;
  number_of_samples: number;
  number_of_iterations: number;
};

export type FilesRequest = {
  number_of_iterations: number;
  number_of_files: number;
  number_of_paragraphs: number;
  should_be_bun_files: boolean;
};

export type SqLiteRequest = {
  number_of_iterations: number;
  number_of_records: number;
};

export type ServerRequest = {
  number_of_requests: number;
  number_of_connections: number;
};

export type Base64Request = {
  number_of_iterations: number;
};
