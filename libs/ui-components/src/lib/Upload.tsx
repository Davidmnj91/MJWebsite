import React, { createRef, ReactNode } from 'react';
import styled from 'styled-components';
import { Label } from './Form';
import { coerceArray } from './utils';

type UploadProps = {
  multi?: boolean;
  mimeType?: string | string[];
  allowDrop?: boolean;
  children?: ReactNode | ReactNode[];
  value?: File[];
  changeCb?: (event: { name?: string; value?: File[] }) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const UploadContainer = styled.div`
  outline: none;
  margin: 0;
  border: none;
  line-height: 3rem;
  background: ${(t) => t.theme.surface};
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 0 20px;
  height: 2.5em;
  font-size: 1.2rem;
  color: ${(t) => t.theme.foreground};
`;

export const Upload: React.FC<UploadProps> = (props: UploadProps) => {
  const multi = props.multi || false;
  const allowedMimeTypes = coerceArray(props.mimeType || []);
  const allowedMimeTypesRegexp = allowedMimeTypes.map((m) => new RegExp(m.replace('/', '\\/').replace('*', '.*')));

  const uploadInputRef = createRef<HTMLInputElement>();

  const isValidType = (file: File) => {
    if (!allowedMimeTypesRegexp || !allowedMimeTypesRegexp.length) {
      return true;
    }
    return allowedMimeTypesRegexp.some((m) => m.test(file.type));
  };

  const retrieveFiles = (e: React.DragEvent<HTMLDivElement>) => {
    if (!props.allowDrop) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();

    emitValue(e.dataTransfer.files);
  };

  const emitValue = (f: FileList | null) => {
    const files = Array.from(f || []);
    if (!files.length) {
      return;
    }

    let value;
    if (!multi) {
      if (isValidType(files[0])) {
        value = [files[0]];
      }
    } else {
      const validFiles = files.filter((f) => isValidType(f));
      let myValue: File[] = [];
      if (props.value) {
        myValue = Array.isArray(props.value) ? [...props.value] : [props.value];
      }
      value = [...myValue, ...validFiles];
    }

    props.changeCb && props.changeCb({ name: props.name, value: value });
  };

  return (
    <UploadContainer
      style={props.style}
      className={props.className}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onDrop={(e) => retrieveFiles(e)}
      onClick={() => uploadInputRef.current?.click()}
    >
      {props.placeholder && <Label>{props.placeholder}</Label>}
      <input
        type="file"
        accept={allowedMimeTypes.join(', ')}
        id="upload-input"
        aria-describedby="upload-input-error"
        onChange={(e) => emitValue(e.target.files)}
        multiple={multi}
        ref={uploadInputRef}
        style={{ display: 'none' }}
      />
      {props.children}
    </UploadContainer>
  );
};
