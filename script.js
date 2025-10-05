document.addEventListener("DOMContentLoaded", () => {
  const totalRooms = document.getElementById("total-rooms");
  const roomsSold = document.getElementById("rooms-sold");
  const roomsRevenue = document.getElementById("room-revenue");
  const resDiv = document.getElementById("res");

  let debounceTimeout;

  function formatCurrency(value) {
    return value === "N/A" ? "N/A" : `$${value.toFixed(2)}`;
  }

  function formatPercent(value) {
    return value === "N/A" ? "N/A" : `${value.toFixed(2)}%`;
  }

  function recompute() {
    const total = Number(totalRooms.value);
    const sold = Number(roomsSold.value);
    const revenue = Number(roomsRevenue.value);

    let occupancy = "N/A";
    let adr = "N/A";
    let revPAR = "N/A";

    if (total > 0) {
      occupancy = (sold / total) * 100;
      revPAR = revenue / total;
    }
    if (sold > 0) {
      adr = revenue / sold;
    }

    document.getElementById("res").innerHTML = `
        <p>Occupancy: ${formatPercent(occupancy)}</p>
        <p>ADR: ${formatCurrency(adr)}</p>
        <p>RevPAR: ${formatCurrency(revPAR)}</p>
    `;
  }

  function debounceRecompute() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(recompute, 500); // Delay in milliseconds, e.g., 500ms
  }

  totalRooms.addEventListener("input", debounceRecompute);
  roomsSold.addEventListener("input", debounceRecompute);
  roomsRevenue.addEventListener("input", debounceRecompute);
});
