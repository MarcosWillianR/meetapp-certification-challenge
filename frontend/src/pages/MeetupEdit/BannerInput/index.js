import React, { useState } from 'react';
import { Input } from '@rocketseat/unform';
import api from '~/services/api';

import { Container } from './styles';

import defaultBanner from '~/assets/defaultBanner.jpg';

export default function BannerInput({ image }) {
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState(defaultBanner);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, path } = response.data;

    setFile(id);
    setPreview(`http://localhost:3333/files/${path}`);
  }

  return (
    <Container>
      <label htmlFor="banner">
        <img src={preview || image} alt="" />

        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
        />

        <Input type="hidden" name="banner_id" value={file} />
      </label>
    </Container>
  );
}
