type UploadedFile = {
  file: File;
  id: string;
};

type ExistingDocument = {
    id: number;
    fileName: string;
    size: number;
    createdAt?: string;
};

export { type UploadedFile, type ExistingDocument };