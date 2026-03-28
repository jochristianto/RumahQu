import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";

import { AddItemDialog } from "@/components/AddItemDialog";

function renderAddItemDialog() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <AddItemDialog onAdded={() => {}} groupId="group-1" />
    </QueryClientProvider>,
  );
}

describe("AddItemDialog", () => {
  it("closes the date picker after a date is selected", async () => {
    renderAddItemDialog();

    fireEvent.click(screen.getByRole("button", { name: "Tambah Barang" }));
    fireEvent.click(screen.getByRole("button", { name: "Pilih tanggal" }));

    const calendarGrid = await screen.findByRole("grid");
    const dayButton = calendarGrid.querySelector("button:not([disabled])");

    expect(dayButton).not.toBeNull();

    fireEvent.click(dayButton!);

    await waitFor(() => {
      expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    });
  });
});
