import React from 'react';
import { parseISO } from 'date-fns';
import ReactDatePicker from 'react-datepicker';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DateInput({ date }) {
  return <ReactDatePicker selected={parseISO(date)} />;
}
