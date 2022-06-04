import React from "react";
import styled from "styled-components"

const Wrapper = styled.div`
  text-align:center;
  font-size:0.9rem;
  color:#f42e0bdb;
`

interface Props {
  show: boolean;
  children: string;
}

export default function WarningMessage({
  show,
  children
}: Props) {
  if (!show) {
    return null;
  }

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}