// import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ReviewForm } from "../components/ReviewForm";
import "@testing-library/jest-dom";

describe("ReviewForm", () => {
  it("renders and submits correctly", async () => {
    const onSubmitMock = jest.fn(() => Promise.resolve());
    render(<ReviewForm onSubmit={onSubmitMock} submitting={false} />);

    // Inputs
    const nameInput = screen.getByPlaceholderText(/your name/i);
    const commentInput = screen.getByPlaceholderText(/your comment/i);
    const submitButton = screen.getByRole("button", { name: /submit review/i });
    const stars = screen.getAllByRole("button", { name: /star/i });

    // Wrap state-updating events in act
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(commentInput, { target: { value: "Great movie!" } });
      fireEvent.click(stars[3]); // 4th star, rating = 4
    });

    await act(async () => {
      fireEvent.click(submitButton);
      // wait for submit promise to resolve
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(onSubmitMock).toHaveBeenCalledWith({
      name: "John Doe",
      rating: 4,
      comment: "Great movie!",
    });

    // Submit button is enabled because submitting is false
    expect(submitButton).toBeEnabled();
  });

  it("disables inputs and button while submitting", () => {
    render(<ReviewForm onSubmit={jest.fn()} submitting={true} />);

    const nameInput = screen.getByPlaceholderText(/your name/i);
    const commentInput = screen.getByPlaceholderText(/your comment/i);
    const submitButton = screen.getByRole("button", { name: /submitting/i });

    expect(nameInput).toBeDisabled();
    expect(commentInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});
