import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import defaultComponent from "./default";

describe("게시판 테스트", () => {

  test("게시판 데이터 가져오기 테스트", async () => {
    const { container, getByText } = render(defaultComponent());

    await waitFor(() => {
      fireEvent.click(getByText("게시판"));
    })
  })
})