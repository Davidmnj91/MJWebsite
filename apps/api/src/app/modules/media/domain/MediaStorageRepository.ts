export interface StorageMediaRepository<M> {
  createFile(mediaFile: M, name?: string): Promise<string>;
  readFile(fullPath: string): Promise<Buffer>;
  deleteFile(fullPath: string): Promise<void>;
}
