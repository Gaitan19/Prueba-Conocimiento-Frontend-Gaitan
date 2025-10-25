'use client';

import { MdError } from 'react-icons/md';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-md mt-6" role="alert">
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
        <div className="flex items-center gap-2">
          <MdError className="w-5 h-5" />
          <span className="font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
}
