"use client";

import { ClipLoader } from "react-spinners";

interface Props {
  size?: number;
}

export const Loader = ({ size = 50 }: Props) => {
  return <ClipLoader color="#3498db" size={size} />;
};
